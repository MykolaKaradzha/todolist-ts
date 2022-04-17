import React, {useReducer} from 'react';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from 'uuid';
import {AddItem} from "./components/UniversalComponents/AddItem";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC, filterTasksAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer";



//types
export type taskType = {
    id: string
    title: string
    isDone: boolean
}
export type filterType = "all" | "active" | "completed"
export type todolistType = {
    id: string
    title: string
    filter: filterType
}
export type TasksObjType = {
    [key: string]: Array<taskType>
}

function AppWithReducers () {
    // Todolists
    const todolistID1 = v1();
    const todolistID2 = v1();
    const [todolists, dispatchTodolists] = useReducer(todolistReducer, [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to do", filter: "all"}
    ])
    const [tasksObj, dispatchTasksObj] = useReducer(tasksReducer, {
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
    const addTodolist = (newTitle: string) => {
        let action = addTodolistAC(newTitle);
        dispatchTasksObj(action)
        dispatchTodolists(action)
    }

    const removeTodolist = (todolistID: string) => {
        let action = removeTodolistAC(todolistID);
        dispatchTasksObj(action);
        dispatchTodolists(action);
    }

    const changeTodolistTitle = (todolistID: string, editedTitle: string) => {
        dispatchTodolists(changeTodolistTitleAC(todolistID, editedTitle));

    }
    const changeFilter = (filter: filterType, todolistID: string) => {
        dispatchTodolists(changeTodolistFilterAC(todolistID, filter))
    }




    const addTask = (newTitle: string, todolistID: string) => {
        dispatchTasksObj(addTaskAC(newTitle, todolistID))
    }

    const removeTask = (id: string, todolistID: string) => {
        dispatchTasksObj(removeTaskAC(id, todolistID))
    }

    const changeTaskTitle = (todolistID: string, taskID: string, editedTitle: string) => {
        debugger;
        dispatchTasksObj(changeTaskTitleAC(todolistID, taskID, editedTitle))
    }

    //function for checkbox
    const changeStatus = (id: string, isDone: boolean, todolistID: string) => {
        dispatchTasksObj(changeTaskStatusAC(id, isDone, todolistID))
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
        return (
            <>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="sticky">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                            >
                                <Menu/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                News
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Container fixed>
                    <Grid container>
                        <Grid item sx={{padding: 3}}>
                            <AddItem callBack={addTodolist}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={5}>
                        {
                            todolists.map(todolist => {
                                const filteredTasks = filterTasks(todolist.filter, todolist.id)[todolist.id];
                                debugger;
                                return (
                                    <Grid item key={todolist.id}>
                                        <Paper elevation={3} sx={{padding: 3}}>
                                            <Todolist key={todolist.id}
                                                      todolistID={todolist.id}
                                                      title={todolist.title}
                                                      tasks={filteredTasks}
                                                      addTask={addTask}
                                                      removeTask={removeTask}
                                                      changeStatus={changeStatus}
                                                      changeFilter={changeFilter}
                                                      filter={todolist.filter}
                                                      removeTodolist={removeTodolist}
                                                      changeTodolistTitle={changeTodolistTitle}
                                                      changeTaskTitle={changeTaskTitle}/>
                                        </Paper>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>
            </>
        )
    }
export default AppWithReducers