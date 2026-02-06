import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const phrases = [
  'Create Your Own Website.',
  'Architecting AI Solutions.',
  'Automating Future Growth.',
];

const Hero = () => {
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const typeSpeed = isDeleting ? 30 : 70;
    const phrase = phrases[phraseIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < phrase.length) {
          setCurrentPhrase(phrase.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setCurrentPhrase(phrase.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex]);

  useEffect(() => {
    if (!contentRef.current) return;

    const elements = contentRef.current.querySelectorAll('.reveal-item');
    
    gsap.fromTo(
      elements,
      { y: 60, opacity: 0, skewY: 2 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      }
    );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-32"
    >
      <div ref={contentRef} className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="reveal-item inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-crimson rounded-full pulse-dot" />
          <span className="text-sm text-muted-foreground">AI-Powered Solutions</span>
        </div>

        {/* Heading */}
        <h1 className="reveal-item text-fluid-xl font-display font-bold text-foreground mb-6">
          <span className="block">{currentPhrase}</span>
          <span className="inline-block w-[3px] h-[1em] bg-crimson ml-1 animate-pulse" />
        </h1>

        {/* Subheading */}
        <p className="reveal-item text-fluid-md text-muted-foreground max-w-2xl mx-auto mb-10">
          We architect intelligent digital solutions that transform businesses. 
          From automation to custom AI integrations, we build the future.
        </p>

        {/* CTA Buttons */}
        <div className="reveal-item flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:mal.aisolution@gmail.com" className="btn-primary flex items-center gap-2">
            Start Your Project
            <ArrowRight size={18} />
          </a>
          <a href="#services" className="btn-secondary">
            Explore Services
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="reveal-item absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-crimson rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
