import { useEffect } from 'react';

const StructuredData = () => {
  useEffect(() => {
    const businessScript = document.createElement('script');
    businessScript.type = 'application/ld+json';
    businessScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Uplink Control",
      "description": "Профессиональный монтаж видеонаблюдения, систем контроля доступа, пожарной сигнализации и слаботочных систем",
      "url": "https://uplinkcontrol.ru",
      "telephone": ["+7 (949) 006-61-80", "+7 (949) 514-33-38"],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Мариуполь",
        "addressCountry": "RU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "47.0956",
        "longitude": "37.5431"
      },
      "openingHours": "Mo-Su 09:00-21:00",
      "priceRange": "₽₽₽",
      "image": "https://cdn.poehali.dev/projects/3f6c5e91-9f9f-49a1-849d-03782890bfba/files/og-image-1766964139307.jpg",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Услуги по монтажу",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Монтаж видеонаблюдения",
              "description": "Установка и настройка систем видеонаблюдения любой сложности"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Системы контроля доступа",
              "description": "СКУД, турникеты, электронные замки"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Пожарная сигнализация",
              "description": "Проектирование и монтаж систем пожарной безопасности"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Охранная сигнализация",
              "description": "Современные системы охранной сигнализации"
            }
          }
        ]
      }
    });
    document.head.appendChild(businessScript);

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Главная",
          "item": "https://uplinkcontrol.ru"
        }
      ]
    });
    document.head.appendChild(breadcrumbScript);

    const websiteScript = document.createElement('script');
    websiteScript.type = 'application/ld+json';
    websiteScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Uplink Control",
      "url": "https://uplinkcontrol.ru",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://uplinkcontrol.ru/blog?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    });
    document.head.appendChild(websiteScript);

    const organizationScript = document.createElement('script');
    organizationScript.type = 'application/ld+json';
    organizationScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Uplink Control",
      "url": "https://uplinkcontrol.ru",
      "logo": "https://cdn.poehali.dev/files/лого-orig-white.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+7 (949) 006-61-80",
        "contactType": "customer service",
        "areaServed": "RU",
        "availableLanguage": "Russian"
      },
      "sameAs": [
        "https://vk.com/uplink.ctrl",
        "https://t.me/uplinkctrl180"
      ]
    });
    document.head.appendChild(organizationScript);

    return () => {
      if (businessScript.parentNode) {
        businessScript.parentNode.removeChild(businessScript);
      }
      if (breadcrumbScript.parentNode) {
        breadcrumbScript.parentNode.removeChild(breadcrumbScript);
      }
      if (websiteScript.parentNode) {
        websiteScript.parentNode.removeChild(websiteScript);
      }
      if (organizationScript.parentNode) {
        organizationScript.parentNode.removeChild(organizationScript);
      }
    };
  }, []);

  return null;
};

export default StructuredData;
