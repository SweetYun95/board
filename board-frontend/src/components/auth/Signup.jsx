import { TextField, Button, Container, Typography, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { joinUserThunk, clearAuthError } from '../../features/authSlice'

function Signup() {
   const [email, setEmail] = useState('')
   const [name, setName] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')

   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, error } = useSelector((state) => state.auth)

   // 회원가입 페이지 벗어날 때 error 초기화
   useEffect(() => {
      return () => {
         dispatch(clearAuthError())
      }
   }, [dispatch])

   const handleSignup = () => {
      if (!email.trim() || !name.trim() || !confirmPassword.trim()) {
         alert(`모든 필드를 입력해 주세요!`)
         return
      }

      if (password !== confirmPassword) {
         alert(`비밀번호가 일치하지 않습니다!`)
         return
      }

      dispatch(joinUserThunk({ email, name, password }))
         .unwrap()
         .then(() => {
            // 회원가입 성공 → 로그인 페이지로 이동
            navigate('/login')
         })
         .catch((err) => {
            console.error(`회원가입 에러:`, err)
         })
   }

   return (
      <Container maxWidth="sm">
         <Typography variant="h4" gutterBottom>
            회원가입
         </Typography>

         {error && (
            <Typography color="error" align="center">
               {error}
            </Typography>
         )}

         <TextField label="이메일" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />

         <TextField label="사용자 이름" variant="outlined" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />

         <TextField label="비밀번호" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />

         <TextField label="비밀번호 확인" type="password" variant="outlined" fullWidth margin="normal" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

         <Button variant="contained" color="primary" fullWidth disabled={loading} onClick={handleSignup} style={{ marginTop: '20px' }}>
            {loading ? <CircularProgress size={24} /> : '회원가입'}
         </Button>
      </Container>
   )
}

export default Signup
