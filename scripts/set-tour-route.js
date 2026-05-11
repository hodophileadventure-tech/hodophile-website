const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function setRouteForTour(slug, routeId) {
  const tour = await prisma.tour.updateMany({
    where: { slug },
    data: { routeId },
  });
  console.log('Updated tours:', tour.count);
}

const [,, slug, routeId] = process.argv;
if (!slug || !routeId) {
  console.error('Usage: node scripts/set-tour-route.js <tour-slug> <route-id>');
  process.exit(1);
}

setRouteForTour(slug, routeId)
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
