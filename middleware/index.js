const jwtValidator = require('../middleware/jwt.validator.middleware');
const roleValidator = require('../middleware/roles.validator.middleware');
const fieldsValidator = require('../middleware/fields.validator.middleware');

module.exports = {
  ...jwtValidator,
  ...roleValidator,
  ...fieldsValidator
}