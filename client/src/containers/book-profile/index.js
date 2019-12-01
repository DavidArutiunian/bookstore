import { connect } from "react-redux";
import {
    donOnBookProfileEditing,
    doOnBookProfileEditingDone,
    doOnBookProfileFetch,
} from "./actions";
import BookProfile from "views/BookProfile";

const mapStateToProps = state => ({
    loading: state.bookProfile.loading,
    error: state.bookProfile.error,
    editing: state.bookProfile.editing,
    book: state.bookProfile.book,
});

const mapDispatchToProps = dispatch => ({
    fetchBook: id => dispatch(doOnBookProfileFetch(id)),
    startEditing: () => dispatch(donOnBookProfileEditing()),
    stopEditing: () => dispatch(doOnBookProfileEditingDone()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BookProfile);
