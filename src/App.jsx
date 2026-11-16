import { useState } from "react";
import { BookProvider } from "./BookContext";
import Navbar from "./components/Navbar";
import OverviewPage from "./pages/OverviewPage";
import MyBooksPage from "./pages/MyBooksPage";
import FavoriteBooks from "./pages/FavoriteBooks";
import FinishedBooks from "./pages/FinishedBooks";
import ReadingBooks from "./pages/ReadingBooks";
import WantToReadBooks from "./pages/WantToReadBooks";


function App() {
    const [currentPage, setCurrentPage] = useState("overview");

    return (
        <BookProvider>
            <Navbar setCurrentPage={setCurrentPage} />

            {currentPage === "overview" && <OverviewPage />}
            {currentPage === "mybooks" && <MyBooksPage />}
            {currentPage === "reading" && <ReadingBooks />}
            {currentPage === "finished" && <FinishedBooks />}
            {currentPage === "favorites" && <FavoriteBooks />}
            {currentPage === "wanttoread" && <WantToReadBooks />}
        </BookProvider>
    )
}

export default App;