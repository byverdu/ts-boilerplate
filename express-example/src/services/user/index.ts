import { get } from '@services/httpClient/index';

interface GithubUserApiResponse {
  name: string;
  location: string;
  avatar_url: string;
  created_at: string;
  login: string;
}

const GITHUB_API = 'https://api.github.com/users';

const getUser = async (
  userName: string
): Promise<GithubUserApiResponse | Error> => {
  try {
    const response = await get({ url: `${GITHUB_API}/${userName}` });

    if (response.ok) {
      const data = await response.json();
      return data as GithubUserApiResponse;
    } else {
      return Promise.reject({
        url: response.url,
        status: response.status,
        statusText: response.statusText,
      });
    }
  } catch (tryError) {
    throw new Error(String(tryError));
  }
};

export { getUser };
