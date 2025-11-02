import { useState } from "react";
import type { Language } from "../lib/translations";
import { useTranslations } from "../lib/translations";
import ImageSection from "../assets/text-analysis.png";

interface Props {
  locale: Language;
}

type AnalysisType = "structural" | "thermal" | "cfd";

export default function AnalysisSection({ locale }: Props) {
  const t = useTranslations(locale);
  const [activeAnalysis, setActiveAnalysis] =
    useState<AnalysisType>("structural");

  const analyses: { id: AnalysisType; icon: string }[] = [
    { id: "structural", icon: "🔧" },
    { id: "thermal", icon: "🌡️" },
    { id: "cfd", icon: "💨" },
  ];

  const analysisContent = {
    structural: {
      title: t.analysisSimulation.structural.title,
      description: t.analysisSimulation.structural.description,
    },
    thermal: {
      title: t.analysisSimulation.thermal.title,
      description: t.analysisSimulation.thermal.description,
    },
    cfd: {
      title: t.analysisSimulation.cfd.title,
      description: t.analysisSimulation.cfd.description,
    },
  };

  return (
    <section className="w-full py-16 px-6" id="about">
      <div className="flex gap-8 w-11/12 mx-auto">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6">
            {t.sectionTitles.analysisSimulation.title}
          </h2>
          <p className="text-lg mb-8">
            {locale === "en" &&
              "We provide professional Finite Element Analysis (CAE - CFD) and Engineering consulting services. Using the power of engineering tools we are able to participate in your design projects effectively. We help solve all types of mechanical engineering and structure engineering analysis problems."}
            {locale === "es" &&
              "Proporcionamos servicios profesionales de Análisis de Elementos Finitos (CAE - CFD) y consultoría de Ingeniería. Utilizando el poder de las herramientas de ingeniería, podemos participar en sus proyectos de diseño de manera efectiva. Ayudamos a resolver todo tipo de problemas de análisis de ingeniería mecánica y estructural."}
            {locale === "fr" &&
              "Nous fournissons des services professionnels d'Analyse par Éléments Finis (CAE - CFD) et de conseil en Ingénierie. En utilisant la puissance des outils d'ingénierie, nous sommes en mesure de participer efficacement à vos projets de conception. Nous aidons à résoudre tous les types de problèmes d'analyse d'ingénierie mécanique et structurelle."}
          </p>
        </div>

        <div className="flex-1">
          <img
            src={ImageSection.src}
            alt="Analysis and Simulation"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
