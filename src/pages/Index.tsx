import { useEffect } from 'react';
import Lenis from 'lenis';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import MobileNav from '@/components/MobileNav';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Stats from '@/components/Stats';
import ReviewCarousel from '@/components/ReviewCarousel';
import Contact from '@/components/Contact';
import OrderEngine from '@/components/OrderEngine';
import Footer from '@/components/Footer';
import AwarenessPopup from '@/components/AwarenessPopup';
import { OrderProvider } from '@/components/OrderContext';
import OrderDialog from '@/components/OrderDialog';

const Index = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <OrderProvider>
      <div className="relative min-h-screen">
        {/* Background with Parallax */}
        <Background />

        {/* Navigation */}
        <Navbar />
        <MobileNav />

        {/* Main Content */}
        <main>
          <Hero />
          <Services />
          <Stats />
          <ReviewCarousel />
          <OrderEngine />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Awareness Popup */}
        <AwarenessPopup />

        {/* Order Dialog */}
        <OrderDialog />
      </div>
    </OrderProvider>
  );
};

export default Index;
