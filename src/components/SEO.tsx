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
    
    // Twitter
    updateMetaTag('twitter:title', title, 'property');
    updateMetaTag('twitter:description', description, 'property');
    updateMetaTag('twitter:image', ogImage, 'property');
    
    // Canonical
    updateLinkTag('canonical', canonical);
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

function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  
  element.href = href;
}