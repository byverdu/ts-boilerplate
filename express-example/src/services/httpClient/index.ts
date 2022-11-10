import { RequestInit, Response as FetchResponse } from 'undici/types/fetch';

interface HttpClient {
  url: string;
  params?: RequestInit;
}

const get = async ({ url }: HttpClient) => await fetch(url);
const post = async ({ url, params }: HttpClient) => fetch(url, { ...params });

export { get, post };

// https://kentcdodds.com/blog/using-fetch-with-type-script
