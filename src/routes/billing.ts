import { Router } from 'express'
import { createBilling } from '../controllers/billing';
const billingRouter: Router = Router();

billingRouter.post('/', createBilling);

export { billingRouter };
