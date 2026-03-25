import { z } from 'zod';
import { apiToken } from './env.js';

export const positionSchema = z.object({
  x: z.coerce.number({ message: 'x must be a number' }),
  y: z.coerce.number({ message: 'y must be a number' }),
});

export const shopsSchema = z.array(positionSchema);

export async function fetchShops() {
  const url = 'https://api-challenge.agilefreaks.com/v1/coffee_shops';
  const urlWithToken = `${url}?token=${(apiToken)}`;

  const response = await fetch(urlWithToken, {
    headers: { 'Accept': 'application/json'  },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return shopsSchema.parse(data);
}