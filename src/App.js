import React, {Component} from 'react';
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
    marginTop: theme.spacing.unit * 3,
    // x축 오버플로우 발생 가능
    overflow: "auto"
  },
  table: {
    minWidth: 1080
  }
})

const customers = [
  {
    'id' : '1',
    'image' : 'https://placeimg.com/64/64/1',
    'name' : '김철수',
    'birthday' : '921104',
    'gender' : '남자',
    'job' : '대학생'
  },
  {
    'id' : '2',
    'image' : 'https://placeimg.com/64/64/2',
    'name' : '홍길동',
    'birthday' : '111111',
    'gender' : '남자',
    'job' : '디자이너'
  },
  {
    'id' : '3',
    'image' : 'https://placeimg.com/64/64/3',
    'name' : '김길동',
    'birthday' : '222222',
    'gender' : '남자',
    'job' : '의사'
  },
]
// 클래스 이용 컴포넌트 만들기
class App extends React.Component{
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
          <TableBody>{
              // 특정 배열 각 원소에 접근해서 그 원소를 어떻게 처리할지(파이선과 문법 동일)
              // map을 이용할때는 key={} props 사용해야함(콘솔 오류)
              customers.map(c => {
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
              })
            }
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(App);