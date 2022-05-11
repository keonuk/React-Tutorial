import React, {useState} from 'react';
import Customer from './components/Customer';
import './App.css';

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
    return(
      <div>
        {
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
      </div>
    )
  }
}


export default App;