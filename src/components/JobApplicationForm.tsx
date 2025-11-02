// src/components/JobApplicationForm.tsx
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useTranslations } from "../lib/i18n-utils";
import type { Language } from "../lib/translations";

import { FormInput } from "./form/FormInput";
import { FormSelect } from "./form/FormSelect";
import { FileUpload } from "./form/FileUpload";
import { FormMessage } from "./form/FormMessage";
import HeroSection from "./form/HeroSection";

// Tipos para el formulario
interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  sector: string;
  curriculum: File | null;
}

interface FormErrors {
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  sector?: string;
  curriculum?: string;
}

interface JobApplicationFormProps {
  locale: Language;
  className?: string;
}

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyr_p36taZGFIRe_uW4t_-Wd0BVyD58UTxsL--7Yt22vXCxMDuzUqc2W7wWyCqPLGJh/exec";

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  locale,
  className = "",
}) => {
  const t = useTranslations(locale);

  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    sector: "",
    curriculum: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Sectores disponibles
  const sectors = [
    { value: "tecnologia", label: t.form.sectors.tecnologia },
    { value: "ingenieria", label: t.form.sectors.ingenieria },
    { value: "manufactura", label: t.form.sectors.manufactura },
    { value: "automotriz", label: t.form.sectors.automotriz },
    { value: "aeroespacial", label: t.form.sectors.aeroespacial },
    { value: "energia", label: t.form.sectors.energia },
    { value: "telecomunicaciones", label: t.form.sectors.telecomunicaciones },
    { value: "otro", label: t.form.sectors.otro },
  ];

  // Limpiar mensajes cuando cambie el idioma
  useEffect(() => {
    setSubmitStatus("idle");
  }, [locale]);

  // Verificar si todos los campos están completos
  const isFormComplete = (): boolean => {
    return (
      formData.nombre.trim().length > 0 &&
      formData.apellido.trim().length > 0 &&
      formData.email.trim().length > 0 &&
      formData.telefono.trim().length > 0 &&
      formData.sector.length > 0 &&
      formData.curriculum !== null
    );
  };

  // Validaciones
  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    return /^[\+]?[0-9\s\-\(\)]{10,}$/.test(phone);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = t.validation.required.nombre;
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = t.validation.minLength.nombre;
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = t.validation.required.apellido;
    } else if (formData.apellido.trim().length < 2) {
      newErrors.apellido = t.validation.minLength.apellido;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.validation.required.email;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.validation.invalid.email;
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = t.validation.required.telefono;
    } else if (!validatePhone(formData.telefono)) {
      newErrors.telefono = t.validation.invalid.telefono;
    }

    if (!formData.sector) {
      newErrors.sector = t.validation.required.sector;
    }

    if (!formData.curriculum) {
      newErrors.curriculum = t.validation.required.curriculum;
    } else {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(formData.curriculum.type)) {
        newErrors.curriculum = t.validation.invalid.fileType;
      } else if (formData.curriculum.size > maxSize) {
        newErrors.curriculum = t.validation.invalid.fileSize;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios
  const updateField = (field: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Convertir archivo a base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  // Enviar formulario
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const curriculumBase64 = formData.curriculum
        ? await fileToBase64(formData.curriculum)
        : "";

      const submitData = {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim(),
        sector: formData.sector,
        curriculum: curriculumBase64,
        fileName: formData.curriculum?.name || "",
        timestamp: new Date().toISOString(),
        language: locale,
        formType: "job_application",
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (response.type === "opaque") {
        setSubmitStatus("success");
        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          sector: "",
          curriculum: null,
        });
      } else {
        throw new Error("Error en el envío");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className={`min-h-screen bg-primary flex items-center justify-center p-6 lg:p-8 ${className}`}
      aria-labelledby="form-title"
    >
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Columna izquierda - Hero */}
        <HeroSection locale={locale} />

        {/* Columna derecha - Formulario */}
        <div className="w-full max-w-md mx-auto lg:max-w-lg">
          {/* Mensajes de estado */}
          {submitStatus === "success" && (
            <FormMessage type="success" message={t.messages.success} />
          )}
          {submitStatus === "error" && (
            <FormMessage type="error" message={t.messages.error} />
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5 lg:space-y-6"
            noValidate
          >
            {/* Nombre y Apellido */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                type="text"
                placeholder={t.form.placeholders.nombre}
                value={formData.nombre}
                onChange={(value) => updateField("nombre", value)}
                error={errors.nombre}
                disabled={isSubmitting}
              />
              <FormInput
                type="text"
                placeholder={t.form.placeholders.apellido}
                value={formData.apellido}
                onChange={(value) => updateField("apellido", value)}
                error={errors.apellido}
                disabled={isSubmitting}
              />
            </div>

            {/* Email */}
            <FormInput
              type="email"
              placeholder={t.form.placeholders.email}
              value={formData.email}
              onChange={(value) => updateField("email", value)}
              error={errors.email}
              disabled={isSubmitting}
            />

            {/* Teléfono y Sector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                type="tel"
                placeholder={t.form.placeholders.telefono}
                value={formData.telefono}
                onChange={(value) => updateField("telefono", value)}
                error={errors.telefono}
                disabled={isSubmitting}
              />
              <FormSelect
                placeholder={t.form.placeholders.sector}
                value={formData.sector}
                onChange={(value) => updateField("sector", value)}
                options={sectors}
                error={errors.sector}
                disabled={isSubmitting}
              />
            </div>

            {/* Curriculum */}
            <FileUpload
              placeholder={t.form.placeholders.curriculum}
              file={formData.curriculum}
              onChange={(file) => updateField("curriculum", file)}
              error={errors.curriculum}
              disabled={isSubmitting}
              ariaLabel={t.aria.fileUpload}
            />

            {/* Botón de envío */}
            <Button
              type="submit"
              disabled={!isFormComplete() || isSubmitting}
              className={`w-full py-5 lg:py-6 text-base lg:text-lg font-semibold rounded-full transition-all duration-300 shadow-lg ${
                !isFormComplete()
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : isSubmitting
                  ? "bg-gradient-to-r from-primary via-[#1a5a7f] to-primary text-white cursor-wait"
                  : "bg-gradient-to-r from-primary via-[#1a5a7f] to-primary hover:from-[#1a5a7f] hover:via-primary hover:to-[#1a5a7f] text-white cursor-pointer hover:shadow-xl"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t.form.buttonSubmitting}
                </span>
              ) : (
                t.form.button
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JobApplicationForm;
