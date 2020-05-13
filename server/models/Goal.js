// Include Model
const { Model } = require('objection');

class Goal extends Model {
    static get tableName() {
        return "goals";
    }
}

// Export User class
module.exports = Goal;