export type CondoLetterData = {
  ownerName: string;
  unit: string;
  parkingSpot: string;
  buildingAddress: string;
  chargerModel: string; // e.g., Tesla Wall Connector Gen 3
  contractorName: string; // ACDC Electrical Tech Inc.
  contractorLicense: string; // ECRA/ESA #
  contactEmail: string;
  contactPhone: string;
};

export function renderCondoLetter(d: CondoLetterData) {
  return `
${d.ownerName}
${d.unit}
${d.buildingAddress}

Board of Directors
${d.buildingAddress}

Re: Request to Install Level‑2 EV Charger at Parking Spot ${d.parkingSpot}

Dear Board,

I am requesting approval to install a Level‑2 EV charging station (Model: ${d.chargerModel}) at my deeded parking space ${d.parkingSpot}. The installation will be performed by a **Licensed Electrical Contractor** and an **ESA notification of work (permit)** will be filed prior to commencement.

Contractor: ${d.contractorName}
ECRA/ESA License: ${d.contractorLicense}
Contact: ${d.contactEmail} • ${d.contactPhone}

Scope:
• Dedicated 240V circuit from my electrical panel to my parking space
• Load management as required by building capacity (e.g., DCC or smart splitter)
• Conduit run and neat surface mounting where applicable
• Post‑installation ESA inspection and compliance documentation

I acknowledge responsibility for all installation and ongoing electricity costs, as well as restoration of common elements as required by the corporation.

Thank you for your consideration.

Sincerely,
${d.ownerName}
`;
}