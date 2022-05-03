import Product from "../../../domain/product/entity/product";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("p01", "Product Test", 45);
const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}
describe("Unit test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input: InputFindProductDto = { id: "p01" };
    const output: OutputFindProductDto = {
      id: "p01",
      name: "Product Test",
      price: 45,
    };

    const result: OutputFindProductDto = await usecase.execute(input);
    expect(output).toEqual(result);
  });

  it("should throw error when product not found", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    })
    const usecase = new FindProductUseCase(productRepository);

    const input: InputFindProductDto = { id: "p02" };

    expect(async () => await usecase.execute(input)).rejects.toThrow("Product not found")
  });
});