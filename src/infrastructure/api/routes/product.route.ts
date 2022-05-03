import { Router } from "express";
import { CreateProductController } from "../../../usecase/product/create/create.product.controller";
import { ListProductController } from "../../../usecase/product/list/list.product.controller";


const productRoute = Router();
const createProductController = new CreateProductController();
const listProductController = new ListProductController();

productRoute.post("/", createProductController.handle);
productRoute.get("/", listProductController.handle);

export { productRoute }