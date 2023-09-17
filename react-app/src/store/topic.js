const cloneDeep = require('clone-deep');

// constants
const GET_ALL_TOPICS = "topic/GET_ALL_TOPICS";
const GET_SINGLE_TOPIC = "topic/GET_SINGLE_TOPIC";

//Action creators
const getAllTopics = (topics) => ({
  type: GET_ALL_TOPICS,
  payload: topics,
});

const getSingleTopic = (topic) => ({
  type: GET_SINGLE_TOPIC,
  payload: topic,
});

//Thunk Action Creators
export const getAllTopicsThunk = () => async (dispatch) => {
  const response = await fetch("/api/topics");
  if(response.ok){
    const data = await response.json();
    dispatch(getAllTopics(data));
    return data;
  }
}

export const getSingleTopicThunk = (topicId) => async (dispatch) =>{
  const response = await fetch(`/api/topics/${topicId}`);
  if(response.ok){
    const data = await response.json();
    dispatch(getSingleTopic(data));
    return data;
  }
}

const initialState = {allTopics: [], singleTopic: null}

//Reducer
export default function topicReducer(state = initialState, action) {
	let stateCopy = cloneDeep(state);
  switch (action.type) {
		case GET_ALL_TOPICS:
			stateCopy.allTopics = action.payload.topics;
      return stateCopy;
		case GET_SINGLE_TOPIC:
      stateCopy.singleTopic = action.payload;
		default:
			return state;
	}
}
