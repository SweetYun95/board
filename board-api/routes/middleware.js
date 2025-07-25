exports.isLoggedIn = (req, res, next) => {
   if (req.isAuthenticated()) {
      return next()
   }
   return res.status(403).json({ message: '로그인이 필요합니다.' })
}

exports.isNotLoggedIn = (req, res, next) => {
   if (!req.isAuthenticated()) {
      return next()
   }
   return res.status(400).json({ message: '이미 로그인한 상태입니다.' })
}
