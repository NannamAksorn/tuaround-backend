const initOptions = {
  schema: "tuaround"
};

const pgp = require("pg-promise")(initOptions);

if (process.env.NODE_ENV === "production") {
  require("dotenv").config({ path: "src/configs/.env" });
} else {
  require("dotenv").config({ path: "src/configs/.env.test" });
}
const {
  PGHOST: host,
  PGPORT: port,
  PGDATABASE: database,
  PGUSER: user,
  PGPASSWORD: password
} = process.env;

const config = {
  host,
  port,
  database,
  user,
  password
};

const db = pgp(config);
export default db;

export const helpers = pgp.helpers;
export const format = {
  point: x => `(${x})`
};
