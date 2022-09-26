import {useEffect} from "react"

function SearchBar({setIsSearching, searchTerm, setSearchTerm}) {
    useEffect(() => {
        if (searchTerm === "") {
            setIsSearching(false)
        } else {
            setIsSearching(true)
        }
    }, [searchTerm]);

    function handleChange(e) {
        setSearchTerm(e.target.value)
    }

    return (
        <form>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
            />
        </form>
    );
}

export default SearchBar;