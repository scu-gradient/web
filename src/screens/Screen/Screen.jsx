import React from "react";
import { CardSection } from "./sections/CardSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { NavigationSection } from "./sections/NavigationSection";

export const Screen = () => {
  return (
    <div className="bg-zinc-950 flex flex-col w-full relative overflow-visible">

      <div className="z-0">
      <NavigationSection />
      <HeroSection />
      <CardSection />
      <FooterSection />
      </div>
    </div>
  );
};

export default Screen;