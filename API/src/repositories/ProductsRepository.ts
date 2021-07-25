import { EntityRepository, Repository } from 'typeorm';

import Products from '../models/Product';

@EntityRepository(Products)
class ProductsRepository extends Repository<Products> {
}

export default ProductsRepository;
