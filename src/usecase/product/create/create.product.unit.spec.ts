import { InputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

const input: InputCreateProductDto = {
  id: "p01",
  name: "Product Test",
  price: 45.45
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit teste create product use case", () => {

  it("should create a costumer", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const output = await createProductUseCase.execute(input);
    expect(output).toEqual({
      id: "p01",
      name: "Product Test",
      price: 45.45
    });

  });

  it("should throw an error when name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);
    input.name = "";

    expect(async () => await productCreateUseCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);
    input.name = "Product Test"
    input.price = -1;

    expect(async () => await productCreateUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");
  });
});