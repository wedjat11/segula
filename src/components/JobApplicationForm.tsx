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
  "https://script.google.com/macros/s/AKfycbwzGZJOIjbwVc00PUnfrLVsXR9TdOZiQCbG-ibXpDthOsoO3fZBGrbSixMRy2rLkeY7/exec";

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

  // Iconos SVG
  const UserIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );

  const EmailIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );

  const PhoneIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );

  const SelectIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  );

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

          <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-6" noValidate>
            {/* Nombre y Apellido */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                type="text"
                placeholder={t.form.placeholders.nombre}
                value={formData.nombre}
                onChange={(value) => updateField("nombre", value)}
                error={errors.nombre}
                disabled={isSubmitting}
                icon={<UserIcon />}
              />
              <FormInput
                type="text"
                placeholder={t.form.placeholders.apellido}
                value={formData.apellido}
                onChange={(value) => updateField("apellido", value)}
                error={errors.apellido}
                disabled={isSubmitting}
                icon={<UserIcon />}
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
              icon={<EmailIcon />}
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
                icon={<PhoneIcon />}
              />
              <FormSelect
                placeholder={t.form.placeholders.sector}
                value={formData.sector}
                onChange={(value) => updateField("sector", value)}
                options={sectors}
                error={errors.sector}
                disabled={isSubmitting}
                icon={<SelectIcon />}
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
              disabled={isSubmitting}
              className="w-full py-5 lg:py-6 text-base lg:text-lg bg-primary hover:bg-primary/80 text-white font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <div className="loading-spinner mr-2"></div>
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
