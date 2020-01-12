import { hot } from "react-hot-loader/root";
import { connect } from "react-redux";
import { createAuthor, fetchAuthor, saveAuthor } from "./actions";
import slice from "./slice";
import AuthorProfile from "views/AuthorProfile";

const { editAuthor, saveAuthorSuccess, changeAuthor } = slice.actions;

const mapStateToProps = ({ authorProfile, publishingOfficeList }) => ({
    loading: authorProfile.loading,
    editing: authorProfile.editing,
    error: authorProfile.error,
    author: authorProfile.author,
    offices: publishingOfficeList.offices,
});

const mapDispatchToProps = dispatch => ({
    fetchAuthor: id => dispatch(fetchAuthor(id)),
    startEditing: () => dispatch(editAuthor()),
    stopEditingAndSave: (id, change) => dispatch(saveAuthor(id, change)),
    stopEditingAndCreate: author => dispatch(createAuthor(author)),
    justStopEditing: () => dispatch(saveAuthorSuccess()),
    handleChange: change => dispatch(changeAuthor({ change })),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(AuthorProfile),
);
