export interface Destination {
  id: number;
  name: string;
  description: string;
  country: string;
  climate: string;
  currency: string;
  latitude: number;
  longitude: number;
  nearbyDestinations?: Array<{ id: number; name: string }>;
}

export interface NearbyDestination {
  id: number;
  name: string;
  distance: number;
}

export interface ISelectOption {
  value: string;
  label: string;
}
