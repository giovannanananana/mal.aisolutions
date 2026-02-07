import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface OrderRequest {
  service: string;
  budget: string;
  name: string;
  email: string;
  details: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { service, budget, name, email, details }: OrderRequest = await req.json();

    // Validate required fields
    if (!service || !budget || !name || !email) {
      console.error("Missing required fields:", { service, budget, name, email });
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Invalid email format:", email);
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate field lengths
    if (name.length > 100 || email.length > 255 || details.length > 5000) {
      console.error("Field length exceeded");
      return new Response(
        JSON.stringify({ error: "Field length exceeded" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Sending order email for:", { service, budget, name, email });

    const emailHtml = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f7; padding: 40px; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 28px; font-weight: 700; margin: 0;">
            mal.<span style="color: #E60000;">ai</span>solution
          </h1>
          <p style="color: #888; font-size: 14px; margin-top: 8px;">New Project Inquiry</p>
        </div>
        
        <div style="background: #121212; border: 1px solid #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
          <h2 style="font-size: 18px; color: #E60000; margin: 0 0 16px 0;">📋 Project Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 14px; border-bottom: 1px solid #1a1a1a; width: 120px;">Service</td>
              <td style="padding: 10px 0; color: #f5f5f7; font-size: 14px; border-bottom: 1px solid #1a1a1a; font-weight: 600;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 14px; border-bottom: 1px solid #1a1a1a;">Budget</td>
              <td style="padding: 10px 0; color: #f5f5f7; font-size: 14px; border-bottom: 1px solid #1a1a1a; font-weight: 600;">${budget}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 14px; border-bottom: 1px solid #1a1a1a;">Name</td>
              <td style="padding: 10px 0; color: #f5f5f7; font-size: 14px; border-bottom: 1px solid #1a1a1a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 14px;">Email</td>
              <td style="padding: 10px 0; font-size: 14px;">
                <a href="mailto:${email}" style="color: #E60000; text-decoration: none;">${email}</a>
              </td>
            </tr>
          </table>
        </div>

        ${details ? `
        <div style="background: #121212; border: 1px solid #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
          <h2 style="font-size: 18px; color: #E60000; margin: 0 0 12px 0;">💬 Project Description</h2>
          <p style="color: #ccc; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${details}</p>
        </div>
        ` : ''}

        <div style="text-align: center; margin-top: 32px;">
          <a href="mailto:${email}" style="display: inline-block; background: #E60000; color: white; padding: 12px 32px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 14px;">
            Reply to ${name}
          </a>
        </div>

        <p style="text-align: center; color: #555; font-size: 12px; margin-top: 32px;">
          This email was automatically sent from mal.aisolution order form.
        </p>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "mal.aisolution <onboarding@resend.dev>",
      to: ["mal.aisolution@gmail.com"],
      subject: `New Project Inquiry: ${service} - ${name}`,
      html: emailHtml,
      reply_to: email,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Order submitted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error sending order email:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
