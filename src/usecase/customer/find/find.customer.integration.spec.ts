import { Sequelize } from "sequelize-typescript"
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/sequelize/model/customer.model";
import CustomerRepository from "../../../infrastructure/customer/sequelize/repository/customer.repository";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer usecase", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository)
    const customer = new Customer("123", "Fulano");
    const address = new Address("Rua dos Bobos", 7, "77.777-77", "Valfenda");
    customer.changeAddress(address);
    await customerRepository.create(customer);

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

});