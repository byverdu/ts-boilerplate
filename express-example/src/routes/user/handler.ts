import { getUser } from '@services/user';
import { Request, Response } from 'express';

const getUserHandler = async (
  req: Request<{ name: string }>,
  res: Response
) => {
  const userInfo = await getUser(req.params.name);

  res.json(userInfo);
};

export { getUserHandler };
