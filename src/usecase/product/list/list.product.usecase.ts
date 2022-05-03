import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputListProductDto } from "./list.product.dto";


export default class ListProductUseCase {
  constructor(
    private productRepository: ProductRepositoryInterface
  ) {}

  async execute(): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();
    return OutputMapper.toOutput(products);
  }
}

class OutputMapper {
  static toOutput(listProducts: Product[]): OutputListProductDto {
    return {
      products: listProducts.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
      }))
    }
  }
}