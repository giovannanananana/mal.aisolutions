import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Instagram, MessageCircle, Linkedin, Github, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mal.aisolution@gmail.com',
    href: 'mailto:mal.aisolution@gmail.com',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@mallgiovannaa',
    href: 'https://instagram.com/mallgiovannaa',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+62 851-6995-4034',
    href: 'https://wa.me/6285169954034',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Aulia Malik Cahyadi',
    href: 'https://linkedin.com/in/aulia-malik-cahyadi',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'giovannanananana',
    href: 'https://github.com/giovannanananana',
  },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.contact-card');

    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-fluid-lg font-display font-bold text-foreground mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ready to start your next project? Reach out through any of these channels.
          </p>
        </div>

        {/* Contact Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contactLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card group surface-card p-6 glow-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-crimson/10 flex items-center justify-center">
                  <link.icon className="w-5 h-5 text-crimson" />
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-muted-foreground group-hover:text-crimson transition-colors"
                />
              </div>
              <h3 className="font-medium text-foreground mb-1">{link.label}</h3>
              <p className="text-sm text-muted-foreground">{link.value}</p>
            </a>
          ))}
        </div>

        {/* Main CTA */}
        <div className="text-center mt-16">
          <a href="mailto:mal.aisolution@gmail.com" className="btn-primary inline-flex items-center gap-2">
            Start a Conversation
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
