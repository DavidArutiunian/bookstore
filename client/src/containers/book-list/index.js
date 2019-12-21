import { connect } from "react-redux";
import { doOnBooksFetch, doOnBookProfileDelete } from "./actions";
import BookList from "views/BookList";
import { hot } from "react-hot-loader/root";
import { donOnBookProfileEditing } from "containers/book-profile/actions";

const mapStateToProps = state => ({
    loading: state.booksList.loading,
    error: state.booksList.error,
    books: state.booksList.books,
});

const mapDispatchToProps = dispatch => ({
    fetchBooks: () => dispatch(doOnBooksFetch()),
    deleteBook: id => dispatch(doOnBookProfileDelete(id)),
    startEditing: () => dispatch(donOnBookProfileEditing()),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(BookList),
);
