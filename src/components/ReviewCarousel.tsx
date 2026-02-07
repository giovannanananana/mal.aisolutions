import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah Chen',
    role: 'CEO, TechVentures',
    content:
      'mal.aisolution transformed our entire workflow with their AI integration. Productivity increased by 300%.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Founder, StartupX',
    content:
      'The attention to detail and technical expertise is unmatched. They delivered beyond expectations.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'CTO, DataFlow Inc',
    content:
      'Working with mal.aisolution was a game-changer. Our automation pipeline is now fully autonomous.',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Director, InnovateCorp',
    content:
      'Professional, efficient, and incredibly talented. The best digital agency we have worked with.',
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    role: 'VP Engineering, CloudScale',
    content:
      'Their AI solutions helped us scale from 100 to 10,000 users without adding headcount.',
    rating: 5,
  },
  {
    name: 'Alex Wang',
    role: 'Product Lead, FutureTech',
    content:
      'Exceptional quality and lightning-fast delivery. mal.aisolution is our go-to partner.',
    rating: 5,
  },
];

interface ReviewCardProps {
  review: (typeof reviews)[0];
  onHoverEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
  onHoverLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ReviewCard = ({ review, onHoverEnter, onHoverLeave }: ReviewCardProps) => (
  <div
    className="review-card flex-shrink-0 w-80 surface-card p-8 will-change-transform"
    onMouseEnter={onHoverEnter}
    onMouseLeave={onHoverLeave}
  >
    {/* Stars */}
    <div className="flex gap-1 mb-4">
      {Array.from({ length: review.rating }).map((_, i) => (
        <Star key={i} size={14} className="fill-crimson text-crimson" />
      ))}
    </div>

    {/* Content */}
    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
      &ldquo;{review.content}&rdquo;
    </p>

    {/* Author */}
    <div>
      <p className="font-medium text-foreground">{review.name}</p>
      <p className="text-xs text-muted-foreground">{review.role}</p>
    </div>
  </div>
);

const ReviewCarousel = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const tween1Ref = useRef<gsap.core.Tween | null>(null);
  const tween2Ref = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const cardWidth = 320 + 24; // card width (w-80 = 320px) + gap (gap-6 = 24px)
    const totalWidth = cardWidth * reviews.length;

    const setupRow = (
      el: HTMLDivElement,
      tweenRef: React.MutableRefObject<gsap.core.Tween | null>,
      duration: number
    ) => {
      gsap.set(el, { x: 0 });
      tweenRef.current = gsap.to(el, {
        x: -totalWidth,
        duration,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });
    };

    if (row1Ref.current) setupRow(row1Ref.current, tween1Ref, 25);
    if (row2Ref.current) setupRow(row2Ref.current, tween2Ref, 35);

    return () => {
      tween1Ref.current?.kill();
      tween2Ref.current?.kill();
    };
  }, []);

  const slowAll = () => {
    [tween1Ref, tween2Ref].forEach((ref) => {
      if (ref.current)
        gsap.to(ref.current, { timeScale: 0.2, duration: 0.5, ease: 'power2.out' });
    });
  };

  const resumeAll = () => {
    [tween1Ref, tween2Ref].forEach((ref) => {
      if (ref.current)
        gsap.to(ref.current, { timeScale: 1, duration: 0.5, ease: 'power2.out' });
    });
  };

  const handleCardHoverEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      boxShadow: '0 0 40px hsl(var(--crimson) / 0.3)',
      duration: 0.4,
      ease: 'power2.out',
    });
    slowAll();
  };

  const handleCardHoverLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: '0 0 0px transparent',
      duration: 0.4,
      ease: 'power2.out',
    });
    resumeAll();
  };

  // Triple for seamless loop
  const row1Data = [...reviews, ...reviews, ...reviews];
  // Shuffle order for row 2 variety
  const row2Source = [...reviews.slice(3), ...reviews.slice(0, 3)];
  const row2Data = [...row2Source, ...row2Source, ...row2Source];

  return (
    <section id="reviews" className="py-24 overflow-hidden">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <h2 className="text-fluid-lg font-display font-bold text-foreground text-center mb-4">
          Client <span className="text-gradient">Testimonials</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto">
          Don't just take our word for it. Here's what our clients have to say.
        </p>
      </div>

      {/* Two-Row Carousel */}
      <div className="space-y-6">
        {/* Row 1 */}
        <div className="relative">
          <div
            ref={row1Ref}
            className="flex gap-6 will-change-transform"
            style={{ width: 'max-content' }}
          >
            {row1Data.map((review, index) => (
              <ReviewCard
                key={`r1-${index}`}
                review={review}
                onHoverEnter={handleCardHoverEnter}
                onHoverLeave={handleCardHoverLeave}
              />
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative">
          <div
            ref={row2Ref}
            className="flex gap-6 will-change-transform"
            style={{ width: 'max-content' }}
          >
            {row2Data.map((review, index) => (
              <ReviewCard
                key={`r2-${index}`}
                review={review}
                onHoverEnter={handleCardHoverEnter}
                onHoverLeave={handleCardHoverLeave}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;
