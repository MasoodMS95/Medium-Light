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
    <div className={sessionUser ? 'navBar navBarLoggedIn' : 'navBar navBarLoggedOut'}>
      <div className={sessionUser ? "loggedIn leftNav" : "loggedOut leftNav"}>
        <div id="flagShip" onClick={()=>history.push("/")}>
          <img src={logoImg} id={sessionUser?"logoImage":"loggedOutLogoImage"} alt="Logo" />
          <span id={sessionUser?"siteName":"loggedOutSiteName"}>Medium Light</span>
        </div>
        {isLoaded && sessionUser && (
          <div className='searchBar'>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
            value={searchField}
            onChange={(e)=>setSearchField(e.target.value)}
            onKeyDown={(event)=> {
              //On enter
              if(event.key==='Enter'){
                history.push(`/search/${searchField}`);
                setSearchField("");
              }
            }} placeholder='Search posts'></input>
          </div>
        )}
      </div>
      <div className={sessionUser ? "loggedIn rightNav" : "loggedOut rightNav"}>
        {isLoaded && !sessionUser && (
          <>
            {/* <button className='orangeButton' onClick={()=>{window.alert("Feature coming soon.")}}>Our story</button> */}
            {/* <button className='orangeButton' onClick={()=>{window.alert("Feature coming soon.")}}>Membership</button> */}
            <button className='orangeButton' onClick={()=>history.push('/login')}>Write</button>
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
            <button className='orangeButton' onClick={()=>history.push('/login')}>Log in</button>
            <button className='orangeButton' onClick={()=>history.push('/signup')}>Sign up</button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}


export default Navigation;
