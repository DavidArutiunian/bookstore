import {
    changePublishingOffice,
    editPublishingOffice,
    fetchPublishingOffice,
} from "containers/publishing_office/profile/actions";
import PublishingOfficeProfile from "views/PublishingOfficeProfile";
import { connect } from "react-redux";
import { hot } from "react-hot-loader/root";

const mapStateToProps = ({ publishingOfficeProfile }) => ({
    loading: publishingOfficeProfile.loading,
    error: publishingOfficeProfile.error,
    editing: publishingOfficeProfile.editing,
    office: publishingOfficeProfile.office,
});

const mapDispatchToProps = dispatch => ({
    fetchOffice: id => dispatch(fetchPublishingOffice(id)),
    startEditing: () => dispatch(editPublishingOffice()),
    stopEditingAndSave: (id, change) => void { id, change },
    stopEditingAndCreate: book => void book,
    justStopEditing: () => void 0,
    handleChange: change => dispatch(changePublishingOffice(change)),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(PublishingOfficeProfile),
);
