import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({ 
  tableRow: {
    "&:hover": {
      cursor: "pointer",      
    },
  },  
}));

const Posts = (props) => {
  const history = useHistory();

  const handleRowClick = (id) => {    
    history.push("order/" + id);
  };

  const { posts } = props;
  const classes = useStyles();
  if (!posts || posts.length === 0) return <p>Can not find any orders, sorry</p>;
  return (
    <React.Fragment>
      <Container maxWidth="md" component="main">
	  <Box m={1} >
        <Grid container justify="flex-end">
          <Button href={"/order/"} variant="contained" color="primary">
            Open new order
          </Button>		  
        </Grid>	
		</Box>	
        <Paper className={classes.root}>
          <TableContainer>
            <Table stickyHeader aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Contact</TableCell>
                  <TableCell align="left">Agency</TableCell>
                  <TableCell align="left">Company</TableCell>
                  <TableCell align="left">Deadline</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((post) => {
                  return (
                    <TableRow
                      hover
                      onClick={() => handleRowClick(post.id)}
                      className={classes.tableRow}
                    >
                      <TableCell component="th" scope="row">
                        {post.id}
                      </TableCell>

                      <TableCell align="left">{post.categoryname}</TableCell>

                      <TableCell align="left">{post.name + ' - ' + post.phone} </TableCell>

                      <TableCell align="left">{post.agency}</TableCell>

                      <TableCell align="left">{post.company}</TableCell>

                      <TableCell align="left">{post.deadline.substring(0, 16)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
};
export default Posts;
