import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import { v1 } from 'uuid';

export type taskType = {
    id: string
    title: string
    isDone: boolean
}
export type filterType = "all" | "active" | "completed"


const App: React.FC = () => {
    // task manipulation
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

    //function for checkbox
    const changeStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(task=> task.id === id ? {...task, isDone: isDone} : task))
    }

    //for filter buttons
    const [filter, setFilter] = useState<filterType>('all')
    const filterTasks = () => {
        switch (filter) {
            case "completed":
                return tasks.filter(task => task.isDone)
            case "active":
                return tasks.filter(task => !task.isDone)
            default:
                return tasks;
        }
    }
    const filteredTasks = filterTasks();

    // for collapsable tasks
    const [collapsed, setCollapsed] = useState<boolean>(true)


    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={filteredTasks}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeStatus={changeStatus}
                      setFilter={setFilter}
                      filter={filter}
                      setCollapsed={setCollapsed}
                      collapsed={collapsed}
            />
            {/*<Todolist title={"Cartoons"} tasks={tasks2}/>*/}
            {/*<Todolist title={"Movies"} tasks={tasks3}/>*/}
        </div>
    );
}

export default App;
