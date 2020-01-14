import { deleteAuthor, fetchAuthors } from "containers/author/list/actions";
import { hot } from "react-hot-loader/root";
import { connect } from "react-redux";
import AuthorList from "views/AuthorList";
import slice from "../profile/slice";

const { editAuthor } = slice.actions;

const mapStateToProps = ({ authorList }) => ({
    loading: authorList.loading,
    error: authorList.error,
    authors: authorList.authors,
});

const mapDispatchToProps = dispatch => ({
    fetchAuthors: (order) => dispatch(fetchAuthors(order)),
    deleteAuthor: id => dispatch(deleteAuthor(id)),
    startEditing: () => dispatch(editAuthor()),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(AuthorList),
);
