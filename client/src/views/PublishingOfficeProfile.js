import React from "react";
import * as PropTypes from "prop-types";
import { hot } from "react-hot-loader/root";
import BaseProfile from "components/BaseProfile";
import ProfileFieldFactory from "factory/ProfileFieldFactory";

function PublishingOfficeProfile(props) {
    const {
        id,
        office,
        editing,
        fetchOffice,
        loading,
        startEditing,
        stopEditingAndSave,
        handleChange,
        customTitle,
        shouldFetchOffice = true,
        showOptions = true,
        stopEditingAndCreate,
        shouldCreate = false,
        justStopEditing,
        error,
    } = props;

    return (
        <BaseProfile
            renderFields={props => (
                <>
                    {ProfileFieldFactory.create({
                        ...props,
                        rules: { required: "Обязательно для заполнения" },
                        name: "name",
                        title: "Название",
                        value: office?.name,
                    })}
                    {ProfileFieldFactory.create({
                        ...props,
                        rules: { required: "Обязательно для заполнения" },
                        name: "address",
                        title: "Адрес",
                        value: office?.address,
                    })}
                    {ProfileFieldFactory.create({
                        ...props,
                        rules: { required: "Обязательно для заполнения" },
                        name: "email",
                        title: "Эл. почта",
                        value: office?.email,
                    })}
                </>
            )}
            skeleton={["name", "address", "email"]}
            id={id}
            item={office}
            editing={editing}
            fetchItem={fetchOffice}
            loading={loading}
            startEditing={startEditing}
            stopEditingAndSave={stopEditingAndSave}
            handleChange={handleChange}
            renderTitle={() =>
                customTitle ? (
                    typeof customTitle === "function" ? (
                        customTitle()
                    ) : (
                        customTitle
                    )
                ) : (
                    <>Издательский дом №{office?.id_publishing_office}</>
                )
            }
            shouldFetchItem={shouldFetchOffice}
            showOptions={showOptions}
            stopEditingAndCreate={stopEditingAndCreate}
            shouldCreate={shouldCreate}
            justStopEditing={justStopEditing}
            error={error}
        />
    );
}

PublishingOfficeProfile.propTypes = {
    id: PropTypes.string,
    office: PropTypes.shape({
        id_publishing_office: PropTypes.number,
        name: PropTypes.string,
        address: PropTypes.string,
        email: PropTypes.string,
    }),
    shouldCreate: PropTypes.bool,
    customTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    showOptions: PropTypes.bool,
    shouldFetchOffice: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    fetchOffice: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
    stopEditingAndSave: PropTypes.func.isRequired,
    stopEditingAndCreate: PropTypes.func.isRequired,
    justStopEditing: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default hot(PublishingOfficeProfile);
