import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTopicsThunk } from "../../store/topic";
import { useHistory, useParams } from "react-router-dom";
import { createPostThunk, editPostThunk, getSinglePostThunk } from "../../store/post";
import "./PostFormComponent.css"

function PostComponent(){
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topicId, setTopicId] = useState("")
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
      if(post.userId !== user?.id || !user){
        window.alert("You do not have permission to modify this post")
        history.push("/")
        return;
      }
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post])

  useEffect(()=>{
    if(!user){
      window.alert("You need to be logged in to make a post")
      history.push("/")
    }
  }, [])

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
  useEffect(()=>{console.log("TopicId",topicId)}, [topicId])


  async function submitHandler(e){
    e.preventDefault();
    let errObj = {};
    if(body.length > 2500 || body.length <= 0){
      errObj.body = true;
    }
    if(title.length > 50 || title.length <= 0){
      errObj.title = true;
    }
    if(!isEdit && (topicId === "")){
      errObj.topic = true;
    }
    setErrors(errObj);
    if(Object.values(errObj).length){
      return;
    }
    let res;
    if(isEdit){
      let reqBody = {
        title: title,
        body: body
      }
      res = await dispatch(editPostThunk(reqBody, id))
    }
    else{
      let reqBody = {
        title: title,
        body: body,
        userId: user.id,
        topicId: topicId
      }
      res = await dispatch(createPostThunk(reqBody))
    }
    console.log(res);
    history.push(`/post/${res.id}`)
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
          {!isEdit && (
           <div>
           <select
              onChange={(e)=>setTopicId(e.target.value)}
            >
              <option
                value=""
              >Select a topic</option>
              {Object.values(topics).map(topic =>(
                <option
                  key={topic.id}
                  value={topic.id}
                >{topic.topic}</option>
              ))}
            </select>
            {errors.topic && <p className="errors">Topic must be selected</p>}
           </div>
          )}
          <button>Submit</button>
        </form>
      )}
    </React.Fragment>
  )
}

export default PostComponent;
