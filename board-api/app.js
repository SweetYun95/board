const express = require(`express`)
const path = require(`path`)
const cookieParser = require('cookie-parser') // 쿠키 처리 미들웨어
const morgan = require(`morgan`)
const session = require('express-session') // 세션 관리 미들웨어
require(`dotenv`).config()
// const cors = require(`cors`) // cors 미들웨어 -> ★api 서버는 반드시 설정

// 라우터 모듈 불러올 곳
const indexRouter = require('./routes/index')
const boardRouter = require('./routes/board')
const memberRouter = require('./routes/member')

const app = express()
app.set(`port`, process.env.PORT || 3000)

// 시퀼라이져 DB 연결 할 곳

// 공통 미들웨어
app.use(morgan(`dev`))
app.use(express.static(path.join(__dirname, `uploads`)))
app.use(express.json()) // JSON 데이터 파싱
app.use(express.urlencoded({ extended: false })) // URL-encoded 데이터 파싱
app.use(cookieParser(process.env.COOKIE_SECRET)) //쿠키 설정
//세션 설정
app.use(
   session({
      resave: false, //세션 데이터가 변경사항이 없어도 재저장 할지 여부 -> 변경사항이 있어야 재저장
      saveUninitialized: true, //초기화 되지 않은 세션 저장 여부 -> 초기화 되지 않은 빈 세션도 저장
      secret: process.env.COOKIE_SECRET, //세션 암호화 키
      cookie: {
         // maxAge를 설정하지 않으면 브라우저가 꺼지면 쿠키 삭제
         httpOnly: true, //javascript로 쿠키에 접근가능한지 여부 -> true 일경우 접근 X
         secure: false, //https를 사용할때만 쿠키 전송 여부 -> http, https 둘다 사용가능
      },
   })
)
// 라우터 연결할 곳
app.use('/', indexRouter)
app.use('/board', boardRouter)
app.use('/member', memberRouter)

// 에러처리 요청 경로 오류
app.use((req, res, next) => {
   const error = new Error(`올바르지 않은 경로 입니다.<br/>${req.method} ${req.url}`)
   error.status = 404
   next(error)
})

// 에러처리 그 외
app.use((err, req, res, next) => {
   const status = err.status || 500
   const message = err.message || '서버에러'

   res.status(status).send(`
        <h1> Error: ${status}</h1>
        <p>${message}</p>
        `)
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
