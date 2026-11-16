import { useRef, useEffect } from "react";
import "./BookDialog.css";

function BookDialog({ setIsBookDialogOpen, setSelectedBook, addBook, editBook, book }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog.open) {
            dialog.showModal();
        }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const updatedFormData = {
            title: formData.get("book-title-input"),
            author: formData.get("book-author-input"),
            genre: formData.get("book-genre-input"),
            pages: formData.get("book-pages-input") !== ""
                ? Number(formData.get("book-pages-input"))
                : null,
            status: formData.get("book-status-input"),
            rating: formData.get("book-rating-input") !== ""
                ? Number(formData.get("book-rating-input"))
                : null,
            dateStarted: formData.get("book-date-started-input"),
            dateFinished: formData.get("book-date-finished-input"),
            notes: formData.get("books-notes-input")
        };

        if (book) {
            editBook(book.id, updatedFormData);
        } else {
            addBook({
                id: crypto.randomUUID(),
                ...updatedFormData,
                favorite: false
            });
        }

        setIsBookDialogOpen(false);
        setSelectedBook(null);
    }

    function handleClose() {
        setIsBookDialogOpen(false);
        setSelectedBook(null);
    }

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
        >
            <h2>{book ? "Edit Book" : "Add Book"}</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="book-title-input">Title: </label>
                    <input
                        type="text"
                        id="book-title-input"
                        name="book-title-input"
                        defaultValue={book?.title ?? ""}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="book-author-input">Author: </label>
                    <input
                        type="text"
                        id="book-author-input"
                        name="book-author-input"
                        defaultValue={book?.author ?? ""}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="book-genre-input">Genre: </label>
                    <input
                        type="text"
                        id="book-genre-input"
                        name="book-genre-input"
                        defaultValue={book?.genre ?? ""}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="book-pages-input">Pages: </label>
                    <input
                        type="number"
                        id="book-pages-input"
                        name="book-pages-input"
                        defaultValue={book?.pages ?? ""}
                        min="1"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="book-status-input">Status: </label>
                    <select
                        id="book-status-input"
                        name="book-status-input"
                        defaultValue={book?.status ?? "want-to-read"}
                        required
                    >
                        <option value="want-to-read">Want to Read</option>
                        <option value="reading">Reading</option>
                        <option value="finished">Finished</option>
                    </select>
                </div>

                <div className="rating-input-class">
                    <label htmlFor="book-rating-input">Rating:</label>
                    <select
                        id="book-rating-input"
                        name="book-rating-input"
                        defaultValue={book?.rating ?? ""}
                    >
                        <option value="">No Rating</option>
                        <option value="1">★</option>
                        <option value="2">★★</option>
                        <option value="3">★★★</option>
                        <option value="4">★★★★</option>
                        <option value="5">★★★★★</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="book-date-started-input">Date Started: </label>
                    <input
                        id="book-date-started-input"
                        name="book-date-started-input"
                        defaultValue={book?.dateStarted ?? ""}
                        type="date"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="book-date-finished-input">Date Finished: </label>
                    <input
                        id="book-date-finished-input"
                        name="book-date-finished-input"
                        defaultValue={book?.dateFinished ?? ""}
                        type="date"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="books-notes-input">Notes: </label>
                    <textarea
                        id="books-notes-input"
                        name="books-notes-input"
                        defaultValue={book?.notes ?? ""}
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={() => dialogRef.current.close()}
                    >
                        Cancel
                    </button>

                    <button type="submit">
                        {book ? "Edit Book" : "Add Book"}
                    </button>
                </div>
            </form>
        </dialog>
    );
}

export default BookDialog;