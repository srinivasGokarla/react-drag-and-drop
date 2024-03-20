import React, { useState, useEffect } from 'react';
import  TaskList from "./components/Task"
import './App.css';
import { TASKS } from "./json";


function App() {

  

  return (
    <div className="App">
    <h1>Task Management Board</h1>
    <TaskList tasks={TASKS} />
    </div>
  );
}

export default App;
