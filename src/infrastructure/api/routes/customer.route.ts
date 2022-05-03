import { Request, Response, Router } from "express";
import { InputCreateCustomerDto } from "../../../usecase/customer/create/create.customer.dtos";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerRepository from "../../customer/sequelize/repository/customer.repository";


const customerRoute = Router();
customerRoute.post("/", async (request: Request, response: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const { name, address } = request.body;
    const { street, number, zip, city } = address;
    const customerDTO: InputCreateCustomerDto = {
      name,
      address: {
        street,
        number,
        zip,
        city
      },
    };
    const output = await usecase.execute(customerDTO);
    response.send(output);
  } catch (err) {
    response.status(500).send(err);
  }
});

customerRoute.get("/", async (request: Request, response: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  try {
    const list = await usecase.execute();
    response.send(list);
  } catch (err) {
    response.status(500).send(err);
  }
});


export { customerRoute }