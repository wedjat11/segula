import { useState } from "react";
import type { Language } from "../lib/translations";
import { useTranslations } from "../lib/i18n-utils";

interface Props {
  locale: Language;
}

type AnalysisType = "structural" | "thermal" | "cfd";

export default function AnalysisSection({ locale }: Props) {
  const t = useTranslations(locale);
  const [activeAnalysis, setActiveAnalysis] = useState<AnalysisType>("structural");

  const analyses: { id: AnalysisType; icon: string }[] = [
    { id: "structural", icon: "🔧" },
    { id: "thermal", icon: "🌡️" },
    { id: "cfd", icon: "💨" },
  ];

  return (
    <section className="w-full py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Bullets de navegación */}
        <div className="flex justify-center gap-8 mb-12">
          {analyses.map((analysis) => (
            <button
              key={analysis.id}
              onClick={() => setActiveAnalysis(analysis.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
                activeAnalysis === analysis.id
                  ? "bg-blue-600 text-white shadow-lg scale-110"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              aria-label={t.analysisSimulation[analysis.id].title}
            >
              <span className="text-2xl">{analysis.icon}</span>
              <span className="font-semibold uppercase text-sm hidden md:inline">
                {t.analysisSimulation[analysis.id].title}
              </span>
            </button>
          ))}
        </div>

        {/* Cards de análisis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analyses.map((analysis) => {
            const isActive = activeAnalysis === analysis.id;
            const analysisData = t.analysisSimulation[analysis.id];

            return (
              <div
                key={analysis.id}
                className={`rounded-lg p-8 transition-all duration-500 ${
                  isActive
                    ? "bg-white text-gray-900 shadow-2xl scale-105"
                    : "bg-gray-900 text-white opacity-50"
                }`}
              >
                {/* Ícono */}
                <div className="text-6xl mb-6 text-center">
                  {analysis.icon}
                </div>

                {/* Título */}
                <h3
                  className={`text-xl font-bold mb-4 text-center ${
                    isActive ? "text-blue-600" : "text-white"
                  }`}
                >
                  {analysisData.title}
                </h3>

                {/* Descripción */}
                <p
                  className={`text-sm leading-relaxed ${
                    isActive ? "text-gray-700" : "text-gray-400"
                  }`}
                >
                  {analysisData.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
