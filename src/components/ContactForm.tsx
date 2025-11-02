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
  "https://script.google.com/macros/s/AKfycbyr_p36taZGFIRe_uW4t_-Wd0BVyD58UTxsL--7Yt22vXCxMDuzUqc2W7wWyCqPLGJh/exec";

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

  // Verificar si todos los campos están completos
  const isFormComplete = (): boolean => {
    return (
      formData.nombre.trim().length > 0 &&
      formData.apellido.trim().length > 0 &&
      formData.email.trim().length > 0 &&
      formData.telefono.trim().length > 0 &&
      formData.compania.trim().length > 0 &&
      formData.mensaje.trim().length > 0
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

          {/* Teléfono y Compañía */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              type="tel"
              placeholder={t.form.placeholders.telefono}
              value={formData.telefono}
              onChange={(value) => updateField("telefono", value)}
              error={errors.telefono}
              disabled={isSubmitting}
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
              t.form.buttonContact
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
