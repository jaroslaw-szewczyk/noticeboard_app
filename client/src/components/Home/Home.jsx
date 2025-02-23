import React, { useState } from "react";
import { loadAdsRequest } from "../../redux/ads.redux";
import { useDispatch, useSelector } from 'react-redux';
import { Box } from "@mui/material";

import CardInfo from "../Card/CardInfo";

const Home = () => {

  const [temp, setTemp] = useState([{ id: 1, title: 'Dog', location: 'Gdańsk' }, { id: 2, title: 'Cat', location: 'Warszawa' }, { id: 3, title: 'Lizard', location: 'Katowice' }])

  const dispatch = useDispatch();

  dispatch(loadAdsRequest());

  console.log(temp);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      {
      temp.map(item => ( 
        <CardInfo key={item.id} name={item.title} location={item.location} />
      ))
    }
    </Box>
  )
};

export default Home;