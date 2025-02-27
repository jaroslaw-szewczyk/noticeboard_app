import React from "react";
import { logOut } from "../../redux/usersRedux";
import { API_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE'
    };

    fetch(`${API_URL}/auth/logout`, options)
      .then(() => {
        dispatch(logOut());
        navigate('/');
      });
  },[dispatch]);

  return null;
};

export default LogOut;