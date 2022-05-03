import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/sequelize/repository/product.repository";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";


describe("Integration Test find product usecase", () => {
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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const product = new Product("p01", "Product Test", 45);
    await productRepository.create(product);
    const input: InputFindProductDto = { id: "p01" };
    const output: OutputFindProductDto = {
      id: "p01",
      name: "Product Test",
      price: 45,
    };
    const result = await usecase.execute(input);
    expect(output).toEqual(result);
  });

  it("should throw error when product not found", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);
    const input: InputFindProductDto = { id: "fake_id" };
    expect(async () => {
      await usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});