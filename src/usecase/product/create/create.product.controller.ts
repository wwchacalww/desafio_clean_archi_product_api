import { Request, Response } from "express";
import ProductRepository from "../../../infrastructure/product/sequelize/repository/product.repository";
import { InputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";


export class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);
    try {
      const { id, name, price }: InputCreateProductDto = request.body;
      const input = { id, name, price }
      const product = await usecase.execute(input);
      return response.send(product);
    } catch (err) {
      return response.status(500).send(err);
    }
  }
}