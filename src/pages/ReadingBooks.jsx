import { useBooks } from "../BookContext";
import BookCard from "../components/BookCard";


function ReadingBooks() {
    const {books} = useBooks();
    const readingBooks = books.filter(book => book.status === "reading");

    if (readingBooks.length > 0) {
        return (
            <section>
                <div className="books-page-top">
                    <h2 className="page-heading">Reading Books</h2>
                </div>

                <section className="books-container">
                    {
                        readingBooks.map(book => (
                            <BookCard
                                book={book}
                                key={book.id}
                                showActions={false} 
                            />
                        ))
                    }
                </section>
            </section>
        )
    }

    return (
        <h3 className="error-msg">No Books Found</h3>
    )
}

export default ReadingBooks;