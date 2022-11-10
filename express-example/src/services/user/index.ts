import { get } from '@services/httpClient/index';

const GITHUB_API = 'https://api.github.com/users';

const getUser = async (userName: string) => {
  try {
    const response = await get({ url: `${GITHUB_API}/${userName}` });

    if (response.ok) {
      return response.json();
    } else {
    }
  } catch (e) {}
};

export { getUser };
