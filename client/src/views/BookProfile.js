import React from "react";
import * as PropTypes from "prop-types";
import { hot } from "react-hot-loader/root";
import BaseProfile from "components/BaseProfile";

function BookProfile(props) {
    const {
        id,
        book,
        editing,
        fetchBook,
        loading,
        startEditing,
        stopEditingAndSave,
        handleChange,
        customTitle,
        shouldFetchBook = true,
        showOptions = true,
        stopEditingAndCreate,
        shouldCreate = false,
        justStopEditing,
        error,
    } = props;

    return (
        <BaseProfile
            fields={[
                {
                    rules: { required: "Обязательно для заполнения" },
                    name: "title",
                    title: "Название",
                    value: book?.title,
                },
                {
                    rules: {
                        required: "Обязательно для заполнения",
                        pattern: /^\d{4}$/,
                    },
                    name: "year",
                    title: "Год",
                    type: "number",
                    value: book?.year,
                },
                {
                    rules: {
                        required: "Обязательно для заполнения",
                        pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
                    },
                    name: "cost",
                    title: "Цена",
                    type: "number",
                    value: book?.cost,
                },
            ]}
            id={id}
            item={book}
            editing={editing}
            fetchItem={fetchBook}
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
                    <>Книга №{book?.id_book}</>
                )
            }
            shouldFetchItem={shouldFetchBook}
            showOptions={showOptions}
            stopEditingAndCreate={stopEditingAndCreate}
            shouldCreate={shouldCreate}
            justStopEditing={justStopEditing}
            error={error}
        />
    );
}

BookProfile.propTypes = {
    id: PropTypes.string,
    book: PropTypes.shape({
        id_book: PropTypes.number,
        title: PropTypes.string,
        cost: PropTypes.string,
        year: PropTypes.number,
    }),
    shouldCreate: PropTypes.bool,
    customTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    showOptions: PropTypes.bool,
    shouldFetchBook: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    fetchBook: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
    stopEditingAndSave: PropTypes.func.isRequired,
    stopEditingAndCreate: PropTypes.func.isRequired,
    justStopEditing: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default hot(BookProfile);
