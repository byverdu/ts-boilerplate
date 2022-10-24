import express, { Express, Response } from 'express';

const app: Express = express()

app.get('/', (_, res: Response) => {
    res.send('Express + TypeScript Server');
});

export {app}