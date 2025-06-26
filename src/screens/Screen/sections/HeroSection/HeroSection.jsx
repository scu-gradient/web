import React, { useRef } from "react";
import { Button } from "../../../../components/ui/button";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const meetGradientRef = useRef(null);

  const handleScrollToMeetGradient = () => {
    if (meetGradientRef.current) {
      meetGradientRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero Section with fixed gradient */}
      <section className="relative w-full flex justify-center items-center bg-[#09090B] py-32 md:py-48">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(circle at top, rgba(94, 176, 239, 0.2) 10%, rgba(0, 0, 0, 0) 70%)",
            }}
          />
        </div>

        <div className="container flex flex-col items-center text-center max-w-4xl relative z-10 px-4">
          <div className="space-y-8">
            {/* Headline */}
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-center leading-none overflow-visible">
              <div className="block text-transparent bg-clip-text bg-gradient-to-br from-white to-[#71717A] pb-3">
                Unleash the power of
              </div>
              <div className="block text-transparent bg-clip-text bg-gradient-to-br from-[#22D3EE] to-[#006ADC] pb-3">
                <span>
                  <Typewriter
                    words={[
                      "intelligent networking",
                      "collaborative growth",
                      "career connections",
                      "smart outreach",
                    ]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={60}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </span>
              </div>
            </h1>

            {/* Subheading */}
            <div className="space-y-2 text-xl text-zinc-400 font-medium max-w-3xl mx-auto">
              <p>
                Say goodbye to scattered LinkedIn searches. Every SCU student,
                regardless of their career stage, can now build strategic
                connections like a pro.
              </p>
              <p>Smart. Targeted. And never overwhelming.</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center space-y-4 pt-8">
              <Link to="/search">
                <Button
                  variant="outline"
                  className="rounded-full bg-zinc-950 text-zinc-400 border-zinc-800 hover:bg-zinc-900 hover:text-zinc-300 relative"
                >
                  <span>Start networking</span>
                  <div className="absolute w-[102px] h-px -bottom-px left-1/2 transform -translate-x-1/2 bg-[linear-gradient(90deg,rgba(34,211,238,0)_0%,rgba(34,211,238,0.9)_50%,rgba(34,211,238,0)_100%)]" />
                </Button>
              </Link>

              {/* Learn More scroll button */}
              <div
                className="flex items-center text-zinc-400 opacity-80 cursor-pointer"
                onClick={handleScrollToMeetGradient}
              >
                <span className="text-sm mr-2">Learn more</span>
                <img
                  className="w-[18px] h-[18px]"
                  alt="Icon"
                  src="https://c.animaapp.com/mc3m12bbxqG28P/img/icon-1.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Who said networking..." Section */}
      <section
        ref={meetGradientRef}
        className="w-full bg-zinc-950 py-24 px-8"
      >
        <div className="container mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
          {/* Left column */}
          <div className="flex flex-col md:w-1/2 space-y-8">
            <h2 className="font-bold text-4xl md:text-5xl tracking-tight leading-tight mb-20">
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white to-[#71717A] pb-3">
                Who said networking
                <br />
                had to be boring?
              </span>
            </h2>

            <h2 className="font-bold text-[48px] tracking-[-1.2px] leading-[51.4px] text-white">
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white to-[#71717A] pb-3">
                Meet Gradient
              </span>
            </h2>

            <p className="text-[18px] leading-7 text-[#a1a1aacc]">
              Our AI-powered platform is built to surface the right people,
              reveal hidden paths of connection, and highlight where your goals
              align. It's time to{" "}
              <span className="text-white">network with context</span> and help
              move your future forward.
            </p>
          </div>

          {/* Right column */}
          <div className="md:w-1/2">
            <p className="text-lg leading-7 text-[#a1a1aacc]">
              With Gradient, making meaningful connections is effortless,
              empowering, and anything but awkward. Our platform brings clarity
              to your network, helps you find the right people at the right
              time, and transforms cold outreach into confident introductions.{" "}
              <span className="text-white">
                Say no to awkward DMs and endless LinkedIn rabbit holes.
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
