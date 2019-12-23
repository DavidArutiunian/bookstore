import { deleteAuthor, fetchAuthors } from "containers/author/list/actions";
import { hot } from "react-hot-loader/root";
import { connect } from "react-redux";
import AuthorList from "views/AuthorList";

const mapStateToProps = ({ authorList }) => ({
    loading: authorList.loading,
    error: authorList.error,
    authors: authorList.authors,
});

const mapDispatchToProps = dispatch => ({
    fetchAuthors: () => dispatch(fetchAuthors()),
    deleteAuthor: id => dispatch(deleteAuthor(id)),
    startEditing: () => void 0,
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(AuthorList),
);
