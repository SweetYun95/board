const express = require('express')
const passport = require(`passport`)
const bcrypt = require(`bcrypt`)
const router = express.Router()
const Member = require('../models/member')
const { isLoggedIn, isNotLoggedIn } = require('./middleware')

// 회원가입 localhost:8000/auth/join
router.post('/join', isNotLoggedIn, async (req, res, next) => {
   try {
      const { email, name, password } = req.body

      // 기존 사용자 검색
      const exUser = await Member.findOne({
         where: { email },
      })
      // 기존에 있는 User라면?
      if (exUser) {
         const error = new Error(`이미 존재하는 멤버입니다.`)
         error.status = 409
         return next(error)
      }

      // 계정 생성
      // 비밀번호 암호화
      const hash = await bcrypt.hash(password, 12)

      // 신규 생성
      const newUser = await Member.create({
         email,
         name,
         password: hash,
      })

      // 성공 응답 반환
      console.log(`🥰새로운 유저: `, newUser)
      res.status(201).json({
         success: true,
         message: `사용자가 성공적으로 등록되었습니다.`,
         user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
         },
      })
   } catch (error) {
      error.status = 500
      error.message = `회원가입 중 오류가 발생했습니다.`
      next(error)
   }
})

// 로그인 localhost:8000/auth/login
router.post('/login', isNotLoggedIn, async (req, res, next) => {
   passport.authenticate('local', (authError, user, info) => {
      if (authError) {
         authError.status = 500
         authError.message = `인증 중 오류 발생`
         return next(authError)
      }
      if (!user) {
         const err = new Error(info.message || `로그인 실패`)
         err.status = 401
         return next(err)
      }
      req.login(user, (loginError) => {
         if (loginError) {
            loginError.status = 500
            loginError.message = `로그인 중 오류 발생`
            return next(loginError)
         }

         res.status(200).json({
            success: true,
            message: `로그인 성공`,
            user: {
               id: user.id,
               name: user.name,
            },
         })
      })
   })(req, res, next)
})

// 로그아웃 localhost:8000/auth/logout
router.get('/logout', isLoggedIn, async (req, res, next) => {
   req.logout((logoutError) => {
      if (logoutError) {
         logoutError.status = 500
         logoutError.message = `로그아웃 중 오류 발생`
         return next(logoutError)
      }
      res.status(200).json({
         success: true,
         message: '로그아웃 되었습니다.',
      })
   })
})

// 로그인 상태확인 localhost:8000/auth/status
router.get(`/status`, async (req, res, next) => {
   try {
      if (req.isAuthenticated()) {
         // 로그인 되었을 때
         // req.user는 passport의 역질렬화 설정에 의해 로그인 되었을 때 로그인 한 user 정보를 가져온다.
         res.status(200).json({
            isAuthenticated: true,
            user: {
               id: req.user.id,
               name: req.user.name,
            },
         })
      } else {
         // 로그인이 안되었을 때
         res.status(200).json({ isAuthenticated: false })
      }
   } catch (error) {
      error.status = 500
      error.message = `로그인 상태확인 중 오류가 발생했습니다.`
      next(error)
   }
})

module.exports = router
