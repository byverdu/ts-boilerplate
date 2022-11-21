import { getUser } from '@services/user';
import { Request, Response } from 'express';

const getUserHandler = async (
  req: Request<{ name: string }>,
  res: Response
) => {
  try {
    const userInfo = await getUser(req.params.name);

    res.status(200);
    res.json(userInfo);
  } catch (e) {
    res.status(500);
    res.json(e);
  }
};

export { getUserHandler };
