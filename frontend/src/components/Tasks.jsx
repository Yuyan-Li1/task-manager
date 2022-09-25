import React, {useState} from "react";
import Task from "./Task";
import EditTask from "./EditTask";


export default function Tasks({tasks, onUpdateTask}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTask, setEditTask] = useState({
        id: "",
        name: "",
        description: "",
        due_date: "",
        created_at: ""
    });

    function handleTaskUpdate(updatedTask) {
        onUpdateTask(updatedTask);
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
            />)}
            </tbody>
        </table>
    </div>)
}