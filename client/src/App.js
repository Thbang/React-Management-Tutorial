import logo from './logo.svg';
import React, { Component, PureComponent } from 'react'
import Customer from './components/Customer'
import CustomerAdd from './components/CustomerAdd'
import './App.css';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableBody from "@material-ui/core/TableBody";
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { render } from '@testing-library/react';
import { TableRow } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { conformsTo } from 'lodash';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080


  },
  menu:{
    marginTop:15,
    marginBottom: 15,
    display:'flex',
    justifyContent:'center'
  }
  ,
  paper:{
   marginLeft: 18,
   marginRight: 18
  },
  tableHead:{
    fontSize:'1.0 rem'
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  }
});
// ????????? Component ????????? ?????????
// 1. constructor()
// 2. componentWillmount()
// 3.render()
// 4.componentDidMount()
// 5. PROPS OR STATE ???????????? ?????? shouldComponentUpdate() ?????? -> render ????????? ?????? ???????????? ??? ??????
// ???????????? ??????????????? ????????? ???????????? ????????? ?????? ?????????????????? ????????? ??? ???????????? ??????.


class App extends Component {
  //state??? ???????????? ?????? ????????? ??????, props??? ?????? ?????? ?????? ????????? ??????
  // state={
  //   customers: "",
  //   completed: 0
  // }

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completd: 0,
      searchKeyword: ''
    }
  }

  //setstate??? ?????????
  stateRefresh = () => {
    this.setState({
      customer: '',
      completed: 0,
      searchKeyword: ''

    });
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }


  //  API??? ???????????? ????????? ?????? ??????????????? ?????? ????????? ??????-API??? ?????????????????? ??????
  componentDidMount() {
    // 0.02????????? progress?????? ?????? ??????
    this.timer = setInterval(this.progress, 200);

    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 10 });

  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  handleValueChange = (e) =>{
   let nextState={};
   nextState[e.target.name] = e.target.value;
   this.setState(nextState);

  }
  // render ?????? ??????
  render() {
    const filteredComponents =(data) => {
      data = data.filter((c) => {
        // c8 name??? ????????? NAME?????????
        return c.NAME.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) =>{
        return <Customer stateRefresh={this.stateRefresh} key={c.ID} id={c.ID} image={c.IMAGE} name={c.NAME} birthday={c.BIRTHDAY} gender={c.GENDER} job={c.JOB} />
      } ); 

      
    }
    const { classes } = this.props;
    const cellList=["??????","????????? ?????????","??????", "????????????","??????", "??????","??????"]
        return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              ?????? ?????? ?????????
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="????????????"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                name= "searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.menu}>
        <CustomerAdd stateRefresh={this.stateRefresh} />
        </div>
        <Paper className={classes.paper} >

          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map (c=> {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
                {/* <TableCell>??????</TableCell>
                <TableCell>?????????</TableCell>
                <TableCell>??????</TableCell>
                <TableCell>????????????</TableCell>
                <TableCell>??????</TableCell>
                <TableCell>??????</TableCell>
                <TableCell>??????</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* API?????? ?????? ??????        */}
              {/* {this.state.customers ? this.state.customers.map(c => {
                // ???????????? ??????????????? ??????????????? ?????? ????????? ?????? ?????????
                return (<Customer stateRefresh={this.stateRefresh} key={c.ID} id={c.ID} image={c.IMAGE} name={c.NAME} birthday={c.BIRTHDAY} gender={c.GENDER} job={c.JOB} />)
              }) : */}
              {this.state.customers ?
              filteredComponents(this.state.customers):
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                  </TableCell>

                </TableRow>}
            </TableBody>

          </Table>




        </Paper>
        
      </div>
    );
  };


}

export default withStyles(styles)(App);
