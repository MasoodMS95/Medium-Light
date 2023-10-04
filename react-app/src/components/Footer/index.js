import React from "react";
import "./Footer.css"

function Footer(){
  return (
    <div className="footerContainer">
      <div className="socialsBox">
        <label className="linkedInFooter">
          <i className="fa-brands fa-linkedin"></i>
        </label>

      </div>
      <div className="copyrightBox">
        <h2 style={{margin:"0px"}}>{`Masood Saaed™ 2023`}</h2>
      </div>
    </div>
  )
}

export default Footer
