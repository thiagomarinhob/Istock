import { Router } from 'express';
import productsRoutes from './products.routes';
import movementRoutes from './movements.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/movements', movementRoutes);

export default routes;
