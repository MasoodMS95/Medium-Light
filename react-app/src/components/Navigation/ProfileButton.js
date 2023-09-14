import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="profileButtonsTop profileButtons">
              <button onClick={() => {window.alert("Feature coming soon.")}}>
                <i className="fa-regular fa-user icon"></i>
                Profile
              </button>
              <button onClick={() => {window.alert("Feature coming soon.")}}>
                <i className="fa-regular fa-bookmark icon"></i>
                Library
              </button>
              <button onClick={() => {window.alert("Feature coming soon.")}}>
                <i className="fa-solid fa-receipt icon"></i>
                Stories
              </button>
              <button onClick={() => {window.alert("Feature coming soon.")}}>
                <i className="fa-solid fa-chart-simple icon"></i>
                Stats
              </button>
            </div>
            <div className="profileButtonsMid profileButtons">

            </div>
            <div className="profileButtonsBottom profileButtons">
            <button onClick={handleLogout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
