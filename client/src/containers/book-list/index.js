import { connect } from "react-redux";
import { doOnBooksFetch } from "./actions";
import BookList from "views/BookList";

const mapStateToProps = state => ({
    loading: state.booksList.loading,
    error: state.booksList.error,
    books: state.booksList.books,
});

const mapDispatchToProps = dispatch => ({
    fetchBooks: () => dispatch(doOnBooksFetch()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BookList);
