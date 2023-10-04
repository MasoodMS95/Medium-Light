import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostsThunk } from '../../store/post';
import { useHistory } from 'react-router-dom';
import "./index.css"
import { postSorter } from '../../helper';

function LandingPage(){
  const sessionUser = useSelector(state => state.session.user);
  const posts = useSelector(state => state.post.allPosts)
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);
  const [latestPosts, setLatestPosts] = useState([])
  const history = useHistory();
  const dispatch = useDispatch();
  const postLength = 300;

  useEffect(()=>{
    dispatch(getAllPostsThunk());
  }, [dispatch])

  useEffect(()=>{
    if(posts.length > 0){
      let sorted = posts.sort(postSorter);
      setLatestPosts(sorted)
      setIsPostsLoaded(true);
    }
  }, [posts])

  return (
    <React.Fragment>
      {isPostsLoaded && (
        <div className="allPosts">
          <h2>Latest Posts</h2>
          {
            latestPosts.map((post) => (
              <div className="postBox" key={post.id} onClick={()=>(history.push(`/post/${post.id}`))}>
                <h3>{post.title}</h3>
                <p>{post.body.slice(0, postLength)}{post.body.length <= postLength?"":"..."}</p>
              </div>
            ))
          }
        </div>
      )}
    </React.Fragment>
  )
}

export default LandingPage
