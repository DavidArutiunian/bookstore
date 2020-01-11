import React from "react";
import * as PropTypes from "prop-types";
import { hot } from "react-hot-loader/root";
import BaseProfile from "components/BaseProfile";
import ProfileFieldFactory from "factory/ProfileFieldFactory";

function EmployeeProfile(props) {
    const {
        id,
        employee,
        editing,
        fetchEmployee,
        loading,
        startEditing,
        stopEditingAndSave,
        handleChange,
        customTitle,
        shouldFetchEmployee = true,
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
                        value: employee?.name,
                    })}
                    {ProfileFieldFactory.create({
                        ...props,
                        rules: { required: "Обязательно для заполнения" },
                        name: "login",
                        title: "Логин",
                        value: employee?.login,
                    })}
                    {ProfileFieldFactory.create({
                        ...props,
                        rules: { required: "Обязательно для заполнения" },
                        name: "password",
                        title: "Пароль",
                        value: employee?.password,
                    })}
                    {ProfileFieldFactory.create({
                        ...props,
                        rules: { required: "Обязательно для заполнения" },
                        name: "date_of_birth",
                        title: "Дата рождения",
                        value: employee?.date_of_birth,
                    })}
                    {ProfileFieldFactory.create({
                        ...props,
                        rules: { required: "Обязательно для заполнения" },
                        name: "address",
                        title: "Адрес",
                        value: employee?.address,
                    })}
                </>
            )}
            skeleton={["name", "login", "password", "date_of_birth", "address"]}
            id={id}
            item={employee}
            editing={editing}
            fetchItem={fetchEmployee}
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
                    <>Продавец №{employee?.id_employee}</>
                )
            }
            shouldFetchItem={shouldFetchEmployee}
            showOptions={showOptions}
            stopEditingAndCreate={stopEditingAndCreate}
            shouldCreate={shouldCreate}
            justStopEditing={justStopEditing}
            error={error}
        />
    );
}

EmployeeProfile.propTypes = {
    id: PropTypes.string,
    employee: PropTypes.shape({
        id_employee: PropTypes.number,
        name: PropTypes.string,
        login: PropTypes.string,
        password: PropTypes.string,
        date_of_birth: PropTypes.string,
        address: PropTypes.string,
    }),
    shouldCreate: PropTypes.bool,
    customTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    showOptions: PropTypes.bool,
    shouldFetchEmployee: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    fetchEmployee: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
    stopEditingAndSave: PropTypes.func.isRequired,
    stopEditingAndCreate: PropTypes.func.isRequired,
    justStopEditing: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default hot(EmployeeProfile);
