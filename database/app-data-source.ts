import {DataSource} from "typeorm"
import dotenv from "dotenv";

dotenv.config({path: './.env'});

console.log(process.env.PSQL_USERNAME)
console.log(process.env.PSQL_PASSWORD)
console.log(process.env.PSQL_DATABASE)
console.log(process.env.PSQL_HOST)

export const myDataSource = new DataSource({
    type: "postgres",
    host: process.env.PSQL_HOST,
    port: Number.parseInt((process.env.PSQL_PORT as string), 10),
    username: process.env.PSQL_USERNAME,
    password: process.env.PSQL_PASSWORD,
    database: process.env.PSQL_DATABASE,
    entities: [__dirname + "/entities/**/*{.js,.ts}"],
    logging: true,
    synchronize: true,
})