import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { getSinglePostThunk } from "../../store/post";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import DeletePost from "../DeletePostModal/DeletePost";
import "./SinglePostComponent.css"

function SinglePostComponent(){
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const post = useSelector(state => state.post.singlePost);
  const history = useHistory();
  const {id} = useParams();
  const { closeModal } = useModal();

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

  return (
    <React.Fragment>
      <NavLink to="/">{`<`}Back</NavLink>
      {isLoaded && (
        <div className="singlePost">
          <div className="postHeader">
            <h3>{post.title} by {post.ownersUserName}</h3>
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
            {post.comments?.map(comment => (
              <div key={comment.id} className='comment'>
                <p>{comment.comment}</p>
                <p>By {comment.username}</p>
                {comment.userId === user?.id && (
                  <React.Fragment>
                    <button>Edit</button>
                  </React.Fragment>
                )}
                {user?.id === comment.userId &&
                  <div className="commentActions">
                    <OpenModalButton
                      buttonText="Edit comment"
                      onItemClick={closeModal}
                      modalComponent={<DeletePost id={post?.id}/>}
                    />
                    <OpenModalButton
                      buttonText="Delete comment"
                      onItemClick={closeModal}
                      modalComponent={<DeletePost id={post?.id}/>}
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
