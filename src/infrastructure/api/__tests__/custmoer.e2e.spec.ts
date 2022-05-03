import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Fulano",
        address: {
          street: "Rua dos Bobos",
          number: 7,
          zip: "22.333-555",
          city: "Valfenda",
        }
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Fulano");
    expect(response.body.address.street).toBe("Rua dos Bobos");
    expect(response.body.address.number).toBe(7);
    expect(response.body.address.zip).toBe("22.333-555");
    expect(response.body.address.city).toBe("Valfenda");
  });

  it("should not create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Fulano",
      });
    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    let response;
    response = await request(app)
      .post("/customer")
      .send({
        name: "Fulano",
        address: {
          street: "Rua dos Bobos",
          number: 7,
          zip: "22.333-555",
          city: "Valfenda",
        }
      });
    expect(response.status).toBe(200);
    response = await request(app)
      .post("/customer")
      .send({
        name: "Beltrano",
        address: {
          street: "Rua 7",
          number: 8,
          zip: "22.333-444",
          city: "Gondor",
        }
      });
    expect(response.status).toBe(200);
    response = await request(app)
      .post("/customer")
      .send({
        name: "Siclano",
        address: {
          street: "Rua das Samambaias",
          number: 15,
          zip: "22.333-486",
          city: "Samambaia",
        }
      });
    expect(response.status).toBe(200);

    const list = await request(app)
      .get("/customer").send();
    expect(list.status).toBe(200);
    expect(list.body.customers.length).toBe(3);

    const customer1 = list.body.customers[0];
    expect(customer1.name).toBe("Fulano");
    expect(customer1.address.street).toBe("Rua dos Bobos");

    const customer2 = list.body.customers[1];
    expect(customer2.name).toBe("Beltrano");
    expect(customer2.address.street).toBe("Rua 7");

    const customer3 = list.body.customers[2];
    expect(customer3.name).toBe("Siclano");
    expect(customer3.address.street).toBe("Rua das Samambaias");

  });
});