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

         // 💡 한글 파일명 깨짐 방지
         const safeBaseName = Buffer.from(basename, 'utf-8').toString('hex')

         done(null, `${safeBaseName}_${Date.now()}${ext}`)
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

// 게시글 수정
router.put('/:id', isLoggedIn, upload.single('image'), async (req, res, next) => {
   try {
      const { id } = req.params
      const { title, content } = req.body
      const post = await Board.findByPk(id)

      // 게시글 존재 여부 확인
      if (!post) {
         return res.status(404).json({ success: false, message: '게시글이 존재하지 않습니다.' })
      }

      // 작성자 본인인지 확인
      if (post.member_Id !== req.user.id) {
         return res.status(403).json({ success: false, message: '수정 권한이 없습니다.' })
      }

      // 새 이미지가 업로드되었다면 기존 이미지 파일 제거 (옵션)
      if (req.file && post.img) {
         const oldImagePath = path.join(__dirname, '..', 'uploads', post.img)
         if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath)
         }
      }

      // 게시글 업데이트
      await post.update({
         title,
         content,
         img: req.file ? req.file.filename : post.img, // 새 이미지가 없으면 기존 이미지 유지
      })

      res.status(200).json({ success: true, message: '게시글이 수정되었습니다.', post })
   } catch (error) {
      console.error('게시글 수정 중 에러:', error)
      next(error)
   }
})

// 게시글 삭제
router.delete('/:id', isLoggedIn, async (req, res, next) => {
   try {
      const { id } = req.params
      const post = await Board.findByPk(id)

      if (!post) {
         return res.status(404).json({ success: false, message: '게시글이 존재하지 않습니다.' })
      }

      if (post.member_Id !== req.user.id) {
         return res.status(403).json({ success: false, message: '삭제 권한이 없습니다.' })
      }

      // 이미지 파일도 함께 삭제 (선택)
      if (post.img) {
         const imagePath = path.join(__dirname, '..', 'uploads', post.img)
         if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath)
         }
      }

      await post.destroy()

      res.status(200).json({ success: true, message: '게시글이 삭제되었습니다.' })
   } catch (error) {
      console.error('게시글 삭제 중 에러:', error)
      next(error)
   }
})

// 게시글 단일 조회
router.get('/:id', async (req, res, next) => {
   try {
      const { id } = req.params

      const post = await Board.findOne({
         where: { id },
         include: [
            {
               model: Member,
               attributes: ['id', 'name', 'email'],
            },
         ],
      })

      if (!post) {
         return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' })
      }

      res.status(200).json(post)
   } catch (error) {
      console.error('게시글 조회 중 에러:', error)
      next(error)
   }
})


module.exports = router
