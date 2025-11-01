// src/components/ContactForm.tsx
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useTranslations } from "../lib/i18n-utils";
import type { Language } from "../lib/translations";

import { FormInput } from "./form/FormInput";
import { FormTextarea } from "./form/FormTextarea";
import { FormMessage } from "./form/FormMessage";

// Tipos para el formulario
interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  compania: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  compania?: string;
  mensaje?: string;
}

interface ContactFormProps {
  locale: Language;
  className?: string;
}

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwzGZJOIjbwVc00PUnfrLVsXR9TdOZiQCbG-ibXpDthOsoO3fZBGrbSixMRy2rLkeY7/exec";

const ContactForm: React.FC<ContactFormProps> = ({
  locale,
  className = "",
}) => {
  const t = useTranslations(locale);

  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    compania: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

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

    if (!formData.compania.trim()) {
      newErrors.compania = t.validation.required.compania;
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = t.validation.required.mensaje;
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = t.validation.minLength.mensaje;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios
  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Enviar formulario
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const submitData = {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim(),
        compania: formData.compania.trim(),
        mensaje: formData.mensaje.trim(),
        timestamp: new Date().toISOString(),
        language: locale,
        formType: "contact",
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
          compania: "",
          mensaje: "",
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

  return (
    <section
      className={`min-h-screen bg-primary flex items-center justify-center p-6 lg:p-8 ${className}`}
      aria-labelledby="contact-form-title"
    >
      <div className="w-full max-w-4xl">
        <h2
          id="contact-form-title"
          className="text-3xl lg:text-5xl font-bold text-white text-center mb-8 lg:mb-12"
        >
          CONTACT US
        </h2>

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

          {/* Teléfono y Compañía */}
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
            <FormInput
              type="text"
              placeholder={t.form.placeholders.compania}
              value={formData.compania}
              onChange={(value) => updateField("compania", value)}
              error={errors.compania}
              disabled={isSubmitting}
            />
          </div>

          {/* Mensaje */}
          <FormTextarea
            placeholder={t.form.placeholders.mensaje}
            value={formData.mensaje}
            onChange={(value) => updateField("mensaje", value)}
            error={errors.mensaje}
            disabled={isSubmitting}
          />

          {/* Botón de envío */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 lg:py-6 text-base lg:text-lg bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="loading-spinner mr-2"></div>
                {t.form.buttonSubmitting}
              </span>
            ) : (
              t.form.buttonContact
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
