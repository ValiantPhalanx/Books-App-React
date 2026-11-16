import { useBooks } from "../BookContext";
import BookCard from "../components/BookCard";


function FavoriteBooks() {
    const {books} = useBooks();
    const favoriteBooks = books.filter(book => book.favorite);

    if (favoriteBooks.length > 0) {
        return (
            <section>
                <div className="books-page-top">
                    <h2 className="page-heading">My Favorites</h2>
                </div>

                <section className="books-container">
                    {
                        favoriteBooks.map(book => (
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

export default FavoriteBooks;