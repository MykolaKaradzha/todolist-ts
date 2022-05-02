import React, {useCallback} from 'react';
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
    console.log(`app called`)
    const todolists = useSelector<AppRootState, Array<todolistType>>(state => state.todolists)
    const tasksObj = useSelector<AppRootState, TasksObjType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }, [dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID));

    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistID: string, editedTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, editedTitle));

    }, [dispatch])
    const changeFilter = useCallback((filter: filterType, todolistID: string) => {
        dispatch(changeTodolistFilterAC(todolistID, filter))
    }, [dispatch])

    const addTask = useCallback((newTitle: string, todolistID: string) => {
        dispatch(addTaskAC(newTitle, todolistID))
    }, [dispatch])

    const removeTask = useCallback((id: string, todolistID: string) => {
        dispatch(removeTaskAC(id, todolistID))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistID: string, taskID: string, editedTitle: string) => {

        dispatch(changeTaskTitleAC(todolistID, taskID, editedTitle))
    }, [dispatch])

    //function for checkbox
    const changeStatus = useCallback((id: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistID))
    }, [dispatch])


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
                                return (
                                    <Grid item key={todolist.id}>
                                        <Paper elevation={3} sx={{padding: 3}}>
                                            <Todolist key={todolist.id}
                                                      todolistID={todolist.id}
                                                      title={todolist.title}
                                                      tasks={tasksObj[todolist.id]}
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