import { Router } from 'express';
import { getCustomRepository } from'typeorm';

import MovementsRepository from '../repositories/MovementsRepository';
import CreateMovementService from '../services/MovementsServices/CreateMovementService';

const movementsRouter = Router();


movementsRouter.get('/', async (request, response) => {
  const movementsRepository = getCustomRepository(MovementsRepository);
  const movements = await movementsRepository.find();

  return response.json(movements);
})

movementsRouter.post('/', async (request, response) => {
  try {
    const { product_id, type, amount } = request.body;

    const createMovement = new CreateMovementService();

    const movement = await createMovement.execulte({ product_id, type, amount});

    return response.json(movement);
  } catch (err) {
   return response.status(400).json({ error: err.message });
  }
})

export default movementsRouter;
