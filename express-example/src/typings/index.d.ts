declare module '@app-types-express-api' {
  export interface HttpClientArgs {
    url: string;
    params?: import('undici').RequestInit;
  }

  export interface HttpClient {
    get: ({
      url,
    }: Pick<HttpClientArgs, 'url'>) => Promise<import('undici').Response>;
    post: (params: HttpClientArgs) => Promise<import('undici').Response>;
  }

  export interface GithubUserApiResponse {
    name?: string;
    location?: string;
    avatar_url?: string;
    created_at?: string;
    login?: string;
  }

  export interface UserService {
    getUser: (userName: string) => Promise<GithubUserApiResponse | string>;
  }
}
