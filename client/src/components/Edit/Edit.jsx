import React from "react";
import { useSelector } from "react-redux";
import { getAds } from "../../redux/adsRedux";
import { Box } from "@mui/material";
import CardInfo from "../CardInfo/CardInfo";
import { CircularProgress } from '@mui/material';


const Edit = () => {

  const user = useSelector(user => user.users);
  const allAds = useSelector(getAds);
  
  const userAds = allAds && user ? allAds.filter(userAd => userAd.author?.username === user.username) : [];

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={2}
      alignItems="center"
      justifyContent="center"
    >
      {userAds.map(ad => (
        <Box
          key={ad._id}
          flexBasis={{ xs: '100%', sm: '48%', md: '23%' }}
          display="flex"
          justifyContent="center"
        >
          <CardInfo id={ad._id} name={ad.title} location={ad.location} image={ad.image} />
        </Box>
      ))}
    </Box>
  )
};

export default Edit;