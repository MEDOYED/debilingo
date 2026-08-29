export type CatRarity = "Common" | "Rare" | "Epic" | "Legendary";

export interface Cat {
  id: string;
  user_id: string;
  name: string;
  image_url: string;
  latitude: number;
  longitude: number;
  location_name?: string | null;
  breed?: string | null;
  rarity?: CatRarity;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
  accuracy?: number;
}
