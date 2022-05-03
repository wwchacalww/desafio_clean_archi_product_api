import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDTO, OutputUpdateCustomerDTO } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
  constructor(
    private customerRepository: CustomerRepositoryInterface
  ) {}

  async execute(input: InputUpdateCustomerDTO): Promise<OutputUpdateCustomerDTO> {
    const { id, name, address } = input;
    const { street, number, zip, city } = address;
    const customer = await this.customerRepository.find(id);
    customer.changeName(name);
    customer.changeAddress(new Address(
      street, number, zip, city
    ));

    await this.customerRepository.update(customer);
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zip: customer.Address.zip,
        city: customer.Address.city,
      }
    };
  }
}