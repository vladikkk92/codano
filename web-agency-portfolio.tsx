"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Code,
  Smartphone,
  PenTool,
  Users,
  Menu,
  X,
  ArrowRight,
  Check,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Neue Farbpalette basierend auf dem Logo
const codaroColors = {
  navy: "#001F3F", // Dunkelblau/Schwarz aus dem Logo
  darkNavy: "#00172A", // Noch dunkler für Kontraste
  beige: "#F5F1E4", // Beige aus dem Logo-Hintergrund
  lightBeige: "#FAF7EF", // Helleres Beige für Kontraste
  cream: "#FFFDF7", // Sehr helles Beige/Cremeweiß
  accent: "#0056B3", // Akzentfarbe für Hervorhebungen
  accentLight: "#E6F0FF", // Helle Version der Akzentfarbe
  gradient: "linear-gradient(135deg, #001F3F 0%, #0056B3 100%)",
  beigeGradient: "linear-gradient(135deg, #F5F1E4 0%, #FAF7EF 100%)",
  navyBeigeGradient: "linear-gradient(135deg, #001F3F 0%, #F5F1E4 100%)",
}

// Technologie-Icons
const techIcons = {
  react: "/placeholder.svg?height=40&width=40&text=React",
  nextjs: "/placeholder.svg?height=40&width=40&text=Next.js",
  typescript: "/placeholder.svg?height=40&width=40&text=TS",
  node: "/placeholder.svg?height=40&width=40&text=Node",
  tailwind: "/placeholder.svg?height=40&width=40&text=TW",
  figma: "/placeholder.svg?height=40&width=40&text=Figma",
}

// Sprachdaten
const translations = {
  de: {
    nav: {
      home: "Startseite",
      services: "Leistungen",
      portfolio: "Portfolio",
      about: "Über uns",
      process: "Prozess",
      blog: "Blog",
      contact: "Kontakt",
    },
    hero: {
      badge: "Moderne und Innovative Digitalagentur",
      title: "Wir gestalten digitale Erlebnisse der Zukunft",
      subtitle:
        "Ihre Webagentur für moderne, innovative und maßgeschneiderte digitale Lösungen, die Ihr Unternehmen auf das nächste Level bringen",
      cta: "Projekt starten",
      secondary: "Portfolio entdecken",
      stats: [
        { value: "98%", label: "Kundenzufriedenheit" },
        { value: "40+", label: "Abgeschlossene Projekte" },
        { value: "70+", label: "Jahre Erfahrung der Entwickler" },
      ],
    },
    services: {
      title: "Unsere Leistungen",
      subtitle: "Maßgeschneiderte digitale Lösungen für Ihren Erfolg",
      description:
        "Wir bieten ein umfassendes Spektrum an digitalen Dienstleistungen, die Ihrem Unternehmen helfen, in der digitalen Welt zu wachsen und zu gedeihen. Unser Expertenteam arbeitet eng mit Ihnen zusammen, um maßgeschneiderte Lösungen zu entwickeln, die Ihre spezifischen Anforderungen erfüllen.",
      web: {
        title: "Webentwicklung",
        desc: "Maßgeschneiderte Websites und Webanwendungen mit modernsten Technologien wie React, Next.js und Node.js. Wir entwickeln responsive, schnelle und benutzerfreundliche Lösungen, die Ihre Geschäftsziele unterstützen und Ihre Kunden begeistern.",
        features: [
          "Responsive Design",
          "SEO-Optimierung",
          "Content Management",
          "E-Commerce Integration",
          "Performance-Optimierung",
        ],
        icon: Code,
      },
      app: {
        title: "App-Entwicklung",
        desc: "Native und hybride Apps für iOS und Android mit nahtloser Benutzererfahrung. Von der Konzeption bis zur Veröffentlichung im App Store begleiten wir Sie durch den gesamten Prozess und stellen sicher, dass Ihre App den höchsten Standards entspricht.",
        features: [
          "iOS & Android",
          "Hybride Lösungen",
          "Backend-Integration",
          "Push-Benachrichtigungen",
          "Offline-Funktionalität",
        ],
        icon: Smartphone,
      },
      design: {
        title: "UI/UX Design",
        desc: "Benutzerfreundliche und ästhetisch ansprechende Designs, die Ihre Marke stärken. Wir erstellen intuitive Benutzeroberflächen, die Ihre Kunden begeistern und zum Handeln motivieren, basierend auf umfassender Nutzerforschung und bewährten Design-Prinzipien.",
        features: ["Benutzerforschung", "Wireframing", "Prototyping", "Usability-Tests", "Design-Systeme"],
        icon: PenTool,
      },
      marketing: {
        title: "Digitales Marketing",
        desc: "SEO, Content-Marketing und Social-Media-Strategien für mehr Sichtbarkeit. Wir helfen Ihnen, Ihre Zielgruppe zu erreichen und Ihre Online-Präsenz zu stärken, mit datengesteuerten Kampagnen und kontinuierlicher Optimierung für maximale Ergebnisse.",
        features: [
          "Suchmaschinenoptimierung",
          "Content-Strategie",
          "Social Media",
          "E-Mail-Marketing",
          "Analytics & Reporting",
        ],
        icon: Users,
      },
    },
    process: {
      title: "Unser Prozess",
      subtitle: "Wie wir arbeiten",
      description:
        "Unser bewährter Prozess stellt sicher, dass jedes Projekt effizient, transparent und mit höchster Qualität umgesetzt wird. Wir legen großen Wert auf Kommunikation und Zusammenarbeit in jeder Phase.",
      steps: [
        {
          number: "01",
          title: "Entdeckung & Strategie",
          description:
            "Wir beginnen mit einem tiefgreifenden Verständnis Ihrer Geschäftsziele, Zielgruppe und Anforderungen. Auf dieser Grundlage entwickeln wir eine maßgeschneiderte Strategie für Ihr Projekt.",
        },
        {
          number: "02",
          title: "Konzeption & Design",
          description:
            "Basierend auf der Strategie erstellen wir Wireframes und Designs, die Ihre Marke perfekt repräsentieren und ein optimales Nutzererlebnis bieten. Iterative Feedbackschleifen stellen sicher, dass das Endergebnis Ihren Vorstellungen entspricht.",
        },
        {
          number: "03",
          title: "Entwicklung & Test",
          description:
            "Unser Entwicklungsteam setzt das Design mit modernsten Technologien um. Regelmäßige Tests und Qualitätssicherung gewährleisten eine fehlerfreie Funktionalität auf allen Geräten und Browsern.",
        },
        {
          number: "04",
          title: "Launch & Optimierung",
          description:
            "Nach dem erfolgreichen Launch begleiten wir Sie weiterhin mit kontinuierlicher Optimierung, Wartung und Support, um sicherzustellen, dass Ihre digitale Lösung langfristig erfolgreich ist.",
        },
      ],
    },
    portfolio: {
      title: "Unsere Arbeiten",
      subtitle: "Ausgewählte Projekte, die unsere Expertise zeigen",
      description:
        "Entdecken Sie eine Auswahl unserer erfolgreichsten Projekte. Jedes Projekt ist das Ergebnis enger Zusammenarbeit mit unseren Kunden und spiegelt unsere Leidenschaft für exzellentes Design und technische Innovation wider.",
      viewAll: "Alle Projekte ansehen",
      categories: {
        all: "Alle",
        web: "Web",
        app: "App",
        design: "Design",
        marketing: "Marketing",
      },
      projects: [
        {
          title: "E-Commerce Plattform",
          category: "Web",
          desc: "Moderne Online-Shopping-Erfahrung mit React und Node.js für einen führenden Modehändler. Inklusive Zahlungsabwicklung, Produktverwaltung und Kundenkonto. Die Plattform führte zu einer Umsatzsteigerung von 35% im ersten Jahr.",
          client: "Fashion Store GmbH",
          year: "2023",
          technologies: ["React", "Node.js", "MongoDB", "Stripe"],
          results: ["35% Umsatzsteigerung", "42% mehr mobile Nutzer", "28% höhere Conversion-Rate"],
          image: "/placeholder.svg?height=400&width=600&text=E-Commerce+Platform",
        },
        {
          title: "Fitness Tracker App",
          category: "App",
          desc: "Mobile Anwendung zur Verfolgung von Fitnesszielen mit personalisierten Trainingsplänen, Ernährungstagebuch und Fortschrittsanalyse. Die App wurde über 100.000 Mal heruntergeladen und hat eine Bewertung von 4,8/5 Sternen.",
          client: "FitLife AG",
          year: "2022",
          technologies: ["React Native", "Firebase", "Redux", "HealthKit"],
          results: ["100.000+ Downloads", "4,8/5 Sterne Bewertung", "87% Nutzerretention"],
          image: "/placeholder.svg?height=400&width=600&text=Fitness+App",
        },
        {
          title: "Corporate Branding",
          category: "Design",
          desc: "Komplettes Markendesign für ein Technologieunternehmen, einschließlich Logo, Farbpalette, Typografie und Designrichtlinien für alle Kommunikationskanäle. Das Rebranding führte zu einer deutlich verbesserten Markenwahrnehmung.",
          client: "TechVision GmbH",
          year: "2023",
          technologies: ["Adobe CC", "Figma", "Brand Strategy", "Motion Design"],
          results: ["42% höhere Markenbekanntheit", "Auszeichnung für Designexzellenz", "Einheitliche Markenpräsenz"],
          image: "/placeholder.svg?height=400&width=600&text=Corporate+Branding",
        },
        {
          title: "Immobilien-Portal",
          category: "Web",
          desc: "Plattform zur Suche und Verwaltung von Immobilien mit interaktiver Karte, detaillierten Filtermöglichkeiten und virtuellem Rundgang durch die Objekte. Das Portal hat die Vermittlungsrate um 45% gesteigert.",
          client: "ImmoFinder AG",
          year: "2022",
          technologies: ["Next.js", "TypeScript", "PostgreSQL", "Google Maps API"],
          results: ["45% höhere Vermittlungsrate", "65% mehr Leads", "Reduzierte Suchzeit um 30%"],
          image: "/placeholder.svg?height=400&width=600&text=Real+Estate+Portal",
        },
        {
          title: "Reiseführer App",
          category: "App",
          desc: "Interaktiver Reiseführer mit Offline-Karten, Sehenswürdigkeiten, Restaurantempfehlungen und personalisierten Reiserouten. Die App wurde in mehreren Reisemagazinen empfohlen.",
          client: "TravelGuide GmbH",
          year: "2023",
          technologies: ["Flutter", "Firebase", "MapBox", "AI Recommendations"],
          results: ["250.000+ Downloads", "Featured im App Store", "Durchschnittlich 45 Min. tägliche Nutzung"],
          image: "/placeholder.svg?height=400&width=600&text=Travel+Guide+App",
        },
        {
          title: "Online Banking Dashboard",
          category: "Web",
          desc: "Benutzerfreundliches Dashboard für Online-Banking mit Echtzeit-Transaktionen, Finanzanalysen und Budgetplanung. Das neue Interface hat die Nutzerzufriedenheit um 40% verbessert.",
          client: "DigitalBank AG",
          year: "2022",
          technologies: ["Vue.js", "D3.js", "Node.js", "PostgreSQL"],
          results: ["40% höhere Nutzerzufriedenheit", "28% mehr aktive Nutzer", "Reduzierte Support-Anfragen um 35%"],
          image: "/placeholder.svg?height=400&width=600&text=Banking+Dashboard",
        },
      ],
    },
    
    technologies: {
      title: "Technologien",
      subtitle: "Womit wir arbeiten",
      description:
        "Wir setzen auf modernste Technologien und Frameworks, um skalierbare, performante und zukunftssichere Lösungen zu entwickeln. Unser Team bildet sich kontinuierlich weiter, um stets auf dem neuesten Stand zu bleiben.",
      frontend: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "GSAP"],
      backend: ["Node.js", "Express", "Django", "Laravel", "GraphQL", "REST API"],
      database: ["PostgreSQL", "MongoDB", "Firebase", "Redis", "MySQL", "Supabase"],
      tools: ["Git", "Docker", "AWS", "Vercel", "Figma", "Adobe Creative Cloud"],
    },
    about: {
      title: "Über uns",
      subtitle: "Unser Team von Experten",
      description:
        "Wir sind ein Team von leidenschaftlichen Designern und Entwicklern, die digitale Lösungen schaffen, die begeistern und inspirieren. Mit über 70 Jahren Erfahrung in der Branche haben wir für Kunden aus verschiedenen Branchen gearbeitet und verstehen die spezifischen Anforderungen und Herausforderungen jedes Projekts. Unser Ziel ist es, nicht nur schöne Websites zu erstellen, sondern digitale Erlebnisse zu schaffen, die Ergebnisse liefern.",
      mission:
        "Unsere Mission ist es, innovative digitale Lösungen zu entwickeln, die Unternehmen dabei helfen, in der digitalen Welt erfolgreich zu sein. Wir glauben an die Kraft des guten Designs und der Technologie, um Geschäftsziele zu erreichen und positive Nutzererfahrungen zu schaffen.",
      values: [
        {
          title: "Qualität",
          description:
            "Wir streben nach Exzellenz in allem, was wir tun, von der ersten Konzeption bis zum fertigen Produkt.",
        },
        {
          title: "Innovation",
          description:
            "Wir bleiben stets am Puls der Zeit und integrieren neue Technologien und Trends in unsere Arbeit.",
        },
        {
          title: "Zusammenarbeit",
          description: "Wir glauben an die Kraft der Teamarbeit und enge Zusammenarbeit mit unseren Kunden.",
        },
        {
          title: "Transparenz",
          description:
            "Offene Kommunikation und Ehrlichkeit sind die Grundlage für erfolgreiche Projekte und langfristige Beziehungen.",
        },
      ],
      stats: [
        { value: "70+", label: "Jahre Erfahrung" },
        { value: "40+", label: "Abgeschlossene Projekte" },
        { value: "40+", label: "Zufriedene Kunden" },
      ],
      team: [],
    },
    blog: {
      title: "Blog & Insights",
      subtitle: "Neueste Artikel und Gedanken",
      readMore: "Weiterlesen",
      posts: [
        {
          title: "Die Zukunft des Web Designs: Trends für 2024",
          excerpt:
            "Entdecken Sie die neuesten Design-Trends, die das Web im kommenden Jahr prägen werden, von 3D-Elementen bis zu Micro-Interaktionen.",
          fullText:
            "Entdecken Sie die neuesten Design-Trends, die das Web im kommenden Jahr prägen werden, von 3D-Elementen bis zu Micro-Interaktionen. In den letzten Jahren hat sich das Web-Design rasant weiterentwickelt. Besonders auffällig ist der Trend zu mehr Tiefe und Dimension durch 3D-Elemente. Diese verleihen Websites nicht nur einen visuellen Wow-Effekt, sondern ermöglichen auch neue Arten der Interaktion und Navigation. Ebenso gewinnen Micro-Interaktionen zunehmend an Bedeutung. Diese kleinen Animationen und Feedbacks machen die Nutzererfahrung intuitiver und angenehmer. Auch in puncto Farbgebung zeichnen sich für 2024 klare Trends ab: Kräftige, gesättigte Farben in Kombination mit subtilen Farbverläufen werden dominieren. Darüber hinaus werden Schriftarten immer experimenteller und ausdrucksstärker, wobei die Lesbarkeit nach wie vor im Vordergrund steht. Ein weiterer wichtiger Trend ist die zunehmende Bedeutung von barrierefreiem Design. Dies umfasst nicht nur technische Aspekte wie Screenreader-Kompatibilität, sondern auch visuelle Elemente wie ausreichende Kontrastverständnisse und klare Hierarchien. Insgesamt lässt sich sagen, dass die Web-Design-Trends für 2024 eine spannende Mischung aus technologischer Innovation und nutzerzentriertem Design.",
          date: "15. März 2024",
          category: "Design",
          image: "/placeholder.svg?height=300&width=500&text=Design+Trends",
        },
        {
          title: "Warum Performance für Ihre Website entscheidend ist",
          excerpt:
            "Eine schnelle Website ist nicht nur gut für die Benutzererfahrung, sondern auch für SEO und Conversion-Raten. Erfahren Sie, wie Sie Ihre Website optimieren können.",
          fullText:
            "Eine schnelle Website ist nicht nur gut für die Benutzererfahrung, sondern auch für SEO und Conversion-Raten. In der heutigen digitalen Landschaft, wo Benutzer immer ungeduldiger werden und Google die Ladegeschwindigkeit als Ranking-Faktor berücksichtigt, ist Performance zu einem kritischen Erfolgsfaktor geworden. Studien zeigen, dass bereits eine Verzögerung von einer Sekunde die Conversion-Rate um bis zu 7% senken kann. Besonders im E-Commerce-Bereich kann dies erhebliche finanzielle Auswirkungen haben. Um die Performance Ihrer Website zu verbessern, sollten Sie zunächst eine gründliche Analyse durchführen. Tools wie Google PageSpeed Insights oder WebPageTest bieten wertvolle Einblicke in Bereiche, die Optimierungspotenzial haben. Zu den wichtigsten Optimierungsmaßnahmen gehören die Komprimierung von Bildern, die Minimierung von JavaScript und CSS, die Implementierung von Browser-Caching und die Nutzung von Content Delivery Networks (CDNs). Auch der Einsatz moderner Bildformate wie WebP kann die Ladezeiten erheblich reduzieren. Ein weiterer wichtiger Aspekt ist die Serverantwortzeit. Die Wahl eines zuverlässigen Hosting-Anbieters und die Optimierung der Datenbankabfragen können hier einen großen Unterschied machen. Für komplexe Anwendungen empfiehlt sich zudem die Implementierung von Code-Splitting und Lazy Loading, um nur die wirklich benötigten Ressourcen zu laden. Denken Sie daran: Jede Millisekunde zählt!",
          date: "28. Februar 2024",
          category: "Entwicklung",
          image: "/placeholder.svg?height=300&width=500&text=Performance",
        },
        {
          title: "Die Rolle von KI in der modernen Webentwicklung",
          excerpt:
            "Künstliche Intelligenz revolutioniert die Art und Weise, wie wir Websites und Anwendungen entwickeln. Erfahren Sie, wie KI Ihren digitalen Auftritt verbessern kann.",
          fullText:
            "Künstliche Intelligenz revolutioniert die Art und Weise, wie wir Websites und Anwendungen entwickeln. In den letzten Jahren haben KI-gestützte Tools und Technologien einen enormen Einfluss auf die Webentwicklung genommen und bieten neue Möglichkeiten, die Benutzerinteraktion zu personalisieren und zu optimieren. Eine der spannendsten Anwendungen von KI in der Webentwicklung ist die Automatisierung repetitiver Aufgaben. Von der Code-Generierung bis hin zur automatischen Fehlerbehebung können KI-Tools den Entwicklungsprozess erheblich beschleunigen und Ressourcen für kreativere Aspekte des Projekts freisetzen. Chatbots und virtuelle Assistenten sind ein weiteres Beispiel für den erfolgreichen Einsatz von KI im Web. Diese intelligenten Systeme können Kundenanfragen in Echtzeit beantworten und personalisierte Empfehlungen geben, was sowohl die Kundenzufriedenheit als auch die Conversion-Raten steigern kann. Besonders im E-Commerce-Bereich hat sich der Einsatz von KI für Produktempfehlungen als äußerst effektiv erwiesen. Durch die Analyse des Benutzerverhaltens können KI-Algorithmen relevante Produkte vorschlagen und so das Einkaufserlebnis verbessern. Ein weiterer interessanter Trend ist der Einsatz von KI für Content-Erstellung und -Optimierung. Von der Generierung von Blog-Artikeln bis hin zur Optimierung von Überschriften für SEO können KI-Tools wertvolle Unterstützung bieten. Auch im Bereich der User Experience (UX) spielt KI eine immer größere Rolle. Durch die Analyse von Benutzerdaten können KI-Systeme Schwachstellen in der Benutzeroberfläche identifizieren und Vorschläge zur Verbesserung machen. Bei allem Enthusiasmus für KI ist es jedoch wichtig, die ethischen Implikationen nicht aus den Augen zu verlieren. Themen wie Datenschutz, Transparenz und potenzielle Voreingenommenheit in Algorithmen erfordern sorgfältige Überlegung und verantwortungsvolle Implementierung.",
          date: "10. Februar 2024",
          category: "Technologie",
          image: "/placeholder.svg?height=300&width=500&text=AI",
        },
      ],
    },
    contact: {
      title: "Kontakt",
      subtitle: "Sprechen Sie mit uns über Ihr nächstes Projekt",
      description:
        "Bereit, Ihr nächstes digitales Projekt zu starten? Kontaktieren Sie uns für ein unverbindliches Gespräch. Wir freuen uns darauf, mehr über Ihre Ziele zu erfahren und wie wir Ihnen helfen können, diese zu erreichen.",
      name: "Name",
      email: "E-Mail",
      phone: "Telefon",
      company: "Unternehmen",
      project: "Projektbeschreibung",
      budget: "Budget",
      message: "Nachricht",
      submit: "Anfrage senden",
      address: "Musterstraße 123, 10115 Berlin",
      phoneNumber: "+49 30 1234567",
      emailAddress: "info@codaro.de",
      success: "Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.",
      budgetOptions: ["< 5.000 €", "5.000 € - 10.000 €", "10.000 € - 25.000 €", "25.000 € - 50.000 €", "> 50.000 €"],
      faq: {
        title: "Häufig gestellte Fragen",
        items: [
          {
            question: "Wie lange dauert die Entwicklung einer Website?",
            answer:
              "Die Entwicklungsdauer hängt von der Komplexität des Projekts ab. Eine einfache Website kann in 4-6 Wochen fertiggestellt sein, während komplexere Projekte 3-6 Monate in Anspruch nehmen können.",
          },
          {
            question: "Welche Informationen benötigen Sie für ein Angebot?",
            answer:
              "Für ein genaues Angebot benötigen wir Informationen über den Projektumfang, gewünschte Funktionen, Zeitrahmen und Budget. Je detaillierter Ihre Anfrage, desto präziser kann unser Angebot sein.",
          },
          {
            question: "Bieten Sie auch Wartung und Support nach dem Launch an?",
            answer:
              "Ja, wir bieten verschiedene Wartungs- und Support-Pakete an, um sicherzustellen, dass Ihre Website oder App optimal funktioniert und stets auf dem neuesten Stand ist.",
          },
        ],
      },
    },
    footer: {
      rights: "© 2024 Codaro. Alle Rechte vorbehalten.",
      privacy: "Datenschutz",
      terms: "AGB",
      imprint: "Impressum",
      newsletter: {
        title: "Newsletter abonnieren",
        desc: "Erhalten Sie die neuesten Updates und Angebote",
        placeholder: "Ihre E-Mail-Adresse",
        button: "Abonnieren",
      },
      sections: {
        company: "Unternehmen",
        services: "Leistungen",
        resources: "Ressourcen",
      },
      links: {
        company: ["Über uns", "Team", "Karriere", "Kontakt"],
        services: ["Webentwicklung", "App-Entwicklung", "UI/UX Design", "Digitales Marketing"],
        resources: ["Blog", "Fallstudien", "Ressourcen", "FAQ"],
      },
    },
    cta: {
      title: "Bereit für Ihr nächstes Projekt?",
      description:
        "Lassen Sie uns gemeinsam etwas Großartiges schaffen. Kontaktieren Sie uns noch heute für ein unverbindliches Gespräch.",
      button: "Kontakt aufnehmen",
      secondary: "Portfolio ansehen",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      about: "About",
      process: "Process",
      blog: "Blog",
      contact: "Contact",
    },
    hero: {
      badge: "Award-winning digital agency",
      title: "We create digital experiences of the future",
      subtitle:
        "Your web agency for modern, innovative, and tailored digital solutions that take your business to the next level",
      cta: "Start a project",
      secondary: "Explore portfolio",
      stats: [
        { value: "98%", label: "Client satisfaction" },
        { value: "40+", label: "Completed projects" },
        { value: "70+", label: "Years of experience" },
      ],
    },
    trusted: {
      title: "Trusted by leading companies",
      companies: ["Company A", "Company B", "Company C", "Company D", "Company E"],
    },
    services: {
      title: "Our Services",
      subtitle: "Tailored digital solutions for your success",
      description:
        "We offer a comprehensive range of digital services to help your business grow and thrive in the digital world. Our expert team works closely with you to develop tailored solutions that meet your specific requirements.",
      web: {
        title: "Web Development",
        desc: "Custom websites and web applications using cutting-edge technologies like React, Next.js, and Node.js. We develop responsive, fast, and user-friendly solutions that support your business goals and delight your customers.",
        features: [
          "Responsive Design",
          "SEO Optimization",
          "Content Management",
          "E-Commerce Integration",
          "Performance Optimization",
        ],
        icon: Code,
      },
      app: {
        title: "App Development",
        desc: "Native and hybrid apps for iOS and Android with seamless user experience. From concept to App Store publication, we guide you through the entire process and ensure your app meets the highest standards.",
        features: [
          "iOS & Android",
          "Hybrid Solutions",
          "Backend Integration",
          "Push Notifications",
          "Offline Functionality",
        ],
        icon: Smartphone,
      },
      design: {
        title: "UI/UX Design",
        desc: "User-friendly and aesthetically pleasing designs that strengthen your brand. We create intuitive interfaces that delight your customers and motivate them to take action, based on comprehensive user research and proven design principles.",
        features: ["User Research", "Wireframing", "Prototyping", "Usability Testing", "Design Systems"],
        icon: PenTool,
      },
      marketing: {
        title: "Digital Marketing",
        desc: "SEO, content marketing, and social media strategies for increased visibility. We help you reach your target audience and strengthen your online presence, with data-driven campaigns and continuous optimization for maximum results.",
        features: [
          "Search Engine Optimization",
          "Content Strategy",
          "Social Media",
          "Email Marketing",
          "Analytics & Reporting",
        ],
        icon: Users,
      },
    },
    process: {
      title: "Our Process",
      subtitle: "How we work",
      description:
        "Our proven process ensures that every project is executed efficiently, transparently, and with the highest quality. We place great emphasis on communication and collaboration at every stage.",
      steps: [
        {
          number: "01",
          title: "Discovery & Strategy",
          description:
            "We begin with a deep understanding of your business goals, target audience, and requirements. Based on this, we develop a tailored strategy for your project.",
        },
        {
          number: "02",
          title: "Concept & Design",
          description:
            "Based on the strategy, we create wireframes and designs that perfectly represent your brand and provide an optimal user experience. Iterative feedback loops ensure the final result meets your expectations.",
        },
        {
          number: "03",
          title: "Development & Testing",
          description:
            "Our development team implements the design using cutting-edge technologies. Regular testing and quality assurance ensure error-free functionality across all devices and browsers.",
        },
        {
          number: "04",
          title: "Launch & Optimization",
          description:
            "After a successful launch, we continue to support you with continuous optimization, maintenance, and support to ensure your digital solution is successful in the long term.",
        },
      ],
    },
    portfolio: {
      title: "Our Work",
      subtitle: "Selected projects showcasing our expertise",
      description:
        "Discover a selection of our most successful projects. Each project is the result of close collaboration with our clients and reflects our passion for excellent design and technical innovation.",
      viewAll: "View all projects",
      categories: {
        all: "All",
        web: "Web",
        app: "App",
        design: "Design",
        marketing: "Marketing",
      },
      projects: [
        {
          title: "E-Commerce Platform",
          category: "Web",
          desc: "Modern online shopping experience with React and Node.js for a leading fashion retailer. Includes payment processing, product management, and customer accounts. The platform led to a 35% increase in revenue in the first year.",
          client: "Fashion Store GmbH",
          year: "2023",
          technologies: ["React", "Node.js", "MongoDB", "Stripe"],
          results: ["35% revenue increase", "42% more mobile users", "28% higher conversion rate"],
          image: "/placeholder.svg?height=400&width=600&text=E-Commerce+Platform",
        },
        {
          title: "Fitness Tracker App",
          category: "App",
          desc: "Mobile application for tracking fitness goals with personalized workout plans, nutrition diary, and progress analysis. The app has been downloaded over 100,000 times and has a rating of 4.8/5 stars.",
          client: "FitLife AG",
          year: "2022",
          technologies: ["React Native", "Firebase", "Redux", "HealthKit"],
          results: ["100,000+ downloads", "4.8/5 star rating", "87% user retention"],
          image: "/placeholder.svg?height=400&width=600&text=Fitness+App",
        },
        {
          title: "Corporate Branding",
          category: "Design",
          desc: "Complete brand design for a technology company, including logo, color palette, typography, and design guidelines for all communication channels. The rebranding led to significantly improved brand perception and recognition in the market.",
          client: "TechVision GmbH",
          year: "2023",
          technologies: ["Adobe CC", "Figma", "Brand Strategy", "Motion Design"],
          results: ["42% higher brand awareness", "Design excellence award", "Unified brand presence"],
          image: "/placeholder.svg?height=400&width=600&text=Corporate+Branding",
        },
        {
          title: "Real Estate Portal",
          category: "Web",
          desc: "Platform for searching and managing properties with interactive map, detailed filtering options, and virtual property tours. The portal has increased the brokerage rate by 45%.",
          client: "ImmoFinder AG",
          year: "2022",
          technologies: ["Next.js", "TypeScript", "PostgreSQL", "Google Maps API"],
          results: ["45% higher brokerage rate", "65% more leads", "Reduced search time by 30%"],
          image: "/placeholder.svg?height=400&width=600&text=Real+Estate+Portal",
        },
        {
          title: "Travel Guide App",
          category: "App",
          desc: "Interactive travel guide with offline maps, attractions, restaurant recommendations, and personalized travel routes. The app has been recommended in several travel magazines.",
          client: "TravelGuide GmbH",
          year: "2023",
          technologies: ["Flutter", "Firebase", "MapBox", "AI Recommendations"],
          results: ["250,000+ downloads", "Featured in App Store", "Average 45 min daily usage"],
          image: "/placeholder.svg?height=400&width=600&text=Travel+Guide+App",
        },
        {
          title: "Online Banking Dashboard",
          category: "Web",
          desc: "User-friendly dashboard for online banking with real-time transactions, financial analysis, and budget planning. The new interface has improved user satisfaction by 40%.",
          client: "DigitalBank AG",
          year: "2022",
          technologies: ["Vue.js", "D3.js", "Node.js", "PostgreSQL"],
          results: ["40% higher user satisfaction", "28% more active users", "Reduced support requests by 35%"],
          image: "/placeholder.svg?height=400&width=600&text=Banking+Dashboard",
        },
      ],
    },
    testimonials: {
      title: "Testimonials",
      subtitle: "What our clients say",
      description:
        "Learn what our clients say about working with us. We are proud of the long-term relationships we have built and the positive results we achieve for our clients.",
      items: [
        {
          quote:
            "Working with Codaro was an excellent experience. The team perfectly understood our vision and translated it into a digital experience that exceeded our expectations.",
          author: "Maria Schmidt",
          position: "Marketing Director",
          company: "Fashion Store GmbH",
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          quote:
            "From initial concept to launch, the team was extremely professional and responsive. Our app has already exceeded all expectations in the first weeks after launch.",
          author: "Thomas Müller",
          position: "CEO",
          company: "FitLife AG",
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          quote:
            "Rebranding our company was a crucial step for us. Codaro guided us through the entire process and delivered a result that perfectly represents our brand.",
          author: "Julia Weber",
          position: "Brand Manager",
          company: "TechVision GmbH",
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    technologies: {
      title: "Technologies",
      subtitle: "What we work with",
      description:
        "We use cutting-edge technologies and frameworks to develop scalable, performant, and future-proof solutions. Our team continuously educates themselves to stay at the forefront of technological advancements.",
      frontend: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "GSAP"],
      backend: ["Node.js", "Express", "Django", "Laravel", "GraphQL", "REST API"],
      database: ["PostgreSQL", "MongoDB", "Firebase", "Redis", "MySQL", "Supabase"],
      tools: ["Git", "Docker", "AWS", "Vercel", "Figma", "Adobe Creative Cloud"],
    },
    about: {
      title: "About Us",
      subtitle: "Our team of experts",
      description:
        "We are a team of passionate designers and developers creating digital solutions that excite and inspire. With over 10 years of experience in the industry, we have worked with clients from various sectors and understand the specific requirements and challenges of each project. Our goal is not just to create beautiful websites, but to craft digital experiences that deliver results.",
      mission:
        "Our mission is to develop innovative digital solutions that help businesses succeed in the digital world. We believe in the power of good design and technology to achieve business goals and create positive user experiences.",
      values: [
        {
          title: "Quality",
          description: "We strive for excellence in everything we do, from initial concept to finished product.",
        },
        {
          title: "Innovation",
          description:
            "We stay at the forefront of technology and integrate new technologies and trends into our work.",
        },
        {
          title: "Collaboration",
          description: "We believe in the power of teamwork and close collaboration with our clients.",
        },
        {
          title: "Transparency",
          description:
            "Open communication and honesty are the foundation for successful projects and long-term relationships.",
        },
      ],
      stats: [
        { value: "10+", label: "Years of experience" },
        { value: "150+", label: "Completed projects" },
        { value: "50+", label: "Satisfied clients" },
        { value: "15", label: "Awards" },
      ],
      team: [],
    },
    blog: {
      title: "Blog & Insights",
      subtitle: "Latest articles and thoughts",
      readMore: "Read more",
      posts: [
        {
          title: "The Future of Web Design: Trends for 2024",
          excerpt:
            "Discover the latest design trends that will shape the web in the coming year, from 3D elements to micro-interactions.",
          fullText:
            "Discover the latest design trends that will shape the web in the coming year, from 3D elements to micro-interactions. Over the past few years, web design has evolved rapidly. Particularly noticeable is the trend towards more depth and dimension through 3D elements. These not only provide websites with a visual wow effect but also enable new types of interaction and navigation. Micro-interactions are also gaining increasing importance. These small animations and feedback mechanisms make the user experience more intuitive and pleasant. In terms of color schemes, clear trends are emerging for 2024: Bold, saturated colors combined with subtle gradients will dominate. Additionally, fonts are becoming more experimental and expressive, while readability remains a priority. Another important trend is the increasing significance of accessible design. This encompasses not only technical aspects such as screen reader compatibility but also visual elements such as sufficient contrast ratios and clear hierarchies. Overall, the web design trends for 2024 represent an exciting mix of technological innovation and user-centered design. As web technologies advance, designers have more tools at their disposal to create immersive, engaging experiences while maintaining the performance and accessibility that users expect. The challenge will be balancing these innovative design elements with practical considerations like load times and usability across different devices and connection speeds.",
          date: "March 15, 2024",
          category: "Design",
          image: "/placeholder.svg?height=300&width=500&text=Design+Trends",
        },
        {
          title: "Why Performance is Crucial for Your Website",
          excerpt:
            "A fast website is not only good for user experience but also for SEO and conversion rates. Learn how to optimize your website.",
          fullText:
            "A fast website is not only good for user experience but also for SEO and conversion rates. In today's digital landscape, where users are becoming increasingly impatient and Google considers loading speed as a ranking factor, performance has become a critical success factor. Studies show that even a one-second delay can reduce the conversion rate by up to 7%. Especially in the e-commerce sector, this can have significant financial implications. To improve the performance of your website, you should first conduct a thorough analysis. Tools like Google PageSpeed Insights or WebPageTest offer valuable insights into areas with optimization potential. The most important optimization measures include compressing images, minimizing JavaScript and CSS, implementing browser caching, and using Content Delivery Networks (CDNs). The use of modern image formats like WebP can also significantly reduce loading times. Another important aspect is server response time. Choosing a reliable hosting provider and optimizing database queries can make a big difference here. For complex applications, implementing code splitting and lazy loading is also recommended to load only the resources that are actually needed. Remember: Every millisecond counts! Performance optimization is an ongoing process rather than a one-time task. Regular monitoring and testing are essential to maintain optimal website speed. With the rise of mobile internet usage, optimizing for mobile devices has become particularly important, as these often have slower connection speeds and less processing power than desktop computers.",
          date: "February 28, 2024",
          category: "Development",
          image: "/placeholder.svg?height=300&width=500&text=Performance",
        },
        {
          title: "The Role of AI in Modern Web Development",
          excerpt:
            "Artificial intelligence is revolutionizing the way we develop websites and applications. Learn how AI can improve your digital presence.",
          fullText:
            "Artificial intelligence is revolutionizing the way we develop websites and applications. In recent years, AI-powered tools and technologies have had an enormous impact on web development, offering new possibilities for personalizing and optimizing user interactions. One of the most exciting applications of AI in web development is the automation of repetitive tasks. From code generation to automatic error correction, AI tools can significantly accelerate the development process and free up resources for more creative aspects of the project. Chatbots and virtual assistants are another example of the successful use of AI on the web. These intelligent systems can answer customer inquiries in real-time and provide personalized recommendations, which can increase both customer satisfaction and conversion rates. Particularly in the e-commerce sector, the use of AI for product recommendations has proven to be extremely effective. By analyzing user behavior, AI algorithms can suggest relevant products and thus improve the shopping experience. Another interesting trend is the use of AI for content creation and optimization. From generating blog articles to optimizing headlines for SEO, AI tools can provide valuable support. AI is also playing an increasingly important role in the field of User Experience (UX). By analyzing user data, AI systems can identify weaknesses in the user interface and make suggestions for improvement. However, with all the enthusiasm for AI, it's important not to lose sight of the ethical implications. Topics such as data protection, transparency, and potential bias in algorithms require careful consideration and responsible implementation. The key to successful AI integration lies in finding the right balance between automation and human oversight, ensuring that technology serves to enhance human creativity rather than replace it.",
          date: "February 10, 2024",
          category: "Technology",
          image: "/placeholder.svg?height=300&width=500&text=AI",
        },
      ],
    },
    contact: {
      title: "Contact",
      subtitle: "Talk to us about your next project",
      description:
        "Ready to start your next digital project? Contact us for a no-obligation conversation. We look forward to learning more about your goals and how we can help you achieve them.",
      name: "Name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      project: "Project Description",
      budget: "Budget",
      message: "Message",
      submit: "Send Inquiry",
      address: "123 Sample Street, 10115 Berlin",
      phoneNumber: "+49 30 1234567",
      emailAddress: "info@codaro.com",
      success: "Thank you for your message! We will get back to you shortly.",
      budgetOptions: ["< $5,000", "$5,000 - $10,000", "$10,000 - $25,000", "$25,000 - $50,000", "> $50,000"],
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            question: "How long does it take to develop a website?",
            answer:
              "The development time depends on the complexity of the project. A simple website can be completed in 4-6 weeks, while more complex projects can take 3-6 months.",
          },
          {
            question: "What information do you need for a quote?",
            answer:
              "For an accurate quote, we need information about the project scope, desired features, timeline, and budget. The more detailed your request, the more precise our quote can be.",
          },
          {
            question: "Do you offer maintenance and support after launch?",
            answer:
              "Yes, we offer various maintenance and support packages to ensure your website or app functions optimally and is always up to date.",
          },
        ],
      },
    },
    footer: {
      rights: "© 2024 Codaro. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      imprint: "Imprint",
      newsletter: {
        title: "Subscribe to our newsletter",
        desc: "Get the latest updates and offers",
        placeholder: "Your email address",
        button: "Subscribe",
      },
      sections: {
        company: "Company",
        services: "Services",
        resources: "Resources",
      },
      links: {
        company: ["About Us", "Team", "Careers", "Contact"],
        services: ["Web Development", "App Development", "UI/UX Design", "Digital Marketing"],
        resources: ["Blog", "Case Studies", "Resources", "FAQ"],
      },
    },
    cta: {
      title: "Ready for your next project?",
      description: "Let's create something great together. Contact us today for a no-obligation conversation.",
      button: "Get in touch",
      secondary: "View portfolio",
    },
  },
}

export default function WebAgencyPortfolio() {
  const [language, setLanguage] = useState("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [expandedPost, setExpandedPost] = useState<number | null>(null)

  const headerRef = useRef(null)
  const scrollTopRef = useRef(null)

  // Automatische Spracherkennung basierend auf Browser-Einstellungen
  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage
    if (userLang.startsWith("de")) {
      setLanguage("de")
    } else {
      setLanguage("en")
    }
  }, [])

  // Scroll-Effekte
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      if (scrollPosition > 500) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // Hier würde normalerweise die Formularverarbeitung stattfinden
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
    }, 5000)
  }

  const t = translations[language]

  return (
    <div className="min-h-screen flex flex-col bg-cream dark:bg-navy">
      {/* Header/Navigation */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? "bg-cream/95 dark:bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80 dark:supports-[backdrop-filter]:bg-navy/80 shadow-sm"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-12 w-auto">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bildschirmfoto%202025-04-06%20um%2010.49.36-Bjni4qeFfeUab1We0KppaGs6r8hG7J.png"
                alt="Codaro Logo"
                width={180}
                height={48}
                className="h-12 w-auto"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#home" className="text-sm font-medium text-navy hover:text-accent transition-colors">
              {t.nav.home}
            </Link>
            <Link href="#services" className="text-sm font-medium text-navy hover:text-accent transition-colors">
              {t.nav.services}
            </Link>
            <Link href="#process" className="text-sm font-medium text-navy hover:text-accent transition-colors">
              {t.nav.process}
            </Link>
            <Link href="#portfolio" className="text-sm font-medium text-navy hover:text-accent transition-colors">
              {t.nav.portfolio}
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-navy hover:text-accent transition-colors">
              {t.nav.testimonials}
            </Link>
            <Link href="#about" className="text-sm font-medium text-navy hover:text-accent transition-colors">
              {t.nav.about}
            </Link>
            <Link href="#contact" className="text-sm font-medium text-navy hover:text-accent transition-colors">
              {t.nav.contact}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex border border-navy rounded-md overflow-hidden">
              <button
                onClick={() => setLanguage("de")}
                className={`px-3 py-1 text-xs font-medium ${language === "de" ? "bg-navy text-cream" : "bg-cream text-navy"}`}
              >
                DE
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 text-xs font-medium ${language === "en" ? "bg-navy text-cream" : "bg-cream text-navy"}`}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-navy"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="flex flex-col p-4 space-y-4 bg-cream dark:bg-navy">
              <Link
                href="#home"
                className="text-sm font-medium text-navy dark:text-cream hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.home}
              </Link>
              <Link
                href="#services"
                className="text-sm font-medium text-navy dark:text-cream hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.services}
              </Link>
              <Link
                href="#process"
                className="text-sm font-medium text-navy dark:text-cream hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.process}
              </Link>
              <Link
                href="#portfolio"
                className="text-sm font-medium text-navy dark:text-cream hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.portfolio}
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium text-navy dark:text-cream hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.testimonials}
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium text-navy dark:text-cream hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.about}
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium text-navy dark:text-cream hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.contact}
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="home"
          className="relative py-20 md:py-32 bg-gradient-to-br from-beige to-lightBeige dark:from-navy dark:to-darkNavy overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
          </div>
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <Badge
                  className="px-3 py-1 text-sm font-medium rounded-full"
                  style={{ backgroundColor: codaroColors.beige, color: codaroColors.navy }}
                >
                  {t.hero.badge}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight text-navy dark:text-cream">
                  {t.hero.title}
                </h1>
                <p className="text-xl text-navy/70 dark:text-cream/70 max-w-[600px]">{t.hero.subtitle}</p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="group relative overflow-hidden bg-navy text-cream hover:bg-accent">
                    <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-white/20 group-hover:translate-x-full"></span>
                    <span className="relative flex items-center">
                      <span className="mr-2">+</span> {t.hero.cta}
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-navy text-navy hover:bg-navy/10 dark:border-cream dark:text-cream dark:hover:bg-cream/10"
                  >
                    {t.hero.secondary}
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-navy/20 dark:border-cream/20">
                  {t.hero.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-navy dark:text-cream">{stat.value}</div>
                      <div className="text-xs text-navy/70 dark:text-cream/70">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
                <div
                  className="absolute inset-0 rounded-lg overflow-hidden"
                  style={{ background: codaroColors.gradient }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=500&width=500"
                      alt="Codaro Hero"
                      width={500}
                      height={500}
                      className="object-cover mix-blend-overlay"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-navy/20 to-transparent"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-accent/20 opacity-30 animate-float"></div>
                <div className="absolute bottom-10 -left-6 w-16 h-16 rounded-full bg-accent/30 opacity-40 animate-float-delay"></div>
                <div className="absolute top-1/2 right-1/4 w-12 h-12 rounded-full bg-accent/40 opacity-30 animate-float-slow"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-beige dark:bg-darkNavy">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12 max-w-[800px] mx-auto">
              <Badge
                className="px-3 py-1 text-sm font-medium rounded-full"
                style={{ backgroundColor: codaroColors.beige, color: codaroColors.navy }}
              >
                {t.services.subtitle}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-navy dark:text-cream">
                {t.services.title}
              </h2>
              <p className="text-navy/70 dark:text-cream/70">{t.services.description}</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[t.services.web, t.services.app, t.services.design, t.services.marketing].map((service, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group bg-lightBeige dark:bg-navy"
                  style={{ borderTopColor: codaroColors.navy, borderTopWidth: "4px" }}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-6">
                      <div
                        className="p-3 rounded-full inline-flex"
                        style={{ backgroundColor: codaroColors.accentLight }}
                      >
                        {React.createElement(service.icon, {
                          className: "h-6 w-6",
                          style: { color: codaroColors.navy },
                        })}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-navy dark:text-cream">{service.title}</h3>
                    <p className="text-navy/70 dark:text-cream/70 text-sm mb-6 flex-grow">{service.desc}</p>
                    <div className="space-y-2 mt-auto">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <Check className="h-4 w-4 mr-2 flex-shrink-0 text-accent" />
                          <span className="text-navy/80 dark:text-cream/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button
                      variant="ghost"
                      className="w-full justify-start p-0 hover:bg-transparent group-hover:text-accent text-navy dark:text-cream"
                    >
                      {language === "de" ? "Mehr erfahren" : "Learn more"}{" "}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section
          id="process"
          className="py-20 bg-gradient-to-br from-lightBeige to-beige dark:from-navy dark:to-darkNavy"
        >
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16 max-w-[800px] mx-auto">
              <Badge
                className="px-3 py-1 text-sm font-medium rounded-full"
                style={{ backgroundColor: codaroColors.beige, color: codaroColors.navy }}
              >
                {t.process.subtitle}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-navy dark:text-cream">
                {t.process.title}
              </h2>
              <p className="text-navy/70 dark:text-cream/70">{t.process.description}</p>
            </div>

            <div className="relative">
              {/* Process Timeline Line */}
              <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-navy/20 dark:bg-cream/20 md:transform md:-translate-x-1/2"></div>

              <div className="space-y-12 relative">
                {t.process.steps.map((step, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col md:flex-row gap-8 md:gap-16 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className="md:w-1/2 flex justify-start md:justify-end items-start relative">
                      <div className="absolute left-0 md:left-auto md:right-0 top-0 w-8 h-8 rounded-full flex items-center justify-center z-10 bg-navy dark:bg-cream">
                        <span className="text-cream dark:text-navy text-xs font-bold">{index + 1}</span>
                      </div>
                      <div className={`pl-12 md:pl-0 ${index % 2 === 1 ? "md:pr-12" : "md:pr-0"}`}>
                        <div
                          className="p-1 rounded-full inline-flex mb-4"
                          style={{ backgroundColor: codaroColors.accentLight }}
                        >
                          <div className="p-2 rounded-full bg-navy/10 dark:bg-cream/10">
                            <span className="text-xl font-bold text-navy dark:text-cream">{step.number}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-navy dark:text-cream">{step.title}</h3>
                        <p className="text-navy/70 dark:text-cream/70">{step.description}</p>
                      </div>
                    </div>
                    <div className="md:w-1/2 hidden md:block"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 bg-cream dark:bg-navy">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12 max-w-[800px] mx-auto">
              <Badge
                className="px-3 py-1 text-sm font-medium rounded-full"
                style={{ backgroundColor: codaroColors.beige, color: codaroColors.navy }}
              >
                {t.portfolio.subtitle}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-navy dark:text-cream">
                {t.portfolio.title}
              </h2>
              <p className="text-navy/70 dark:text-cream/70">{t.portfolio.description}</p>
            </div>

            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <div className="flex justify-center mb-12">
                <TabsList className="bg-beige dark:bg-navy/50 p-1">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-cream dark:data-[state=active]:bg-navy text-navy dark:text-cream"
                  >
                    {t.portfolio.categories.all}
                  </TabsTrigger>
                  <TabsTrigger
                    value="web"
                    className="data-[state=active]:bg-cream dark:data-[state=active]:bg-navy text-navy dark:text-cream"
                  >
                    {t.portfolio.categories.web}
                  </TabsTrigger>
                  <TabsTrigger
                    value="app"
                    className="data-[state=active]:bg-cream dark:data-[state=active]:bg-navy text-navy dark:text-cream"
                  >
                    {t.portfolio.categories.app}
                  </TabsTrigger>
                  <TabsTrigger
                    value="design"
                    className="data-[state=active]:bg-cream dark:data-[state=active]:bg-navy text-navy dark:text-cream"
                  >
                    {t.portfolio.categories.design}
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {t.portfolio.projects.map((project, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden group border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-lightBeige dark:bg-navy"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={600}
                          height={400}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-6">
                          <div>
                            <Badge
                              className="mb-2"
                              style={{ backgroundColor: codaroColors.beige, color: codaroColors.navy }}
                            >
                              {project.category}
                            </Badge>
                            <h3 className="text-xl font-bold text-cream mb-1">{project.title}</h3>
                            <p className="text-cream/80 text-sm mb-4">
                              {project.client} • {project.year}
                            </p>
                            <Button variant="secondary" size="sm" className="bg-cream text-navy hover:bg-cream/90">
                              {language === "de" ? "Projekt ansehen" : "View Project"}
                            </Button>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className="bg-accentLight text-navy border-navy/20 dark:bg-navy/20 dark:text-cream dark:border-cream/20"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="font-bold mb-2 text-lg text-navy dark:text-cream">{project.title}</h3>
                        <p className="text-sm text-navy/70 dark:text-cream/70 mb-4">{project.desc}</p>
                        <div className="space-y-1">
                          {project.results.map((result, resultIndex) => (
                            <div key={resultIndex} className="flex items-center text-sm">
                              <Check className="h-4 w-4 mr-2 flex-shrink-0 text-accent" />
                              <span className="text-navy/80 dark:text-cream/80">{result}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="web" className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {t.portfolio.projects
                    .filter((project) => project.category === "Web")
                    .map((project, index) => (
                      <Card
                        key={index}
                        className="overflow-hidden group border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-lightBeige dark:bg-navy"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={600}
                            height={400}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-6">
                            <div>
                              <Badge
                                className="mb-2"
                                style={{ backgroundColor: codaroColors.beige, color: codaroColors.navy }}
                              >
                                {project.category}
                              </Badge>
                              <h3 className="text-xl font-bold text-cream mb-1">{project.title}</h3>
                              <p className="text-cream/80 text-sm mb-4">
                                {project.client} • {project.year}
                              </p>
                              <Button variant="secondary" size="sm" className="bg-cream text-navy hover:bg-cream/90">
                                {language === "de" ? "Projekt ansehen" : "View Project"}
                              </Button>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.technologies.map((tech, techIndex) => (
                              <Badge
                                key={techIndex}
                                variant="outline"
                                className="bg-accentLight text-navy border-navy/20 dark:bg-navy/20 dark:text-cream dark:border-cream/20"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="font-bold mb-2 text-lg text-navy dark:text-cream">{project.title}</h3>
                          <p className="text-sm text-navy/70 dark:text-cream/70 mb-4">{project.desc}</p>
                          <div className="space-y-1">
                            {project.results.map((result, resultIndex) => (
                              <div key={resultIndex} className="flex items-center text-sm">
                                <Check className="h-4 w-4 mr-2 flex-shrink-0 text-accent" />
                                <span className="text-navy/80 dark:text-cream/80">{result}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="app" className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {t.portfolio.projects
                    .filter((project) => project.category === "App")
                    .map((project, index) => (
                      <Card
                        key={index}
                        className="overflow-hidden group border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-lightBeige dark:bg-navy"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={600}
                            height={400}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-6">
                            <div>
                              <Badge
                                className="mb-2"
                                style={{ backgroundColor: codaroColors.beige, color: codaroColors.navy }}
                              >
                                {project.category}
                              </Badge>
                              <h3 className="text-xl font-bold text-cream mb-1">{project.title}</h3>
                              <p className="text-cream/80 text-sm mb-4">
                                {project.client} • {project.year}
                              </p>
                              <Button variant="secondary" size="sm" className="bg-cream text-navy hover:bg-cream/90">
                                {language === "de" ? "Projekt ansehen" : "View Project"}
                              </Button>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.technologies.map((tech, techIndex) => (
                              <Badge
                                key={techIndex}
                                variant="outline"
                                className="bg-accentLight text-navy border-navy/20 dark:bg-navy/20 dark:text-cream dark:border-cream/20"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="font-bold mb-2 text-lg text-navy dark:text-cream">{project.title}</h3>
                          <p className="text-sm text-navy/70 dark:text-cream/70 mb-4">{project.desc}</p>
                          <div className="space-y-1">
                            {project.results.map((result, resultIndex) => (
                              <div key={resultIndex} className="flex items-center text-sm">
                                <Check className="h-4 w-4 mr-2 flex-shrink-0 text-accent" />
                                <span className="text-navy/80 dark:text-cream/80">{result}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="design" className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {t.portfolio.projects
                    .filter((project) => project.category === "Design")
                    .map((project, index) => (
                      <Card
                        key={index}
                        className="overflow-hidden group border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-lightBeige dark:bg-navy"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={600}
                            height={400}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-6">
                            <div>
                              <Badge
                                className="mb-2"
                                style={{ backgroundColor: codaroColors.beige, color: codaroColors.navy }}
                              >
                                {project.category}
                              </Badge>
                              <h3 className="text-xl font-bold text-cream mb-1">{project.title}</h3>
                              <p className="text-cream/80 text-sm mb-4">
                                {project.client} • {project.year}
                              </p>
                              <Button variant="secondary" size="sm" className="bg-cream text-navy hover:bg-cream/90">
                                {language === "de" ? "Projekt ansehen" : "View Project"}
                              </Button>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.technologies.map((tech, techIndex) => (
                              <Badge
                                key={techIndex}
                                variant="outline"
                                className="bg-accentLight text-navy border-navy/20 dark:bg-navy/20 dark:text-cream dark:border-cream/20"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="font-bold mb-2 text-lg text-navy dark:text-cream">{project.title}</h3>
                          <p className="text-sm text-navy/70 dark:text-cream/70 mb-4">{project.desc}</p>
                          <div className="space-y-1">
                            {project.results.map((result, resultIndex) => (
                              <div key={resultIndex} className="flex items-center text-sm">
                                <Check className="h-4 w-4 mr-2 flex-shrink-0 text-accent" />
                                <span className="text-navy/80 dark:text-cream/80">{result}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="group border-navy text-navy hover:bg-navy/10 dark:border-cream dark:text-cream dark:hover:bg-cream/10"
              >
                {t.portfolio.viewAll}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-20 bg-beige dark:bg-navy">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12 max-w-[800px] mx-auto">
              <Badge
                className="px-3 py-1 text-sm font-medium rounded-full"
                style={{ backgroundColor: codaroColors.beige, color: codaroColors.navy }}
              >
                {t.blog.subtitle}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-navy dark:text-cream">
                {t.blog.title}
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {t.blog.posts.map((post, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group bg-lightBeige dark:bg-navy"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={500}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-cream text-navy">{post.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="text-sm text-navy/60 dark:text-cream/60 mb-2">{post.date}</div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors text-navy dark:text-cream">
                      {post.title}
                    </h3>
                    <div
                      className={`${expandedPost === index ? "" : "line-clamp-3"} text-navy/70 dark:text-cream/70 mb-4 transition-all duration-300`}
                    >
                      {post.fullText || post.excerpt}
                    </div>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto font-medium text-accent"
                      onClick={() => setExpandedPost(expandedPost === index ? null : index)}
                    >
                      {expandedPost === index
                        ? language === "de"
                          ? "Weniger anzeigen"
                          : "Show less"
                        : t.blog.readMore}{" "}
                      <ArrowRight
                        className={`ml-2 h-4 w-4 transition-transform ${expandedPost === index ? "rotate-90" : "group-hover:translate-x-1"}`}
                      />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-navy to-accent text-cream">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">{t.cta.title}</h2>
                <p className="text-cream/80 max-w-[600px]">{t.cta.description}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-cream text-navy hover:bg-cream/90">
                  {t.cta.button}
                </Button>
                <Button variant="outline" size="lg" className="border-cream text-cream hover:bg-navy/50">
                  {t.cta.secondary}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-lightBeige dark:bg-darkNavy">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12 max-w-[800px] mx-auto">
              <Badge
                className="px-3 py-1 text-sm font-medium rounded-full"
                style={{ backgroundColor: codaroColors.beige, color: codaroColors.navy }}
              >
                {t.contact.subtitle}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-navy dark:text-cream">
                {t.contact.title}
              </h2>
              <p className="text-navy/70 dark:text-cream/70">{t.contact.description}</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="border-0 shadow-lg bg-lightBeige dark:bg-navy">
                <CardContent className="p-6">
                  {formSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <Check className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-navy dark:text-cream">
                        {language === "de" ? "Nachricht gesendet!" : "Message Sent!"}
                      </h3>
                      <p className="text-navy/70 dark:text-cream/70">{t.contact.success}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-navy dark:text-cream">
                            {t.contact.name} <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="name"
                            required
                            className="w-full bg-cream border-navy/20 text-navy dark:bg-navy/50 dark:border-cream/20 dark:text-cream"
                            placeholder={language === "de" ? "Ihr Name" : "Your name"}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-navy dark:text-cream">
                            {t.contact.email} <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="email"
                            type="email"
                            required
                            className="w-full bg-cream border-navy/20 text-navy dark:bg-navy/50 dark:border-cream/20 dark:text-cream"
                            placeholder={language === "de" ? "Ihre E-Mail" : "Your email"}
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium text-navy dark:text-cream">
                            {t.contact.phone}
                          </label>
                          <Input
                            id="phone"
                            type="tel"
                            className="w-full bg-cream border-navy/20 text-navy dark:bg-navy/50 dark:border-cream/20 dark:text-cream"
                            placeholder={language === "de" ? "Ihre Telefonnummer" : "Your phone number"}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="company" className="text-sm font-medium text-navy dark:text-cream">
                            {t.contact.company}
                          </label>
                          <Input
                            id="company"
                            className="w-full bg-cream border-navy/20 text-navy dark:bg-navy/50 dark:border-cream/20 dark:text-cream"
                            placeholder={language === "de" ? "Ihr Unternehmen" : "Your company"}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="budget" className="text-sm font-medium text-navy dark:text-cream">
                          {t.contact.budget}
                        </label>
                        <select
                          id="budget"
                          className="flex h-10 w-full rounded-md border border-navy/20 bg-cream px-3 py-2 text-sm text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-cream/20 dark:bg-navy/50 dark:text-cream"
                        >
                          <option value="">{language === "de" ? "Bitte wählen" : "Please select"}</option>
                          {t.contact.budgetOptions.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="project" className="text-sm font-medium text-navy dark:text-cream">
                          {t.contact.project} <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          id="project"
                          required
                          className="min-h-[120px] w-full bg-cream border-navy/20 text-navy dark:bg-navy/50 dark:border-cream/20 dark:text-cream"
                          placeholder={language === "de" ? "Beschreiben Sie Ihr Projekt" : "Describe your project"}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-navy text-cream hover:bg-accent dark:bg-cream dark:text-navy dark:hover:bg-cream/90"
                      >
                        {t.contact.submit}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-navy dark:text-cream">
                    {language === "de" ? "Kontaktinformationen" : "Contact Information"}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mr-4 p-2 rounded-full bg-accentLight">
                        <MapPin className="h-5 w-5 text-navy" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1 text-navy dark:text-cream">
                          {language === "de" ? "Adresse" : "Address"}
                        </h4>
                        <p className="text-navy/70 dark:text-cream/70">{t.contact.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-4 p-2 rounded-full bg-accentLight">
                        <Phone className="h-5 w-5 text-navy" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1 text-navy dark:text-cream">
                          {language === "de" ? "Telefon" : "Phone"}
                        </h4>
                        <p className="text-navy/70 dark:text-cream/70">{t.contact.phoneNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-4 p-2 rounded-full bg-accentLight">
                        <Mail className="h-5 w-5 text-navy" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1 text-navy dark:text-cream">
                          {language === "de" ? "E-Mail" : "Email"}
                        </h4>
                        <p className="text-navy/70 dark:text-cream/70">{t.contact.emailAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-navy dark:text-cream">{t.contact.faq.title}</h3>
                  <div className="space-y-4">
                    {t.contact.faq.items.map((item, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border border-navy/20 dark:border-cream/20 bg-lightBeige dark:bg-navy"
                      >
                        <h4 className="font-medium mb-2 text-navy dark:text-cream">{item.question}</h4>
                        <p className="text-sm text-navy/70 dark:text-cream/70">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-navy/20 dark:border-cream/20 py-12 bg-beige dark:bg-navy">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-auto">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bildschirmfoto%202025-04-06%20um%2010.49.36-Bjni4qeFfeUab1We0KppaGs6r8hG7J.png"
                    alt="Codaro Logo"
                    width={150}
                    height={40}
                    className="h-10 w-auto"
                  />
                </div>
              </div>
              <p className="text-sm text-navy/70 dark:text-cream/70 max-w-[300px]">
                {language === "de"
                  ? "Wir sind eine preisgekrönte Digitalagentur, die innovative Lösungen für moderne Unternehmen entwickelt."
                  : "We are an award-winning digital agency creating innovative solutions for modern businesses."}
              </p>
              <div className="flex gap-4">
                <Link href="#" className="p-2 rounded-full bg-accentLight hover:bg-navy/10 text-navy transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link href="#" className="p-2 rounded-full bg-accentLight hover:bg-navy/10 text-navy transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" className="p-2 rounded-full bg-accentLight hover:bg-navy/10 text-navy transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="#" className="p-2 rounded-full bg-accentLight hover:bg-navy/10 text-navy transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-navy dark:text-cream">{t.footer.sections.company}</h3>
              <ul className="space-y-2">
                {t.footer.links.company.map((link, index) => (
                  <li key={index}>
                    <Link href="#" className="text-navy/70 dark:text-cream/70 hover:text-accent transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-navy dark:text-cream">{t.footer.sections.services}</h3>
              <ul className="space-y-2">
                {t.footer.links.services.map((link, index) => (
                  <li key={index}>
                    <Link href="#" className="text-navy/70 dark:text-cream/70 hover:text-accent transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-navy dark:text-cream">{t.footer.newsletter.title}</h3>
              <p className="text-sm text-navy/70 dark:text-cream/70 mb-4">{t.footer.newsletter.desc}</p>
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t.footer.newsletter.placeholder}
                  className="flex-1 bg-cream border-navy/20 text-navy dark:bg-navy/50 dark:border-cream/20 dark:text-cream"
                />
                <Button
                  type="submit"
                  className="bg-navy text-cream hover:bg-accent dark:bg-cream dark:text-navy dark:hover:bg-cream/90"
                >
                  {t.footer.newsletter.button}
                </Button>
              </form>
            </div>
          </div>

          <Separator className="my-8 bg-navy/20 dark:bg-cream/20" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-navy/70 dark:text-cream/70">{t.footer.rights}</p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-navy/70 dark:text-cream/70 hover:text-accent transition-colors">
                {t.footer.privacy}
              </Link>
              <Link href="#" className="text-sm text-navy/70 dark:text-cream/70 hover:text-accent transition-colors">
                {t.footer.terms}
              </Link>
              <Link href="#" className="text-sm text-navy/70 dark:text-cream/70 hover:text-accent transition-colors">
                {t.footer.imprint}
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          ref={scrollTopRef}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-50 transition-all duration-300 hover:transform hover:scale-110 bg-navy text-cream hover:bg-accent"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Add CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes float-delay {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes float-slow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(0, 31, 63, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 31, 63, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  )
}

