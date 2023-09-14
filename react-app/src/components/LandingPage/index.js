import React from 'react';
import { useSelector } from 'react-redux';

function LandingPage(){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div>HELLO WORLD</div>
  )
}

export default LandingPage
