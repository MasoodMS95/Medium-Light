import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getSinglePostThunk } from "../../store/post";

function EditComment({commentId, postId}){
  const [editedComment, setEditedComment] = useState("");
  const [commentError, setCommentError] = useState({})
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const submitEditedComment = async (e) =>{
    e.preventDefault();
    let commentErr = {}
    if(editedComment.length > 255 || editedComment.length <= 0){
      commentErr.comment = true;
    }
    setCommentError(commentErr);
    if(Object.values(commentErr).length){
      return;
    }
    let res = await fetch(`/api/comments/edit/${commentId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: editedComment
      }),
    })
    if(res.ok){
      closeModal();
      window.alert("Comment updated!")
      dispatch(getSinglePostThunk(postId))
      return;
    }
    else{
      window.alert("Something went wrong? This is awkward.")
      return;
    }
  }
  return (
    <form className="editCommentBox" onSubmit={(e) => submitEditedComment(e)}>
      <label>New comment</label>
      <textarea
        value={editedComment}
        placeholder="Add your throughts to the discussion"
        onChange={(e)=>setEditedComment(e.target.value)}
      ></textarea>
      {<p>{editedComment.length} character(s)</p>}
      {commentError.comment && <p className="errors">Comment is required and must be less than 255 characters.</p>}
      <button className="clearButton">Submit</button>
   </form>
  )
}

export default EditComment;
