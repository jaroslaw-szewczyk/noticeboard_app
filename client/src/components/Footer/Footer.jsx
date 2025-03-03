import React from "react";
import { Container, Typography, Box } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";

const Footer = () => {

  return(
    <Box
      component="footer"
      sx={{
        mt: 4,
        mb: 1,
        py: 2,
        textAlign: "center",
        bgcolor: "primary.main", // Domyślny niebieski
        color: "common.white",   // Domyślny biały tekst
        borderRadius: 2,         // Zaokrąglenie rogów
      }}
    >
      <Container>
        <Typography variant="body2">
          <CopyrightIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }} />
          All rights reserved
        </Typography>
      </Container>
    </Box>
  )
};

export default Footer;