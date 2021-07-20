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
import  CircularProgress from '@material-ui/core/CircularProgress'; 
import { conformsTo } from 'lodash';

const styles = theme =>({
root:{
width:'100%',
marginTop: theme.spacing.unit*3,
overflowX:"auto"


},
table:{
  minWidth:1080
},
progress:{
margin: theme.spacing.unit *2
}


});
// 리액트 Component 라이프 사이클
  // 1. constructor()
  // 2. componentWillmount()
  // 3.render()
  // 4.componentDidMount()
  // 5. PROPS OR STATE 변경되는 경우 shouldComponentUpdate() 실행 -> render 함수를 다시 불러와서 뷰 갱신
  // 리액트는 상태변화를 알아서 감지해서 이러한 뷰를 재구성하기에 상태를 잘 구성해야 한다.


class App extends Component {
  //state는 변경될수 있는 데이터 처리, props는 변경 될수 없는 데이터 처리
  state={
    customers: "",
    completed: 0
  }


  //  API를 불럿와서 특정한 뷰를 출력하고자 할때 쓰이는 함수-API를 비동기적으로 호출
  componentDidMount(){
    // 0.02초마다 progress함수 실행 설정
    this.timer = setInterval(this.progress, 200);

   this.callApi()
   .then(res => this.setState({customers: res}))
   .catch(err => console.log(err));
  }

  progress = () =>{
     const {completed} = this.state;
     this.setState({ completed: completed >= 100 ? 0 : completed + 10});

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
              {/* API응답 결과 출력        */}
              {this.state.customers ?  this.state.customers.map(c =>{
                return (<Customer key={c.ID}  id={c.ID} image={c.IMAGE}  name={c.NAME} birthday={c.BIRTHDAY} gender={c.GENDER} job={c.JOB} />) 
              }) : 
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant ="determinate" value ={this.state.completed}/>
                </TableCell>
                
                </TableRow>}
            </TableBody>
  
          </Table>
        
  
       
  
      </Paper>
    );
  };

  
}

export default withStyles(styles) (App);
