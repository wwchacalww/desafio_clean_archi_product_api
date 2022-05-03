import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "Fulano");
const address = new Address("Rua dos Bobos", 7, "77.777-77", "Valfenda");
customer.changeAddress(address);

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
describe("Unit Test find customer usecase", () => {


  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const input: InputFindCustomerDto = {
      id: "123",
    }

    const output: OutputFindCustomerDto = {
      id: "123",
      name: "Fulano",
      address: {
        street: "Rua dos Bobos",
        number: 7,
        zip: "77.777-77",
        city: "Valfenda"
      }
    }

    const result: OutputFindCustomerDto = await usecase.execute(input);
    expect(output).toEqual(result);
  });

  it("should not find a customer", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const usecase = new FindCustomerUseCase(customerRepository);

    const input: InputFindCustomerDto = {
      id: "123",
    }

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  })
});