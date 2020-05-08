// Include Model
const { Model } = require('objection');

class User extends Model {
    static get tableName() {
        return "users";
    }
}

// Export User class
module.exports = User;