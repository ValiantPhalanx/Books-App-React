import { useState } from "react";
import { useBooks } from "../BookContext";
import BookDialog from "../components/BookDialog";
import BookViewControls from "../components/BookViewControls";
import BookCard from "../components/BookCard";

function MyBooksPage() {
    const {addBook, deleteBook, editBook, favoriteBook, books} = useBooks();
    const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const [bookSearchQuery, setBookSearchQuery] = useState("");
    const [authorSearchQuery, setAuthorSearchQuery] = useState("");
    const [genreSearchQuery, setGenreSearchQuery] = useState("");
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("none");

    function handleEdit(book) {
        setSelectedBook(book);
        setIsBookDialogOpen(true);
    }

    function getDisplayedBooks() {
        let results = books;

        results = [...results].filter(book => book.title?.toLowerCase().includes(bookSearchQuery.toLowerCase()));
        results = [...results].filter(book => book.author?.toLowerCase().includes(authorSearchQuery.toLowerCase()));
        results = [...results].filter(book => book.genre?.toLowerCase().includes(genreSearchQuery.toLowerCase()));

        if (filter === "reading") {
            results = [...results].filter(book => book.status === "reading");
        } else if (filter === "want-to-read") {
            results = [...results].filter(book => book.status === "want-to-read");
        } else if (filter === "finished") {
            results = [...results].filter(book => book.status === "finished");
        }

        if (sort === "title-asc") {
            results = [...results].sort((a, b) => a.title.localeCompare(b.title));
        } else if (sort === "title-desc") {
            results = [...results].sort((a, b) => b.title.localeCompare(a.title));
        } else if (sort === "rating-high") {
            results = [...results.filter(book => book.rating !== null && book.rating !== undefined && book.rating !== "")];
            results = [...results].sort((a, b) => Number(b.rating) - Number(a.rating));
        } else if (sort === "rating-low") {
            results = [...results.filter(book => book.rating !== null && book.rating !== undefined && book.rating !== "")];
            results = [...results].sort((a, b) => Number(a.rating) - Number(b.rating));
        } else if (sort === "pages-high") {
            results = [...results].filter(book => book.pages !== null && book.pages !== undefined && book.pages !== "");
            results = [...results].sort((a, b) => Number(b.pages) - Number(a.pages));
        } else if (sort === "pages-low") {
            results = [...results].filter(book => book.pages !== null && book.pages !== undefined && book.pages !== "");
            results = [...results].sort((a, b) => Number(a.pages) - Number(b.pages));
        } else if (sort === "date-started-early-to-late") {
            results = [...results].filter(book => book.dateStarted !== null && book.dateStarted !== undefined && book.dateStarted !== "");
            results = [...results].sort((a, b) => new Date(a.dateStarted) - new Date(b.dateStarted));
        } else if (sort === "date-started-late-to-early") {
            results = [...results].filter(book => book.dateStarted !== null && book.dateStarted !== undefined && book.dateStarted !== "");
            results = [...results].sort((a, b) => new Date(b.dateStarted) - new Date(a.dateStarted));
        } else if (sort === "date-finished-early-to-late") {
            results = [...results].filter(book => book.dateFinished !== null && book.dateFinished !== undefined && book.dateFinished !== "");
            results = [...results].sort((a, b) => new Date(a.dateFinished) - new Date(b.dateFinished));
        } else if (sort === "date-finished-late-to-early") {
            results = [...results].filter(book => book.dateFinished !== null && book.dateFinished !== undefined && book.dateFinished !== "");
            results = [...results].sort((a, b) => new Date(b.dateFinished) - new Date(a.dateFinished));
        }

        return results;
    }

    const displayedBooks = getDisplayedBooks();

    return (
        <section id="my-books-page-section">
            <div className="books-page-top">
                <h2>Your Library</h2>

                <button onClick={() => {setIsBookDialogOpen(true); setSelectedBook(null)}}>
                    + Add Book
                </button>
            </div>

            <BookViewControls   
                setBookSearchQuery={setBookSearchQuery}
                setAuthorSearchQuery={setAuthorSearchQuery}
                setGenreSearchQuery={setGenreSearchQuery}
                setFilter={setFilter}
                setSort={setSort}
            />

            {isBookDialogOpen &&
                <BookDialog
                    setIsBookDialogOpen={setIsBookDialogOpen}
                    setSelectedBook={setSelectedBook}
                    addBook={addBook}
                    editBook={editBook}
                    book={selectedBook}
                />
            }

            <section className="books-container">
                {
                    displayedBooks.map((book) => (
                        <BookCard
                            book={book} 
                            deleteBook={deleteBook}
                            showActions={true}
                            handleEdit={handleEdit}
                            favoriteBook={favoriteBook}
                            key={book.id}
                        />
                    ))
                }
            </section>
        </section>
    )
}

export default MyBooksPage;