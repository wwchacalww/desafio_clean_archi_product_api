import RepositoryInterface from "../../@shared/repository/repository.interface";
import Customer from "../entity/customer";


export default interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {
  addRewardPoints(customer_id: string, points: number): Promise<void>;
  removeRewardPoints(customer_id: string, points: number): Promise<void>;
}