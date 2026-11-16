import { useBooks } from "../BookContext";
import BookCard from "../components/BookCard";


function FinishedBooks() {
    const {books} = useBooks();
    const finishedBooks = books.filter(book => book.status === "finished");

    if (finishedBooks.length > 0) {
        return (
            <section>
                <div className="books-page-top">
                   <h2 className="page-heading">My Finished Books</h2>
                </div>
                
                <section className="books-container">
                    {
                        finishedBooks.map(book => (
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

export default FinishedBooks;