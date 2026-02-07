import { useRef, useState } from 'react';
import gsap from 'gsap';
import { Globe, Bot, Layout, Palette, Check, ArrowRight, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const services = [
  { id: 'website', label: 'Website', icon: Globe },
  { id: 'chatbot', label: 'AI Chatbot', icon: Bot },
  { id: 'webapp', label: 'Web App', icon: Layout },
  { id: 'design', label: 'UI/UX Design', icon: Palette },
];

const budgets = [
  { id: 'small', label: '$5K - $10K' },
  { id: 'medium', label: '$10K - $25K' },
  { id: 'large', label: '$25K - $50K' },
  { id: 'enterprise', label: '$50K+' },
];

interface OrderFormProps {
  onSubmitSuccess?: () => void;
}

const OrderForm = ({ onSubmitSuccess }: OrderFormProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', details: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stepContentRef = useRef<HTMLDivElement>(null);

  const animateStepTransition = (direction: 'next' | 'prev') => {
    if (!stepContentRef.current) return;
    const xFrom = direction === 'next' ? 50 : -50;
    const xTo = direction === 'next' ? -50 : 50;

    gsap.to(stepContentRef.current, {
      x: xTo,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentStep((prev) => (direction === 'next' ? prev + 1 : prev - 1));
        gsap.fromTo(
          stepContentRef.current,
          { x: xFrom, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
      },
    });
  };

  const handleNext = () => {
    if (currentStep === 1 && !selectedService) return;
    if (currentStep === 2 && !selectedBudget) return;
    if (currentStep < 3) animateStepTransition('next');
  };

  const handlePrev = () => {
    if (currentStep > 1) animateStepTransition('prev');
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) return;
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-order-email', {
        body: {
          service: services.find((s) => s.id === selectedService)?.label || '',
          budget: budgets.find((b) => b.id === selectedBudget)?.label || '',
          name: formData.name,
          email: formData.email,
          details: formData.details,
        },
      });

      if (error) throw error;

      toast({
        title: '✅ Order Submitted!',
        description: 'Your project inquiry has been sent successfully. We will get back to you soon!',
      });

      setCurrentStep(1);
      setSelectedService(null);
      setSelectedBudget(null);
      setFormData({ name: '', email: '', details: '' });
      onSubmitSuccess?.();
    } catch (error: any) {
      console.error('Error submitting order:', error);
      toast({
        title: 'Error',
        description: 'Failed to send your inquiry. Please try again or contact us via WhatsApp.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, isEntering: boolean) => {
    gsap.to(e.currentTarget, {
      scale: isEntering ? 1.02 : 1,
      boxShadow: isEntering
        ? '0 0 30px hsl(var(--crimson) / 0.2)'
        : '0 0 0px transparent',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const canProceed = () => {
    if (currentStep === 1) return !!selectedService;
    if (currentStep === 2) return !!selectedBudget;
    if (currentStep === 3) return formData.name && formData.email;
    return false;
  };

  return (
    <div
      className="order-engine-card rounded-2xl p-6 md:p-10"
      style={{
        background: 'hsl(var(--surface))',
        border: '1px solid hsl(var(--crimson) / 0.1)',
      }}
    >
      {/* Stepper */}
      <div className="flex items-center justify-center gap-4 mb-10">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300 ${
                step <= currentStep
                  ? 'bg-crimson text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step < currentStep ? <Check size={18} /> : step}
            </div>
            {step < 3 && (
              <div
                className={`w-16 md:w-24 h-0.5 mx-2 transition-colors duration-300 ${
                  step < currentStep ? 'bg-crimson' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div ref={stepContentRef} className="min-h-[280px]">
        {/* Step 1: Services */}
        {currentStep === 1 && (
          <div>
            <h3 className="text-xl font-display font-semibold text-foreground mb-6 text-center">
              What are you building?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                  className={`cursor-pointer p-6 rounded-xl text-center transition-all duration-300 will-change-transform ${
                    selectedService === service.id
                      ? 'border-crimson bg-crimson/10 shadow-[inset_0_0_20px_hsl(var(--crimson)/0.1)]'
                      : 'border-border bg-background hover:border-crimson/50'
                  }`}
                  style={{ border: '1px solid' }}
                >
                  <div
                    className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 transition-colors ${
                      selectedService === service.id ? 'bg-crimson/20' : 'bg-muted'
                    }`}
                  >
                    <service.icon
                      className={`w-6 h-6 ${
                        selectedService === service.id ? 'text-crimson' : 'text-muted-foreground'
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <p
                    className={`text-sm font-medium ${
                      selectedService === service.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {service.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Budget */}
        {currentStep === 2 && (
          <div>
            <h3 className="text-xl font-display font-semibold text-foreground mb-6 text-center">
              What's your budget range?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {budgets.map((budget) => (
                <div
                  key={budget.id}
                  onClick={() => setSelectedBudget(budget.id)}
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                  className={`cursor-pointer p-5 rounded-xl text-center transition-all duration-300 will-change-transform ${
                    selectedBudget === budget.id
                      ? 'border-crimson bg-crimson/10 shadow-[inset_0_0_20px_hsl(var(--crimson)/0.1)]'
                      : 'border-border bg-background hover:border-crimson/50'
                  }`}
                  style={{ border: '1px solid' }}
                >
                  <p
                    className={`text-lg font-semibold ${
                      selectedBudget === budget.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {budget.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {currentStep === 3 && (
          <div>
            <h3 className="text-xl font-display font-semibold text-foreground mb-6 text-center">
              Tell us about your project
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson text-foreground transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson text-foreground transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Project Details</label>
                <textarea
                  value={formData.details}
                  onChange={(e) => setFormData((prev) => ({ ...prev, details: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson text-foreground transition-colors resize-none"
                  placeholder="Describe your vision, goals, and any specific requirements..."
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <button
          onClick={handlePrev}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            currentStep > 1
              ? 'text-muted-foreground hover:text-foreground'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          Back
        </button>

        {currentStep < 3 ? (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`btn-primary flex items-center gap-2 ${
              !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Continue
            <ArrowRight size={18} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canProceed() || isSubmitting}
            className={`btn-primary flex items-center gap-2 ${
              !canProceed() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
            <ArrowRight size={18} />
          </button>
        )}
      </div>

      {/* WhatsApp Alternative */}
      <div className="text-center mt-6">
        <a
          href="https://wa.me/6285169954034"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-crimson transition-colors"
        >
          <MessageCircle size={16} />
          Or chat directly via WhatsApp
        </a>
      </div>
    </div>
  );
};

export default OrderForm;
