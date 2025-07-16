const passport = require('passport')
const local = require('./localStrategy')
const Member = require('../models/member')

module.exports = () => {
   passport.serializeUser((user, done) => {
      console.log(`👦 serialize user:`, user.toJSON?.() || user)
      done(null, user.id)
   })

   passport.deserializeUser(async (id, done) => {
      try {
         const user = await Member.findOne({
            where: { id },
            attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
         })
         done(null, user)
      } catch (err) {
         done(err)
      }
   })

   local() // local 전략 등록
}
