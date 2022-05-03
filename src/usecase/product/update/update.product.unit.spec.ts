import Product from "../../../domain/product/entity/product";
import { InputUpdateProductDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";


const product = new Product("p01", "Product Test Unit", 42.23);

const input: InputUpdateProductDto = {
  id: product.id,
  name: "Product Updated",
  price: 75.53
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test update product", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);

    const productFound = await productRepository.find(input.id);

    expect(output).toEqual(input);
    expect(output).toEqual({
      id: productFound.id,
      name: "Product Updated",
      price: 75.53,
    })
  })
});