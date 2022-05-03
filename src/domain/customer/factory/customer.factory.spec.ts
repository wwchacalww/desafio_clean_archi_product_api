import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
  it("Should create a new customer", () => {
    const customer = CustomerFactory.create("Fulano de Tal");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Fulano de Tal");
    expect(customer.Address).toBeUndefined();
  });

  it("Should create a new customer with an address", () => {
    const address = new Address("Rua dos bobos", 7, "77.777-777", "Valfenda");
    const customer = CustomerFactory.createWithAddress("Fulano de Tal", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Fulano de Tal");
    expect(customer.Address).toBe(address);
  });
})