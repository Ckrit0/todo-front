import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import TdList from './components/TdList';
import Main from './components/Main';
import Join from './components/Join';
import Leave from './components/Leave';
import ChangePassword from './components/ChangePassword';
import Title from './components/Title';
import store from './components/Store';
import { useState } from 'react';


// 비로그인시 메인화면으로 갈 페이지들 정리(todos)
function App() {
  let [mbNo,setMbNo] = useState(store.mbNo) // 아무나 쉽게 접근할 수 없는 방식(mbNo+id 등)으로 변경해야함.
  return (
    <div className="App">
      <Title setMbNo={setMbNo}/>
      <Routes>
        {mbNo===0?<Route path={'/'} element={<Main/>} />: <Route path={'/'} element={<TdList/>} />}
        <Route path={'/join'} element={<Join setMbNo={setMbNo}/>} />
        <Route path={'/changePassword'} element={<ChangePassword />} />
        <Route path={'/leave'} element={<Leave />} />
      </Routes>
    </div>
  );
}

export default App;
