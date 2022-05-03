import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        id: "p01",
        name: "Product Test",
        price: 34.23
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product Test");
    expect(response.body.price).toBe(34.23);
  });

  it("should not create a product", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Product Error",
      });
    expect(response.status).toBe(500);
  });

  it("should not create a product with price less than zero", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        id: "p01",
        name: "Product Error",
        price: -35,
      });
    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    let response;
    response = await request(app)
      .post("/product")
      .send({
        id: "p01",
        name: "Product One",
        price: 56.34
      });
    expect(response.status).toBe(200);

    response = await request(app)
      .post("/product")
      .send({
        id: "p02",
        name: "Product Two",
        price: 123.89
      });
    expect(response.status).toBe(200);

    response = await request(app)
      .post("/product")
      .send({
        id: "p03",
        name: "Product Three",
        price: 29.09
      });
    expect(response.status).toBe(200);

    const list = await request(app)
      .get("/product").send();
    expect(list.status).toBe(200);
    expect(list.body.products.length).toBe(3);

    const product1 = list.body.products[0];
    expect(product1.name).toBe("Product One");
    expect(product1.price).toBe(56.34);

    const product2 = list.body.products[1];
    expect(product2.name).toBe("Product Two");
    expect(product2.price).toBe(123.89);

    const product3 = list.body.products[2];
    expect(product3.name).toBe("Product Three");
    expect(product3.price).toBe(29.09);
  });
});