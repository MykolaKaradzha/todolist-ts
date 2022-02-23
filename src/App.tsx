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
type todolistProps = {
    id: string
    title: string
    filter: filterType
}


const App: React.FC = () => {
    // Todolists
    const [todolists, setTodolists] = useState<Array<todolistProps>>([
        {id: v1(), title: "What to learn", filter: "active"},
        {id: v1(), title: "What to watch", filter: "completed"}
    ])
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
    const filterTasks = (filter:filterType) => {
        switch (filter) {
            case "completed":
                return tasks.filter(task => task.isDone)
            case "active":
                return tasks.filter(task => !task.isDone)
            default:
                return tasks;
        }
    }
    const changeFilter = (filter: filterType, todolistID: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistID ? {...todolist, filter:filter} : todolist))


    }




    return (
        <div className="App">
            {todolists.map(todolist => {
                const filteredTasks = filterTasks(todolist.filter)
                return <Todolist key={todolist.id}
                                 todolistID={todolist.id}
                                 title={todolist.title}
                                 tasks={filteredTasks}
                                 addTask={addTask}
                                 removeTask={removeTask}
                                 changeStatus={changeStatus}
                                 changeFilter={changeFilter}
                                 filter={todolist.filter}

                />
            })}

            {/*<Todolist title={"Cartoons"} tasks={tasks2}/>*/}
            {/*<Todolist title={"Movies"} tasks={tasks3}/>*/}
        </div>
    );
}

export default App;
