import { GithubUserApiResponse, UserService } from '@app-types-express-api';
import { get } from '@services/httpClient';

const GITHUB_API = 'https://api.github.com/users';

const getUser: UserService['getUser'] = async userName => {
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
    return String(tryError);
  }
};

export { getUser };
