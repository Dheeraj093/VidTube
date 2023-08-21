import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { axiosInstance } from "../utils/axiosConfig";
import Card from "./Card";
import Swal from "sweetalert2";
import {
  fetchRecommendationsError,
  fetchRecommendationsStart,
  fetchRecommendationsSuccess,
} from "../redux/recommendationsSlice";
import Loader from "./Loader";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Tags = ({ tags }) => {

  const dispatch = useDispatch();
  const { videos, loading } = useSelector((state) => state.recommendations);

  useEffect(() => {
    const fetchVideos = async () => {
      dispatch(fetchRecommendationsStart());
      try {
        const res = await axiosInstance.get(`/videos/tags?tags=${tags}`);
        dispatch(fetchRecommendationsSuccess(res.data.videos));
        // console.log(res)
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.error || "Error fetching recommendations",
        });
        dispatch(fetchRecommendationsError());
      }
    };

    fetchVideos();
  }, [dispatch, tags]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      {videos?.length > 0 &&
        videos?.map((video) => (
          <Card  key={video._id} video={video} />
        ))}
    </Container>
  );
};

export default Tags;
