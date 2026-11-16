import { useBooks } from "../BookContext";

function OverviewPage() {
    const {books} = useBooks();
    const readingActivityThisMonth = {
        started: [],
        finished: []
    }
    const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1));
    const genresRead = new Set();
    const authorsRead = new Set();
    const authorData = [];

    for (const book of books.filter(book => book.status === "finished" || book.status === "reading")) {
        if (book.genre) {
            genresRead.add(book.genre);
        }

        if (book.author) {
            authorsRead.add(book.author);
        }

        if (book.dateStarted && new Date(book.dateStarted) > oneMonthAgo) {
            readingActivityThisMonth.started.push(book);
        }

        if (book.dateFinished && new Date(book.dateFinished) > oneMonthAgo && book.dateFinished) {
            readingActivityThisMonth.finished.push(book)
        }
    }

    for (const author of authorsRead) {
        authorData.push({
            author: author,
            books: [...books].filter(book => book.author === author && (book.status === "finished" || book.status === "reading"))
        });
    }

    authorData.sort((a, b) => b.books.length - a.books.length);

    return (
        <section id="overview-section">
            <div className="overview-card-container">
                <div className="overview-card">
                    <h2 className="page-heading">Overview: </h2>
                    <p>Total Books: {books.length}</p>
                    <p>Reading: {books.filter(book => book.status === "reading").length}</p>
                    <p>Finished: {books.filter(book => book.status === "finished").length}</p>
                    <p>Want to Read: {books.filter(book => book.status === "want-to-read").length}</p>
                </div>

                <div className="overview-card" id="authors-read">
                    <h2>Authors Read: </h2>
                    <ol>
                        {authorData.map(authorInfo => (
                            <li key={authorInfo.author}>{authorInfo.author}, {authorInfo.books.length} {authorInfo.books.length > 1 ? "Books" : "Book" }</li>
                        ))}
                    </ol>
                </div>
            </div>

            <div className="overview-card-container">
                <div className="overview-card">
                    <h2>Genres read:</h2>
                    <ul>
                        {[...genresRead].map((genre) => (
                            <li key={genre}>{genre}</li>
                        ))}
                    </ul>
                </div>

                <div className="overview-card">
                    <h2>Reading Activity: </h2>
                    
                    {readingActivityThisMonth.started.length > 0 
                        ? (<p>Books started this month: {readingActivityThisMonth.started.length}</p>)
                        : (<p>No books started this month.</p>) 
                    }
                    
                    {readingActivityThisMonth.finished.length > 0 
                        ? (<p>Books finished this month: {readingActivityThisMonth.finished.length}</p>)
                        : (<p>No books finished this month.</p>) 
                    }
                </div>
            </div>
        </section>
    )
}

export default OverviewPage;