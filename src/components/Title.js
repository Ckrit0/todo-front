import store from "./Store";
import { useNavigate } from "react-router-dom";
import '../App.css'

function Title(props){
    let movePage = useNavigate();
    function getUser(){
        if(store.mbNo === 0){
            return
        }
        let host = "http://58.79.123.11:8080/getmbbymbno"
        let body = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            mbNo:store.mbNo,
        }),
        }
        fetch(host,body)
        .then((response) => response.json())
        .then((response)=>{
            store.mbId = response.mbId
            store.mbEmail = response.mbEmail
        })
        
    }
    function login(){
        let idInput = document.getElementById('idInput')
        let pwInput = document.getElementById('pwInput')
        let host = "http://58.79.123.11:8080/login"
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
                store.mbId = response.mbId
                store.mbEmail = response.mbEmail
                idInput.value = ""
                pwInput.value = ""
                props.setMbNo(store.mbNo)
            }
        })
    }
    function loginIdEnter(e){
        if(e.key==='Enter'){
            document.getElementById('pwInput').focus()
        }
    }
    function loginPwEnter(e){
        if(e.key==='Enter'){
            login()
        }
    }
    function logout(){
        store.mbNo = 0
        store.mbId = ""
        store.mbEmail = ""
        props.setMbNo(0)
    }
    getUser()
    return(
        <div>
            <div className="title_title" onClick={()=>{movePage("/")}}><span className="title_t" >T</span>odo<span className="title_t" >T</span></div>
            {store.mbNo === 0?
                <div>
                    <input className="title_input" id="idInput" type="text" placeholder="아이디 또는 이메일" onKeyDown={(e)=>{loginIdEnter(e)}}/>
                    <input className="title_input" id="pwInput" type="password" placeholder="비밀번호" onKeyDown={(e)=>{loginPwEnter(e)}}/>
                    <span className="title_button" onClick={login}>로그인</span>
                    <span className="title_slash" >/</span>
                    <span className="title_button" onClick={()=>{movePage("/join")}}>회원가입</span>
                </div>
                :
                <div>
                    <span className="title_greet" >{store.mbId+"("+store.mbEmail+")"}님 환영합니다.</span>
                    <span className="title_button" onClick={logout}>로그아웃</span>
                    <span className="title_slash" >/</span>
                    <span className="title_button" onClick={()=>{movePage("/changepassword")}}>비번변경</span>
                    <span className="title_slash" >/</span>
                    <span className="title_button" onClick={()=>{movePage("/leave")}}>회원탈퇴</span>
                </div>
            }
        </div>
    )
}

export default Title;