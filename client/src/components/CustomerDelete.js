import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { Typography } from '@material-ui/core';

class CustomerDelete extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    // 바인딩처리 = () =>
    handelClickOpen = () => {
        this.setState({
            open: true
        });
    }

    // 바인딩처리 = () =>
    handleClose = () => {
        this.setState({
            open: false
        });
    }

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
            <div>
                <Button variant="contained" color="secondary" onClick={this.handelClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default CustomerDelete;