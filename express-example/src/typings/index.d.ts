declare module '@app-types-express-api' {
  export interface HttpClient {
    get: (params: HttpClientArgs) => Promise<import('undici').Response>;
    post: (params: HttpClientArgs) => Promise<import('undici').Response>;
  }
  export interface HttpClientArgs {
    url: string;
    params?: import('undici').RequestInit;
  }
}
