import React from "react"
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deletePostThunk } from "../../store/post";
import { useHistory } from "react-router-dom";

function DeletePost({id}){
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const deletePost = () => {
    let res = dispatch(deletePostThunk(id))
    if(res.error){
      window.alert("Post not found, so not deleted.")
      return
    }
    closeModal();
    history.push("/")
  }
  return(
    <React.Fragment>
      <h2>ARE YOU SURE YOU WANT TO DELETE THE POST?</h2>
      <div className="postActionConfirmationButtons">
        <button onClick={closeModal} className="greenButton">CANCEL</button>
        <button onClick={deletePost} className="redButton">DELETE</button>
      </div>
    </React.Fragment>
  )
}

export default DeletePost;
