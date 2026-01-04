export interface Settings {
  siteName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  githubProfile: string;
  linkedinProfile: string;
  email: string;
  businessEmail?: string;
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  topics: string[];
}

export interface ProductItem {
  title: string;
  description: string;
  url: string;
  isActive: boolean;
  language: string;
  topics: string[];
}

export interface PortfolioData {
  settings: Settings;
  services: ServiceItem[];
  products: ProductItem[];
}