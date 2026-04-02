import { getNearestShops } from './app.js';
import { positionSchema, fetchShops } from './utils.js';

async function main() {
  const input = positionSchema.safeParse({
    x: process.argv[2],
    y: process.argv[3],
  });

  if (!input.success) {
    console.error('Invalid input:', input.error.errors);
    process.exit(1);
  }

  const shops = await fetchShops();
  const nearestShops = getNearestShops(shops, input.data);
  console.log(nearestShops);
}

main().catch(error => {
  console.error(error.message);
  process.exit(1);
});
