import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dtos";

export default class CreateCustomerUseCase {
  constructor(
    private customerRepository: CustomerRepositoryInterface
  ) {}

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const { street, number, zip, city } = input.address;
    const address = new Address(street, number, zip, city);
    const customer = CustomerFactory.createWithAddress(input.name, address);
    await this.customerRepository.create(customer);
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street,
        number,
        zip,
        city,
      }
    };
  }
}