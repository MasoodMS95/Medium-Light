import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTopicsThunk } from "../../store/topic";
import { useHistory, useParams } from "react-router-dom";
import { getSinglePostThunk } from "../../store/post";
import "./PostComponent.css"

function PostComponent(){
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({})
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();
  const {id} = useParams();

  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const topics = useSelector(state => state.topic.allTopics)
  const post = useSelector(state => state.post.singlePost);

  useEffect(()=>{
    if(window.location.href.includes('/edit')){
      setIsEdit(true);
    }
    else{
      setIsEdit(false);
    }
  }, [window.location.href])

  //Dispatch call for edit
  useEffect(()=>{
    const editCall = async() => {
      if(isEdit){
        const data = await dispatch(getSinglePostThunk(id))
        if(data?.error){
          window.alert("Post does not exist");
          history.push("/");
        }
      }
      else{
        setBody("");
        setTitle("");
      }
    }
    editCall();
  }, [isEdit])

  //Set body and title for editing existing data.
  useEffect(()=>{
    if(post && isEdit){
      if(post.userId !== user.id){
        window.alert("You do not have permission to modify this post.")
        history.push("/")
        return;
      }
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post])

  //Get all topics
  useEffect(()=>{
    const dispatchTopics = async () =>{
      await dispatch(getAllTopicsThunk())
      .then(setIsLoaded(true));
    }
    dispatchTopics();
  }, [dispatch])

  //loggers
  useEffect(()=>{console.log(topics)}, [topics])
  useEffect(()=>{console.log("Title",title)}, [title])
  useEffect(()=>{console.log("Body",body)}, [body])


  async function submitHandler(e){
    e.preventDefault();
    let errObj = {};
    if(body.length > 2500 || body.length <= 0){
      errObj.body = true;
    }
    if(title.length > 50 || title.length <= 0){
      errObj.title = true;
    }
    setErrors(errObj);
    if(Object.values(errObj).length){
      return;
    }
  };

  return (
    <React.Fragment>
      {isLoaded && (
        <form className="postForm" onSubmit={(e) => submitHandler(e)}>
          {isEdit && (<h2>Edit your post!</h2>)}
          {!isEdit && (<h2>Create a new post!</h2>)}
          <div className="formTitle">
            <h3>Title</h3>
            <input
              placeholder="Give your new article a title!"
              onChange={(e) => {setTitle(e.target.value)}}
              value={title}
            >
            </input>
            {errors.title && (<p className="errors">Title is required and has to be less than 50 characters</p>)}
          </div>
          <div className="formBody">
            <h3>Body</h3>
            <textarea
              placeholder="This is where the magic happens"
              onChange={(e) => {setBody(e.target.value)}}
              value={body}
            >
            </textarea>
            {errors.body && <p className="errors">Body is required and has to be less than 2500 characters</p>}
            <p className={errors.body?"errors":""}>{body.length} character(s)</p>
          </div>
          <select>
            
          </select>
          <button>Submit</button>
        </form>
      )}
    </React.Fragment>
  )
}

export default PostComponent;
