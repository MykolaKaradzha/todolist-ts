import React, {useState} from 'react';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from 'uuid';
import styled from "styled-components";


//styles
const AppWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  color: white;
  background-color: #909096;
`

//types
export type taskType = {
    id: string
    title: string
    isDone: boolean
}
export type filterType = "all" | "active" | "completed"
type todolistType = {
    id: string
    title: string
    filter: filterType
}
export type TasksObjType = {
    [key: string]: Array<taskType>
}

const App: React.FC = () => {
    // Todolists
    const todolistID1 = v1();
    const todolistID2 = v1();
    const [todolists, setTodolists] = useState<Array<todolistType>>([
        {id: todolistID1, title: "What to learn", filter: "active"},
        {id: todolistID2, title: "What to do", filter: "completed"}
    ])

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistID))
        delete tasksObj[todolistID]
        setTasksObj({...tasksObj})
    }


    const [tasksObj, setTasksObj] = useState<TasksObjType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Vue", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Earn some money", isDone: false},
            {id: v1(), title: "Leave Russia for good", isDone: true},
            {id: v1(), title: "Help people", isDone: false},
            {id: v1(), title: "Never give up", isDone: false},
        ]
    })

    const addTask = (newTitle: string, todolistID: string) => {
        setTasksObj(
            {
                ...tasksObj, [todolistID]: [{id: v1(), title: newTitle, isDone: false}, ...tasksObj[todolistID]]
            }
        )
        console.log(tasksObj)
    }

    const removeTask = (id: string, todolistID: string) => {
        setTasksObj(
            {
                ...tasksObj, [todolistID]:tasksObj[todolistID].filter(task => task.id !== id)
            }
        )
    }

    //function for checkbox
    const changeStatus = (id: string, isDone: boolean, todolistID: string) => {
        let tasks = tasksObj[todolistID];
        setTasksObj(
            {
                ...tasksObj, [todolistID]: tasks.map(task => task.id === id ? {...task, isDone: isDone} : task)
            }
        )
    }

    //for filter buttons
    const filterTasks = (filter: filterType, todolistID: string) => {
        let tasks = tasksObj[todolistID];
        switch (filter) {
            case "completed":
                return {[todolistID]: tasks.filter(task => task.isDone)}
            case "active":
                return {[todolistID]: tasks.filter(task => !task.isDone)}
            default:
                return tasksObj;
        }
    }
    const changeFilter = (filter: filterType, todolistID: string) => {
        setTodolists(todolists.map(
            todolist => todolist.id === todolistID ? {...todolist, filter: filter} : todolist))
    }


    return (
        <AppWrapper>
            {todolists.map(todolist => {
                const filteredTasks = filterTasks(todolist.filter, todolist.id)[todolist.id]
                return <Todolist key={todolist.id}
                                 todolistID={todolist.id}
                                 title={todolist.title}
                                 tasks={filteredTasks}
                                 addTask={addTask}
                                 removeTask={removeTask}
                                 changeStatus={changeStatus}
                                 changeFilter={changeFilter}
                                 filter={todolist.filter}
                                 removeTodolist={removeTodolist}

                />
            })}
        </AppWrapper>
    );
}

export default App;
