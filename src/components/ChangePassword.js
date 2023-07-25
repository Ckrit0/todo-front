import { useNavigate } from "react-router-dom";
import store from "./Store";
import { useEffect, useState } from "react";

function ChangePassword(){
    // 로그아웃시 메인페이지로 이동
    let movePage = useNavigate()
    if(store.mbNo === 0){
        movePage('/')
    }

    let [mbPw,setMbPw] = useState("")
    useEffect(()=>{
        if(mbPw !== ""){
            setMbPw(mbPw)
            changePassword()
        }
    },[mbPw])
    
    function getUserPw(){
        if(store.mbNo === 0){
            return
        }
        let host = "http://localhost:8080/getmbbymbno"
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
            setMbPw(response.mbPw)
        })
    }

    function changePassword(){
        if(mbPw !== nowPw){
            setMbPw("")
            alert("현재 비밀번호가 틀립니다.")
            document.getElementById('nowPwInput').value = ""
            document.getElementById('changePWInput').value = ""
            document.getElementById('changeCfInput').value = ""
            setDisable(true)
            return
        }
        let host = "http://localhost:8080/changepw"
        let body = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            mbNo:store.mbNo,
            mbPw:changePw,
        }),
        }
        fetch(host,body)
        .then((response) => response.json())
        .then((response)=>{
            if(response){
                alert('비밀번호가 변경되었습니다.')
                document.getElementById('nowPwInput').value = ""
                document.getElementById('changePWInput').value = ""
                document.getElementById('changeCfInput').value = ""
                setDisable(true)
                movePage("/")
            }else{
                alert('비밀번호 변경에 실패하였습니다.')
                document.getElementById('nowPwInput').value = ""
                document.getElementById('changePWInput').value = ""
                document.getElementById('changeCfInput').value = ""
                setDisable(true)
            }
            
        })
    }

    // 비밀번호 변경 버튼 활성화 검사
    function validateDisable(){
        if(nowPw === ""){
            setDisable(true)
            return
        }
        if(changePw ===""){
            setDisable(true)
            return
        }
        if(changeCf === ""){
            setDisable(true)
            return
        }
        if(changePw !== changeCf){
            setDisable(true)
            return
        }
        setDisable(false)
    }

    let [nowPw,setNowPw] = useState("")
    let [changePw,setChangePw] = useState("")
    let [changeCf,setChangeCf] = useState("")
    let [disable,setDisable] = useState(true)
    
    

    // 입력창 내용 검사
    useEffect(()=>{
        setNowPw(nowPw)
        validateDisable()
    },[nowPw])
    useEffect(()=>{
        setNowPw(nowPw)
        validateDisable()
    },[changePw])
    useEffect(()=>{
        setNowPw(nowPw)
        validateDisable()
    },[changeCf])

    function nowPwEnter(e){
        if(e.key === 'Enter'){
            document.getElementById('changePWInput').focus()
        }
    }
    function changePwEnter(e){
        if(e.key === 'Enter'){
            document.getElementById('changeCfInput').focus()
        }
    }
    function changeCfEnter(e){
        if(e.key === 'Enter'){
            document.getElementById('ChangeButton').click()
        }
    }

    return(
        <div>
            <p>비번변경 페이지</p>
            <input id="nowPwInput" type="password" placeholder="현재 비밀번호" onChange={(e)=>{setNowPw(e.target.value)}} onKeyDown={(e)=>{nowPwEnter(e)}} /><br />
            <input id="changePWInput" type="password" placeholder="변경할 비밀번호" onChange={(e)=>{setChangePw(e.target.value)}} onKeyDown={(e)=>{changePwEnter(e)}} /><br />
            <input id="changeCfInput" type="password" placeholder="변경할 비밀번호 확인" onChange={(e)=>{setChangeCf(e.target.value)}} onKeyDown={(e)=>{changeCfEnter(e)}} /><br />
            <button id="ChangeButton" onClick={getUserPw} disabled={disable}>비밀번호 변경</button>
        </div>
    )
}

export default ChangePassword;