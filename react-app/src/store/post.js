const cloneDeep = require('clone-deep');

// constants
const GET_ALL_POSTS = "post/GET_ALL_POSTS";
const GET_SINGLE_POSTS = "post/GET_SINGLE_POSTS";

//Action Creators
const getSinglePost = (post) => ({
  type: GET_SINGLE_POSTS,
  payload: post
})

const getAllPosts = (posts) => ({
  type: GET_ALL_POSTS,
  payload: posts
})

//Thunk Action Creators
export const getAllPostsThunk = () => async (dispatch) => {
  const response = await fetch("/api/posts")
  if(response.ok){
    const data = await response.json();
    dispatch(getAllPosts(data));
    return data;
  }
}

export const getSinglePostThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${id}`);
  if(response.ok){
    const data = await response.json();
    dispatch(getSinglePost(data));
    return data;
  }
  else{
    const error = await response.json();
    return error;
  }
}

const initialState = {allPosts: [], singlePost: null}

//Reducer
export default function postReducer(state = initialState, action){
  let stateCopy = cloneDeep(state);
  switch (action.type){
    case GET_ALL_POSTS:
      stateCopy.allPosts = action.payload;
      return stateCopy;
    case GET_SINGLE_POSTS:
      stateCopy.singlePost = action.payload;
      return stateCopy;
    default:
      return state;
  }
}
