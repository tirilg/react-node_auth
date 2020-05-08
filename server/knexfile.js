const credentials = require(__dirname + "/config/dbcredentials");
const knexSnakeCaseMapper = require("objection").knexSnakeCaseMappers;

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database:     credentials.database,
      user:         credentials.user,
      password:     credentials.password
    }
  },
  ...knexSnakeCaseMapper()
};
