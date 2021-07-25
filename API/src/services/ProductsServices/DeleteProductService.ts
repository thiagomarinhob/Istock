import { getCustomRepository } from 'typeorm';

import ProductsRepository from '../../repositories/ProductsRepository';

interface Request {
  id: string;
}

class DeleteProductService {
  public async execulte({ id }: Request): Promise<any>{
    const productsRepository = getCustomRepository(ProductsRepository);

    const findProduct = await productsRepository.findOne(id);

    if(!findProduct){
      throw Error('This product does not exist');
    }

    const response = await productsRepository.delete(id);

    return response;
  }
}

export default DeleteProductService;
