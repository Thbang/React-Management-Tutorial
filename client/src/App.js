import logo from './logo.svg';
import React, {Component, PureComponent} from 'react'
import Customer from './components/Customer'
import './App.css';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableBody from "@material-ui/core/TableBody";
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';
import { render } from '@testing-library/react';
import { TableRow } from '@material-ui/core';

const styles = theme =>({
root:{
width:'100%',
marginTop: theme.spacing.unit*3,
overflowX:"auto"


},
table:{
  minWidth:1080
}


});

class App extends Component {
  //state는 변경될수 있는 데이터 처리, props는 변경 될수 없는 데이터 처리
  state={
    customers: ""
  }

  componentDidMount(){
   this.callApi()
   .then(res => this.setState({customers: res}))
   .catch(err => console.log(err));
  }

  callApi = async() =>{
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  render() {
    const {classes} = this.props;
    return (
      <Paper className = {classes.root}>
        
          <Table className = {classes.table}>
            <TableHead>
              <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>            
              {this.state.customers ?  this.state.customers.map(c =>{
                return (<Customer key={c.id}  id={c.id} image={c.image}  name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />) 
              }) : ""}
            </TableBody>
  
          </Table>
        
  
       
  
      </Paper>
    );
  };

  
}

export default withStyles(styles) (App);
