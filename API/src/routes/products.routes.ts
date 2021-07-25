import { Router } from 'express';
import { getCustomRepository } from'typeorm';

import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductService from '../services/ProductsServices/CreateProductService';
import UpdateProductService from '../services/ProductsServices/UpdateProductService';
import DeleteProductService from '../services/ProductsServices/DeleteProductService';

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
  const productsRepository = getCustomRepository(ProductsRepository);
  const products = await productsRepository.findAndCount();

  return response.json(products);
});

productsRouter.post('/', async (request, response) => {
    const { name, description, price, amount } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execulte({ name, description, price, amount});

    return response.json(product);
});

productsRouter.put('/:id', async (request, response) => {
  try {
    const { name, description, price, amount } = request.body;
    const { id } = request.params;
    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execulte({ id, name, description, price, amount });

    return response.json(product);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

productsRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execulte({ id });

    return response.send().status(200);
  } catch (err) {
    return response.status(400).json({ error: err.message });
 }
});

productsRouter.get('/:id', async (request,response) => {
  const { id } = request.params;

  const productsRepository = getCustomRepository(ProductsRepository);

  const products = await productsRepository.findOne(id);

  return response.json(products);
})

export default productsRouter;
