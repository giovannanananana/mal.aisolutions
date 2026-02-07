import { useEffect, useState } from 'react';
import { X, Zap } from 'lucide-react';
import { useOrder } from './OrderContext';

const AwarenessPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { openOrder } = useOrder();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-24 md:bottom-8 right-4 md:right-8 z-40 transition-all duration-500 ${
        isDismissed ? 'translate-x-[400px] opacity-0' : 'animate-slide-in-right'
      }`}
    >
      <div className="relative glass rounded-2xl p-4 pr-12 max-w-sm border border-crimson/20">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-crimson/20 to-maroon/20 -z-10 blur-xl" />
        
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl bg-crimson/10 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-crimson" />
          </div>

          <div>
            {/* Status */}
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-crimson rounded-full pulse-dot" />
              <span className="text-xs text-crimson font-medium">System Status: Online</span>
            </div>

            {/* Message */}
            <p className="text-sm text-foreground font-medium mb-1">
              Ready to build something amazing?
            </p>
            <p className="text-xs text-muted-foreground">
              Get a free consultation for your next project.
            </p>

            {/* CTA */}
            <button
              onClick={openOrder}
              className="inline-block mt-3 text-xs text-crimson font-medium hover:underline"
            >
              Start a Project →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwarenessPopup;
