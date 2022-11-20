import * as userService from './';
import * as httpClient from '@services/httpClient';
import { Response } from 'undici';

jest.mock('../httpClient');

const USER_NAME = 'byverdu';
const githubUserApiResponse = {
  name: USER_NAME,
  location: 'london',
};

beforeEach(() => {
  jest.resetAllMocks();
});

describe('user service', () => {
  describe('getUser', () => {
    it('should be defined', () => {
      expect(userService.getUser).toBeInstanceOf(Function);
    });

    it('should call httpClient.get', async () => {
      jest.spyOn(httpClient, 'get');

      await userService.getUser(USER_NAME);

      expect(httpClient.get).toBeCalledTimes(1);
      expect(httpClient.get).lastCalledWith({
        url: 'https://api.github.com/users/byverdu',
      });
    });

    it('should return a github user', async () => {
      jest.spyOn(httpClient, 'get').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(githubUserApiResponse),
      } as Response);

      const response = await userService.getUser(USER_NAME);

      expect(response).toEqual(githubUserApiResponse);
    });

    it('should reject a Promise if response.ok is false', async () => {
      jest.spyOn(httpClient, 'get').mockResolvedValue({
        ok: false,
        status: 404,
        url: 'https://api.github.com/users/USER_NAME',
        statusText: 'Not Found',
      } as unknown as Response);

      await expect(userService.getUser('USER_NAME')).rejects.toEqual({
        statusText: 'Not Found',
        status: 404,
        url: 'https://api.github.com/users/USER_NAME',
      });
    });

    it('should catch Errors from httpClient.get', async () => {
      jest
        .spyOn(httpClient, 'get')
        .mockRejectedValue(new Error('json is not a method'));

      await expect(userService.getUser('USER_NAME')).resolves.toEqual(
        'Error: json is not a method'
      );
    });
  });
});
