import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { API_URL } from "../../../config";

const Search = () => {
  const [searchPhrase, setsearchPhrase] = useState('');

  const navigate = useNavigate();

  const handleSearch = () => {
    // console.log(searchPhrase)
    fetch(`${API_URL}/api/ads/search/${searchPhrase}`)
      .then(res => res.json())
      .then(data => {
        navigate('/searchResult', { state: { results: data } });
      })
  };

  return (
    <Box display="flex" gap={2} alignItems="center" marginTop="20px">
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchPhrase}
        onChange={(e) => setsearchPhrase(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        startIcon={<SearchIcon />}
      >
        Search
      </Button>
    </Box>
  );
};

export default Search;
