import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import CardInfo from "../Card/CardInfo";

import { loadAdsRequest, getAds } from "../../redux/adsRedux";

const Home = () => {
  const [temp, setTemp] = useState([
    { id: 1, title: 'Dog', location: 'Gdańsk' },
    { id: 2, title: 'Cat', location: 'Warszawa' },
    { id: 3, title: 'Lizard', location: 'Katowice' }
  ]);

  const ads = useSelector(getAds);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdsRequest());
  });


  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={2}
      alignItems="center"
      justifyContent="center"
    >
      {ads.map(ad => (
        <Box
          key={ad._id}
          flexBasis={{ xs: '100%', sm: '48%', md: '23%' }}
          display="flex"
          justifyContent="center"
        >
          <CardInfo name={ad.title} location={ad.location} image={ad.image} />
        </Box>
      ))}
    </Box>
  );
};

export default Home;