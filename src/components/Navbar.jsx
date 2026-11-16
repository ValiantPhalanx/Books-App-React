import "./Navbar.css"

function Navbar({ setCurrentPage }) {
    return (
        <header>
            <h1>Books App 📚</h1>

            <nav>
                <button onClick={() => setCurrentPage("overview")}>
                    Overview
                </button>

                <button onClick={() => setCurrentPage("mybooks")}>
                    My Books
                </button>

                <button onClick={() => setCurrentPage("reading")}>
                    Reading
                </button>

                <button onClick={() => setCurrentPage("wanttoread")}>
                    Want to Read
                </button>

                <button onClick={() => setCurrentPage("finished")}>
                    Finished
                </button>

                <button onClick={() => setCurrentPage("favorites")}>
                    Favorites
                </button>
            </nav>
        </header>
    )
}

export default Navbar;