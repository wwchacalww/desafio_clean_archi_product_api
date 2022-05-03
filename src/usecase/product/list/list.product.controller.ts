import { Request, Response } from "express";
import ProductRepository from "../../../infrastructure/product/sequelize/repository/product.repository";
import ListProductUseCase from "./list.product.usecase";


export class ListProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);
    try {
      const products = await usecase.execute();
      return response.send(products);
    } catch (err) {
      return response.status(500).send(err);
    }
  }
}