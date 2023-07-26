import { useEffect, useState } from "react"
import store from "./Store"
import { useNavigate } from "react-router-dom"

function Leave(){
    // 로그아웃시 메인페이지로 이동
    let movePage = useNavigate()
    if(store.mbNo === 0){
        movePage('/')
    }
    let [mbPw,setMbPw] = useState("")
    useEffect(()=>{
        if(mbPw !== ""){
            setMbPw(mbPw)
            leave()
        }
    },[mbPw])

    function getUserPw(){
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
            setMbPw(response.mbPw)
        })
    }

    function leave(){
        if(mbPw !== nowPw){
            setMbPw("")
            alert("비밀번호가 틀립니다.")
            document.getElementById('nowPwInput').value = ""
            setDisable(true)
            return
        }
        if(!window.confirm("탈퇴한 회원은 복구가 불가능합니다. 정말 삭제하시겠습니까?")){
            alert("회원 탈퇴가 취소되었습니다.")
            document.getElementById('nowPwInput').value = ""
            setDisable(true)
            return
        }

        let host = "http://58.79.123.11:8080/leave"
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
            if(response){
                alert('회원 탈퇴가 완료되었습니다.')
                document.getElementById('nowPwInput').value = ""
                setDisable(true)
                store.mbNo=0
                store.mbId=""
                store.mbEmail=""
                movePage("/")
            }else{
                alert('회원 탈퇴에 실패하였습니다.')
                document.getElementById('nowPwInput').value = ""
                setDisable(true)
            }
            
        })

    }


    function validateDisable(){
        if(nowPw === ""){
            setDisable(true)
            return
        }
        setDisable(false)
    }

    let [nowPw,setNowPw] = useState("")
    let [disable,setDisable] = useState(true)
    useEffect(()=>{
        setNowPw(nowPw)
        validateDisable()
    },[nowPw])

    function nowPwEnter(e){
        if(e.key === 'Enter'){
            document.getElementById('leaveButton').click()
        }
    }
    return(
        <div>
            <p>회원 탈퇴 페이지</p>
            <input id="nowPwInput" type="password" placeholder="비밀번호" onChange={(e)=>{setNowPw(e.target.value)}} onKeyDown={(e)=>{nowPwEnter(e)}} /><br />
            <button id="leaveButton" onClick={getUserPw} disabled={disable}>회원 탈퇴</button>
        </div>
    )
}

export default Leave;