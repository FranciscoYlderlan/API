import config from "../../../knexfile.cjs"
import * as knex from "knex"

const connection = knex(config.development);

export default connection;

