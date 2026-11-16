import "./BookViewControls.css"

function BookViewControls({ setBookSearchQuery, setAuthorSearchQuery, setGenreSearchQuery, setFilter, setSort }) {
    return (
        <div className="book-controls">
            <div className="searchbars">
                <input
                    type="search"
                    placeholder="Search books..."
                    id="search-books-input" 
                    onChange={
                        (e) => setBookSearchQuery(e.target.value)
                    }
                />

                <input
                    type="search"
                    placeholder="Search authors..."
                    id="search-authors-input" 
                    onChange={
                        (e) => setAuthorSearchQuery(e.target.value)
                    }
                />

                <input
                    type="search"
                    placeholder="Search genres..."
                    id="search-genres-input"
                    onChange={
                        (e) => setGenreSearchQuery(e.target.value)
                    } 
                />
            </div>
        
            <div className="filtering-controls">
                <p>Filter: </p>
                <select
                    defaultValue="all"
                    id="select-filter"
                    onChange={
                        (e) => setFilter(e.target.value)
                    }
                >
                    <option value="all">All Books</option>
                    <option value="reading">Reading</option>
                    <option value="want-to-read">Want to Read</option>
                    <option value="finished">Finished</option>
                </select>
            </div>

            <div className="sorting-controls">
                <p>Sort: </p>
                <select
                    defaultValue="none"
                    id="select-sort"
                    onChange={
                        (e) => setSort(e.target.value)
                    }
                >
                    <option value="none">Default</option>
                    <option value="title-asc">Title A-Z</option>
                    <option value="title-desc">Title Z-A</option>
                    <option value="rating-high">Rating: High to Low</option>
                    <option value="rating-low">Rating: Low to High</option>
                    <option value="pages-high">Pages: High to Low</option>
                    <option value="pages-low">Pages: Low to High</option>
                    <option value="date-started-early-to-late">Date Started: Earliest to Latest</option>
                    <option value="date-started-late-to-early">Date Started: Latest to Earliest</option>
                    <option value="date-finished-early-to-late">Date Finished: Earliest to Latest</option>
                    <option value="date-finished-late-to-early">Date Finished: Latest to Earliest</option>
                </select>
            </div>
        </div>
    )
}

export default BookViewControls;