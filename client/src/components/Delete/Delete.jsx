import React from "react";
import { API_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadAdsRequest } from "../../redux/adsRedux";

const Delete = () => {

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE'
    };

    fetch(`${API_URL}/api/ads/${id}`, options)
      .then(() => {
        dispatch(loadAdsRequest());
        navigate('/');
      });
  },[dispatch]);

  return null;
};

export default Delete;