import { Box, CircularProgress, Typography } from "@material-ui/core";
import React from "react";


export default function PreCompBanner() {
  return (
    <>
      <Box sx={{textAlign: "center"}}>
        <CircularProgress />
        <Box mt={2}>
          <Typography variant={"h4"}>
            Welcome to the Competition!
          </Typography>
          <Typography variant={"h6"}>
            This window will automatically reload once the first round is
            scored.
          </Typography>
        </Box>
      </Box>
    </>
  )
}