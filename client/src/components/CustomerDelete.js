import React from 'react';

class   CustomerDelete extends React.Component {

// 삭제 버튼 눌럿을시 고객정보가 삭제되는 기능의 api함수 
deleteCustomer(id){
    const url = '/api/customers/'+id;
    fetch(url,{
        method: 'DELETE'
    });
    this.props.stateRefresh();
}


render(){
    return (
        <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
    )
}

}

export default CustomerDelete;