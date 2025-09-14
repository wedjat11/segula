import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { imageSections } from "@/lib/mapImages";

export type SectionKey = keyof typeof imageSections;

interface Props {
  section?: SectionKey;
  lang?: "es" | "en" | "fr";
  className?: string;
}

export default function MainImageContainer({
  section = Object.keys(imageSections)[0] as SectionKey,
  lang = "es",
  className,
}: Props) {
  const [selected, setSelected] = useState<SectionKey>(section);

  const data = useMemo(() => imageSections[selected], [selected]);

  const imgSrc = data?.image ?? "";
  const imgAlt = selected;
  const text = data?.[lang] ?? "";

  return (
    <section className={clsx("relative w-screen md:max-h-[650px]", className)}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent z-10"></div>
      <div className="w-full h-[300px] md:h-[65vh] overflow-hidden">
        <img src={imgSrc} alt={imgAlt} className="w-full h-full object-cover" />
      </div>

      {text && (
        <p className="w-full  md:w-1/2 text-center px-3 md:p-0 absolute text-xs z-20 bottom-4 left-1/2 -translate-x-1/2 text-white md:text-xl font-light md:font-normal ">
          {text}
        </p>
      )}
    </section>
  );
}
