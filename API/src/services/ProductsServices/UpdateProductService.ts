import Product from '../../models/Product';
import { getCustomRepository } from 'typeorm';

import ProductsRepository from '../../repositories/ProductsRepository';

interface Request {
  id: string;
  name: string;
  description: string;
  price: number;
  amount: number;
}


class UpdateProductService {
  public async execulte({ id, name, description, price, amount }: Request): Promise<Product>{
    const productsRepository = getCustomRepository(ProductsRepository);

    const findProduct = await productsRepository.findOne(id);

    if(!findProduct){
      throw Error('This product does not exist');
    }

    const updated = new Date();

    findProduct.name = name;
    findProduct.description = description;
    findProduct.price = price;
    findProduct.amount = amount;
    findProduct.updated_at = updated;

    await productsRepository.save(findProduct);

    return findProduct;
  }
}

export default UpdateProductService;
