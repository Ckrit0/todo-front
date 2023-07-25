import { useState } from "react";
import store from "./Store";
import { useNavigate } from "react-router-dom";

function Title(props){
    let movePage = useNavigate();
    function login(){
        let idInput = document.getElementById('idInput')
        let pwInput = document.getElementById('pwInput')
        let host = "http://localhost:8080/login"
        let body = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            mbId:idInput.value,
            mbEmail:idInput.value,
            mbPw:pwInput.value,
        }),
        }
        fetch(host,body)
        .then((response) => response.json())
        .then((response)=>{
            if(response.mbNo === 0){
                alert('입력한 정보가 틀립니다.')
                pwInput.value=""
            }else{
                store.mbNo = response.mbNo
                idInput.value = ""
                pwInput.value = ""
                props.setMbNo(store.mbNo)
            }
        })
    }
    function loginEnter(e){
        if(e.key==='Enter'){
            login()
        }
    }
    function logout(){
        store.mbNo = 0
        props.setMbNo(0)
    }
    return(
        <div>
            <p onClick={()=>{movePage("/todos")}}>타이틀바</p>
            {store.mbNo === 0?
                <div>
                    <input id="idInput" type="text" placeholder="아이디 또는 이메일" />
                    <input id="pwInput" type="password" placeholder="비밀번호" onKeyDown={(e)=>{loginEnter(e)}}/>
                    <span onClick={login}>로그인</span>
                    <span>/</span>
                    <span onClick={()=>{movePage("/join")}}>회원가입</span>
                </div>
                :
                <div>(유저넘버:{store.mbNo})님 환영합니다.
                    <span onClick={logout}>로그아웃</span>
                    <span>/</span>
                    <span onClick={()=>{movePage("/changepassword")}}>비번변경</span>
                    <span>/</span>
                    <span onClick={()=>{movePage("/leave")}}>회원탈퇴</span>
                </div>
            }
        </div>
    )
}

export default Title;