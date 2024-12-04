import { Router } from 'express';

import mortgageRouter from './routes/mortgageRoutes';

const router = Router();

router.use('/mortgage', mortgageRouter);

router.use('/*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

export default router;
