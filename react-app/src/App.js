import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage"
import PostFormComponent from "./components/PostForm/PostFormComponent";
import SinglePostComponent from "./components/SinglePostPage/SinglePostComponent";
import PageNotFound from "./components/PageNotFound/PageNotFOund";
import SearchResult from "./components/SearchResultPage";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path='/search/:term'>
            <SearchResult />
          </Route>
          <Route exact path='/post/new'>
            <PostFormComponent />
          </Route>
          <Route exact path='/post/edit/:id'>
            <PostFormComponent />
          </Route>
          <Route exact path="/post/:id">
            <SinglePostComponent />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="*">
            <PageNotFound/>
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
