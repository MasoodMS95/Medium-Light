import React from "react"
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { getSinglePostThunk } from "../../store/post";
import { useHistory } from "react-router-dom";
import "./DeleteCommentModal.css"

function DeleteComment({commentId, postId}){

  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteComment = async () => {
    let res = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      }
    })
    if(res.ok){
      await dispatch(getSinglePostThunk(postId))
    }
    else{
      closeModal();
      window.alert("Something went wrong, this is awkward.")
    }
    closeModal();
  }
  return(
    <React.Fragment>
      <h2>ARE YOU SURE YOU WANT TO DELETE THIS COMMENT?</h2>
      <div className="postActionConfirmationButtons">
        <button onClick={closeModal} className="greenButton">CANCEL</button>
        <button onClick={deleteComment} className="redButton">DELETE</button>
      </div>
    </React.Fragment>
  )
}

export default DeleteComment;
