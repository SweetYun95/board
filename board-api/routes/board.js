const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { Board, Member } = require('../models')
const { isLoggedIn } = require('./middleware') // 로그인 여부 검사용 미들웨어
const router = express.Router()

// uploads 폴더가 없을 경우 폴더 생성
try {
   fs.readdirSync(`uploads`) // 해당 폴더 있나 확인
} catch (error) {
   console.log(`uploads 폴더 생성합니다.`)
   fs.mkdirSync(`uploads`) // 폴더 생성
}

// multer 설정
const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, done) {
         done(null, 'uploads/')
      },
      filename(req, file, done) {
         const ext = path.extname(file.originalname)
         const basename = path.basename(file.originalname, ext)
         done(null, basename + '_' + Date.now() + ext)
      },
   }),
   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
})

// 게시글 등록
router.post('/', isLoggedIn, upload.single('image'), async (req, res, next) => {
   try {
      const { title, content } = req.body
      const image = req.file ? req.file.filename : null

      const newPost = await Board.create({
         title,
         content,
         img: image,
         member_Id: req.user.id,
      })

      res.status(201).json({
         success: true,
         message: '게시글이 등록되었습니다.',
         post: newPost,
      })
   } catch (error) {
        console.error('게시글 등록 중 에러 발생:', error)
      next(error)
   }
})

// 모든 게시글 리스트 (작성자 포함)
router.get('/', async (req, res, next) => {
   try {
      const posts = await Board.findAll({
         include: [
            {
               model: Member,
               attributes: ['id', 'name', 'email'],
            },
         ],
         order: [['createdAt', 'DESC']],
      })

      res.status(200).json(posts)
   } catch (err) {
      console.error('게시글 등록 실패:', error)
      next(err)
   }
})

module.exports = router
