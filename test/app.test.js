import { getNearestShops } from '../src/app';
import { fetchShops } from '../src/utils';

jest.mock('../src/utils', () => ({
  ...jest.requireActual('../src/utils'),
  fetchShops: jest.fn(),
}));

const mockShops = [
  { x: 10, y: 10 },
  { x: 3, y: 4 },
  { x: 1, y: 1 },
  { x: 5, y: 5 },
  { x: 20, y: 20 },
];

describe('getNearestShops', () => {
  it('returns a promise that resolves to an array', async () => {
    fetchShops.mockResolvedValue(mockShops);

    const result = await getNearestShops({ x: 0, y: 0 });

    expect(Array.isArray(result)).toBe(true);
  });

  it('returns at most 3 results', async () => {
    fetchShops.mockResolvedValue(mockShops);

    const result = await getNearestShops({ x: 0, y: 0 });

    expect(result.length).toBeLessThanOrEqual(3);
  });

  it('returns results sorted by distance (closest first)', async () => {
    fetchShops.mockResolvedValue(mockShops);

    const result = await getNearestShops({ x: 0, y: 0 });

    expect(result).toEqual([
      { x: 1, y: 1 },
      { x: 3, y: 4 },
      { x: 5, y: 5 },
    ]);
  });

  it('works with negative coordinates', async () => {
    fetchShops.mockResolvedValue([
      { x: -1, y: -1 },
      { x: -10, y: -10 },
      { x: -3, y: -3 },
    ]);

    const result = await getNearestShops({ x: -2, y: -2 });

    expect(result[0]).toEqual({ x: -1, y: -1 });
    expect(result[1]).toEqual({ x: -3, y: -3 });
  });

  it('returns empty array when no shops exist', async () => {
    fetchShops.mockResolvedValue([]);

    const result = await getNearestShops({ x: 0, y: 0 });

    expect(result).toEqual([]);
  });

  it('throws when fetchShops fails', async () => {
    fetchShops.mockRejectedValue(new Error('HTTP 500: Internal Server Error'));

    await expect(getNearestShops({ x: 0, y: 0 })).rejects.toThrow('HTTP 500');
  });
});
