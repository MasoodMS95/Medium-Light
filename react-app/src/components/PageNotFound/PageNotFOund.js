import React from "react";
import { NavLink } from "react-router-dom";

function PageNotFound(){

  return (
    <>
      <NavLink style={{textAlign:'center',fontSize:'24px'}} to="/">Click here to return to homepage.</NavLink>
      <p style={{color: 'red', textAlign:'center',fontSize:'64px'}}>404 page not found.</p>
    </>
  )
}

export default PageNotFound;
