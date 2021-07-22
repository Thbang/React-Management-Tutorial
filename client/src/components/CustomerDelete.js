import React from 'react';

class   CustomerDelete extends React.Component {

// ���� ��ư �������� �������� �����Ǵ� ����� api�Լ� 
deleteCustomer(id){
    const url = '/api/customers/'+id;
    fetch(url,{
        method: 'DELETE'
    });
    this.props.stateRefresh();
}


render(){
    return (
        <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>����</button>
    )
}

}

export default CustomerDelete;