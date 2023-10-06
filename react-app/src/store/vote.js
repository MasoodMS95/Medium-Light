const cloneDeep = require('clone-deep');

//constants
const GET_SINGLE_VOTE = "vote/GET_SINGLE_VOTE";
const CLEAR_SINGLE_VOTE = "vote/CLEAR_SINGLE_VOTE";

//Action Creators
const getSingleVote = (vote) => ({
  type: GET_SINGLE_VOTE,
  payload: vote
})
export const clearSingleVote = () => ({
  type: CLEAR_SINGLE_VOTE,
})

//Thunk Action Creators
export const getVoteThunk = (id) => async (dispatch) => {
  let res = await fetch(`/api/votes/${id}`);
  if(res.ok){
    let data = await res.json();
    dispatch(getSingleVote(data));
    return data;
  }
}

export const createVoteThunk = (req) => async (dispatch) => {
  let res = await fetch(`/api/votes/new`, {
    method: 'POST',
    headers: {
			"Content-Type": "application/json",
		},
    body: JSON.stringify(req)
  })
  if(res.ok){
    let data = res.json();
    await dispatch(getSingleVote(data));
    return data;
  }
}

export const editVoteThunk = (vote, id) => async (dispatch) => {
  let res = await fetch(`/api/votes/edit/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vote)
  })
  if(res.ok){
    let data = await res.json();
    await dispatch(getSingleVote(data));
    return data;
  }
  else{
    let err = await res.json();
    console.log("ERROR", err);
  }
}

const initialState = null
//Reducer
export default function voteReducer(state = initialState, action){
  let stateCopy = cloneDeep(state);
  switch (action.type){
    case GET_SINGLE_VOTE:
      stateCopy = action.payload;
      return stateCopy;
    case CLEAR_SINGLE_VOTE:
      stateCopy = initialState;
      return stateCopy;
    default:
      return state;
  }
}
