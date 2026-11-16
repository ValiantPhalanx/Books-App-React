import { useState, useEffect, createContext, useContext } from "react";
const BookContext = createContext();
/* eslint-disable react-refresh/only-export-components */

export function BookProvider({ children }) {
    const [books, setBooks] = useState(() => {
        const savedBooks = localStorage.getItem("books");

        return savedBooks ? JSON.parse(savedBooks) : []; 
    });

    useEffect(() => {
        localStorage.setItem("books", JSON.stringify(books));
    })

    function addBook(book) {
        setBooks(prev => [...prev, book]);
    }

    function deleteBook(id) {
        setBooks(prev => prev.filter(book => book.id !== id));
    }

    function editBook(id, updatedBook) {
        setBooks(prev => prev.map(
            book => book.id === id ? {...book, ...updatedBook} : book
        ));
    }

    function favoriteBook(id) {
        setBooks(prev => prev.map(
            book => book.id === id ? {...book, favorite: !book.favorite} : book
        ))
    }

    return (
        <BookContext.Provider
            value={{
                books,
                addBook,
                deleteBook,
                editBook,
                favoriteBook
            }}
        >
            {children}
        </BookContext.Provider>
    )
}

export function useBooks() {
    return useContext(BookContext)
}