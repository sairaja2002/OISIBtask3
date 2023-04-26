
const Form = (props) => {
    
    return(
        <>
            <div className="container-flex bg-light">
            <form>
                <div className="row py-5 px-5">
                    <div className="col-lg-10 ">
                        <input onChange={props.handleChange} className="form-control " value={props.message.msgText} autoComplete="off" placeholder="Add..." id="message" type="text" name="message" />                       
                    </div>
                    <div className="col-lg-2">
                            {props.editingTask.isEdit ? 
                            <button onClick={props.handleUpdate} className="btn btn-primary" id="add">UPDATE</button>
                            :
                            <button onClick={props.handleAdd} className="btn btn-primary" id="add">ADD</button>
                            }
                        </div>
                </div>
               
            </form>
        </div>
        </>
    );
}
export default Form;