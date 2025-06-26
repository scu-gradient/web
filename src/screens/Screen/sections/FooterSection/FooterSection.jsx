import React from "react";
import { Button } from "../../../../components/ui/button";
import { Link } from "react-router-dom";

export const FooterSection = () => {
  return (
    <footer className="relative w-full py-16">
      {/* Gradient effects */}
      <div className="absolute top-[-100px] inset-0 overflow-visible">
        <div className="w-full h-[513px] bg-[#ffffff01] overflow-hidden blur-[192px]">
          <div className="relative w-[1108px] h-[632px] mx-8 bg-[linear-gradient(90deg,rgba(6,182,212,1)_0%,rgba(30,64,175,1)_100%)] opacity-20" />
        </div>
        <div className="absolute w-[500px] h-px top-[102px] left-1/2 -translate-x-1/2 bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(2,132,199,0.65)_50%,rgba(0,0,0,0)_100%)]" />
        <div className="absolute w-[600px] h-[200px] top-0 left-1/2 -translate-x-1/2 [background:radial-gradient(50%_50%_at_50%_50%,rgba(199,199,199,0.05)_0%,rgba(0,0,0,0)_70%)]" />
      </div>

      {/* Main content */}
      <div className="relative w-full max-w-[1361px] mx-auto px-8">
        <div className="flex flex-col items-center text-center mb-16">
          {/* Headings */}
          <div className="w-full max-w-[576px] mb-6">
            <h2 className="[font-family:'Inter',Helvetica] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 text-[31.9px] tracking-[-0.80px] leading-10">
              Build your future,
            </h2>
            <h2 className="[font-family:'Inter',Helvetica] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 text-[31.9px] tracking-[-0.80px] leading-10">
              one connection at a time.
            </h2>
          </div>

          {/* Subheading */}
          <p className="[font-family:'Inter',Helvetica] font-normal text-[#a1a1aacc] text-[17.9px] tracking-[0] leading-7 max-w-[576px] mb-10">
            The first networking tool you'll actually love. And the last one
            you'll ever need.
          </p>

          {/* Button */}
          <div className="relative">
            <div className="absolute w-[102px] h-px bottom-0 left-1/2 -translate-x-1/2 bg-[linear-gradient(90deg,rgba(34,211,238,0)_0%,rgba(34,211,238,0.9)_50%,rgba(34,211,238,0)_100%)]" />
            <Link to="/search">
              <Button
                variant="outline"
                className="rounded-full h-9 px-3 bg-zinc-950 text-zinc-400 text-[13.9px] [font-family:'Inter',Helvetica] font-normal border-[#ffffff1a] shadow-[0px_0px_0px_#ffffff,0px_0px_0px_1px_#ffffff1a,0px_0px_0px_transparent]"
              >
                Start Networking
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer bar */}
        <div className="w-full pt-4 border-t border-[#ffffff1a]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="[font-family:'Inter',Helvetica] font-medium text-zinc-400 text-[12.9px] tracking-[0] leading-5">
                © 2025 Gradient Inc.
              </span>
              <span className="[font-family:'Inter',Helvetica] font-medium text-zinc-400 text-[12.9px] tracking-[0] leading-5">
                Privacy Policy
              </span>
              <span className="[font-family:'Inter',Helvetica] font-medium text-zinc-400 text-[12.9px] tracking-[0] leading-5">
                Terms of Use
              </span>
            </div>

            <div className="flex items-center gap-4">
              <img
                className="w-4 h-4"
                alt="Social Icon"
                src="https://c.animaapp.com/mc3m12bbxqG28P/img/icon.svg"
              />
              <img
                className="w-5 h-5"
                alt="Social Icon"
                src="https://c.animaapp.com/mc3m12bbxqG28P/img/icon-2.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
