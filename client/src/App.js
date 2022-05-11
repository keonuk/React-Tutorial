import React from 'react';
import Customer from './components/Customer';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  // root class
  root: {
    width: '100%',
    // 위쪽 여백 3의 가중치
    marginTop: theme.spacing(3),
    // x축 오버플로우 발생 가능
    overflow: "auto"
  },
  table: {
    minWidth: 1080
  }
});

// 클래스 이용 컴포넌트 만들기
class App extends React.Component{
  
  state = {
    customers: ""
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  render(){
    const {classes} = this.props;
    return(
      <Paper className={classes.root}>
        <Table className={classes.table}>
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
              {/* 특정 배열 각 원소에 접근해서 그 원소를 어떻게 처리할지(파이선과 문법 동일) */}
              {/* map을 이용할때는 key={} props 사용해야함(콘솔 오류) */}
              {this.state.customers ? this.state.customers.map(c => {
                return (
                  <Customer
                    key={c.id}
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                    />
                );   
              }) : ""}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(App);