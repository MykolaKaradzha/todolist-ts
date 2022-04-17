import {v1} from "uuid";
import {TasksObjType} from "../App";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./tasks-reducer";
import {addTodolistAC} from "./todolist-reducer";

let todolistID1: string;
let todolistID2: string;
let oldTasksObj: TasksObjType;


beforeEach(() => {
        todolistID1 = v1();
        todolistID2 = v1();
        oldTasksObj = {
            [todolistID1]: [
                {id: "1", title: "first task", isDone: true},
                {id: "2", title: "second task", isDone: false}
            ],
            [todolistID2]: [
                {id: "1", title: "first task", isDone: false},
                {id: "2", title: "second task", isDone: false}
            ]
        }
    }
)

test("task should be added", () => {

    const title = "Hey, I`m new task!"
    const newTasksObj = tasksReducer(oldTasksObj, addTaskAC(title, todolistID2))

    expect(oldTasksObj[todolistID2].length).toBe(2);
    expect(newTasksObj[todolistID2].length).toBe(3);
    expect(newTasksObj[todolistID2][0].title).toBe(title);
    expect(newTasksObj[todolistID2][0].id).toBeDefined()


});
test("task should be removed", () => {

    const newTasksObj = tasksReducer(oldTasksObj, removeTaskAC( "1", todolistID1))

    expect(oldTasksObj[todolistID1].length).toBe(2);
    expect(newTasksObj[todolistID1].length).toBe(1);
    expect(newTasksObj[todolistID1].findIndex(task => task.id === "1")).toBe(-1);
    expect(newTasksObj[todolistID1].every(task => task.id !== "1")).toBeTruthy();
})

test("task title should be changed", () => {

    const changedTitle = "My title is changed, indeed."
    const newTasksObj = tasksReducer(oldTasksObj, changeTaskTitleAC(todolistID1, "2", changedTitle));

    expect(oldTasksObj[todolistID1][1].title).toBe("second task")
    expect(newTasksObj[todolistID1][1].title).toBe(changedTitle)
})

test("task status should be changed", () => {

    const newStatus = false;
    const newTasksObj = tasksReducer(oldTasksObj, changeTaskStatusAC("1", newStatus, todolistID1));

    expect(oldTasksObj[todolistID1][0].isDone).toBeTruthy()
    expect(newTasksObj[todolistID1][0].isDone).toBeFalsy()
})

test ("tasks array for todolist should be added", () => {

    const newID = v1()
    const newTasksObj = tasksReducer(oldTasksObj, addTodolistAC(newID))

    const keys = Object.keys(newTasksObj)

    const newKey = keys.find(key => key !== todolistID1 && key !== todolistID2)
    if (!newKey)  {
        throw new Error('no such key found')
    }

    expect(keys.length).toBe(3);
    expect(newTasksObj[newKey]).toStrictEqual([]);

})