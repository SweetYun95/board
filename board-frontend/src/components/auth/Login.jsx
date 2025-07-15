import { Container, TextField, Button, Typography, Box, Stack, Link } from '@mui/material'

import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { loginUserThunk, clearAuthError } from '../../features/authSlice'

function Login() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const dispatch = useDispatch
   const navigate = useNavigate()

   useEffect(() => {
      return () => {
         dispatch(clearAuthError())
      }
   }, [dispatch])

   const handleSubmit = (e) => {
      e.preventDefault()
      if (!email.trim() || !password.trim()) {
         // 로그인 처리 로직 (예: dispatch(loginThunk))
         alert(`이메일 또는 패스워드를 확인 해주세요`)
         return
      }
      console.log('로그인 시도:', email, password)

      dispatch(loginUserThunk({ email, password }))
         .unwrap()
         .then(() => navigate('/'))
         .catch((error) => console.error(`로그인 실패!`, error))
   }

   return (
      <Container maxWidth="xs">
         <Box sx={{ mt: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
               로그인
            </Typography>

            <form onSubmit={handleSubmit}>
               <Stack spacing={2}>
                  <TextField label="이메일" variant="outlined" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
                  <TextField label="비밀번호" variant="outlined" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
                  <Button type="submit" variant="contained" fullWidth>
                     로그인
                  </Button>

                  <Typography variant="body2" align="center">
                     계정이 없으신가요?{' '}
                     <Link component={RouterLink} to="/signup" underline="hover">
                        회원가입
                     </Link>
                  </Typography>
               </Stack>
            </form>
         </Box>
      </Container>
   )
}

export default Login
