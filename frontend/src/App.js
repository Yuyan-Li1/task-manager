import './App.css';

import Header from './components/Header';
import SearchBar from "./components/SearchBar";
import Tasks from "./components/Tasks";
import {useEffect, useState} from "react";

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/get_tasks/")
            .then(response => response.json())
            .then(data => setTasks(data));
    }, []);

    function onUpdateTask(updatedTask) {
        const updatedTasks = tasks.map(task => {
            if (task.id === updatedTask.id) {
                return updatedTask;
            } else {
                return task;
            }
        });
        setTasks(updatedTasks);
    }

    return (
        <div className="App">
            <Header/>
            <SearchBar/>
            <Tasks tasks={tasks} onUpdateTask={onUpdateTask}/>
        </div>
    );
}

export default App;
