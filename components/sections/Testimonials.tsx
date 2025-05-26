import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const testimonials = [
  {
    name: "Peter Griffin",
    role: "Amateur Trader",
    image:
      "https://assets.foxdcg.com/dpp-uploaded/images/credits/270765094675/family_guy_seth_macfarlane_2x.jpg?fit=inside%7C*:27",
    quote:
      "Holy crap, this simulator is better than my day job at the brewery! I've lost less money here than I did on my 'genius' investment in the Pawtucket Brewery. At least here, the losses are fake!",
  },
  {
    name: "Glenn Quagmire",
    role: "Day Trader",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6UILTHR4fNFYkiu4DyIhR3BzU_GT63vboSQ&s",
    quote:
      "Giggity! This platform is smoother than my pickup lines. The real-time data is so accurate, it's like having a crystal ball! Though I still can't predict why women keep rejecting me...",
  },
  {
    name: "Stewie Griffin",
    role: "Technical Analyst",
    image:
      "https://oyster.ignimgs.com/mediawiki/apis.ign.com/family-guy/7/7e/Laser.jpg",
    quote:
      "Blast! This trading platform is almost as brilliant as my time machine. The technical indicators are simply marvelous, you bloody fools! Though I must say, the market is still less predictable than Brian's love life.",
  },
  {
    name: "Brian Griffin",
    role: "Value Investor",
    image:
      "https://i.cbc.ca/1.2439270.1385396617!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/family-guy-brian-from-fox.jpg",
    quote:
      "As a writer and intellectual, I appreciate the sophisticated analysis tools. It's like having a financial advisor who actually understands Proust. Unlike Peter, who thinks Proust is a type of cheese.",
  },
  {
    name: "Chris Griffin",
    role: "Crypto Enthusiast",
    image:
      "https://m.media-amazon.com/images/M/MV5BYWMxZTJiYjItZmY4Mi00Y2Q4LWI1MzAtZmVhZDI3N2Y4MDkxXkEyXkFqcGc@._V1_.jpg",
    quote:
      "Dude, this is totally sweet! I can trade crypto while I'm not playing video games. It's like, the best thing ever! Though I still can't figure out why my dad thinks Bitcoin is a type of cryptocurrency...",
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [isHovered, setIsHovered] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      if (!isHovered) {
        emblaApi.scrollNext();
      }
    }, 3000);

    return () => clearInterval(autoplay);
  }, [emblaApi, isHovered]);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              What Our Traders Say
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don&apos;t just take our word for it - hear from our community of
              traders
            </p>
          </div>
        </div>
        <div
          className="relative max-w-5xl mx-auto mt-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] p-4"
                >
                  <div className="group flex flex-col items-center space-y-4 rounded-lg border p-6 bg-card transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 hover:bg-primary/5 h-full">
                    <div className="relative h-32 w-32">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="rounded-full object-cover w-full h-full"
                      />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold transition-colors duration-300 group-hover:text-primary">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                      <p className="text-sm text-muted-foreground italic">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background rounded-full p-2 shadow-lg hover:bg-primary/10 transition-colors"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background rounded-full p-2 shadow-lg hover:bg-primary/10 transition-colors"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
