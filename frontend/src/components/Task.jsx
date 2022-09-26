import React from "react";

export default function Task({
                                 task,
                                 task: {id, name, description, due_date, created_at},
                                 captureEdit,
                                 changeEditState,
                                 tasksUpdated
                             }) {
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }


    function taskStatus(due) {
        const today = new Date();
        const dueDate = new Date(due);
        if (dueDate < today) {
            return "Overdue";
        } else if (dueDate.addDays(-7) < today) {
            return "Due soon";
        } else {
            return "Not urgent";
        }
    }

    function handleDelete() {
        fetch(`http://localhost:8000/delete_task/?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(() => tasksUpdated())
    }

    return (
        <tr key={id} className="Task">
            <td>{name}</td>
            <td>{description}</td>
            <td>{due_date}</td>
            <td>{created_at.slice(0, 10)}</td>
            <td>{taskStatus(due_date)}</td>
            <td>
                <button className="Button" onClick={() => {
                    captureEdit(task);
                    changeEditState(task);
                }}>Edit
                </button>
            </td>
            <td>
                <button className="Button" onClick={() => handleDelete()}
                >Delete
                </button>
            </td>
        </tr>
    );
}