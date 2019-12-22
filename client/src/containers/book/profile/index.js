import { connect } from "react-redux";
import { editBook, changeBook, saveBook, fetchBook, createBook, saveBookSuccess } from "./actions";
import BookProfile from "views/BookProfile";
import { hot } from "react-hot-loader/root";

const mapStateToProps = ({ bookProfile }) => ({
    loading: bookProfile.loading,
    error: bookProfile.error,
    editing: bookProfile.editing,
    book: bookProfile.book,
});

const mapDispatchToProps = dispatch => ({
    fetchBook: id => dispatch(fetchBook(id)),
    startEditing: () => dispatch(editBook()),
    stopEditingAndSave: (id, change) => dispatch(saveBook(id, change)),
    stopEditingAndCreate: book => dispatch(createBook(book)),
    justStopEditing: () => dispatch(saveBookSuccess()),
    handleChange: change => dispatch(changeBook(change)),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(BookProfile),
);
