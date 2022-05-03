import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDTO } from "./update.customer.dto";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("Fulano", new Address(
  "Rua dos bobos", 7, "66.333-444", "Mordor"
));

const input: InputUpdateCustomerDTO = {
  id: customer.id,
  name: "Siclano",
  address: {
    street: "Street",
    number: 13,
    zip: "11.222-333",
    city: "Valfenda",
  }
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    addRewardPoints: jest.fn(),
    removeRewardPoints: jest.fn(),
  }
}

describe("Unit test update customer", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    const customerFound = await customerRepository.find(input.id);

    expect(output).toEqual(input);
    expect(output).toEqual({
      id: customerFound.id,
      name: customerFound.name,
      address: {
        street: customerFound.Address.street,
        number: customerFound.Address.number,
        zip: customerFound.Address.zip,
        city: customerFound.Address.city,
      }
    })
  })
});