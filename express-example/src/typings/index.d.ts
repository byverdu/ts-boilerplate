declare module '@app-types-express-api' {
  export interface HttpClientArgs {
    url: string;
    params?: import('undici').RequestInit;
  }
}
