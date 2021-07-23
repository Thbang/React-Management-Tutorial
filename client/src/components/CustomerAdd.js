import React from 'react';
import { post } from 'axios';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
hidden:{
    display: 'none'
}

});

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
               
            file: null,  
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            // 현재 다이어로그 창이 열려있는지 확인 
            open: false
        }


    }

    handleFormSubmit = (e) =>{
        e.preventDefault()
        this.addCustomer()
        // 서버로 부터 어떠한 response를 받았을 떄 콘솔창에 띄우기
        .then((response) => {
            console.log(response.data);
            this.props.stateRefresh();
        }) 
        this.setState({
            file: null,
            userName: '',                                        
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open: false
        })

       

    }

    handleFileChange = (e) =>{

        // setstate  state에 있는 파일 바꿔줌
        // e.target 그 이벤트가 발생하 ㄴ인풋 값 자체를 의미
         this.setState({
         file: e.target.files[0],
         fileName: e.target.value
         })


    }


    handleValueChange = (e) =>{
        let nextState ={};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);


    }
  
    addCustomer=() =>{
        const url = '/api/customers';
        const formData = new FormData();
        // 바이트로 구성된 파일을 image이름으로 전송
        formData.append('image',this.state.file);
        formData.append('name',this.state.userName);
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);

        const config={
            headers: {
                // multipart/form-data전달하는 데이터에 파일이 있을경우 설정해 줘야 되는 요소
                'content-type': 'multipart/form-data'
            }

        }
        return post(url, formData, config);

    } 

    // 바인딩 처리임 = () =>{
handleClickOpen = () =>{
    this.setState({
        open: true
    })
}

handleClose = () =>{
    this.setState({
        file: null,
        userName: '',                                        
        birthday:'',
        gender:'',
        job:'',
        fileName:'',
        open: false
    })

}


    render() {
        const {classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                    <input className={classes.hidden} accept ="image/*" id ="raised-button-file"   type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/>
                    <label htmlFor ="raised-button-file">
                        <Button variant= "contained" color="primary" component="span" name="file" >

                            {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                        </Button>
                    </label>
                    {/* <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/> */}
                    <br/>
                    <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                    <TextField label="생년 월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/> 
                    <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/> 
                    <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/> 
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>

                </Dialog>


            </div>
            // <form onSubmit={this.handleFormSubmit}>
            //     <h1>고객 추가</h1>
            //     프로필 이미지:<input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
            //     이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
            //     생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/> 
            //     성별:<input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/> 
            //     직업:<input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/> 
            //     <button type="submit">추가하기</button>
            // </form>
        )

    }




}
// 스타일 씌어진 상태로 내보내기
export default withStyles(styles) (CustomerAdd);