const express = require('express')
const passport = require(`passport`)
const bcrypt = require(`bcrypt`)
const router = express.Router()
const Member = require('../models/member')

// 회원가입 localhost:8000/auth/join
router.post('/join', async (req, res, next) => {
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

module.exports = router
