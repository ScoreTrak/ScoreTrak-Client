import { Box, Typography } from "@material-ui/core";
import React from "react";


export default function PreCompBanner() {
  return (
    <>
      <Box mt={2} sx={{textAlign: "center"}}>
        <Typography variant={"h4"}>
          Welcome to the <strong>{ `${process.env.REACT_APP_COMPETITION_NAME} ` }</strong>Competition!
        </Typography>
        <Typography variant={"h6"}>
          This window will automatically reload once the first round is
          scored.
        </Typography>
      </Box>
    </>
  )
}