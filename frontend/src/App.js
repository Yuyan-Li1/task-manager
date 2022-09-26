import './App.css';

import Header from './components/Header';
import SearchBar from "./components/SearchBar";
import Tasks from "./components/Tasks";
import {useEffect, useState} from "react";

function App() {
    const [tasks, setTasks] = useState([]);
    const [tasksUpdates, setTasksUpdates] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("created_at");
    const [page, setPage] = useState(1);

    function tasksUpdated() {
        setTasksUpdates(prevUpdate => prevUpdate + 1);
    }

    function handleSortChange(e) {
        setSortOption(e.target.value);
    }

    function handlePageUp() {
        setPage(prevPage => prevPage + 1);
    }

    function handlePageDown() {
        setPage(prevPage => prevPage - 1);
    }


    useEffect(() => {
        if (isSearching) {
            fetch(`http://localhost:8000/search/?name=${searchTerm}&sort_by=${sortOption}&page=${page}`)
                .then(response => response.json())
                .then(data => setTasks(data))
        } else {
            fetch(`http://localhost:8000/get_tasks/?sort_by=${sortOption}&page=${page}`)
                .then(response => response.json())
                .then(data => setTasks(data));
        }
    }, [tasksUpdates, searchTerm, sortOption, isSearching, page]);

    function PageButtons() {
        if (page === 1) {
            if (tasks.length < 20) {
                return <></>;
            } else {
                return (
                    <div>
                        <button onClick={handlePageUp}>Next</button>
                    </div>
                )
            }
        } else {
            if (tasks.length < 20) {
                return (
                    <div>
                        <button onClick={handlePageDown}>Prev</button>
                    </div>
                )
            }
            return (
                <div>
                    <button onClick={handlePageDown}>Prev</button>
                    <button onClick={handlePageUp}>Next</button>
                </div>
            )
        }
    }


    return (
        <div className="App">
            <Header/>
            <SearchBar
                setIsSearching={setIsSearching}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <label htmlFor="cars">Sort by:</label>
            <select name="sort" id="sort" onChange={(e) => handleSortChange(e)}>
                <option value="created_at">Creation date</option>
                <option value="due_date">Due date</option>
            </select>
            <Tasks
                tasks={tasks}
                tasksUpdated={tasksUpdated}
            />
            <PageButtons/>
        </div>
    );
}

export default App;
