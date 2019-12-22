import {
    deletePublishingOffice,
    fetchPublishingOfficeList,
} from "containers/publishing_office/list/actions";
import PublishingOfficeList from "views/PublishingOfficeList";
import { connect } from "react-redux";
import { hot } from "react-hot-loader/root";

const mapStateToProps = ({ publishingOfficeList }) => ({
    loading: publishingOfficeList.loading,
    error: publishingOfficeList.error,
    offices: publishingOfficeList.offices,
});

const mapDispatchToProps = dispatch => ({
    fetchOffices: () => dispatch(fetchPublishingOfficeList()),
    deleteOffice: id => dispatch(deletePublishingOffice(id)),
    startEditing: () => void 0,
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(PublishingOfficeList),
);
