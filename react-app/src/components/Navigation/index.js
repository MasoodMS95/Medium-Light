import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logoImg from '../../images/logo.webp'
import { useHistory } from 'react-router-dom';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
  const [searchField, setSearchField] = useState("");
  const history = useHistory();

  return (
    <div className={sessionUser ? 'navBar' : 'navBar navBarLoggedOut'}>
      <div className={sessionUser ? "loggedIn leftNav" : "loggedOut leftNav"}>
        <img src={logoImg} id="logoImage" alt="Logo" />
        <span id="siteName">Medium Light</span>
        {isLoaded && sessionUser && (
          <div className='searchBar'>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
            value={searchField}
            onChange={(e)=>setSearchField(e.target.value)}
            onKeyDown={(event)=> {
              if(event.key==='Enter'){
                window.alert("Feature coming soon.");
                setSearchField("");
              }
            }} placeholder='Search Medium Light'></input>
          </div>
        )}
      </div>
      <div className={sessionUser ? "loggedIn rightNav" : "loggedOut rightNav"}>
        {isLoaded && !sessionUser && (
          <>
            <button className='clearButton' onClick={()=>{window.alert("Feature coming soon.")}}>Our story</button>
            <button className='clearButton' onClick={()=>{window.alert("Feature coming soon.")}}>Membership</button>
            <button className='clearButton' onClick={()=>history.push('/login')}>Write</button>
          </>
        )}
        {isLoaded && sessionUser && (
          <React.Fragment>
            <button className='clearButton' onClick={()=>history.push('/post/new')}>Write</button>
            <ProfileButton user={sessionUser} />
          </React.Fragment>
        )}
        {isLoaded && !sessionUser && (
          <React.Fragment>
            <button className='clearButton' onClick={()=>history.push('/login')}>Log in</button>
            <button className='clearButton' onClick={()=>history.push('/signup')}>Sign up</button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}


export default Navigation;
