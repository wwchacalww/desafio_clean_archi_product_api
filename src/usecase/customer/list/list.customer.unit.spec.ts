import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress("Fulano", new Address(
  "Rua dos Bobos",
  7,
  "22.333-444",
  "Valfenda"
));

const customer2 = CustomerFactory.createWithAddress("Beltrano", new Address(
  "Rua dos Bobos",
  13,
  "22.333-444",
  "Mordor"
));

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn(),
    addRewardPoints: jest.fn(),
    removeRewardPoints: jest.fn(),
  }
}

describe("Unit test for listing custmoer use case", () => {
  it("should list all customers", async () => {
    const repository = MockRepository();
    const useCase = new ListCustomerUseCase(repository);
    const output = await useCase.execute();

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.Address.street);

    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toBe(customer2.Address.street);

  })
});