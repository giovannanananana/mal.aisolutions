import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Zap, Brain, Globe, Smartphone, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Custom AI solutions tailored to automate and enhance your business operations.',
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'High-performance websites built with modern technologies and best practices.',
  },
  {
    icon: Zap,
    title: 'Automation',
    description: 'Streamline workflows with intelligent automation that saves time and resources.',
  },
  {
    icon: Globe,
    title: 'Digital Strategy',
    description: 'Comprehensive digital roadmaps to position your brand for success.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Solutions',
    description: 'Native and cross-platform apps that deliver exceptional user experiences.',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Data-driven insights to optimize performance and drive growth.',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.service-card');

    gsap.fromTo(
      cards,
      { y: 60, opacity: 0, skewY: 2 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-fluid-lg font-display font-bold text-foreground mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            End-to-end digital solutions designed to elevate your business to new heights.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card surface-card p-8 glow-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-crimson/10 flex items-center justify-center mb-6">
                <service.icon className="w-6 h-6 text-crimson" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
