import { useState } from "react"

function TdContent(props){
    function completeTodo(){
        if(props.td.tdIscomplete === 0){
            fetch("http://58.79.123.11:8080/complete",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    tdNo:props.td.tdNo,
                }),
                })
        }else{
            fetch("http://58.79.123.11:8080/cancelcomplete",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    tdNo:props.td.tdNo,
                }),
                })
        }
    }

    function deleteTodo(){
        fetch("http://58.79.123.11:8080/delete",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                tdNo:props.td.tdNo,
            }),
        })
    }

    function changeTodo(e){
        if(e.key === 'Enter'){
            fetch("http://58.79.123.11:8080/tdupdate",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    tdNo:props.td.tdNo,
                    tdContent:document.getElementById('changeTodo').value,
                }),
            })
            setInputTodo(false)
        }
        if(e.key === 'Escape'){
            setInputTodo(false)
        }
    }

    function changeTodoDate(){
        fetch("http://58.79.123.11:8080/changetargetdate",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    tdNo:props.td.tdNo,
                    tdTargetdate:document.getElementById('changeTodoDate').value,
                }),
            })
            setInputDateTodo(false)
    }

    function cancelChangeTodoDate(e){
        if(e.key === 'Escape'){
            setInputDateTodo(false)
        }
    }

    let [inputTodo,setInputTodo] = useState(false)
    let [inputDateTodo,setInputDateTodo] = useState(false)

    function todoBox(){
        if(inputTodo){
            return(
                <input className="todo_inputtext" id='changeTodo' type="text" defaultValue={props.td.tdContent} onKeyDown={(e)=>{changeTodo(e)}} />
            )
        }else{
            return(
                <span style={props.td.tdIscomplete==0?{}:{textDecoration:'line-through'}} onClick={()=>{setInputTodo(!inputTodo)}}>{props.td.tdContent}</span>
            )
        }
    }

    function todoDateBox(){
        if(inputDateTodo){
            return(
                <input className="todo_inputdate" id='changeTodoDate' type="date" defaultValue={props.td.tdTargetdate} onChange={()=>{changeTodoDate()}} onKeyDown={(e)=>{cancelChangeTodoDate(e)}}/>
            )
        }else{
            return(
                <span onClick={()=>{setInputDateTodo(!inputDateTodo)}}>{props.td.tdTargetdate}</span>
            )
        }
    }

    return(
        <tr className="todo_tr">
            <td className="todo_td todo_td1">
                <input className="todo_check" type="checkbox" checked={props.td.tdIscomplete} onClick={completeTodo} readOnly />
            </td>
            <td className="todo_td todo_td2">
                {todoBox()}
            </td>
            <td className="todo_td todo_td3">
                {todoDateBox()}
            </td>
            <td className="todo_td todo_td4">
                <button className="todo_button" onClick={deleteTodo}>
                    삭제
                </button>
            </td>
        </tr>
    )
}

export default TdContent;