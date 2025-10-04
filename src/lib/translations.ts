// Sistema de traducciones para el formulario
export type Language = "es" | "en" | "fr";

export interface Translations {
  navigation: {
    home: string;
    about: string;
    services: string;
    careers: string;
    contact: string;
    menu: string; // Para botón móvil
  };

  // Menú específico (más detallado)
  menu: {
    aboutUs: string;
    engineeringServices: string;
    analysisSimulation: string;
    news: string;
    innovation: string;
    menu: string; // Texto del botón
  };

  // Footer
  footer: {
    locationsTitle: string;
    locations: string;
    headquartersMexico: string;
    headquartersPuebla: string;
    mexicoAddress: string;
    pueblaAddress: string;
    phone: string;
    email: string;
  };

  // Engineering Services
  engineeringServices: {
    automotive: {
      title: string;
      description: string;
    };
    industrialVehicles: {
      title: string;
      description: string;
    };
    aerospace: {
      title: string;
      description: string;
    };
  };

  // Analysis and Simulation
  analysisSimulation: {
    structural: {
      title: string;
      description: string;
    };
    thermal: {
      title: string;
      description: string;
    };
    cfd: {
      title: string;
      description: string;
    };
  };
  sectionTitles: {
    business: {
      title: string;
      subtitle: string;
      description: string;
    };
    about: {
      title: string;
      subtitle: string;
      description: string;
    };
    services: {
      title: string;
      subtitle: string;
      description: string;
    };
    careers: {
      title: string;
      subtitle: string;
      description: string;
    };
  };
  // Encabezados principales
  mainTitle: {
    eachYear: string;
    atSegula: string;
    weStartStory: string;
    thousandsNew: string;
    engineers: string;
    whyNotYou: string;
  };

  // Formulario
  form: {
    placeholders: {
      nombre: string;
      apellido: string;
      email: string;
      telefono: string;
      sector: string;
      curriculum: string;
    };
    sectors: {
      tecnologia: string;
      ingenieria: string;
      manufactura: string;
      automotriz: string;
      aeroespacial: string;
      energia: string;
      telecomunicaciones: string;
      otro: string;
    };
    button: string;
    buttonSubmitting: string;
  };

  // Validaciones
  validation: {
    required: {
      nombre: string;
      apellido: string;
      email: string;
      telefono: string;
      sector: string;
      curriculum: string;
    };
    invalid: {
      email: string;
      telefono: string;
      fileType: string;
      fileSize: string;
    };
    minLength: {
      nombre: string;
      apellido: string;
    };
  };

  // Mensajes de estado
  messages: {
    success: string;
    error: string;
    uploading: string;
  };

  // Accesibilidad
  aria: {
    socialMedia: string;
    linkedin: string;
    facebook: string;
    twitter: string;
    instagram: string;
    fileUpload: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    navigation: {
      home: "Inicio",
      about: "Nosotros",
      services: "Servicios",
      careers: "Carreras",
      contact: "Contacto",
      menu: "Menú",
    },

    menu: {
      aboutUs: "Nosotros",
      engineeringServices: "Servicios de Ingeniería",
      analysisSimulation: "Análisis y Simulación",
      news: "Noticias",
      innovation: "Innovación",
      menu: "Menú",
    },

    footer: {
      locationsTitle: "LOCATIONS",
      locations: "Mexico City, Toluca, Puebla, Queretaro, Monterrey.",
      headquartersMexico: "Headquarters Mexico",
      headquartersPuebla: "Headquarters Puebla",
      mexicoAddress: "Río Sena 63 Piso 3. Col. Cuauhtémoc Ciudad de México",
      pueblaAddress: "Av. del Castillo número 5924 oficina 602. Col. Lomas de Angelópolis, San Andrés Cholula",
      phone: "Tel.+52 55 7352 3686",
      email: "info@segula.mx",
    },

    engineeringServices: {
      automotive: {
        title: "AUTOMOTIVE",
        description: "Ingeniería de producto con una evaluación completa de todo el proyecto desde la conceptualización hasta el diseño final. Ingeniería de Procesos: Experiencia en una definición completa del ensamblaje de chasis incluyendo mecánica de mecanizado, inyección de plástico, etc. Simulaciones CAE/CFD",
      },
      industrialVehicles: {
        title: "INDUSTRIAL VEHICLES",
        description: "Segula proporciona soluciones de Ingeniería y Diseño a fabricantes y su cadena de suministro. Nuestro alcance cubre Diseño Industrial, Desarrollo de Productos, CAE y prototipos.",
      },
      aerospace: {
        title: "AEROSPACE",
        description: "SEGULA Technologies ha evolucionado constantemente su gama para satisfacer las demandas cada vez mayores de grandes nombres en aeronáutica, espacio y defensa. Esta evolución nos permite ofrecer a nuestros clientes soluciones de extremo a extremo. Nuestros equipos se involucran tanto durante las fases de diseño de la aeronave como durante las fases de fabricación.",
      },
    },

    analysisSimulation: {
      structural: {
        title: "ANÁLISIS ESTRUCTURAL",
        description: "Análisis de resistencia y comportamiento estructural mediante simulación FEA. Evaluamos la integridad de componentes y ensambles bajo diferentes condiciones de carga para optimizar diseños y garantizar la seguridad.",
      },
      thermal: {
        title: "ANÁLISIS TÉRMICO",
        description: "Simulación de transferencia de calor y gestión térmica en sistemas complejos. Optimizamos el rendimiento térmico de productos y procesos para mejorar la eficiencia y confiabilidad.",
      },
      cfd: {
        title: "CFD - DINÁMICA DE FLUIDOS",
        description: "Análisis computacional de fluidos para optimizar el flujo de aire, agua y otros fluidos. Mejoramos la aerodinámica, refrigeración y eficiencia energética mediante simulaciones avanzadas.",
      },
    },
    sectionTitles: {
      business: {
        title: "SECTORES EMPRESARIALES",
        subtitle: "UNA SOLA PASIÓN, MÚLTIPLES SECTORES",
        description: "Ingeniería para industrias en evolución",
      },
      about: {
        title: "SOBRE SEGULA TECHNOLOGIES",
        subtitle: "MÁS DE 30 AÑOS DE INNOVACIÓN",
        description: "Líderes mundiales en ingeniería",
      },
      services: {
        title: "NUESTROS SERVICIOS",
        subtitle: "SOLUCIONES INTEGRALES DE INGENIERÍA",
        description: "Desde el diseño hasta la implementación",
      },
      careers: {
        title: "OPORTUNIDADES PROFESIONALES",
        subtitle: "DESARROLLA TU CARRERA CON NOSOTROS",
        description: "Miles de ingenieros eligen Segula cada año",
      },
    },
    mainTitle: {
      eachYear: "CADA AÑO",
      atSegula: "EN SEGULA TECHNOLOGIES,",
      weStartStory: "COMENZAMOS UNA HISTORIA CON",
      thousandsNew: "MILES DE NUEVOS",
      engineers: "INGENIEROS.",
      whyNotYou: "¿POR QUÉ NO TÚ?",
    },
    form: {
      placeholders: {
        nombre: "Nombre",
        apellido: "Apellido",
        email: "Correo electrónico",
        telefono: "Teléfono",
        sector: "Elige un sector",
        curriculum: "Adjuntar currículum",
      },
      sectors: {
        tecnologia: "Tecnología",
        ingenieria: "Ingeniería",
        manufactura: "Manufactura",
        automotriz: "Automotriz",
        aeroespacial: "Aeroespacial",
        energia: "Energía",
        telecomunicaciones: "Telecomunicaciones",
        otro: "Otro",
      },
      button: "Aplicar ahora",
      buttonSubmitting: "Enviando...",
    },
    validation: {
      required: {
        nombre: "El nombre es obligatorio",
        apellido: "El apellido es obligatorio",
        email: "El correo electrónico es obligatorio",
        telefono: "El teléfono es obligatorio",
        sector: "Debes seleccionar un sector",
        curriculum: "Debes adjuntar tu currículum",
      },
      invalid: {
        email: "El formato del correo electrónico no es válido",
        telefono: "El formato del teléfono no es válido",
        fileType: "Solo se permiten archivos PDF, DOC o DOCX",
        fileSize: "El archivo no debe superar los 5MB",
      },
      minLength: {
        nombre: "El nombre debe tener al menos 2 caracteres",
        apellido: "El apellido debe tener al menos 2 caracteres",
      },
    },
    messages: {
      success: "¡Gracias! Tu aplicación ha sido enviada exitosamente.",
      error: "Ha ocurrido un error. Por favor, intenta nuevamente.",
      uploading: "Subiendo archivo...",
    },
    aria: {
      socialMedia: "Redes sociales",
      linkedin: "LinkedIn",
      facebook: "Facebook",
      twitter: "Twitter",
      instagram: "Instagram",
      fileUpload: "Subir archivo de currículum",
    },
  },

  en: {
    navigation: {
      home: "Home",
      about: "About",
      services: "Services",
      careers: "Careers",
      contact: "Contact",
      menu: "Menu",
    },

    menu: {
      aboutUs: "About Us",
      engineeringServices: "Engineering Services",
      analysisSimulation: "Analysis and Simulation",
      news: "News",
      innovation: "Innovation",
      menu: "Menu",
    },

    footer: {
      locationsTitle: "LOCATIONS",
      locations: "Mexico City, Toluca, Puebla, Queretaro, Monterrey.",
      headquartersMexico: "Headquarters Mexico",
      headquartersPuebla: "Headquarters Puebla",
      mexicoAddress: "Río Sena 63 Piso 3. Col. Cuauhtémoc Ciudad de México",
      pueblaAddress: "Av. del Castillo número 5924 oficina 602. Col. Lomas de Angelópolis, San Andrés Cholula",
      phone: "Tel.+52 55 7352 3686",
      email: "info@segula.mx",
    },

    engineeringServices: {
      automotive: {
        title: "AUTOMOTIVE",
        description: "Product engineering with a complete assessment of the whole project from conceptualization to the final design. Process Engineering: Experience in a complete definition of chassis assembly including machining mechanics, plastic injection, etc. CAE/CFD Simulations",
      },
      industrialVehicles: {
        title: "INDUSTRIAL VEHICLES",
        description: "Segula provides Engineering & Design solutions to OEMs and their supply chain. Our scope covers Industrial Design, Product Development, CAE and prototyping.",
      },
      aerospace: {
        title: "AEROSPACE",
        description: "SEGULA Technologies has constantly evolved its range to meet the ever-increasing demands of big names in aeronautics, space and defence. This evolution allows us to offer our customers end-to-end solutions. Our teams get involved both during the aircraft design phases and during the manufacturing phases.",
      },
    },

    analysisSimulation: {
      structural: {
        title: "STRUCTURAL ANALYSIS",
        description: "Strength and structural behavior analysis through FEA simulation. We evaluate the integrity of components and assemblies under different load conditions to optimize designs and ensure safety.",
      },
      thermal: {
        title: "THERMAL ANALYSIS",
        description: "Heat transfer simulation and thermal management in complex systems. We optimize thermal performance of products and processes to improve efficiency and reliability.",
      },
      cfd: {
        title: "CFD - FLUID DYNAMICS",
        description: "Computational fluid analysis to optimize the flow of air, water and other fluids. We improve aerodynamics, cooling and energy efficiency through advanced simulations.",
      },
    },
    sectionTitles: {
      business: {
        title: "BUSINESS SECTORS",
        subtitle: "A SINGLE PASSION, MULTIPLE SECTORS",
        description: "Engineering for evolving industries",
      },
      about: {
        title: "ABOUT SEGULA TECHNOLOGIES",
        subtitle: "MORE THAN 30 YEARS OF INNOVATION",
        description: "Global leaders in engineering",
      },
      services: {
        title: "OUR SERVICES",
        subtitle: "COMPREHENSIVE ENGINEERING SOLUTIONS",
        description: "From design to implementation",
      },
      careers: {
        title: "CAREER OPPORTUNITIES",
        subtitle: "DEVELOP YOUR CAREER WITH US",
        description: "Thousands of engineers choose Segula every year",
      },
    },
    mainTitle: {
      eachYear: "EACH YEAR",
      atSegula: "AT SEGULA TECHNOLOGIES,",
      weStartStory: "WE START A STORY WITH",
      thousandsNew: "THOUSANDS OF NEW",
      engineers: "ENGINEERS.",
      whyNotYou: "WHY NOT YOU?",
    },
    form: {
      placeholders: {
        nombre: "First Name",
        apellido: "Last Name",
        email: "Email",
        telefono: "Phone",
        sector: "Choose a sector",
        curriculum: "Attach resume",
      },
      sectors: {
        tecnologia: "Technology",
        ingenieria: "Engineering",
        manufactura: "Manufacturing",
        automotriz: "Automotive",
        aeroespacial: "Aerospace",
        energia: "Energy",
        telecomunicaciones: "Telecommunications",
        otro: "Other",
      },
      button: "Apply now",
      buttonSubmitting: "Submitting...",
    },
    validation: {
      required: {
        nombre: "First name is required",
        apellido: "Last name is required",
        email: "Email is required",
        telefono: "Phone is required",
        sector: "You must select a sector",
        curriculum: "You must attach your resume",
      },
      invalid: {
        email: "Email format is not valid",
        telefono: "Phone format is not valid",
        fileType: "Only PDF, DOC or DOCX files are allowed",
        fileSize: "File size must not exceed 5MB",
      },
      minLength: {
        nombre: "First name must be at least 2 characters",
        apellido: "Last name must be at least 2 characters",
      },
    },
    messages: {
      success: "Thank you! Your application has been submitted successfully.",
      error: "An error occurred. Please try again.",
      uploading: "Uploading file...",
    },
    aria: {
      socialMedia: "Social media",
      linkedin: "LinkedIn",
      facebook: "Facebook",
      twitter: "Twitter",
      instagram: "Instagram",
      fileUpload: "Upload resume file",
    },
  },

  fr: {
    navigation: {
      home: "Accueil",
      about: "À Propos",
      services: "Services",
      careers: "Carrières",
      contact: "Contact",
      menu: "Menu",
    },

    menu: {
      aboutUs: "À Propos",
      engineeringServices: "Services d'Ingénierie",
      analysisSimulation: "Analyse et Simulation",
      news: "Actualités",
      innovation: "Innovation",
      menu: "Menu",
    },

    footer: {
      locationsTitle: "LOCATIONS",
      locations: "Mexico City, Toluca, Puebla, Queretaro, Monterrey.",
      headquartersMexico: "Siège social Mexico",
      headquartersPuebla: "Siège social Puebla",
      mexicoAddress: "Río Sena 63 Piso 3. Col. Cuauhtémoc Ciudad de México",
      pueblaAddress: "Av. del Castillo número 5924 oficina 602. Col. Lomas de Angelópolis, San Andrés Cholula",
      phone: "Tél.+52 55 7352 3686",
      email: "info@segula.mx",
    },

    engineeringServices: {
      automotive: {
        title: "AUTOMOTIVE",
        description: "Ingénierie de produit avec une évaluation complète de l'ensemble du projet, de la conceptualisation à la conception finale. Ingénierie des procédés : Expérience dans une définition complète de l'assemblage du châssis, y compris la mécanique d'usinage, l'injection plastique, etc. Simulations CAE/CFD",
      },
      industrialVehicles: {
        title: "INDUSTRIAL VEHICLES",
        description: "Segula fournit des solutions d'ingénierie et de conception aux équipementiers et à leur chaîne d'approvisionnement. Notre champ d'action couvre le design industriel, le développement de produits, la CAE et le prototypage.",
      },
      aerospace: {
        title: "AEROSPACE",
        description: "SEGULA Technologies a constamment fait évoluer sa gamme pour répondre aux exigences toujours croissantes des grands noms de l'aéronautique, de l'espace et de la défense. Cette évolution nous permet d'offrir à nos clients des solutions de bout en bout. Nos équipes s'impliquent à la fois lors des phases de conception de l'avion et lors des phases de fabrication.",
      },
    },

    analysisSimulation: {
      structural: {
        title: "ANALYSE STRUCTURELLE",
        description: "Analyse de résistance et comportement structurel par simulation FEA. Nous évaluons l'intégrité des composants et assemblages sous différentes conditions de charge pour optimiser les conceptions et garantir la sécurité.",
      },
      thermal: {
        title: "ANALYSE THERMIQUE",
        description: "Simulation de transfert de chaleur et gestion thermique dans des systèmes complexes. Nous optimisons les performances thermiques des produits et processus pour améliorer l'efficacité et la fiabilité.",
      },
      cfd: {
        title: "CFD - DYNAMIQUE DES FLUIDES",
        description: "Analyse computationnelle des fluides pour optimiser l'écoulement de l'air, de l'eau et d'autres fluides. Nous améliorons l'aérodynamique, le refroidissement et l'efficacité énergétique grâce à des simulations avancées.",
      },
    },
    sectionTitles: {
      business: {
        title: "SECTEURS D'ACTIVITÉ",
        subtitle: "UNE SEULE PASSION, PLUSIEURS SECTEURS",
        description: "Ingénierie pour les industries en évolution",
      },
      about: {
        title: "À PROPOS DE SEGULA TECHNOLOGIES",
        subtitle: "PLUS DE 30 ANS D'INNOVATION",
        description: "Leaders mondiaux en ingénierie",
      },
      services: {
        title: "NOS SERVICES",
        subtitle: "SOLUTIONS D'INGÉNIERIE COMPLÈTES",
        description: "De la conception à la mise en œuvre",
      },
      careers: {
        title: "OPPORTUNITÉS DE CARRIÈRE",
        subtitle: "DÉVELOPPEZ VOTRE CARRIÈRE AVEC NOUS",
        description:
          "Des milliers d'ingénieurs choisissent Segula chaque année",
      },
    },

    mainTitle: {
      eachYear: "CHAQUE ANNÉE",
      atSegula: "CHEZ SEGULA TECHNOLOGIES,",
      weStartStory: "NOUS COMMENÇONS UNE HISTOIRE AVEC",
      thousandsNew: "DES MILLIERS DE NOUVEAUX",
      engineers: "INGÉNIEURS.",
      whyNotYou: "POURQUOI PAS VOUS ?",
    },
    form: {
      placeholders: {
        nombre: "Prénom",
        apellido: "Nom",
        email: "Email",
        telefono: "Téléphone",
        sector: "Choisir un secteur",
        curriculum: "Joindre CV",
      },
      sectors: {
        tecnologia: "Technologie",
        ingenieria: "Ingénierie",
        manufactura: "Fabrication",
        automotriz: "Automobile",
        aeroespacial: "Aérospatial",
        energia: "Énergie",
        telecomunicaciones: "Télécommunications",
        otro: "Autre",
      },
      button: "Postuler maintenant",
      buttonSubmitting: "Envoi en cours...",
    },
    validation: {
      required: {
        nombre: "Le prénom est obligatoire",
        apellido: "Le nom est obligatoire",
        email: "L'email est obligatoire",
        telefono: "Le téléphone est obligatoire",
        sector: "Vous devez sélectionner un secteur",
        curriculum: "Vous devez joindre votre CV",
      },
      invalid: {
        email: "Le format de l'email n'est pas valide",
        telefono: "Le format du téléphone n'est pas valide",
        fileType: "Seuls les fichiers PDF, DOC ou DOCX sont autorisés",
        fileSize: "Le fichier ne doit pas dépasser 5MB",
      },
      minLength: {
        nombre: "Le prénom doit contenir au moins 2 caractères",
        apellido: "Le nom doit contenir au moins 2 caractères",
      },
    },
    messages: {
      success: "Merci ! Votre candidature a été envoyée avec succès.",
      error: "Une erreur s'est produite. Veuillez réessayer.",
      uploading: "Téléchargement en cours...",
    },
    aria: {
      socialMedia: "Réseaux sociaux",
      linkedin: "LinkedIn",
      facebook: "Facebook",
      twitter: "Twitter",
      instagram: "Instagram",
      fileUpload: "Télécharger le fichier CV",
    },
  },
};

// Hook para obtener las traducciones según el idioma actual
export const useTranslations = (language: Language): Translations => {
  return translations[language];
};

// Función para detectar el idioma desde la URL o navegador (solo cliente)
export const detectLanguage = (): Language => {
  // Solo ejecutar en el cliente para evitar problemas de hidratación
  if (typeof window === "undefined") {
    return "es"; // Default para SSR
  }

  try {
    // Detectar desde la URL (ej: /en/aplicaciones, /fr/candidatures)
    const path = window.location.pathname;
    if (path.startsWith("/en")) return "en";
    if (path.startsWith("/fr")) return "fr";

    // Detectar desde el navegador como fallback
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("en")) return "en";
    if (browserLang.startsWith("fr")) return "fr";
  } catch (error) {
    console.warn("Error detectando idioma:", error);
  }

  // Por defecto español
  return "es";
};
