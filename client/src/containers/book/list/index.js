import { connect } from "react-redux";
import { fetchBooks, deleteBook, fetchBooksAndAuthors } from "./actions";
import BookList from "views/BookList";
import { hot } from "react-hot-loader/root";
import { editBook } from "containers/book/profile/actions";

const mapStateToProps = ({ bookList, authorList }) => ({
    loading: bookList.loading,
    error: bookList.error,
    books: bookList.books,
    authors: authorList.authors,
});

const mapDispatchToProps = dispatch => ({
    fetchBooks: (order, filter) => dispatch(fetchBooks(order, filter)),
    fetchBooksAndAuthors: (order, filter) => dispatch(fetchBooksAndAuthors(order, filter)),
    deleteBook: id => dispatch(deleteBook(id)),
    startEditing: () => dispatch(editBook()),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(BookList),
);
