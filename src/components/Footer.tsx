import type { Language } from "../lib/translations";
import { useTranslations } from "../lib/i18n-utils";

interface Props {
  locale: Language;
}

export default function Footer({ locale }: Props) {
  const t = useTranslations(locale);

  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <h2 className="text-2xl font-bold mb-8 text-gray-900">
          {t.footer.locationsTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Columna izquierda */}
          <div className="space-y-6">
            {/* Ubicaciones */}
            <div>
              <p className="text-gray-700 font-medium text-lg">
                {t.footer.locations}
              </p>
            </div>

            {/* Teléfono */}
            <div>
              <a
                href="tel:+525573523686"
                className="text-gray-700 hover:text-blue-600 transition-colors text-lg"
              >
                {t.footer.phone}
              </a>
            </div>

            {/* Email */}
            <div>
              <a
                href="mailto:info@segula.mx"
                className="text-gray-700 hover:text-blue-600 transition-colors text-lg underline"
              >
                {t.footer.email}
              </a>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-6">
            {/* Headquarters Mexico */}
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                {t.footer.headquartersMexico}
              </h3>
              <p className="text-gray-700">{t.footer.mexicoAddress}</p>
            </div>

            {/* Headquarters Puebla */}
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                {t.footer.headquartersPuebla}
              </h3>
              <p className="text-gray-700">{t.footer.pueblaAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
