import React from "react";

function EditTask({editTask, handleTaskUpdate, handleChanges}) {
    let {id, name, description, due_date, created_at} = editTask;

    function handleEditTask(e) {
        e.preventDefault();
        fetch(`http://localhost:8000/edit_task/?id=${id}&name=${name}&description=${description}&due_date=${due_date}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editTask),
        })
            .then(response => response.json())
            .then(updateTask => handleTaskUpdate(updateTask))
    }


    return (
        <div>
            <h1>Edit Task</h1>
            <form onSubmit={handleEditTask}>
                <input type="text" name="name" value={name} onChange={handleChanges}/>
                <input type="text" name="description" value={description} onChange={handleChanges}/>
                <input type="date" name="due_date" value={due_date} onChange={handleChanges}/>
                <button className="Button" type="submit">Update</button>
            </form>
        </div>
    )
}

export default EditTask;