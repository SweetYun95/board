const express = require(`express`)
const path = require(`path`)
const morgan = require(`morgan`)
require(`dotenv`).config()

// 라우터 모듈 불러올 곳

const app = express()
app.set(`port`, process.env.PORT || 3000)

// 시퀼라이져 DB 연결 할 곳

// 공통 미들웨어
app.use(morgan(`dev`))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 라우터 연결할 곳

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
