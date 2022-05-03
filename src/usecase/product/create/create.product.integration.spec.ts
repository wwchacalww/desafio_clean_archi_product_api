import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/sequelize/repository/product.repository";
import { InputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";


describe("Integration teste create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => await sequelize.close());
  it("should create a costumer", async () => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const input: InputCreateProductDto = {
      id: "p01",
      name: "Product Test",
      price: 25.87
    }
    const output = await createProductUseCase.execute(input);
    expect(output).toEqual({
      id: "p01",
      name: "Product Test",
      price: 25.87
    });

  });

  it("should throw an error when name is missing", async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);
    const input: InputCreateProductDto = {
      id: "p01",
      name: "",
      price: 25.87
    }
    expect(async () => await productCreateUseCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is missing", async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);
    const input: InputCreateProductDto = {
      id: "p01",
      name: "Product Test",
      price: -1
    }

    expect(async () => await productCreateUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");
  });
});