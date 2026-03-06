import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { dataSourceOptions } from "src/db/data-source";

export const typeormConfig = registerAs(
  "typeorm",
  (): TypeOrmModuleOptions => dataSourceOptions,
);
