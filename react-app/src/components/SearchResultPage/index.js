import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostsThunk } from "../../store/post";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { postSorter } from '../../helper';

function SearchResult(){
  const [srPosts, setSRPosts] = useState([])
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);
  const posts = useSelector(state => state.post.allPosts)
  const {term} = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const postLength = 300;
  const regex = new RegExp(`.*${term}.*`, 'gi');

  useEffect(()=>{
    if(term === "" || term === undefined){
      history.push("/")
    }
  }, [term])

  useEffect(()=>{
    dispatch(getAllPostsThunk());
  }, [dispatch])

  useEffect(()=>{
    if(posts.length > 0){
      console.log("TERM", term)
      const searchedPosts = posts.filter((post) => post?.title?.match(regex));
      console.log(searchedPosts)
      let sorted = searchedPosts.sort(postSorter);
      setSRPosts(sorted);
      setIsPostsLoaded(true);
    }
  }, [posts, term])

  return (
    <React.Fragment>
      {isPostsLoaded && srPosts.length > 0 && (
        <div className="allPosts">
          <h2>Search Results</h2>
          {
            srPosts.map((post) => (
              <div className="postBox" key={post.id} onClick={()=>(history.push(`/post/${post.id}`))}>
                <h3>{post.title}</h3>
                <p>{post.body.slice(0, postLength)}{post.body.length <= postLength?"":"..."}</p>
              </div>
            ))
          }
        </div>
      )}
      {isPostsLoaded && srPosts.length === 0 && (
         <h2 style={{textAlign:'center',fontSize:'24px'}}>No results found</h2>
      )}
    </React.Fragment>
  )
}

export default SearchResult;
