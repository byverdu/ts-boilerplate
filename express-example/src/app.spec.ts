import request from 'supertest';
import { expressApp } from '@app';
import * as userService from '@services/user';

jest.mock('./services/user');

let app: Express.Application;

beforeEach(() => {
  app = expressApp();
});

describe('App', () => {
  it('should be defined', () => {
    expect(expressApp).toBeInstanceOf(Function);
  });

  it('should have a /health route', async () => {
    const resp = await request(app).get('/health');

    expect(resp.ok).toEqual(true);
    expect(resp.type).toEqual('text/html');
    expect(resp.text).toEqual('ok');
  });

  it('should have a /user route', async () => {
    const response = { login: 'byverdu' };
    jest.spyOn(userService, 'getUser').mockResolvedValue(response);

    const resp = await request(app).get('/user/byverdu');

    expect(resp.status).toEqual(200);
    expect(resp.ok).toEqual(true);
    expect(resp.type).toEqual('application/json');
    expect(resp.text).toEqual(JSON.stringify(response));
  });

  it('should handle 404 requests', async () => {
    const resp = await request(app).get('/notFound');

    expect(resp.status).toEqual(404);
    expect(resp.type).toEqual('text/html');
    expect(resp.text).toEqual('No handler found for /notFound');
  });
});
