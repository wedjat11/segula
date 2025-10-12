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
    analysisSimulation: {
      title: string;
      subtitle: string;
      description: string;
    };
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

  // MainImageContainer
  imageContainer: {
    fallbackText: string;
    loading: string;
    error: string;
    section: string;
  };

  // AboutSection
  aboutSection: {
    bulletTitle: string;
    bulletAlt: string;
    titleBold: string;
    titleNormal: string;
    paragraph1: string;
    paragraph2: string;
    imageAlt: string;
    learnMore: string;
  };

  // ServiceCard
  serviceCard: {
    features: string;
    close: string;
    learnMore: string;
    imageError: string;
  };

  // ServicesSection
  servicesSection: {
    bulletTitle: string;
    bulletAlt: string;
    title: string;
    subtitle: string;
    noServiceSelected: string;
    services: {
      automotive: {
        title: string;
        description: string;
        features: string[];
        imageAlt: string;
      };
      energy: {
        title: string;
        description: string;
        features: string[];
        imageAlt: string;
      };
      aerospace: {
        title: string;
        description: string;
        features: string[];
        imageAlt: string;
      };
    };
  };

  // MainHeader
  header: {
    groupSite: string;
    groupSiteAria: string;
    logoAria: string;
  };

  // ImageSections (de mapImages.ts)
  imageSections: {
    about: {
      alt: string;
      text: string;
    };
    engineering: {
      alt: string;
      text: string;
    };
    innovation: {
      alt: string;
      text: string;
    };
    careers: {
      alt: string;
      text: string;
    };
    home: {
      alt: string;
      text: string;
    };
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
        title: "SERVICIOS DE INGENIERÍA",
        subtitle: "UNA SOLA PASIÓN, MÚLTIPLES SECTORES",
        description: "Soporte para el ciclo de vida completo del producto",
      },
      careers: {
        title: "OPORTUNIDADES PROFESIONALES",
        subtitle: "DESARROLLA TU CARRERA CON NOSOTROS",
        description: "Miles de ingenieros eligen Segula cada año",
      },
      analysisSimulation: {
        title: "ANÁLISIS Y SIMULACIÓN NUMÉRICA",
        subtitle: "UNA SOLA PASIÓN, MÚLTIPLES SECTORES",
        description: "Análisis y simulación numérica",
      },
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

    imageContainer: {
      fallbackText: "Únete a miles de ingenieros en Segula Technologies",
      loading: "Cargando imagen...",
      error: "Error al cargar imagen",
      section: "Sección",
    },

    aboutSection: {
      bulletTitle: "NOSOTROS",
      bulletAlt: "acerca de nosotros",
      titleBold: "SOMOS EL CORAZÓN",
      titleNormal: "DE LAS INNOVACIONES",
      paragraph1:
        "Proporcionamos soluciones innovadoras combinando con precisión la excelencia en el diseño con un compromiso hacia un servicio al cliente excepcional.",
      paragraph2:
        "Lo que es particularmente notable en todos los proyectos considerados para nuestro éxito es la forma en que la investigación e innovación se impulsa a través de la colaboración. Nuestro equipo reúne un amplio conjunto de habilidades y experiencias: vinculan la innovación fundamental con la práctica de ingeniería.",
      imageAlt: "Motor de ingeniería de Segula Technologies",
      learnMore: "Conoce más",
    },

    serviceCard: {
      features: "Características",
      close: "Cerrar",
      learnMore: "Conoce más",
      imageError: "Error al cargar imagen",
    },

    servicesSection: {
      bulletTitle: "SERVICIOS",
      bulletAlt: "nuestros servicios",
      title: "Nuestros Servicios",
      subtitle: "Soluciones de ingeniería especializadas para industrias clave",
      noServiceSelected: "Selecciona un servicio para ver más detalles",
      services: {
        automotive: {
          title: "AUTOMOTRIZ",
          description:
            "Ingeniería de productos con una evaluación completa de todo el proyecto desde la conceptualización hasta el diseño final.",
          features: [
            "Ingeniería de Procesos: Experiencia en la definición completa del ensamblaje de chasis incluyendo mecánica de mecanizado, inyección de plástico, etc.",
            "Simulaciones CAE/CFD.",
          ],
          imageAlt: "Ingeniería automotriz",
        },
        energy: {
          title: "ENERGÍA",
          description:
            "Experiencia en diseño, construcción e implementación de plantas de energía eólica, solar y cogeneración.",
          features: [
            "Diseño de plantas de energía renovable",
            "Gestión de proyectos energéticos",
            "Optimización de sistemas de energía",
          ],
          imageAlt: "Infraestructura de energía renovable",
        },
        aerospace: {
          title: "AEROESPACIAL",
          description:
            "Soluciones avanzadas de ingeniería para la industria aeroespacial, desde sistemas de propulsión hasta estructuras aeronáuticas.",
          features: [
            "Diseño de sistemas aeronáuticos",
            "Análisis estructural avanzado",
            "Certificación aeroespacial",
          ],
          imageAlt: "Ingeniería aeroespacial",
        },
      },
    },

    header: {
      groupSite: "Group Site",
      groupSiteAria: "Visitar sitio del grupo Segula",
      logoAria: "Ir a página de inicio",
    },

    imageSections: {
      about: {
        alt: "Equipo de ingenieros de Segula Technologies trabajando en proyectos innovadores",
        text: "En Segula Technologies, cada año comenzamos una historia con miles de nuevos ingenieros. Únete a nuestro equipo global de expertos y desarrolla tu carrera en un entorno de innovación y excelencia técnica.",
      },
      engineering: {
        alt: "Ingeniería avanzada y desarrollo tecnológico en Segula Technologies",
        text: "Desarrollamos soluciones de ingeniería de vanguardia en sectores clave como automotriz, aeroespacial, energía y manufactura. Nuestros ingenieros trabajan en los proyectos más desafiantes del mundo.",
      },
      innovation: {
        alt: "Innovación y tecnología del futuro en Segula Technologies",
        text: "La innovación está en el corazón de todo lo que hacemos. Desde la investigación y desarrollo hasta la implementación de nuevas tecnologías, estamos construyendo el futuro de la ingeniería.",
      },
      careers: {
        alt: "Oportunidades de carrera y crecimiento profesional en Segula Technologies",
        text: "Tu carrera en Segula Technologies te llevará a lugares que nunca imaginaste. Con presencia en 30 países y proyectos en los sectores más innovadores, las oportunidades son infinitas.",
      },
      home: {
        alt: "Bienvenido a Segula Technologies - Líder mundial en ingeniería",
        text: "Cada año, en Segula Technologies, comenzamos una historia con miles de nuevos ingenieros. ¿Por qué no tú? Únete a nuestro equipo global y sé parte de la innovación que está transformando el mundo.",
      },
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
        title: "ENGINEERING SERVICES",
        subtitle: "A SINGLE PASSION, MULTIPLE SECTORS",
        description: "Support for complete product cycle life",
      },
      careers: {
        title: "CAREER OPPORTUNITIES",
        subtitle: "DEVELOP YOUR CAREER WITH US",
        description: "Thousands of engineers choose Segula every year",
      },
      analysisSimulation: {
        title: "ANALYSIS AND NUMERIC SIMULATION",
        subtitle: "A SINGLE PASSION, MULTIPLE SECTORS",
        description: "Analysis and Numeric Simulation",
      },
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

    imageContainer: {
      fallbackText: "Join thousands of engineers at Segula Technologies",
      loading: "Loading image...",
      error: "Error loading image",
      section: "Section",
    },

    aboutSection: {
      bulletTitle: "ABOUT US",
      bulletAlt: "about us",
      titleBold: "WE ARE THE HEART",
      titleNormal: "OF INNOVATIONS",
      paragraph1:
        "We provide innovative solutions by precisely blending excellence in design with a commitment to exceptional customer service.",
      paragraph2:
        "What is particularly striking across all the projects considered for our success is the way in which research and innovation is driven by collaboration. Our team brings together a broad set of skills and experiences: they link foundational innovation with engineering practice.",
      imageAlt: "Segula Technologies engineering motor",
      learnMore: "Learn more",
    },

    serviceCard: {
      features: "Features",
      close: "Close",
      learnMore: "Learn more",
      imageError: "Error loading image",
    },

    servicesSection: {
      bulletTitle: "SERVICES",
      bulletAlt: "our services",
      title: "Our Services",
      subtitle: "Specialized engineering solutions for key industries",
      noServiceSelected: "Select a service to see more details",
      services: {
        automotive: {
          title: "AUTOMOTIVE",
          description:
            "Product engineering with a complete assessment of the whole project from conceptualization to the final design.",
          features: [
            "Process Engineering: Experience in a complete definition of chassis assembly including machining mechanics, plastic injection, etc.",
            "CAE/CFD Simulations.",
          ],
          imageAlt: "Automotive engineering",
        },
        energy: {
          title: "ENERGY",
          description:
            "Experience in plant engineering design, construction and launching for wind, solar, and co-generation energy.",
          features: [
            "Renewable energy plant design",
            "Energy project management",
            "Energy systems optimization",
          ],
          imageAlt: "Renewable energy infrastructure",
        },
        aerospace: {
          title: "AEROSPACE",
          description:
            "Advanced engineering solutions for the aerospace industry, from propulsion systems to aeronautical structures.",
          features: [
            "Aeronautical systems design",
            "Advanced structural analysis",
            "Aerospace certification",
          ],
          imageAlt: "Aerospace engineering",
        },
      },
    },

    header: {
      groupSite: "Group Site",
      groupSiteAria: "Visit Segula group site",
      logoAria: "Go to home page",
    },

    imageSections: {
      about: {
        alt: "Segula Technologies engineering team working on innovative projects",
        text: "At Segula Technologies, every year we start a story with thousands of new engineers. Join our global team of experts and develop your career in an environment of innovation and technical excellence.",
      },
      engineering: {
        alt: "Advanced engineering and technological development at Segula Technologies",
        text: "We develop cutting-edge engineering solutions in key sectors such as automotive, aerospace, energy and manufacturing. Our engineers work on the world's most challenging projects.",
      },
      innovation: {
        alt: "Innovation and future technology at Segula Technologies",
        text: "Innovation is at the heart of everything we do. From research and development to implementing new technologies, we are building the future of engineering.",
      },
      careers: {
        alt: "Career opportunities and professional growth at Segula Technologies",
        text: "Your career at Segula Technologies will take you places you never imagined. With presence in 30 countries and projects in the most innovative sectors, opportunities are endless.",
      },
      home: {
        alt: "Welcome to Segula Technologies - Global engineering leader",
        text: "Each year, at Segula Technologies, we start a story with thousands of new engineers. Why not you? Join our global team and be part of the innovation that is transforming the world.",
      },
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
        title: "SERVICES D'INGÉNIERIE",
        subtitle: "UNE SEULE PASSION, PLUSIEURS SECTEURS",
        description: "Support pour le cycle de vie complet du produit",
      },
      careers: {
        title: "OPPORTUNITÉS DE CARRIÈRE",
        subtitle: "DÉVELOPPEZ VOTRE CARRIÈRE AVEC NOUS",
        description:
          "Des milliers d'ingénieurs choisissent Segula chaque année",
      },
      analysisSimulation: {
        title: "ANALYSE ET SIMULATION NUMÉRIQUE",
        subtitle: "UNE SEULE PASSION, PLUSIEURS SECTEURS",
        description: "Analyse et simulation numérique",
      },
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

    imageContainer: {
      fallbackText: "Rejoignez des milliers d'ingénieurs chez Segula Technologies",
      loading: "Chargement de l'image...",
      error: "Erreur de chargement d'image",
      section: "Section",
    },

    aboutSection: {
      bulletTitle: "À PROPOS",
      bulletAlt: "à propos de nous",
      titleBold: "NOUS SOMMES LE CŒUR",
      titleNormal: "DES INNOVATIONS",
      paragraph1:
        "Nous fournissons des solutions innovantes en combinant avec précision l'excellence en conception avec un engagement envers un service client exceptionnel.",
      paragraph2:
        "Ce qui est particulièrement frappant dans tous les projets considérés pour notre succès, c'est la façon dont la recherche et l'innovation sont motivées par la collaboration. Notre équipe rassemble un large éventail de compétences et d'expériences : elle relie l'innovation fondamentale à la pratique de l'ingénierie.",
      imageAlt: "Moteur d'ingénierie Segula Technologies",
      learnMore: "En savoir plus",
    },

    serviceCard: {
      features: "Caractéristiques",
      close: "Fermer",
      learnMore: "En savoir plus",
      imageError: "Erreur de chargement d'image",
    },

    servicesSection: {
      bulletTitle: "SERVICES",
      bulletAlt: "nos services",
      title: "Nos Services",
      subtitle: "Solutions d'ingénierie spécialisées pour les industries clés",
      noServiceSelected: "Sélectionnez un service pour voir plus de détails",
      services: {
        automotive: {
          title: "AUTOMOBILE",
          description:
            "Ingénierie de produits avec une évaluation complète de l'ensemble du projet depuis la conceptualisation jusqu'à la conception finale.",
          features: [
            "Ingénierie des Processus: Expérience dans la définition complète de l'assemblage de châssis incluant la mécanique d'usinage, l'injection plastique, etc.",
            "Simulations CAE/CFD.",
          ],
          imageAlt: "Ingénierie automobile",
        },
        energy: {
          title: "ÉNERGIE",
          description:
            "Expérience en conception, construction et lancement d'installations d'ingénierie pour l'énergie éolienne, solaire et de cogénération.",
          features: [
            "Conception d'installations d'énergie renouvelable",
            "Gestion de projets énergétiques",
            "Optimisation des systèmes énergétiques",
          ],
          imageAlt: "Infrastructure d'énergie renouvelable",
        },
        aerospace: {
          title: "AÉROSPATIALE",
          description:
            "Solutions d'ingénierie avancées pour l'industrie aérospatiale, des systèmes de propulsion aux structures aéronautiques.",
          features: [
            "Conception de systèmes aéronautiques",
            "Analyse structurelle avancée",
            "Certification aérospatiale",
          ],
          imageAlt: "Ingénierie aérospatiale",
        },
      },
    },

    header: {
      groupSite: "Group Site",
      groupSiteAria: "Visiter le site du groupe Segula",
      logoAria: "Aller à la page d'accueil",
    },

    imageSections: {
      about: {
        alt: "Équipe d'ingénieurs Segula Technologies travaillant sur des projets innovants",
        text: "Chez Segula Technologies, chaque année nous commençons une histoire avec des milliers de nouveaux ingénieurs. Rejoignez notre équipe mondiale d'experts et développez votre carrière dans un environnement d'innovation et d'excellence technique.",
      },
      engineering: {
        alt: "Ingénierie avancée et développement technologique chez Segula Technologies",
        text: "Nous développons des solutions d'ingénierie de pointe dans des secteurs clés tels que l'automobile, l'aérospatiale, l'énergie et la fabrication. Nos ingénieurs travaillent sur les projets les plus difficiles au monde.",
      },
      innovation: {
        alt: "Innovation et technologie du futur chez Segula Technologies",
        text: "L'innovation est au cœur de tout ce que nous faisons. De la recherche et développement à la mise en œuvre de nouvelles technologies, nous construisons l'avenir de l'ingénierie.",
      },
      careers: {
        alt: "Opportunités de carrière et croissance professionnelle chez Segula Technologies",
        text: "Votre carrière chez Segula Technologies vous mènera à des endroits que vous n'avez jamais imaginés. Avec une présence dans 30 pays et des projets dans les secteurs les plus innovants, les opportunités sont infinies.",
      },
      home: {
        alt: "Bienvenue chez Segula Technologies - Leader mondial en ingénierie",
        text: "Chaque année, chez Segula Technologies, nous commençons une histoire avec des milliers de nouveaux ingénieurs. Pourquoi pas vous ? Rejoignez notre équipe mondiale et faites partie de l'innovation qui transforme le monde.",
      },
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
