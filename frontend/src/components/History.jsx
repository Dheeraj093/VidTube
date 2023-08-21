import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../components/Card";
import { axiosInstance } from "../utils/axiosConfig";
import Swal from "sweetalert2";
import {
  fetchVideosError,
  fetchVideosStart,
  fetchVideosSuccess,
} from "../redux/videosSlice";
import Loader from "../components/Loader";

const Container = styled.div`
   position:relative;
`

const VideoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  ${'' /* margin-top: 30px; */}
`;


const Button = styled.button`
  position: absolute;
  right:10px;
  top:-30px;
  color: red;
  height:30px;
`

const History = () => {
   const dispatch = useDispatch();
  const { videos, loading } = useSelector((state) => state.videos);
  const { loggedInUser } = useSelector((state) => state.user);
  // console.log(loggedInUser)
  useEffect(() => {
    const fetchVideos = async () => {
      dispatch(fetchVideosStart());
      try {
        const res = await axiosInstance.get(`/videos/history/${loggedInUser.user._id}`,{
           headers: {
           Authorization: `${loggedInUser.token}`
         }
       });
        dispatch(fetchVideosSuccess(res.data.videos));
     
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.error || "Error fetching videos",
        });
        dispatch(fetchVideosError());
      }
    };

    fetchVideos();
  }, [dispatch,loggedInUser]);

  if (loading) {
    return <Loader />;
  }

  //delete All History
  const handleDelete =async()=>{
        dispatch(fetchVideosStart());
      try {
        const res = await axiosInstance.put(`/users/deleteHistory/${loggedInUser.user._id}`,{
           headers: {
           Authorization: `${loggedInUser.token}`
         }
       });
        dispatch(fetchVideosSuccess(res.data.videos));
     
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.error || "Error fetching videos",
        });
        dispatch(fetchVideosError());
      }
  }

  return (
    <Container>
      <Button onClick={handleDelete}>Delete All History</Button>

     <VideoContainer>
      {videos?.length > 0 &&
        videos?.map((video) => <Card key={video._id} video={video} />)}
    </VideoContainer>

    </Container>
  )
}

export default History