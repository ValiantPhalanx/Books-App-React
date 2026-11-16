import { useBooks } from "../BookContext";
import BookCard from "../components/BookCard";


function WantToReadBooks() {
    const {books} = useBooks();
    const wantToReadBooks = books.filter(book => book.status === "want-to-read");

    if (wantToReadBooks.length > 0) {
        return (
            <section>
                <div className="books-page-top">
                    <h2 className="page-heading">Books I want to read</h2>
                </div>

                <section className="books-container">
                    {
                        wantToReadBooks.map(book => (
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

export default WantToReadBooks;