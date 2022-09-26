import React, {useState} from "react";
import Task from "./Task";
import EditTask from "./EditTask";


export default function Tasks({tasks, tasksUpdated}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTask, setEditTask] = useState({
        id: "",
        name: "",
        description: "",
        due_date: "",
        created_at: ""
    });

    const [newTask, setNewTask] = useState({
        name: "",
        description: "",
        due_date: "",
    });


    function handleSubmit(e) {
        e.preventDefault();
        let queryString = `http://localhost:8000/add_task/?name=${newTask.name}&description=${newTask.description}&due_date=${newTask.due_date}`;
        fetch(queryString, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(() => tasksUpdated())

    }

    function handleNewTaskChanges(e) {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value
        })
    }

    function handleTaskUpdate() {
        tasksUpdated();
        setIsEditing(false);
    }

    function handleChanges(e) {
        setEditTask({
            ...editTask,
            [e.target.name]: e.target.value
        });
    }

    function changeEditState(task) {
        if (task.id === editTask.id) {
            setIsEditing(isEditing => !isEditing);
        } else if (isEditing === false) {
            setIsEditing(isEditing => !isEditing);
        }
    }

    function captureEdit(clickedTask) {
        let filtered = tasks.filter(task => task.id === clickedTask.id);
        setEditTask(filtered[0]);
    }

    return (<div>
        {isEditing ? (
            <EditTask
                editTask={editTask}
                handleTaskUpdate={handleTaskUpdate}
                handleChanges={handleChanges}
            />) : null}
        <h1>Tasks</h1>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Create date</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {tasks.map(task => <Task
                key={task.id}
                task={task}
                captureEdit={captureEdit}
                changeEditState={changeEditState}
                tasksUpdated={tasksUpdated}
            />)}
            <tr>
                <td>
                    <form id="newTaskForm" onSubmit={e => handleSubmit(e)}></form>
                    <input
                        form="newTaskForm"
                        type="text" name="name"
                        placeholder="Name of new task"
                        value={newTask.name}
                        onChange={handleNewTaskChanges}
                    />
                </td>
                <td>
                    <input
                        form="newTaskForm"
                        type="text" name="description"
                        placeholder="Description of new task"
                        value={newTask.description}
                        onChange={handleNewTaskChanges}
                    />
                </td>
                <td>
                    <input
                        form="newTaskForm"
                        type="date"
                        name="due_date"
                        placeholder={new Date().toJSON()}
                        value={newTask.due_date}
                        onChange={handleNewTaskChanges}
                    /></td>
                <td>
                    <input form="newTaskForm" type="submit"/>
                </td>
            </tr>
            </tbody>
        </table>
    </div>)
}