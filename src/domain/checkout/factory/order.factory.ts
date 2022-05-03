import Order from "../entity/order";
import OrderItem from "../entity/order_item";

interface IOrderProps {
  id: string,
  customer_id: string,
  items: {
    id: string,
    name: string,
    productId: string,
    price: number,
    quantity: number,
  }[],
}
export default class OrderFactory {
  public static create(orderProps: IOrderProps): Order {
    const { id, customer_id, items } = orderProps;

    const newItems = items.map(item => {
      return new OrderItem(item.id, item.name, item.price, item.productId, item.quantity);
    })
    const order = new Order(id, customer_id, newItems);

    return order;
  }
}