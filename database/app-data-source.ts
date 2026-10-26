import {DataSource} from "typeorm"

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