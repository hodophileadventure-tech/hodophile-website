const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function find(term) {
  const tours = await prisma.tour.findMany({
    where: {
      OR: [
        { name: { contains: term, mode: 'insensitive' } },
        { slug: { contains: term, mode: 'insensitive' } },
      ],
    },
    take: 50,
  });
  console.log(`Search term: "${term}" — found ${tours.length} tours`);
  for (const t of tours) {
    console.log('-', t.name, `(id: ${t.id}, slug: ${t.slug})`);
  }
  await prisma.$disconnect();
}

const term = process.argv[2] || process.env.SEARCH || 'Kashmir';
find(term).catch(e => { console.error(e); process.exit(1); });
