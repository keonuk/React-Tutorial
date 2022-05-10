import React, {useState} from 'react';
import logo from './logo.ico';

// 클래스 이용 컴포넌트 만들기
//class App extends React.Component{
// 
//}

function App() {
  
  const [text, setText] = useState('KKK');

  const onSubmit = () => {
    alert('submitted');
  }

  // 키보드 눌렀다가 올라올때 이벤트
  const onKeyUp = (event) => {
    // keyCode 13 -> enter (엔터치면 onsubmit)
    if (event.keyCode === 13) {
      onSubmit();
    }
  }
  
  //let text = 'Keonuk';

  const updateText = () => {
    //text = 'TEXT';x
    setText('TEXT')
    console.log(text);
  }

  console.log(text);
  
  return (
    <div className="App">
      <input onKeyUp = {onKeyUp}></input>
      <button onClick = {onSubmit}>Submit</button>

      <br /><br />

      <span>{text}</span>
      <button onClick = {updateText}>Update</button>
      <img src = {logo} lat = "logo"/>
      <h2>Let's develope managementSystem</h2>
    </div> 
  );
}

export default App;