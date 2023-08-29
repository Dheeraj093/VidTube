import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Video from "./pages/Video";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useDispatch, useSelector } from "react-redux";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Tags from "./components/Tags"
import SavedVideos from "./components/SavedVideos";
import History from "./components/History";
import MyVideos from "./components/MyVideos";
import LikedVideos from "./components/LikedVideos";
import { loginSuccess } from "./redux/userSlice";

const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 2rem;
`;

const App = () => {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(true);
  const { loggedInUser } = useSelector((state) => state.user);
  useEffect (() =>{
   if(!loggedInUser) {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        dispatch(loginSuccess(user));
   }
},[])
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container className="App">
        <BrowserRouter>
          <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trending" element={<Home type="trending" />} />
                  <Route
                    path="subscriptions"
                    element={
                      loggedInUser ? (
                        <Home type="sub" />
                      
                      ) : (
                        <Navigate to="/signin" />
                      )
                    }
                  />
                  <Route path="saved" element={loggedInUser ? (<SavedVideos/>):(<Navigate to="/signin" />)} />
                  <Route path="history" element={loggedInUser ? (<History/>):(<Navigate to="/signin" />)} />
                  <Route path="myvideos" element={loggedInUser? (<MyVideos/>):(<Navigate to="/signin" />)} />
                  <Route path="likedvideos" element={loggedInUser? (<LikedVideos/>):(<Navigate to="/signin" />)} />
                  <Route path="music" element={<Tags tags="Music"/>} />
                  <Route path="sports" element={<Tags tags="sports"/>} />
                  <Route path="movie" element={<Tags tags="movie"/>} />
                  <Route path="news" element={<Tags tags="news"/>} />
                  <Route path="gaming" element={<Tags tags="game"/>} />
                  <Route path="live" element={<div style={{ color: 'red' }}>No One Is Live Yet</div>}  />
                  <Route path="search" element={<Search />} />
                  <Route
                    path="signin"
                    element={loggedInUser ? <Navigate to="/" /> : <Signin />}
                  />
                  <Route
                    path="signup"
                    element={loggedInUser ? <Navigate to="/" /> : <Signup />}
                  />
                  <Route path="video">
                    <Route path=":videoId" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
};

export default App;
