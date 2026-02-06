import { useRef, useState } from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah Chen',
    role: 'CEO, TechVentures',
    content: 'mal.aisolution transformed our entire workflow with their AI integration. Productivity increased by 300%.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Founder, StartupX',
    content: 'The attention to detail and technical expertise is unmatched. They delivered beyond expectations.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'CTO, DataFlow Inc',
    content: 'Working with mal.aisolution was a game-changer. Our automation pipeline is now fully autonomous.',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Director, InnovateCorp',
    content: 'Professional, efficient, and incredibly talented. The best digital agency we have worked with.',
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    role: 'VP Engineering, CloudScale',
    content: 'Their AI solutions helped us scale from 100 to 10,000 users without adding headcount.',
    rating: 5,
  },
  {
    name: 'Alex Wang',
    role: 'Product Lead, FutureTech',
    content: 'Exceptional quality and lightning-fast delivery. mal.aisolution is our go-to partner.',
    rating: 5,
  },
];

const ReviewCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="reviews" className="py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <h2 className="text-fluid-lg font-display font-bold text-foreground text-center mb-4">
          Client <span className="text-gradient">Testimonials</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto">
          Don't just take our word for it. Here's what our clients have to say.
        </p>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={trackRef}
          className="flex gap-6 carousel-track"
          style={{
            animation: `marquee ${isHovered ? '150s' : '30s'} linear infinite`,
            width: 'max-content',
          }}
        >
          {/* Double the reviews for seamless loop */}
          {[...reviews, ...reviews].map((review, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-80 surface-card p-8 transition-all duration-500 ${
                isHovered ? 'glow-hover' : ''
              }`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-crimson text-crimson" />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                "{review.content}"
              </p>

              {/* Author */}
              <div>
                <p className="font-medium text-foreground">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;
