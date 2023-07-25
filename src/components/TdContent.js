import { useState } from "react"

function TdContent(props){
    function completeTodo(){
        if(props.td.tdIscomplete === 0){
            fetch("http://localhost:8080/complete",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    tdNo:props.td.tdNo,
                }),
                })
        }else{
            fetch("http://localhost:8080/cancelcomplete",{
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
        fetch("http://localhost:8080/delete",{
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
            fetch("http://localhost:8080/tdupdate",{
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
        fetch("http://localhost:8080/changetargetdate",{
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
                <input id='changeTodo' type="text" defaultValue={props.td.tdContent} onKeyDown={(e)=>{changeTodo(e)}} />
            )
        }else{
            return(
                <span onClick={()=>{setInputTodo(!inputTodo)}}>{props.td.tdContent}</span>
            )
        }
    }

    function todoDateBox(){
        if(inputDateTodo){
            return(
                <input id='changeTodoDate' type="date" defaultValue={props.td.tdTargetdate} onChange={()=>{changeTodoDate()}} onKeyDown={(e)=>{cancelChangeTodoDate(e)}}/>
            )
        }else{
            return(
                <span onClick={()=>{setInputDateTodo(!inputDateTodo)}}>{props.td.tdTargetdate}</span>
            )
        }
    }

    return(
        <tr>
            <td>
                <input type="checkbox" checked={props.td.tdIscomplete} onClick={completeTodo} readOnly />
            </td>
            <td>
                {todoBox()}
            </td>
            <td>
                {todoDateBox()}
            </td>
            <td>
                <button onClick={deleteTodo}>
                    Del
                </button>
            </td>
        </tr>
    )
}

export default TdContent;