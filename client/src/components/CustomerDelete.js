import React from 'react';

class CustomerDelete extends React.Component{
    
    deleteCustomer(id) {
        // /api/customer/7
        const url = '/api/customers/' + id;
        // 해당 url경로 접속
        fetch(url, {
            // REST api 에서는 DELETE 
            method: 'DELETE'
        });

        // 삭제가 된 이후에 바뀐 고객목록 갱신
        this.props.stateRefresh();
    }

    render(){
        return(
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }
}

export default CustomerDelete;