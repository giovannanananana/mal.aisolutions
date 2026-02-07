import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OrderForm from './OrderForm';

gsap.registerPlugin(ScrollTrigger);

const OrderEngine = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !formRef.current) return;

    gsap.fromTo(
      formRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="order" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-fluid-lg font-display font-bold text-foreground mb-4">
            Start Your <span className="text-gradient">Project</span>
          </h2>
          <p className="text-muted-foreground">
            Tell us about your vision and let's build something amazing together.
          </p>
        </div>

        {/* Order Form */}
        <div ref={formRef}>
          <OrderForm />
        </div>
      </div>
    </section>
  );
};

export default OrderEngine;
