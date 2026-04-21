import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(__dirname, "../../../.env") });

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [path.join(__dirname, "/../**/*.entity{.ts,.js}")],
  migrations: [path.join(__dirname, "/migrations/**/*{.ts,.js}")],
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: "migrations",
  migrationsTransactionMode: "all",
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
