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

function OrderProfile(props) {
    const {
        id,
        order,
        editing,
        fetchOrder,
        loading,
        startEditing,
        stopEditingAndSave,
        handleChange,
        customTitle,
        shouldFetchOrder = true,
        showOptions = true,
        stopEditingAndCreate,
        shouldCreate = false,
        justStopEditing,
        error,
        customers,
        employees,
        books,
    } = props;

    return (
        <BaseProfile
            renderFields={props => (
                <>
                    {ProfileFieldFactory.create({
                        ...props,
                        rules: { required: "Обязательно для заполнения" },
                        name: "date",
                        title: "Дата заказа",
                        value: order?.date,
                    })}
                    {ProfileSelectFactory.create({
                        ...props,
                        rules: { required: "Обязательно для заполнения" },
                        name: "id_customer",
                        title: "Покупатель",
                        value: customers?.length ? order?.id_customer : null,
                        options:
                            customers?.map(customer => ({
                                label: customer.name,
                                value: customer.id_customer,
                            })) ?? [],
                    })}
                    {ProfileSelectFactory.create({
                        ...props,
                        rules: { required: "Обязательно для заполнения" },
                        name: "id_employee",
                        title: "Продавец",
                        value: employees?.length ? order?.id_employee : null,
                        options:
                            employees?.map(employee => ({
                                label: employee.name,
                                value: employee.id_employee,
                            })) ?? [],
                    })}
                    {ProfileSelectFactory.create({
                        ...props,
                        multiple: true,
                        rules: {
                            validate: value =>
                                value?.length >= 1 || "Необходимо выбрать хотя бы одну книгу",
                        },
                        name: "books",
                        title: "Книга(и)",
                        value: books?.length ? order?.books : null,
                        renderValue: selected => (
                            <ChipWrapper>
                                {selected.map(id_book => {
                                    const book = books?.find(book => book.id_book === id_book);
                                    return (
                                        <Chip key={id_book} label={book?.title} css={styles.chip} />
                                    );
                                })}
                            </ChipWrapper>
                        ),
                        options:
                            books?.map(book => ({
                                label: book.title,
                                value: book.id_book,
                            })) ?? [],
                    })}
                </>
            )}
            skeleton={["date", "id_customer", "id_employee", "books"]}
            id={id}
            item={order}
            editing={editing}
            fetchItem={fetchOrder}
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
                    <>Заказ №{order?.id_order}</>
                )
            }
            shouldFetchItem={shouldFetchOrder}
            showOptions={showOptions}
            stopEditingAndCreate={stopEditingAndCreate}
            shouldCreate={shouldCreate}
            justStopEditing={justStopEditing}
            error={error}
        />
    );
}

OrderProfile.propTypes = {
    id: PropTypes.string,
    order: PropTypes.shape({
        id_order: PropTypes.number,
        date: PropTypes.string,
        id_customer: PropTypes.number,
        id_employee: PropTypes.number,
        books: PropTypes.array,
    }),
    customers: PropTypes.array,
    employees: PropTypes.array,
    books: PropTypes.array,
    shouldCreate: PropTypes.bool,
    customTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    showOptions: PropTypes.bool,
    shouldFetchOrder: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    fetchOrder: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
    stopEditingAndSave: PropTypes.func.isRequired,
    stopEditingAndCreate: PropTypes.func.isRequired,
    justStopEditing: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default hot(OrderProfile);

const ChipWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
