export interface NewsStory {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
}

export interface Hotspot {
  id: string;
  title: string;
  description: string;
  x: number; // percentage from left
  y: number; // percentage from top
  fullInfo: string;
}

export interface CustomizationOption {
  id: string;
  name: string;
  description: string;
  colorHex?: string;
  type: "skin" | "payload" | "specialty";
  costMultiplier: number;
}

