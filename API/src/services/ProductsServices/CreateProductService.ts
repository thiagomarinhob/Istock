import Product from '../../models/Product';
import { getCustomRepository } from 'typeorm';

import ProductsRepository from '../../repositories/ProductsRepository';

interface Request {
  name: string;
  description: string;
  price: number;
  amount: number;
}

class CreateProductService {
  public async execulte({ name, description, price, amount }: Request): Promise<Product>{
    const productsRepository = getCustomRepository(ProductsRepository);

    const created_at = new Date();
    const updated_at = new Date();

    const product = productsRepository.create({ name, description, price, amount, created_at, updated_at });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
