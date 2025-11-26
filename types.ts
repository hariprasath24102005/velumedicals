export interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  shortDescription: string;
  description: string;
  dosage: string;
  inStock: boolean;
}

export interface CartItem extends Medicine {
  quantity: number;
}

export type Category = 'All' | 'Tablets' | 'Syrups' | 'Capsules' | 'Injections' | 'Topical';

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface GeminiSearchResponse {
  text: string;
  groundingChunks?: GroundingChunk[];
}
