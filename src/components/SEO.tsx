import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export default function SEO({
  title = 'Uplink Control - Профессиональный монтаж слаботочных систем в Мариуполе',
  description = 'Профессиональный монтаж видеонаблюдения, систем контроля доступа, пожарной сигнализации и слаботочных систем в Мариуполе. Опытные инженеры, гарантия качества, быстрая установка.',
  keywords = 'монтаж видеонаблюдения Мариуполь, установка камер Мариуполь, системы безопасности, слаботочные системы, контроль доступа, пожарная сигнализация, домофоны, Мариуполь',
  ogImage = 'https://cdn.poehali.dev/projects/3f6c5e91-9f9f-49a1-849d-03782890bfba/files/og-image-1766964139307.jpg',
  canonical = 'https://uplinkcontrol.ru'
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:url', canonical, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:site_name', 'Uplink Control', 'property');
    
    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image', 'property');
    updateMetaTag('twitter:title', title, 'property');
    updateMetaTag('twitter:description', description, 'property');
    updateMetaTag('twitter:image', ogImage, 'property');
    
    // Robots
    updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('googlebot', 'index, follow');
    
    // Canonical
    updateLinkTag('canonical', canonical);
    
    // Alternate languages
    updateLinkTag('alternate', canonical, 'ru-RU');
  }, [title, description, keywords, ogImage, canonical]);

  return null;
}

function updateMetaTag(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let element = document.querySelector(`meta[${attr}="${name}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}

function updateLinkTag(rel: string, href: string, hreflang?: string) {
  const selector = hreflang 
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  let element = document.querySelector(selector) as HTMLLinkElement;
  
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    if (hreflang) {
      element.setAttribute('hreflang', hreflang);
    }
    document.head.appendChild(element);
  }
  
  element.href = href;
}