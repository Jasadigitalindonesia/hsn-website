export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  description: string;
  specs: string[];
  priceRange: string;
  isFeatured: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  date: string;
  image: string;
  excerpt: string;
  author: string;
  readTime: string;
}

export interface QuotationRequest {
  id: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  clientCompany?: string;
  message?: string;
  productName?: string;
  productId?: string;
  products?: any[];
  status?: "pending" | "reviewed" | "contacted";
  notes?: string;
  date: string;
}

export const DEFAULT_BRANDS = [
  { name: "Mindray" },
  { name: "Philips" },
  { name: "GE Healthcare" },
  { name: "Siemens" },
  { name: "Drager" },
  { name: "Medtronic" },
  { name: "Nihon Kohden" },
  { name: "Omron" }
];

export const DEFAULT_PRODUCTS: Product[] = [];
export const DEFAULT_NEWS: NewsArticle[] = [];
export const DEFAULT_QUOTATIONS: QuotationRequest[] = [];

export function getStoredProducts(): Product[] {
  return DEFAULT_PRODUCTS;
}

export function saveStoredProducts(data: Product[]) {}

export function getStoredNews(): NewsArticle[] {
  return DEFAULT_NEWS;
}

export function saveStoredNews(data: NewsArticle[]) {}

export function getStoredQuotations(): QuotationRequest[] {
  return DEFAULT_QUOTATIONS;
}

export function saveStoredQuotations(data: QuotationRequest[]) {}
