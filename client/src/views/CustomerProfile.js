import React from "react";
import * as PropTypes from "prop-types";
import { hot } from "react-hot-loader/root";
import BaseProfile from "components/BaseProfile";
import ProfileFieldFactory from "factory/ProfileFieldFactory";

function CustomerProfile(props) {
    const {
        id,
        customer,
        editing,
        fetchCustomer,
        loading,
        startEditing,
        stopEditingAndSave,
        handleChange,
        customTitle,
        shouldFetchCustomer = true,
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
                        title: "Имя",
                        value: customer?.name,
                    })}
                    {ProfileFieldFactory.create({
                        ...props,
                        rules: { required: "Обязательно для заполнения" },
                        name: "date_of_birth",
                        title: "Дата рождения",
                        value: customer?.date_of_birth,
                    })}
                    {ProfileFieldFactory.create({
                        ...props,
                        rules: { required: "Обязательно для заполнения" },
                        name: "email",
                        title: "Эл. почта",
                        value: customer?.email,
                    })}
                </>
            )}
            skeleton={["name", "date_of_birth", "email"]}
            id={id}
            item={customer}
            editing={editing}
            fetchItem={fetchCustomer}
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
                    <>Покупатель №{customer?.id_customer}</>
                )
            }
            shouldFetchItem={shouldFetchCustomer}
            showOptions={showOptions}
            stopEditingAndCreate={stopEditingAndCreate}
            shouldCreate={shouldCreate}
            justStopEditing={justStopEditing}
            error={error}
        />
    );
}

CustomerProfile.propTypes = {
    id: PropTypes.string,
    customer: PropTypes.shape({
        id_customer: PropTypes.number,
        name: PropTypes.string,
        date_of_birth: PropTypes.string,
        email: PropTypes.string,
    }),
    shouldCreate: PropTypes.bool,
    customTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    showOptions: PropTypes.bool,
    shouldFetchCustomer: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    fetchCustomer: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
    stopEditingAndSave: PropTypes.func.isRequired,
    stopEditingAndCreate: PropTypes.func.isRequired,
    justStopEditing: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default hot(CustomerProfile);
