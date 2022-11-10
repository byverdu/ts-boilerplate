declare module '@byverdu/express-api' {
  export interface HttpClientArgs {
    url: string;
    params?: RequestInit;
  }
}
