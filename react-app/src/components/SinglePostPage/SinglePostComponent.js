import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { getSinglePostThunk } from "../../store/post";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import DeletePost from "../DeletePostModal/DeletePost";
import "./SinglePostComponent.css"
import EditComment from "../commentActions/EditCommentModal";
import DeleteComment from "../commentActions/DeleteCommentModal";

function SinglePostComponent(){
  const [isLoaded, setIsLoaded] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState({})
  const [sortedComments, setSortedComments] = useState([]);
  const [isCommentsSorted, setIsCommentsSorted] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const post = useSelector(state => state.post.singlePost);
  const history = useHistory();
  const {id} = useParams();
  const { closeModal } = useModal();

  //Get the latest post details
  useEffect(()=>{
    const getPostDetails = async() =>{
      const res = await dispatch(getSinglePostThunk(id))
      if(res.error){
        window.alert(res.error);
        history.push("/");
      }
      setIsLoaded(true);
    }
    getPostDetails();
  }, [dispatch])

  useEffect(()=>{
    if(post?.comments.length>0){
      let sorted = post.comments.sort(sortComments);
      setSortedComments(sorted);
      setIsCommentsSorted(true);
    }
    else{
      setSortedComments([])
    }
  }, [post])
  
  //Sort comments by most recently updated
  const sortComments = (a, b) => {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);
    return dateB - dateA;
  };


  //Submit handler for new comment
  const submitNewComment = async (e) => {
    e.preventDefault();
    let commentErr = {}
    if(newComment.length > 255 || newComment.length <= 0){
      commentErr.comment = true;
    }
    setCommentError(commentErr);
    if(Object.values(commentErr).length){
      return;
    }
    let res = await fetch(`/api/comments/new`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: id,
        userId: user.id,
        comment: newComment,
      }),
    })
    if(res.ok){
      dispatch(getSinglePostThunk(id));
    }
    else{
      window.alert("Comment was not submitted. Please try again later.")
    }
    setNewComment("")
  }

  //Logger
  useEffect(()=>{
    console.log(newComment)
  }, [newComment])

  return (
    <React.Fragment>
      <NavLink to="/">{`<`}Back</NavLink>
      {isLoaded && (
        <div className="singlePost">
          <div className="postHeader">
            <h2>{post.title}</h2>
            <h3>By {post?.ownersUserName}</h3>
            <p>{post.body}</p>
            {post?.userId === user?.id &&
              <div className="postActionButtons">
                <button onClick={() => history.push(`/post/edit/${post.id}`)} className='clearButton'>EDIT</button>
                <OpenModalButton
                  buttonText="DELETE"
                  onItemClick={closeModal}
                  modalComponent={<DeletePost id={post?.id}/>}
                />
              </div>
            }
          </div>
          <div className="commentsBox">
            <h3>Comments</h3>
            {user && (
              <form className="newCommentBox" onSubmit={(e) => submitNewComment(e)}>
                <label>New comment</label>
                <textarea
                  value={newComment}
                  placeholder="Add your throughts to the discussion"
                  onChange={(e)=>setNewComment(e.target.value)}
                ></textarea>
                {<p>{newComment.length} character(s)</p>}
                {commentError.comment && <p className="errors">Comment is required and must be less than 255 characters.</p>}
                <button className="clearButton">Submit</button>
              </form>
            )}
            {isCommentsSorted && sortedComments.map(comment => (
              <div key={comment.id} className='comment'>
                <p>{comment.comment}</p>
                <p>By {comment.username}</p>
                {user?.id === comment.userId &&
                  <div className="commentActions">
                    <OpenModalButton
                      buttonText="Edit comment"
                      onItemClick={closeModal}
                      modalComponent={<EditComment commentId={comment?.id} postId={post?.id}/>}
                    />
                    <OpenModalButton
                      buttonText="Delete comment"
                      onItemClick={closeModal}
                      modalComponent={<DeleteComment commentId={comment?.id} postId={post?.id}/>}
                    />
                  </div>
                }
              </div>
            ))}
            {!post.comments.length && <p>Looks like there's no comments, be the first to comment!</p>}
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default SinglePostComponent;
