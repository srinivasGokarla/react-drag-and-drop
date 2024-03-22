import React, { useState, useEffect } from "react";

const TaskList = ({ tasks }) => {
  const [taskList, setTaskList] = useState([]);
  const [showForm, setShowForm] = useState(false); 
  const [newCardData, setNewCardData] = useState({ time: "",  color : "" });
  const [newCardStatus, setNewCardStatus] = useState("");
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || tasks;
    setTaskList(tasks);
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const onDragStart = (evt) => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = (evt) => {
    evt.currentTarget.classList.remove("dragged");
  };

  const onDragEnter = (evt) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
   // evt.dataTransfer.dropEffect = "move";
  };

  const onDragLeave = (evt) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };

  const onDragOver = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };

  const onDrop = (evt, value, status) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
    let updated = taskList.map((task) => {
      if (task.id.toString() === data.toString()) {
        task.status = status;
      }
      return task;
    });
    setTaskList(updated);
  };
  const addCard = (status) => {
    setShowForm(true);
    setNewCardStatus(status);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      id: Math.floor(Math.random() * 1000), 
      status: newCardStatus,
      color: newCardData.color,
      ...newCardData,
     
    
    };
    const updatedTasks = [...taskList, newCard];
    setTaskList(updatedTasks);
    setShowForm(false);
    setNewCardData({ time: "",  color : "" });
    alert("Added Successfully"); 
  };

  let pending = taskList.filter((data) => data.status === "In Progress");
  let done = taskList.filter((data) => data.status === "Completed");
  let newOrder = taskList.filter((data) => data.status === "New Order");
  let waiting = taskList.filter((data) => data.status === "Delivered");

  return (
    
   

    <div className="container_parent">
        <div
          className="order small-box"
          onDragLeave={(e) => onDragLeave(e)}
          onDragEnter={(e) => onDragEnter(e)}
          onDragEnd={(e) => onDragEnd(e)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, false, "New Order")}
        >
          <section className="drag_container">
            <div className="container">
              <div className="drag_column">
                <div className="drag_row">
                  <div className="title_tag"><h4>ToDo</h4><div><b>...</b></div></div>
                  {newOrder.map((task) => (
                    <div
                      className="card"
                      key={task.id} 
                      id={task.id}
                      draggable
                      onDragStart={onDragStart}
                      onDragEnd={onDragEnd}
                    >
                  
                      <div className="card_right">
                        <div className={`status ${task.color}`}></div>
                        <div className="days">{task.time}</div>
                        <div className="message_icon_parent"><div className="time"> &#9776;</div><div>&#9993; {task.days}</div> </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => addCard("New Order")} className="add-card-btn" > + Add a card</button>
          </section>
        </div>
        <div
          className="pending small-box"
          onDragLeave={(e) => onDragLeave(e)}
          onDragEnter={(e) => onDragEnter(e)}
          onDragEnd={(e) => onDragEnd(e)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, false, "In Progress")}
        >
          <section className="drag_container">
            <div className="container">
              <div className="drag_column">
                <div className="drag_row">
                  <div className="title_tag"><h4>In Progress</h4><div><b>...</b></div></div>
                  {pending.map((task) => (
                    <div
                      className="card"
                      key={task.name}
                      id={task.id}
                      draggable
                      onDragStart={onDragStart}
                      onDragEnd={onDragEnd}
                    >
                      <div className="img">
                
                      </div>
                      <div className="card_right">
                        <div className={`status ${task.color}`}></div>
                        <div className="days">{task.time}</div>
                        <div className="message_icon_parent"><div className="time"> &#9776;</div><div>&#9993; {task.days}</div> </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => addCard("In Progress")} className="add-card-btn" > + Add a card</button>
          </section>
        </div>
        <div
          className="waiting small-box"
          onDragLeave={(e) => onDragLeave(e)}
          onDragEnter={(e) => onDragEnter(e)}
          onDragEnd={(e) => onDragEnd(e)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, true, "Delivered")}
        >
          <section className="drag_container">
            <div className="container">
              <div className="drag_column">
                <div className="drag_row">
                  <div className="title_tag"><h4> Review</h4><div><b>...</b></div></div>
                  {waiting.map((task) => (
                    <div
                      className="card"
                      key={task.name}
                      id={task.id}
                      draggable
                      onDragStart={onDragStart}
                      onDragEnd={onDragEnd}
                    >
                      <div className="img">
                    
                      </div>
                      <div className="card_right">
                        <div className={`status ${task.color}`}></div>
                        <div className="days">{task.time}</div>

                        <div className="message_icon_parent"><div className="time"> &#9776;</div><div>&#9993; {task.days}</div> </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => addCard("Delivered")} className="add-card-btn" > + Add a card</button>
          </section>
        </div>
        <div
          className="done small-box"
          onDragLeave={(e) => onDragLeave(e)}
          onDragEnter={(e) => onDragEnter(e)}
          onDragEnd={(e) => onDragEnd(e)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, true, "Completed")}
        >
          <section className="drag_container">
            <div className="container">
              <div className="drag_column">
                <div className="drag_row">
                  <div className="title_tag"><h4>Done</h4><div><b>...</b></div></div>
                  {done.map((task) => (
                    <div
                      className="card"
                      key={task.name}
                      id={task.id}
                      draggable
                      onDragStart={onDragStart}
                      onDragEnd={onDragEnd}
                    >
                      <div className="img">
                       
                      </div>
                      <div className="card_right">
                        <div className={`status ${task.color}`}></div>
                        <div className="days">{task.time}</div>
                        <div className="message_icon_parent"><div className="time"> &#9776;</div><div>&#9993; {task.days}</div> </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => addCard("Completed")} className="add-card-btn" > + Add a card</button>
          </section>
        </div>
        <div>
           
        {showForm && (
        <div className="modal-overlay">
              <div className="close-button" onClick={() => setShowForm(false)}>
        <span>&times;</span>
      </div>
          <div className="modal">
      
            <form onSubmit={handleFormSubmit}>
              <label>
                Project:
                <input
                  type="text"
                  value={newCardData.time}
                  onChange={(e) =>
                    setNewCardData({ ...newCardData, time: e.target.value })
                  }
                  required
                />
              </label>
              <label>
  Color (optional):
  <select
    value={newCardData.color}
    onChange={(e) =>
      setNewCardData({ ...newCardData, color: e.target.value })
    }
  >
    <option value="">Select Color</option>
    <option value="green">Green</option>
    <option value="red">Red</option>
    <option value="blue">Blue</option>
    <option value="yellow">Yellow</option>
  </select>
</label>
              <button type="submit">Create Card</button>
              <button onClick={() => setShowForm(false)} className="close-button">
        Close
      </button>
            </form>
          </div>
        </div>
      )}
        </div>
      </div>
  );
};

export default TaskList;
