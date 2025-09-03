export const GTA_CITIES = [
  'Toronto', 'North York', 'Scarborough', 'Etobicoke', 'Mississauga',
  'Brampton', 'Vaughan', 'Markham', 'Richmond Hill', 'Pickering',
  'Ajax', 'Whitby', 'Oshawa', 'Aurora', 'Newmarket', 'Maple',
  'Thornhill', 'Stouffville', 'King City', 'Bolton'
] as const;

export type GtaCity = typeof GTA_CITIES[number];