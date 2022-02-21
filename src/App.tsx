import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import { v1 } from 'uuid';

export type taskType = {
    id: string
    title: string
    isDone: boolean
}

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Array<taskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Vue", isDone: false},
    ])
    console.log(tasks)

    const addTask = (newTitle: string) => {
        setTasks(
            [{id: v1(), title: newTitle, isDone: false}, ...tasks]
        )
    }
    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id))
    }
    const changeStatus = (id: string, isDone: boolean) => {
        const task = tasks.find(task => task.id === id);
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        };

    }

    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={tasks}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeStatus={changeStatus}
            />
            {/*<Todolist title={"Cartoons"} tasks={tasks2}/>*/}
            {/*<Todolist title={"Movies"} tasks={tasks3}/>*/}
        </div>
    );
}

export default App;
