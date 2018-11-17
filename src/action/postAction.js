import Axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  POST_LOADING,
  GET_POSTS,
  DELETE_POST,
  GET_POST,
  CLEAR_ERRORS
} from "./types";

// add post

export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  Axios.post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// get posts

export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  Axios.get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};
// get post

export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  Axios.get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// delete post
export const deletePost = id => dispatch => {
  Axios.delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// add likes
export const addLike = id => dispatch => {
  Axios.post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// remove likes
export const removeLike = id => dispatch => {
  Axios.post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// add comment

export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  Axios.post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// delete comment

export const deleteComment = (postId, commentId) => dispatch => {
  Axios.delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
