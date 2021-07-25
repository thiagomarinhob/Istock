import Movement from '../../models/Movement';
import { getCustomRepository } from 'typeorm';

import MovementsRepository from '../../repositories/MovementsRepository';
import ProductsRepository from '../../repositories/ProductsRepository';

interface Request {
  product_id: string;
  type: string;
  amount: number;
}

class CreateMovementService {
  public async execulte({ product_id, type, amount }: Request): Promise<Movement>{
    const movementsRepository = getCustomRepository(MovementsRepository);
    const productsRepository = getCustomRepository(ProductsRepository);
    const created_at = new Date();
    const updated_at = new Date();

    const existProduct = await productsRepository.findOne({
      where: {
        id: product_id
      }
    });

    if(!existProduct) {
      throw Error('This product does not exist!');
    }

    if(type === 'entrada') {
      existProduct.amount += amount;
      existProduct.updated_at = updated_at;
    } else {
      if(amount > existProduct.amount){
        throw Error('Number of unavailable products!');
      }
      existProduct.amount -= amount;
      existProduct.updated_at = updated_at;
    }

    await productsRepository.save(existProduct);

    const movement = movementsRepository.create({ product: existProduct, product_id, type, amount, created_at, updated_at });

    await movementsRepository.save(movement);

    return movement;

  }

}

export default CreateMovementService;
