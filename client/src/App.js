import React from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import  { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { styled, alpha } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
//import StyledInputBase from '@material-ui/core/InputBase';
//import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
//import Search from '@material-ui/icons/Search';
import SearchIcon from '@material-ui/icons/Search';
//import SearchIconWrapper from '@material-ui/icons/Search';


/* 
  React LifeCycle

  1) constructor()
  2) componentWillMount()
  3) render()
  4) componentDidMount()
*/

/*
  props or state => shouldComponentUpdate() ... --> render()
*/
const styles = theme => ({
  // root class
  root: {
    width: '100%',
    minWidth: 1080
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing(2)
  },
  tableHead: {
    fontSize: "1.0rem"
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  }
});

const Searchs = styled('div')(({ theme }) => ({
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
}));

const SearchIconWrappers = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBases = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));

// 클래스 이용 컴포넌트 만들기
class App extends React.Component{ 
  
  // 생성자 이용하여 state 갱신
  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }

  // state를 초기화
  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
    });

    // 고객 data를 새로 불러온다
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const {completed} = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed + 1});
  }

  render(){
    const {classes} = this.props;
    const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"];
    return(
      <div className={classes.root}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                고객 관리 시스템
              </Typography>
              <Searchs>
                <SearchIconWrappers>
                  <SearchIcon />
                </SearchIconWrappers>
                <StyledInputBases
                  placeholder="           검색하기"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Searchs>
            </Toolbar>
          </AppBar>
        </Box>
        <div className={classes.menu}>
          {/* 함수 자체를 props 형태로 보내줌 */}
          <CustomerAdd stateRefresh={this.stateRefresh}/>
        </div>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
                {/* 특정 배열 각 원소에 접근해서 그 원소를 어떻게 처리할지(파이선과 문법 동일) */}
                {/* map을 이용할때는 key={} props 사용해야함(콘솔 오류) */}
                {this.state.customers ? this.state.customers.map(c => {
                  return (
                    <Customer
                      stateRefresh={this.stateRefresh}
                      key={c.id}
                      id={c.id}
                      image={c.image}
                      name={c.name}
                      birthday={c.birthday}
                      gender={c.gender}
                      job={c.job}
                      />
                  );   
                }) : 
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                  </TableCell>
                </TableRow>
                }
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(App);