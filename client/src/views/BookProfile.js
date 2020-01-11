import React from "react";
import * as PropTypes from "prop-types";
import { hot } from "react-hot-loader/root";
import BaseProfile from "components/BaseProfile";
import ProfileFieldFactory from "factory/ProfileFieldFactory";
import ProfileSelectFactory from "factory/ProfileSelectFactory";
import Chip from "@material-ui/core/Chip";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

const styles = {
    chip: css`
        margin: 2px;
    `,
};

function BookProfile(props) {
    const {
        id,
        book,
        authors,
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
            renderFields={props => (
                <>
                    {ProfileFieldFactory.create({
                        ...props,
                        rules: { required: "Обязательно для заполнения" },
                        name: "title",
                        title: "Название",
                        value: book?.title,
                    })}
                    {ProfileFieldFactory.create({
                        ...props,
                        rules: {
                            required: "Обязательно для заполнения",
                            pattern: /^\d{4}$/,
                        },
                        name: "year",
                        title: "Год",
                        value: book?.year,
                    })}
                    {ProfileFieldFactory.create({
                        ...props,
                        rules: {
                            required: "Обязательно для заполнения",
                            pattern: /^\d+(.\d{1,2})?$/,
                        },
                        name: "cost",
                        title: "Цена",
                        value: book?.cost,
                    })}
                    {ProfileSelectFactory.create({
                        ...props,
                        multiple: true,
                        rules: {
                            validate: value =>
                                value?.length >= 1 || "Необходимо выбрать хотя бы одного автора",
                        },
                        name: "authors",
                        title: "Автор(ы)",
                        value: authors?.length ? book?.authors : null,
                        renderValue: selected => (
                            <ChipWrapper>
                                {selected.map(id_author => {
                                    const author = authors?.find(
                                        author => author.id_author === id_author,
                                    );
                                    return (
                                        <Chip
                                            key={id_author}
                                            label={`${author?.name} ${author?.surname}`}
                                            css={styles.chip}
                                        />
                                    );
                                })}
                            </ChipWrapper>
                        ),
                        options: authors.map(author => ({
                            label: `${author?.name} ${author?.surname}`,
                            value: author.id_author,
                        })),
                    })}
                </>
            )}
            skeleton={["title", "year", "cost", "authors"]}
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
        cost: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        authors: PropTypes.array,
    }),
    authors: PropTypes.array.isRequired,
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

const ChipWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
