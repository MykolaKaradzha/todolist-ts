import React from 'react';
import {Todolist} from "./components/Todolist/Todolist";
import {AddItem} from "./components/UniversalComponents/AddItem";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";



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

function AppWithRedux () {

    const todolists = useSelector<AppRootState, Array<todolistType>>(state => state.todolists)
    const tasksObj = useSelector<AppRootState, TasksObjType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTodolist = (newTitle: string) => {
        let action = addTodolistAC(newTitle);
        dispatch(action)

    }

    const removeTodolist = (todolistID: string) => {
        let action = removeTodolistAC(todolistID);
        dispatch(action);

    }

    const changeTodolistTitle = (todolistID: string, editedTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, editedTitle));

    }
    const changeFilter = (filter: filterType, todolistID: string) => {
        dispatch(changeTodolistFilterAC(todolistID, filter))
    }

    const addTask = (newTitle: string, todolistID: string) => {
        dispatch(addTaskAC(newTitle, todolistID))
    }

    const removeTask = (id: string, todolistID: string) => {
        dispatch(removeTaskAC(id, todolistID))
    }

    const changeTaskTitle = (todolistID: string, taskID: string, editedTitle: string) => {

        dispatch(changeTaskTitleAC(todolistID, taskID, editedTitle))
    }

    //function for checkbox
    const changeStatus = (id: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistID))
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
export default AppWithRedux