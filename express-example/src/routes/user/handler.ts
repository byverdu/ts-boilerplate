import { getUser } from '@services/user';
import { Request, Response } from 'express';
/*
  By using async, eslint throws the following error
  > Promise returned in function argument where a void return was expected
  > An async function always returns a promise, so it can't be passed where a void function is expected.
*/
const getUserHandler = (
  req: Request<{ name: string }>,
  res: Response
): void => {
  getUser(req.params.name)
    .then(userInfo => {
      res.json(userInfo);
    })
    .catch(error => {
      res.json(error);
    });
};

export { getUserHandler };
