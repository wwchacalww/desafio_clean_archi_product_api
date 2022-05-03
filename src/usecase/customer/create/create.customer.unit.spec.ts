import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dtos";
import CreateCustomerUseCase from "./create.customer.usecase";

const input: InputCreateCustomerDto = {
  name: "Fulano",
  address: {
    street: "Rua dos Bobos",
    number: 7,
    zip: "88.333-333",
    city: "Valfenda"
  }
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    addRewardPoints: jest.fn(),
    removeRewardPoints: jest.fn(),
  }
}

describe("Unit teste create customer use case", () => {

  it("should create a costumer", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const output = await customerCreateUseCase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      }
    });

  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
    input.name = "";

    expect(async () => await customerCreateUseCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when street is missing", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
    input.address.street = "";

    expect(async () => await customerCreateUseCase.execute(input)).rejects.toThrow("Street is required");
  });
});