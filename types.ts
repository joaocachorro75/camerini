
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  date: string;
  metaDescription: string;
}

export interface Lead {
  id: string;
  name: string;
  whatsapp: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  url: string; // Base64 for images, YouTube/Vimeo URL for videos
  type: 'image' | 'video';
  alt: string;
}

export interface SiteConfig {
  logo: string;
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    bgImage: string;
  };
  about: {
    sectionTag: string;
    title: string;
    text: string;
    image: string;
    stats: { label: string; value: string }[];
  };
  servicesHeader: {
    tag: string;
    title: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    whatsapp: string;
    instagram: string;
    facebook: string;
  };
  footer: {
    description: string;
    copyright: string;
    seoKeywords: string;
  };
  seo: {
    title: string;
    description: string;
    ogImage: string;
  };
}

export interface AppData {
  config: SiteConfig;
  services: Service[];
  testimonials: Testimonial[];
  blog: BlogPost[];
  leads: Lead[];
  gallery: GalleryItem[];
}
