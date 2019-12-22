import { connect } from "react-redux";
import { fetchBooks, deleteBook } from "./actions";
import BookList from "views/BookList";
import { hot } from "react-hot-loader/root";
import { editBook } from "containers/book/profile/actions";

const mapStateToProps = ({ bookList }) => ({
    loading: bookList.loading,
    error: bookList.error,
    books: bookList.books,
});

const mapDispatchToProps = dispatch => ({
    fetchBooks: () => dispatch(fetchBooks()),
    deleteBook: id => dispatch(deleteBook(id)),
    startEditing: () => dispatch(editBook()),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(BookList),
);
