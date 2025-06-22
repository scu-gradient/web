import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const CardSection = () => {
  // Card data for mapping
  const cards = [
    {
      id: 1,
      title: "EDIT ME TO SMTH ELSE",
      description: "EDIT ME",
      image: null,
    },
    {
      id: 2,
      title: "EDIT ME TO SMTH ELSE",
      description: "EDIT ME",
      image:
        "https://c.animaapp.com/mc3m12bbxqG28P/img/div--absolute---mask-group-.png",
    },
  ];

  return (
    <section className="flex flex-col w-full max-w-[1280px] mx-auto pt-0 pb-24 px-8 gap-16 overflow-visible z-0">


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {cards.map((card) => (
          <Card
            key={card.id}
            className="bg-[#18181b80] rounded-2xl overflow-hidden border border-[#f4f4f51a] shadow-none w-full h-[480px]"
          >
            <div className="h-[366px] w-full">
              {card.image && (
                <img
                  className="w-full h-full object-cover"
                  alt="Feature illustration"
                  src={card.image}
                />
              )}
            </div>
            <CardContent className="flex flex-col gap-4 p-8">
              <h3 className="font-medium text-zinc-200 text-[18px] leading-[18px]">
                {card.title}
              </h3>
              <p className="text-[#a1a1aacc] text-[14px] leading-6">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
