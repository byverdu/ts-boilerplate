import { HttpClientArgs } from '@app-types-express-api';
import { Response } from 'undici';

const get = async ({ url }: HttpClientArgs): Promise<Response> =>
  await fetch(url);

const post = async ({ url, params }: HttpClientArgs) =>
  await fetch(url, { ...params });

export { get, post };

