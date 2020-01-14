import { deletePublishingOffice, fetchPublishingOfficeList } from "./actions";
import PublishingOfficeList from "views/PublishingOfficeList";
import { connect } from "react-redux";
import { hot } from "react-hot-loader/root";
import { editPublishingOffice } from "containers/publishing_office/profile/actions";

const mapStateToProps = ({ publishingOfficeList }) => ({
    loading: publishingOfficeList.loading,
    error: publishingOfficeList.error,
    offices: publishingOfficeList.offices,
});

const mapDispatchToProps = dispatch => ({
    fetchOffices: (order) => dispatch(fetchPublishingOfficeList(order)),
    deleteOffice: id => dispatch(deletePublishingOffice(id)),
    startEditing: () => dispatch(editPublishingOffice()),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(PublishingOfficeList),
);
