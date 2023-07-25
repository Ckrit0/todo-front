import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import TdList from './components/TdList';
import Main from './components/Main';
import Login from './components/Login';
import Join from './components/Join';
import Leave from './components/Leave';
import ChangePassword from './components/ChangePassword';
import Title from './components/Title';
import store from './components/Store';


// 비로그인시 메인화면으로 갈 페이지들 정리(todos)
function App() {
  let mb = store.mb
  return (
    <div className="App">
      <Title />
      <Routes>
        <Route path={'/'} element={<Main/>} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/join'} element={<Join />} />
        <Route path={'/todos'} element={<TdList/>} />
        <Route path={'/changePassword'} element={<ChangePassword />} />
        <Route path={'/leave'} element={<Leave />} />
      </Routes>
    </div>
  );
}

export default App;
