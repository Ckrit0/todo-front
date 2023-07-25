import { useState } from "react";
import store from "./Store";
import { useNavigate } from "react-router-dom";

function Title(){
    let [ user , setUser ] = useState(store.mbNo)
    let movePage = useNavigate();
    function login(){
        store.mbNo = 1
        setUser(1)
    }
    function logout(){
        store.mbNo = 0
        setUser(0)
    }
    return(
        <div>
            <p onClick={()=>{movePage("/todos")}}>타이틀바</p>
            <input /><input /><span onClick={login}>로그인</span>/<span onClick={()=>{movePage("/join")}}>회원가입</span>
            <br />
            (유저넘버:{user})<span onClick={logout}>로그아웃</span>/<span onClick={()=>{movePage("/changepassword")}}>비번변경</span>/<span onClick={()=>{movePage("/leave")}}>회원탈퇴</span>
        </div>
    )
}

export default Title;