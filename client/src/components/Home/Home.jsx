import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import CardInfo from "../CardInfo/CardInfo";
import Search from "../Search/Search";
import { getAds } from "../../redux/adsRedux";

const Home = () => {
 
  const ads = useSelector(getAds) || [];
 
  return (
    <Box 
    display="flex"
    flexDirection="column"
    alignItems="center"
    >
      <Search />
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
          <CardInfo id={ad._id} name={ad.title} location={ad.location} image={ad.image} />
        </Box>
      ))}
    </Box>
    </Box>
  );
};

export default Home;