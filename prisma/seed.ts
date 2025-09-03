import { PrismaClient, OrgType, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const acdc = await prisma.org.upsert({
    where: { id: process.env.ACDC_ORG_ID || "acdc-seed" },
    update: {},
    create: {
      id: process.env.ACDC_ORG_ID || "acdc-seed",
      name: "ACDC",
      type: OrgType.ACDC,
      serviceAreas: ["Toronto", "Mississauga", "Brampton", "Vaughan", "Markham"],
      rating: 4.9,
      status: "active",
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@connectev.example" },
    update: {},
    create: {
      email: "admin@connectev.example",
      name: "Admin",
      role: UserRole.admin,
      orgId: acdc.id,
    },
  });

  const partner = await prisma.org.upsert({
    where: { name: "PartnerOne" },
    update: { status: "active" },
    create: {
      name: "PartnerOne",
      type: OrgType.Partner,
      serviceAreas: ["Toronto", "North York", "Etobicoke"],
      rating: 4.7,
      status: "active",
    },
  });

  for (let i = 0; i < 3; i++) {
    await prisma.lead.create({
      data: {
        firstName: `Test${i}`,
        lastName: "Lead",
        email: `lead${i}@example.com`,
        phone: `41600000${i}`,
        addressJson: { formatted: `123${i} Main St, Toronto` } as any,
        runLengthMeters: 12 + i,
        photos: [],
        priceBandMin: 110000,
        priceBandMax: 220000,
        status: i === 0 ? "new" : i === 1 ? "qualified" : "booked",
        assignedOrgId: acdc.id,
        source: "seed",
        caslConsent: true,
      },
    });
  }

  console.log("Seed complete");
}

main().finally(async () => await prisma.$disconnect());

