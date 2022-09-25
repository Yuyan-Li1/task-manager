import './App.css';

import Header from './components/Header';
import SearchBar from "./components/SearchBar";
import Tasks from "./components/Tasks";

function App() {
    return (
        <div className="App">
            <Header/>
            <SearchBar/>
            <Tasks/>
        </div>
    );
}

export default App;
