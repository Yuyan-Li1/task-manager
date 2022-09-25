import React, {useEffect, useState} from "react";
import axios from "axios";


export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetchTasks();
    }, []);
    const fetchTasks = () => {
        return axios.get("http://localhost:8000/get_tasks/").then((response) => {
            const allTasks = response.data;
            setTasks(allTasks);
            console.log(response.data);
        })
            .catch((error) => console.error(`Error: ${error}`));
    };

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


    return (<div>
        <h1>Tasks</h1>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Create date</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {
                tasks.map((value, key) => { // to be changed
                    return (
                        <tr key={key}>
                            <td>{value.name}</td>
                            <td>{value.description}</td>
                            <td>{value.due_date}</td>
                            <td>{value.created_at.slice(0, 10)}</td>
                            <td>{taskStatus(value.due_date)}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    </div>)
}