/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/await-thenable */
import * as userService from '@services/user';
import * as handlers from './handler';
import { Request, Response } from 'express';

jest.mock('../../services/user');

const mockResponse = (data?: Record<string, unknown>) => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(data);
  return res;
};

const request = { params: { name: 'byverdu' } } as unknown as Request<{
  name: string;
}>;
const response = mockResponse();
const githubUserApiResponse = {
  name: 'byverdu',
  location: 'london',
};

beforeEach(() => {
  jest.resetAllMocks();
});

describe('getUser handler', () => {
  it('should be defined', () => {
    expect(handlers.getUserHandler).toBeInstanceOf(Function);
  });

  it('should call userService.getUser', async () => {
    jest
      .spyOn(userService, 'getUser')
      .mockReturnValue(Promise.resolve(githubUserApiResponse));

    await handlers.getUserHandler(request, response);

    expect(userService.getUser).toBeCalledTimes(1);
    expect(userService.getUser).lastCalledWith('byverdu');
  });

  it('should return user info from userService.getUser res.json', async () => {
    jest
      .spyOn(userService, 'getUser')
      .mockReturnValue(Promise.resolve(githubUserApiResponse));

    await handlers.getUserHandler(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(githubUserApiResponse);
  });

  it('should catch Errors from userService.getUser', async () => {
    jest.spyOn(userService, 'getUser').mockRejectedValue('some error');

    await handlers.getUserHandler(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith('some error');
  });
});
