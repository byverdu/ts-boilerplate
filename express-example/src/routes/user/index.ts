import { Router } from 'express';
import { getUserHandler } from './handler';
const userRouter = Router();

userRouter.get('/:name', getUserHandler);

export { userRouter };
