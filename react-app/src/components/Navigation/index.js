import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logoImg from '../../images/logo.webp'
import { useHistory } from 'react-router-dom';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  return (
    <div className="navBar">
      <div className={sessionUser ? "loggedIn leftNav" : "loggedOut leftNav"}>
        <NavLink exact to="/">
          <img src={logoImg} id="logoImage" alt="Logo" />
        </NavLink>
        {isLoaded && sessionUser && (
          <div className='searchBar'>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input placeholder='Search Medium Light'></input>
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
          <button className='clearButton' onClick={()=>history.push('/post/new')}>Write</button>
        )}
        {isLoaded && (
          <ProfileButton user={sessionUser} />
        )}
      </div>
    </div>
  );
}


export default Navigation;
