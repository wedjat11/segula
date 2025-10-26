import { useState } from "react";
import type { Language } from "../lib/translations";
import { useTranslations } from "../lib/translations";
import ImgStress from "../assets/stress.png";
import ImgNvh from "../assets/nvh.png";
import ImgThermal from "../assets/thermal.png";
import ImgCrash from "../assets/crash.png";
import ImgCfd from "../assets/cfd.png";
import ImgOptimization from "../assets/optimization.png";

interface Props {
  locale: Language;
}

const SelectibleBullet = ({
  label,
  section,
  activeCard,
  setActiveCard,
}: {
  label: string;
  section: number;
  activeCard: number;
  setActiveCard: (section: number) => void;
}) => {
  return (
    <div
      onClick={() => setActiveCard(section)}
      className={`rounded-full flex items-center justify-center px-4 sm:px-6 md:px-9 text-sm sm:text-lg md:text-2xl font-semibold h-[45px] sm:h-[54px] md:h-[62px] min-w-[100px] sm:min-w-[130px] md:min-w-[150px] cursor-pointer transition-all duration-300 ${
        activeCard === section
          ? "bg-primary text-white"
          : "bg-gray-300 text-gray-700 hover:bg-gray-400"
      }`}
    >
      {label}
    </div>
  );
};

const ShowedCard = ({
  title,
  text,
  image,
}: {
  title: string;
  text: string;
  image: any;
}) => {
  return (
    <div className="bg-primary mt-[150px] sm:mt-[200px] md:mt-[250px] rounded-[30px] sm:rounded-[45px] md:rounded-[60px] w-full relative p-6 sm:p-8 md:p-12 pt-24 sm:pt-32 md:pt-40">
      {/* Imagen posicionada absolute - mitad fuera del contenedor */}
      <img
        src={image.src}
        alt={title}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[85%] md:w-full max-w-xs sm:max-w-md md:max-w-lg h-auto object-contain"
      />

      {/* Contenido de texto */}
      <div className="text-white">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 text-left">
          {title}
        </h3>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-justify">
          {text}
        </p>
      </div>
    </div>
  );
};

export default function AnalysisCardsComponent({ locale }: Props) {
  const [activeCard, setActiveCard] = useState(0);
  const t = useTranslations(locale);

  const sections = [
    {
      label: t.analysisCards.stress.label,
      text: t.analysisCards.stress.text,
      image: ImgStress,
      section: 0,
    },
    {
      label: t.analysisCards.nvh.label,
      text: t.analysisCards.nvh.text,
      image: ImgNvh,
      section: 1,
    },
    {
      label: t.analysisCards.thermal.label,
      text: t.analysisCards.thermal.text,
      image: ImgThermal,
      section: 2,
    },
    {
      label: t.analysisCards.crash.label,
      text: t.analysisCards.crash.text,
      image: ImgCrash,
      section: 3,
    },
    {
      label: t.analysisCards.cfd.label,
      text: t.analysisCards.cfd.text,
      image: ImgCfd,
      section: 4,
    },
    {
      label: t.analysisCards.optimization.label,
      text: t.analysisCards.optimization.text,
      image: ImgOptimization,
      section: 5,
    },
  ];

  return (
    <section className="flex flex-col gap-4 sm:gap-6 md:gap-8 w-11/12 mx-auto my-4 sm:my-6 md:my-8">
      {/* Bullets de selección */}
      <div className="flex w-full justify-center sm:justify-evenly flex-wrap gap-2 sm:gap-3 md:gap-4">
        {sections.map((section, index) => (
          <SelectibleBullet
            label={section.label}
            section={section.section}
            activeCard={activeCard}
            setActiveCard={setActiveCard}
            key={index}
          />
        ))}
      </div>

      {/* Card mostrada */}
      <ShowedCard
        title={sections[activeCard].label}
        text={sections[activeCard].text}
        image={sections[activeCard].image}
      />
    </section>
  );
}
