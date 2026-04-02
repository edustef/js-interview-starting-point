import { getNearestShops } from '../src/app';

const mockShops = [
  { x: 10, y: 10 },
  { x: 3, y: 4 },
  { x: 1, y: 1 },
  { x: 5, y: 5 },
  { x: 20, y: 20 },
];

describe('getNearestShops', () => {
  it('returns the 3 closest shops sorted by distance', () => {
    const result = getNearestShops(mockShops, { x: 0, y: 0 });

    expect(result).toEqual([
      { x: 1, y: 1 },
      { x: 3, y: 4 },
      { x: 5, y: 5 },
    ]);
  });

  it('works with negative coordinates', () => {
    const shops = [
      { x: -1, y: -1 },
      { x: -10, y: -10 },
      { x: -3, y: -3 },
    ];

    const result = getNearestShops(shops, { x: -2, y: -2 });

    expect(result).toEqual([
      { x: -1, y: -1 },
      { x: -3, y: -3 },
      { x: -10, y: -10 },
    ]);
  });

  it('returns empty array when no shops exist', () => {
    const result = getNearestShops([], { x: 0, y: 0 });

    expect(result).toEqual([]);
  });
});
