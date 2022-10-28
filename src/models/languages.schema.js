const { onlyUkr, onlyRus } = require('../utils/langCheck')


const LanguageSchema = {
   rus: {
      type: String,
      required: true,
      validate: {
         validator: onlyRus,
         message: 'String must contain only russian letters'
      }
   },
   ukr: {
      type: String,
      required: true,
      validate: {
         validator: onlyUkr,
         message: 'String must contain only ukrainian letters'
      }
   }
}

module.exports = LanguageSchema