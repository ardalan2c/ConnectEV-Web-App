export type CitySlug =
  | "toronto" | "mississauga" | "brampton" | "vaughan" | "markham"
  | "richmond-hill" | "oakville" | "etobicoke" | "north-york" | "scarborough";

export type Photo = { src: string; alt: string };

export const cityMedia: Record<CitySlug, { gallery: Photo[] }> = {
  "toronto": { gallery: [
    // Example (uncomment/edit after you drop files):
    // { src: "/service-areas/toronto/panel-1.jpg", alt: "Clean 200A panel upgrade" },
    // { src: "/service-areas/toronto/tesla-wall-connector.jpg", alt: "Tesla Wall Connector install" },
  ]},
  "mississauga": { gallery: [] },
  "brampton": { gallery: [] },
  "vaughan": { gallery: [] },
  "markham": { gallery: [] },
  "richmond-hill": { gallery: [] },
  "oakville": { gallery: [] },
  "etobicoke": { gallery: [] },
  "north-york": { gallery: [] },
  "scarborough": { gallery: [] },
};