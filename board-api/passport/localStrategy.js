const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const Member = require('../models/member')

module.exports = () => {
   passport.use(
      new LocalStrategy(
         {
            usernameField: 'email',
            passwordField: 'password',
         },
         async (email, password, done) => {
            try {
               const user = await Member.findOne({ where: { email } })
               if (!user) {
                  return done(null, false, { message: '존재하지 않는 사용자입니다.' })
               }

               const isMatch = await bcrypt.compare(password, user.password)
               if (!isMatch) {
                  return done(null, false, { message: '비밀번호가 일치하지 않습니다.' })
               }

               return done(null, user)
            } catch (error) {
               return done(error)
            }
         }
      )
   )
}
