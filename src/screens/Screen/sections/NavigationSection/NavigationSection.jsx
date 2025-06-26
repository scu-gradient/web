import React from "react";
import { Button } from "../../../../components/ui/button";
import { Link } from "react-router-dom";

export const NavigationSection = () => {
  return (
    <header className="w-full h-20 flex items-center justify-between px-4 overflow-visible z-0">
      <div className="flex items-center">
        <span className="text-white font-semibold text-lg tracking-wide">
          Gradient - Add Logo here
        </span>
      </div>

      <nav className="flex items-center gap-4">
        <a
          href="#"
          className="font-medium text-zinc-300 text-[13.9px] leading-6"
        >
          Blog
        </a>

        <Link to="/search">
          <Button
            variant="outline"
            className="h-9 rounded-full bg-zinc-950 text-zinc-400 text-[13.9px] font-normal px-3.5 relative overflow-hidden border-[#ffffff1a] shadow-none hover:text-zinc-300"
          >
            Start networking
            <div className="absolute w-[103px] h-px bottom-0 left-[18px] bg-[linear-gradient(90deg,rgba(34,211,238,0)_0%,rgba(34,211,238,0.9)_50%,rgba(34,211,238,0)_100%)]" />
          </Button>
        </Link>
      </nav>
    </header>
  );
};
