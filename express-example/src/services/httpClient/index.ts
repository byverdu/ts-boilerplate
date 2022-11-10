import { HttpClientArgs } from '@byverdu/express-api';
import { Response } from 'undici';

const get = async ({ url }: HttpClientArgs): Promise<Response> =>
  await fetch(url);
const post = async ({ url, params }: HttpClientArgs) =>
  await fetch(url, { ...params });

export { get, post };

// https://kentcdodds.com/blog/using-fetch-with-type-script
