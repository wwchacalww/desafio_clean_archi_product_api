import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product1 = new Product("p01", "Prodcut One", 243.34);
const product2 = new Product("p02", "Prodcut Two", 83.34);
const product3 = new Product("p03", "Prodcut Three", 34.54);


const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn()
      .mockReturnValue(Promise.resolve([
        product1,
        product2,
        product3,
      ])),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test for listing product use case", () => {
  it("should list all products", async () => {
    const repository = MockRepository();
    const useCase = new ListProductUseCase(repository);
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