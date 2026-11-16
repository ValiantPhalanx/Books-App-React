import "./BookCard.css";

function BookCard({ book, showActions, deleteBook, handleEdit, favoriteBook }) {
    const totalStars = 5;
    const filledStars = "★".repeat(book.rating);
    const emptyStars = "☆".repeat(totalStars - book.rating);

    function capitalizeState(status) {
        if (status === "reading") {
            return "Reading";
        } else if (status === "want-to-read") {
            return "Want to Read";
        } else if (status === "finished") {
            return "Finished";
        } else {
            return status;
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString + "T00:00:00");

        const options = {
            year: "numeric",
            month: "short",
            day: "numeric"
        }

        return new Intl.DateTimeFormat("en-US", options).format(date);
    }

    return (
        <div className="book">
            <div className="book-card-top">
                <h3>{book.title}</h3>
                <p className="author-para">by {book.author}</p>

                <div className="book-tags">
                    <p className="genre-para tag">{book.genre}</p>
                    <p className="status-para tag">{capitalizeState(book.status)}</p>
                </div>

                {book.rating !== null &&
                    <p className="rating-para">RATING: <span className="rating-span">{filledStars + emptyStars}</span></p>
                }
            </div>

            <div className="book-date-and-notes">
                {book.dateStarted !== "" && book.status !== "want-to-read" &&
                    <p className="date-started-para">STARTED {formatDate(book.dateStarted)}</p>
                }

                {book.dateFinished !== "" && book.status !== "want-to-read" && book.status !== "reading" &&
                    <p className="date-finished-para">FINISHED {formatDate(book.dateFinished)}</p>
                }

                {book.dateFinished !== "" && book.status === "reading" &&
                    <p>Book is not finished yet.</p>
                }

                {book.notes !== "" &&
                    <p className="book-notes">{book.notes}</p> 
                }

                {book.pages !== null && book.pages !== 0 &&
                    <p>Pages: {book.pages}</p> 
                }
            </div>

            {showActions &&
                <>
                    <div className="book-card-controls">
                        <button 
                            className="edit-button"
                            onClick={() => handleEdit(book)}
                        >
                            Edit
                        </button>

                        <button
                            className="delete-button" 
                            onClick={() => deleteBook(book.id)}
                        >
                            Delete
                        </button>
                    </div>

                    <button 
                        className="favorite-button"
                        onClick={() => favoriteBook(book.id)}
                    >
                        {book.favorite ? "★" : "☆"}
                    </button>
                </>
            }
        </div>
    )
}

export default BookCard;