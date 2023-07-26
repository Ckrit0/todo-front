import { useEffect, useState } from "react"
import store from "./Store"
import { useNavigate } from "react-router-dom"

function Join(props){
    // 로그인시 메인페이지로 이동
    let movePage = useNavigate()
    if(store.mbNo === 0){

    }else{
        movePage('/')
    }

    let joinIdInput = document.getElementById("joinIdInput")
    let joinEmailInput = document.getElementById("joinEmailInput")
    let joinPasswordInput = document.getElementById("joinPasswordInput")
    let joinConfirmInput = document.getElementById("joinConfirmInput")

    function join(){
        let host = "http://58.79.123.11:8080/join"
        let body = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            mbId:joinIdInput.value,
            mbEmail:joinEmailInput.value,
            mbPw:joinPasswordInput.value,
        }),
        }
        fetch(host,body)
        .then((response) => response.json())
        .then((response)=>{
            if(!response){
                alert('이미 존재하는 아이디 또는 이메일 주소입니다.')
                joinPasswordInput.value=""
                joinConfirmInput.value=""
            }else{
                alert(joinIdInput.value + '님 환영합니다.')
                login(joinIdInput.value,joinEmailInput.value,joinPasswordInput.value)
            }
        })
    }

    // 회원가입 성공시 즉시 로그인
    function login(id,email,pw){
        let host = "http://58.79.123.11:8080/login"
        let body = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            mbId:id,
            mbEmail:email,
            mbPw:pw,
        }),
        }
        fetch(host,body)
        .then((response) => response.json())
        .then((response)=>{
            store.mbNo = response.mbNo
            joinIdInput.value = ""
            joinEmailInput.value = ""
            joinPasswordInput.value=""
            joinConfirmInput.value=""
            setDisable(true)
            props.setMbNo(store.mbNo)
        })
    }

    // 회원가입 버튼 활성화 검사
    function validateDisable(){
        if(joinId === ""){
            setDisable(true)
            return
        }
        if(joinEmail === ""){
            setDisable(true)
            return
        }
        if(joinPw === ""){
            setDisable(true)
            return
        }
        if(joinCf === ""){
            setDisable(true)
            return
        }
        if(joinPw !== joinCf){
            setDisable(true)
            return
        }
        setDisable(false)
    }

    let [joinId,setJoinId] = useState("")
    let [joinEmail,setJoinEmail] = useState("")
    let [joinPw,setJoinPw] = useState("")
    let [joinCf,setJoinCf] = useState("")
    let [disable,setDisable] = useState(true)

    // 입력창 내용 검사
    useEffect(()=>{
        setJoinId(joinId)
        validateDisable()
    },[joinId])
    useEffect(()=>{
        setJoinEmail(joinEmail)
        validateDisable()
    },[joinEmail])
    useEffect(()=>{
        setJoinPw(joinPw)
        validateDisable()
    },[joinPw])
    useEffect(()=>{
        setJoinCf(joinCf)
        validateDisable()
    },[joinCf])

    // 엔터 누르면 다음줄
    function joinIdEnter(e){
        if(e.key === 'Enter'){
            document.getElementById('joinEmailInput').focus()
        }
    }
    function joinEmailEnter(e){
        if(e.key === 'Enter'){
            document.getElementById('joinPasswordInput').focus()
        }
    }
    function joinPwEnter(e){
        if(e.key === 'Enter'){
            document.getElementById('joinConfirmInput').focus()
        }
    }
    function joinCfEnter(e){
        if(e.key === 'Enter'){
            document.getElementById('joinButton').click()
        }
    }
    
    return(
        <div>
            <p>회원가입 페이지</p>
            <input id="joinIdInput" type="text" placeholder="아이디" onChange={(e)=>{setJoinId(e.target.value)}} onKeyDown={(e)=>{joinIdEnter(e)}} /><br />
            <input id="joinEmailInput" type="email" placeholder="이메일" onChange={(e)=>{setJoinEmail(e.target.value)}} onKeyDown={(e)=>{joinEmailEnter(e)}} /><br />
            <input id="joinPasswordInput" type="password" placeholder="비밀번호" onChange={(e)=>{setJoinPw(e.target.value)}} onKeyDown={(e)=>{joinPwEnter(e)}} /><br />
            <input id="joinConfirmInput" type="password" placeholder="비밀번호 확인" onChange={(e)=>{setJoinCf(e.target.value)}} onKeyDown={(e)=>{joinCfEnter(e)}} /><br />
            <button id="joinButton" onClick={join} disabled={disable}>회원 가입하기</button>
        </div>
    )
}

export default Join;