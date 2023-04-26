import { useState } from "react";
import Form from "./components/Form";
import img1 from './party-popper.png'
import './App.css';


function App() {
  const [tasksList, setTasksList] = useState([])
  const [finishList, setFinishList] = useState([])
  const [message,setMessage] = useState({
    msgText: "",
    id: ""
  })
  const [finish,setFinish] = useState({
    finishText: "",
    id: ""
  })
  


  const[editingTask, setEditingTask] = useState({
    id:"",
    isEdit: false
  })

    const handleChange = (event) =>{
      const today = new Date();
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = today.toLocaleDateString('en-US', options);
      setMessage({
        ...message,
        id: new Date().toString(),
        ind:formattedDate,
        msgText: event.target.value
      })
       console.log(message.msgText,message.id) 
    }
    const handleAdd = (event) =>{
      if(message.msgText !== "") {
       setTasksList([...tasksList, message])
       setMessage({
        ...message,
        msgText: "",
        date : new Date().getDate()
        
      })
      
    }
    event.preventDefault();
    }
    const handleDelete = (id) =>{
      const updatedTasks = tasksList.filter((eachtask)=>{
        return eachtask.id !== id
      })
      setTasksList(updatedTasks)
    }

    const handleEdit = (id) => {
      setEditingTask({
        ...editingTask,
        id:id,
        isEdit: true
      })
      const currenttask = tasksList.find((eachtask) => {
        return eachtask.id == id
      })
      setMessage({
        ...message,
        msgText: currenttask.msgText

      })
    }


    const handleUpdate = (event) => {
      const today = new Date();
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = today.toLocaleDateString('en-US', options);
      const updatedList = tasksList.map((eachtask) => {
        if(editingTask.id == eachtask.id){
          setMessage({
            ...message,
            msgText: "",
            ind:formattedDate
          })
          setEditingTask({
            ...editingTask,
            id:"",
            isEdit: false
          })
          return{
            msgText: message.msgText,
            id: editingTask.id,
            ind:message.formattedDate
          }
          
        }
        else{
            return eachtask
        }
        
      })
      setTasksList(updatedList)
      event.preventDefault();
    }

    const handleTick = (id,event) =>{
      const today = new Date();
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = today.toLocaleDateString('en-US', options);
      const currenttask = tasksList.find((eachtask) => {
        return eachtask.id == id
      })
      setFinish({
        ...finish,
        finishText: currenttask.msgText,
        ind:formattedDate
      })
      if(finish.finishText !== "") {
        setFinishList([...finishList, finish])
        setFinish({
         ...finish,
         finishText: "",
         date : new Date().getDate(),
         ind:""
       })
       const updatedTasks = tasksList.filter((eachtask)=>{
        return eachtask.id !== id
      })
      setTasksList(updatedTasks)
      }
      
      /* event.preventDefault(); */
    }
    
  return (
    <div className="App">
      <h1 className="heading"><i class="fa-solid fa-square-check"></i>My TODO-s</h1>
      <Form message={message} handleChange={handleChange} handleUpdate={handleUpdate} handleAdd={handleAdd} editingTask={editingTask}></Form>
      <div className='row m-3'>
        <div className="col-lg-6 border shadow border-info rounded p-3 mycol">
          {tasksList.length === 0 &&<h4 className='text-center mb-2'>No task is Pending</h4>}
          {tasksList.length !== 0 &&<h4 className='text-center mb-2'>Pending Tasks</h4>}
          <ul>
            {tasksList.map((eachtask)=>{
              return(
                <li>
                    <div className=' row5'>  
                      <h4 >{eachtask.msgText}</h4>
                      
                      <div className="row8">
                        <div className="row4 ">
                          <button className='btn delete px-3 mx-3' onClick={() => handleDelete(eachtask.id)}><i class="fa-solid fa-trash"></i></button>
                          <button className='btn edit mx-3' onClick={() => handleEdit(eachtask.id)}><i class="fa-solid fa-pen-to-square"></i></button>
                          <button className='btn tick mx-3' onClick={() => handleTick(eachtask.id)}><i class="fa-sharp fa-solid fa-check"></i></button>
                        </div> 
                        <div class="text-end text-muted">
                          <a href="#!" class="text-muted" data-mdb-toggle="tooltip" title="Created date">
                            <p class="small mb-0"><i class="fas fa-info-circle me-2"></i>{eachtask.ind}</p>
                          </a>
                        </div>  
                      </div>                
                    </div>
                </li>
              );
            })}  
          </ul>
        </div>
        <div className="col-lg-6 border shadow border-info rounded p-3 row6">
            <h4 className="text-center mb-2">Finished Tasks</h4>
            <ul>
              {finishList.map((eachtask)=>{
                return(
                  <li>
                      <div className='alert alert-success row9 m-3'>  
                        <h5>{eachtask.finishText}</h5> 
                        <p>Well Done <img src={img1}/></p>  
                        <div class="text-end text-muted">
                          <a href="#!" class="text-muted" data-mdb-toggle="tooltip" title="Created date">
                            <p class="small mb-0"><i class="fas fa-info-circle me-2"></i>{eachtask.ind}</p>
                          </a>
                        </div>            
                      </div>
                  </li>
                );
              })}  
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

