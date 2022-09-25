import React from "react";

export default function Task({
                                 task,
                                 task: {id, name, description, due_date, created_at},
                                 captureEdit,
                                 changeEditState
                             }) {
    function taskStatus(due) {
        const today = new Date();
        const dueDate = new Date(due);
        if (dueDate > today) {
            return "Overdue";
        } else if (dueDate < today && dueDate < today.setDate(today.getDate() - 7)) {
            return "Due soon";
        } else {
            return "Not urgent";
        }
    }

    return (
        <tr key={id}>
            <td>{name}</td>
            <td>{description}</td>
            <td>{due_date}</td>
            <td>{created_at}</td>
            <td>{taskStatus(due_date)}</td>
            <td>
                <button onClick={() => {
                    captureEdit(task);
                    changeEditState(task);
                }}>Edit
                </button>
            </td>
            <td>
                <button>Delete</button>
            </td>
        </tr>
    );
}