import React from "react";
import * as PropTypes from "prop-types";
import { hot } from "react-hot-loader/root";
import BaseProfile from "components/BaseProfile";
import ProfileFieldFactory from "factory/ProfileFieldFactory";
import ProfileSelectFactory from "factory/ProfileSelectFactory";
import { useMount } from "react-use";

function AuthorProfile(props) {
    const {
        id,
        author,
        editing,
        fetchAuthor,
        loading,
        startEditing,
        stopEditingAndSave,
        handleChange,
        customTitle,
        shouldFetchAuthor = true,
        showOptions = true,
        stopEditingAndCreate,
        shouldCreate = false,
        justStopEditing,
        error,
        offices,
        fetchOffices,
    } = props;

    useMount(() => fetchOffices());

    return (
        <BaseProfile
            renderFields={props => (
                <>
                    {ProfileFieldFactory.create({
                        ...props,
                        rules: { required: "Обязательно для заполнения" },
                        name: "name",
                        title: "Имя",
                        value: author?.name,
                    })}
                    {ProfileFieldFactory.create({
                        ...props,
                        rules: { required: "Обязательно для заполнения" },
                        name: "surname",
                        title: "Фамилия",
                        value: author?.surname,
                    })}
                    {ProfileFieldFactory.create({
                        ...props,
                        rules: { required: "Обязательно для заполнения" },
                        name: "date_of_birth",
                        title: "Дата рождения",
                        value: author?.date_of_birth,
                    })}
                    {ProfileSelectFactory.create({
                        ...props,
                        rules: { required: "Обязательно для заполнения" },
                        name: "id_publishing_office",
                        title: "Издательский дом",
                        value: offices.length ? author?.id_publishing_office : null,
                        options: offices.map(office => ({
                            label: office.name,
                            value: office.id_publishing_office,
                        })),
                    })}
                </>
            )}
            skeleton={["name", "surname", "date_of_birth"]}
            id={id}
            item={author}
            editing={editing}
            fetchItem={fetchAuthor}
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
                    <>Автор №{author?.id_author}</>
                )
            }
            shouldFetchItem={shouldFetchAuthor}
            showOptions={showOptions}
            stopEditingAndCreate={stopEditingAndCreate}
            shouldCreate={shouldCreate}
            justStopEditing={justStopEditing}
            error={error}
        />
    );
}

AuthorProfile.propTypes = {
    id: PropTypes.string,
    author: PropTypes.shape({
        id_author: PropTypes.number,
        name: PropTypes.string,
        surname: PropTypes.string,
        date_of_birth: PropTypes.string,
        id_publishing_office: PropTypes.number,
    }),
    offices: PropTypes.array.isRequired,
    shouldCreate: PropTypes.bool,
    customTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    showOptions: PropTypes.bool,
    shouldFetchAuthor: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    fetchAuthor: PropTypes.func.isRequired,
    fetchOffices: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
    stopEditingAndSave: PropTypes.func.isRequired,
    stopEditingAndCreate: PropTypes.func.isRequired,
    justStopEditing: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default hot(AuthorProfile);
