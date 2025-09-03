import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const acdc = await prisma.org.upsert({
    where: { name: 'ACDC Electrical Tech Inc.' },
    update: {},
    create: {
      name: 'ACDC Electrical Tech Inc.',
      type: 'ACDC',
      ecrA_esa_number: 'XXXXXXX',
      serviceAreas: ['Toronto','North York','Scarborough','Etobicoke','Mississauga','Brampton','Vaughan','Markham','Richmond Hill'],
      status: 'active',
      rating: 4.9,
      capacityRuleJson: { weekdays: { start: '08:00', end: '18:00' } }
    }
  });

  await prisma.user.upsert({
    where: { email: 'admin@connectev.ca' },
    update: {},
    create: {
      name: 'ConnectEV Admin',
      email: 'admin@connectev.ca',
      role: 'admin',
      orgId: acdc.id,
      // If you use auth provider, this record just serves as owner metadata
    }
  });

  console.log('Seed complete. ACDC org + admin created.');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());