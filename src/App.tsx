import React, {useState} from 'react';
import './App.css';
import {taskType, Todolist} from "./components/Todolist/Todolist";



function App() {
    let tasks : Array<taskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Vue", isDone: false},
    ]
    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={tasks}
            />
            {/*<Todolist title={"Cartoons"} tasks={tasks2}/>*/}
            {/*<Todolist title={"Movies"} tasks={tasks3}/>*/}
        </div>
    );
}

export default App;
