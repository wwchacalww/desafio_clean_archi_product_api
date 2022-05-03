import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/sequelize/repository/product.repository";
import { InputUpdateProductDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";


describe("Unit test update product", () => {
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
  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const product = new Product("p01", "Product Test Unit", 25.35);
    await productRepository.create(product);
    const input: InputUpdateProductDto = {
      id: "p01",
      name: "Product Updated",
      price: 38.23
    }
    const output = await productUpdateUseCase.execute(input);

    const productFound = await productRepository.find(input.id);

    expect(output).toEqual(input);
    expect(output).toEqual({
      id: productFound.id,
      name: productFound.name,
      price: productFound.price,
    })
  })
});