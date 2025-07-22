import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { getBoardById } from '../../features/boardSlice'
import { updateBoard } from '../../api/boardApi'

const PostEdit = ({ handleSubmit }) => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { currentBoard } = useSelector((state) => state.board)

   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')
   const [image, setImage] = useState(null)

   useEffect(() => {
      dispatch(getBoardById(id))
   }, [dispatch, id])

   useEffect(() => {
      if (currentBoard) {
         setTitle(currentBoard.title)
         setContent(currentBoard.content)
      }
   }, [currentBoard])

   const handleImageChange = (e) => {
      setImage(e.target.files[0])
   }

   return (
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
         <h2>게시글 수정</h2>
         <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
               <label>제목</label>
               <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
               <label>내용</label>
               <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} required />
            </div>
            <div>
               <label>이미지 선택</label>
               <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <button type="submit">수정하기</button>
         </form>
      </div>
   )
}

export default PostEdit
