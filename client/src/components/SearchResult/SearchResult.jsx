import React from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import CardInfo from "../CardInfo/CardInfo";

const SearchResult = () => {
 
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={2}
      alignItems="center"
      justifyContent="center"
    >
      {results.map(ad => (
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
  );
};

export default SearchResult;