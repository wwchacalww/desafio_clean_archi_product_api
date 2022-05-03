import { v4 } from "uuid";
import OrderFactory from "./order.factory";

describe("Order factory unit test", () => {
  it("should create an order", () => {
    const orderProps = {
      id: v4(),
      customer_id: v4(),
      items: [
        {
          id: v4(),
          name: "Product 4",
          productId: v4(),
          quantity: 1,
          price: 100,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order.id).toBe(orderProps.id);
    expect(order.customer_id).toBe(orderProps.customer_id);
    expect(order.items.length).toBe(1);

  })
});