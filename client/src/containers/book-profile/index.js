import { connect } from "react-redux";
import {
    donOnBookProfileEditing,
    doOnBookProfileEdit,
    doOnBookProfileSave,
    doOnBookProfileFetch,
} from "./actions";
import BookProfile from "views/BookProfile";
import { hot } from "react-hot-loader/root";

const mapStateToProps = state => ({
    loading: state.bookProfile.loading,
    error: state.bookProfile.error,
    editing: state.bookProfile.editing,
    book: state.bookProfile.book,
});

const mapDispatchToProps = dispatch => ({
    fetchBook: id => dispatch(doOnBookProfileFetch(id)),
    startEditing: () => dispatch(donOnBookProfileEditing()),
    stopEditingAndSave: (id, change) => dispatch(doOnBookProfileSave(id, change)),
    handleChange: change => dispatch(doOnBookProfileEdit(change)),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(BookProfile),
);
