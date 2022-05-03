import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/sequelize/repository/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Unit test for listing product use case", () => {
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

  it("should list all products", async () => {
    const repository = new ProductRepository();
    const useCase = new ListProductUseCase(repository);
    const product1 = new Product("p01", "Prodcut One", 243.34);
    const product2 = new Product("p02", "Prodcut Two", 83.34);
    const product3 = new Product("p03", "Prodcut Three", 34.54);

    await repository.create(product1);
    await repository.create(product2);
    await repository.create(product3);

    const output = await useCase.execute();

    expect(output.products.length).toBe(3);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);

    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);

    expect(output.products[2].id).toBe(product3.id);
    expect(output.products[2].name).toBe(product3.name);
    expect(output.products[2].price).toBe(product3.price);
  })
});