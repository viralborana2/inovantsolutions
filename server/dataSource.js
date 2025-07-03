import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./db/Products";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "inovant_db",
  synchronize: true,
  logging: false,
  entities: [Product],
  migrations: [],
  subscribers: [],
});