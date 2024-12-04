import { Router } from 'express';

import validationMiddleware from '../middlewares/validationMiddleware';
import mortgageValidation from '../validations/mortgageValidation';
import mortgageController from '../controllers/mortgageController';

const mortgageRouter = Router();

mortgageRouter.get('/', mortgageController.welcome);

mortgageRouter.post(
    '/calculate',
    validationMiddleware(mortgageValidation.calculate),
    mortgageController.calculate
);

export default mortgageRouter;
