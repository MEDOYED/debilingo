export type CatRarity = "Common" | "Rare" | "Epic" | "Legendary";

export interface CreateCatPayload {
  name: string;
  image_url: string;
  latitude: number;
  longitude: number;
  location_name?: string;
  breed?: string;
  rarity?: CatRarity;
  notes?: string;
}

export type CatchStep = "camera" | "preview" | "success";

export interface GeoLocationState {
  lat: number | null;
  lng: number | null;
  accuracy?: number | null;
  error?: string | null;
  isFetching: boolean;
}
