import React from "react";

import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  Chip,
} from "@mui/material";

const BaseCard = (props) => {
  return (
    // <Card sx={{backgroundColor:"#000"}} className="">
    <Card className="bg-black shadow-lg shadow-black">
      <Box p={2} display="flex" alignItems="center">
        <Typography variant="h4">{props.title}</Typography>
      </Box>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default BaseCard;
