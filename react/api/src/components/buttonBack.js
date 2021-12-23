import React from "react";
import { Grid, Button } from "@material-ui/core/";
import { useHistory } from "react-router-dom";

function ButtonBack() {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <Grid container justify="flex-end">
      <Button onClick={() => goBack()} variant="contained" color="primary">
        Back
      </Button>
    </Grid>
  );
}

export default ButtonBack;
