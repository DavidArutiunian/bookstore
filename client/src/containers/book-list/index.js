import { connect } from "react-redux";
import { doOnBooksFetch } from "./actions";
import BookList from "views/BookList";

const mapStateToProps = state => ({
    loading: state.books.loading,
    error: state.books.error,
    books: state.books.books,
});

const mapDispatchToProps = dispatch => ({
    fetchBooks: () => dispatch(doOnBooksFetch()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BookList);
