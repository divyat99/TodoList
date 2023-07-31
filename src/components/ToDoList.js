import React, { useState, useEffect } from "react";
//Step 2 getting data from local storage
const getLocalItems = () => {
  let gettingData = localStorage.getItem("TodoKey");
  if (gettingData) {
    return JSON.parse(gettingData);
  } else {
    return [];
  }
};

function ToDo() {
  //states
  const [dataList, setDataList] = useState([]);
  const [member, setMember] = useState("");
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [editData, setEditData] = useState(null);
  const[status,setStatus]= useState(true);


  //step3 call function for getting data
  useEffect(() => {
    let local = getLocalItems();
    setDataList(local);
  }, []);
  //step 3 completes

  //add list
  const addItem = (event) => {
    event.preventDefault();
    setDataList([
      ...dataList,
      { id: Math.random(), member: member, task: task, priority: priority },
    ]);
    localStorage.setItem(
      "TodoKey",
      JSON.stringify([
        ...dataList,
        { id: Math.random(), member: member, task: task, priority: priority },
      ])
    );
    //set states to empty string
    setMember("");
    setTask("");
    setPriority("");
  };

  //Step 1 Add data to local storage
  // useEffect(() => {
  //   localStorage.setItem("TodoKey", JSON.stringify(dataList));
  // }, [dataList]);

  //step1 complete//

  //Delete list

  const deleteItem = (id) => {
    let filteredData = dataList.filter((val) => val.id !== id);
    setDataList(filteredData);
    localStorage.setItem("TodoKey", JSON.stringify(filteredData));
  };
  //edit list
  const editItem = (id) => {
    let foundData = dataList.find((val) => val.id === id);
    setMember(foundData.member);
    setTask(foundData.task);
    setPriority(foundData.priority);
    setEditData(foundData);
  };
  const updateData = (e) => {
    e.preventDefault();
    let updatedData = dataList.map((val) => {
      if (val.id === editData.id) {
        return {
          id: val.id,
          member: member,
          task: task,
          priority: priority,
        };
      } else {
        return val;
      }
    });
    setDataList(updatedData);
    localStorage.setItem("TodoKey", JSON.stringify(updatedData));

    setEditData(null);
    setMember("");
    setTask("");
    setPriority("");
  };
const handleClick=()=>{
  setStatus(false);
}
  return (
    <>
      {/* ******************************** */}

      <section className="vh-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <form onSubmit={addItem}>
              <div
                style={{
                  border: "orange",
                  borderWidth: "5px",
                  borderStyle: "solid",
                }}
              >
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Team Member</label>
                  <input
                    type="text"
                    required
                    //adding member
                    value={member}
                    onChange={(e) => setMember(e.target.value)}
                    placeholder="Enter Member Name"
                  />
                </div>
                <div className="form-group">
                  <label>Task</label>
                  <input
                    type="text"
                    required
                    //adding task
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Task"
                  />
                </div>
                <div className="form-group">
                  <label>
                    <b>Select Priority:</b>
                  </label>
                  <input
                    type="radio"
                    id="high"
                    name="Priority"
                    value="high"
                    onChange={(e) => {
                      setPriority(e.target.value);
                    }}
                  />
                  <label>High Priority</label>
                  <input
                    type="radio"
                    id="middium"
                    name="Priority"
                    value="middium"
                    onChange={(e) => setPriority(e.target.value)}
                  />
                  <label>MiddiumPriority</label>
                  <input
                    type="radio"
                    id="low"
                    name="Priority"
                    value="low"
                    onChange={(e) => setPriority(e.target.value)}
                  />
                  <label>Low Priority</label>
                </div>
                {editData ? (
                  <button type="button" onClick={updateData}>
                    Update
                  </button>
                ) : (
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                )}
                
              </div>
            </form>
            <div className="col-md-12 col-xl-10">
              <div className="card mask-custom">
                <div className="card-body p-4 text-white">
                  <div className="text-center pt-3 pb-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                      alt="Check"
                      width={60}
                    />
                    <h2 className="my-4">Task List</h2>
                  </div>
                  <table className="table text-white mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Team Member</th>
                        <th scope="col">Task</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Actions</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {console.log(dataList)}
                      {dataList.map((datalist, index) => (
                        <tr key={datalist.id}>
                          <td>{datalist.member}</td>
                          <td>{datalist.task}</td>
                          <td>{datalist.priority}</td>
                          <td className="border-0 align-middle">
                            <button
                              href="#!"
                              data-mdb-toggle="tooltip"
                              title="Edit"
                              onClick={() => editItem(datalist.id)}
                            >
                              <i className="fas fa-edit fa-lg text-success me-3" />
                            </button>
                            <button
                              href="#!"
                              data-mdb-toggle="tooltip"
                              title=" Remove"
                            
                              onClick={() => deleteItem(datalist.id)}
                            >
                              <i className="fas fa-trash-alt fa-lg text-warning" />
                            </button>
                          </td>
                          <td>
                          {status===true?(
                            <button 
                              href="#!"
                              data-mdb-toggle="tooltip"
                              title="incomplete"
                              id="pending"
                              onClick={handleClick}
                            >
                              
                              Pending
                              <i
                                className="fa fa-ellipsis-h"
                                aria-hidden="true"
                              ></i>
                            </button>
                            ):(
                            <button
                            onClick={()=>setStatus(true)}
                              href="#!"
                                id="completed"
                              data-mdb-toggle="tooltip"
                              title="Done"
                            >
                              completed
                              <i className="fas fa-check fa-lg text-success me-3" />
                            </button> 
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </>
);
}

export default ToDo;
