import { useState } from "react"
import TdContent from "./TdContent";
import store from "./Store";

function TdList() {

  function insertTodo(){
    let host = "http://58.79.123.11:8080/tdnew"
    let body = {
      method: "POST",
      headers: {
          "Content-Type" : "application/json",
      },
      body: JSON.stringify({
          mbNo:store.mbNo,
          tdContent: tdInput.value,
          tdTargetdate: tdDateInput.value,
      }),
    }
    fetch(host,body)
    tdInput.value = ""
    tdDateInput.value = today
  }
  
  function getTdList(){
    let host = "http://58.79.123.11:8080/"
    if(store.seeAll === 1){
      host += "alltd"
    }else{
      host += "progresstd"
    }
    switch (store.order) {
      case 1:
        host += "orderdate"
        break;
      case 2:
        host += "reversedate"
        break;
      case 3:
        host += "ordertargetdate"
        break;
      case 4:
        host += "reversetargetdate"
        break;      
    }
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
      setTdList(response)
    })
  }
  let [tdList,setTdList] = useState([])
  getTdList()
  let dateNow = new Date();
  let today = dateNow.toISOString().slice(0, 10);
  let tdInput = document.getElementById("tdInput")
  let tdDateInput = document.getElementById("tdDateInput")
  
  return (
    <div>
      <div className="todoList_todobox">
        {tdList.length === 0 ? <span></span> : tdList.map((td) => (<TdContent td={td}/>))}
        <tr className="todo_tr">
              <td className="todo_td todo_td1">
                  +
              </td>
              <td className="todo_td todo_td2">
                  <input className="todo_inputtext" id="tdInput" type="text" onKeyDown={(e)=>{
                    if(e.key === 'Enter'){
                      insertTodo()
                    }
                  }} />
              </td>
              <td className="todo_td todo_td3">
                  <input className="todo_inputdate" id="tdDateInput" type="date" defaultValue={today} />
              </td>
              <td className="todo_td todo_td4">
                  <button className="todo_button" onClick={insertTodo}>
                      추가
                  </button>
              </td>
          </tr>
        </div>
        <button className="todoList_sort" onClick={()=>setOrder(1)}>작성일 ▲</button>
        <button className="todoList_sort" onClick={()=>setOrder(2)}>작성일 ▼</button>
        <button className="todoList_sort" onClick={()=>setOrder(3)}>목표일 ▲</button>
        <button className="todoList_sort" onClick={()=>setOrder(4)}>목표일 ▼</button>
        <br />
        <label className="todoList_label"><input className="todoList_check" type="checkbox" checked={store.seeAll} onClick={seeAll} /><span className="todoList_seeall">완료된 일정 포함</span></label>
    </div>
  );
}

function seeAll(){
  if(store.seeAll === 0){
    store.seeAll = 1
  }else{
    store.seeAll = 0
  }
}
function setOrder(orderValue){
  store.order = orderValue
}


  
  export default TdList;