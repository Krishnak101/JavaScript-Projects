import { Fragment, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Home/Landing";
import Login from "./components/Login/Login";
import Dashboard from "./components/Home/Dashboard.jsx";
import Alert from "./components/Home/Alert";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "./components/utils/actions/auth.js";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/Routing/PrivateRoute.jsx";
import Posts from "./components/Posts/Posts";
import CreateProfile from "./components/Profile/CreateProfile.jsx";
import AddExperience from "./components/Profile/AddExperience.jsx";
import AddEducation from "./components/Profile/AddEducation.jsx";
import ExperienceTimeline from "./components/Profile/ExperienceTimeLine.jsx";
import Profiles from "./components/Profiles/Profiles.jsx";
import Profile from "./components/Profiles/Profile.jsx";
import Post from "./components/Posts/Post.jsx";

const App = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  // @ToDo If Profile Pic is already uploaded, replace it with a new one instead of creating newly
  // @ToDo Feature to format text in Posts and Comments using Editor.js
  // @ToDo Make Posts section Public and Ask to join the conversation
  // @ToDo Infinite scrolling feature for Posts
  // @ToDo Projects Section To Display our Projects

  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        {alert && <Alert alert={alert}></Alert>}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profile/user/:userId" element={<Profile />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route
              path="/edit-profile"
              element={<CreateProfile isEditPage={true} />}
            />
            <Route path="/add-experience" element={<AddExperience />} />
            <Route path="/add-education" element={<AddEducation />} />
            <Route path="/show-timeline" element={<ExperienceTimeline />} />

            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:postId" element={<Post />} />
          </Route>
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
