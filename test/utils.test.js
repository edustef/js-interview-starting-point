import { getToken, fetchShops } from '../src/utils';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('getToken', () => {
  it('returns the token from the API response', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ token: 'abc123' }),
    });

    const token = await getToken();

    expect(token).toBe('abc123');
    expect(fetch).toHaveBeenCalledWith(
      'https://api-challenge.agilefreaks.com/v1/tokens',
      { method: 'POST', headers: { 'Accept': 'application/json' } },
    );
  });

  it('throws when the response is not ok', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(getToken()).rejects.toThrow('HTTP 500: Internal Server Error');
  });
});

describe('fetchShops', () => {
  it('fetches shops using a token from getToken', async () => {
    const mockShops = [
      { id: 1, name: 'Shop A', x: 1, y: 2, created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
    ];

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: 'test-token' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockShops,
      });

    const shops = await fetchShops();

    expect(shops).toEqual(mockShops);
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      'https://api-challenge.agilefreaks.com/v1/coffee_shops?token=test-token',
      { headers: { 'Accept': 'application/json' } },
    );
  });

  it('throws when the schema validation fails', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: 'test-token' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ invalid: 'data' }],
      });

    await expect(fetchShops()).rejects.toThrow(expect.objectContaining({ name: 'ZodError' }));
  });
});
