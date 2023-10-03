const pg = require("pg");

module.exports = {
  dialect: "postgres",
  dialectModule: pg,
  host: "berry.db.elephantsql.com",
  username: "rkzaqlnw",
  password: "bHQmEgTULRraNOdO2VbDRFqd4iCJXyq8",
  database: "rkzaqlnw",
  define: {
    timestamps: true,
  },
};
