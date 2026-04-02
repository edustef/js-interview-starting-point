import { z } from 'zod';

export const positionSchema = z.object({
  x: z.coerce.number({ message: 'x must be a number' }),
  y: z.coerce.number({ message: 'y must be a number' }),
});

export const shopsSchema = z.array(positionSchema.extend({
  id: z.number(),
  name: z.string(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
}));

export async function fetchShops() {
  const url = 'https://api-challenge.agilefreaks.com/v1/coffee_shops';
  const apiToken = await getToken();
  const urlWithToken = `${url}?token=${apiToken}`;

  const response = await fetch(urlWithToken, {
    headers: { 'Accept': 'application/json' },
  });

  const data = await response.json();
  return shopsSchema.parse(data);
}

/**
 *  @returns {Promise<string>} The API token as a string.
 */
export async function getToken() {
  const url = 'https://api-challenge.agilefreaks.com/v1/tokens';
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data.token;
}