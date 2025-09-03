export const gtaCities = [
  "Toronto",
  "North York",
  "Scarborough",
  "Etobicoke",
  "Mississauga",
  "Brampton",
  "Vaughan",
  "Markham",
  "Richmond Hill",
] as const;

export type City = typeof gtaCities[number];

