drop index book_title_year_cost_index on book;

drop index customer_name_date_of_birth_email_index on customer;

create index customer_name_index
    on customer (name);

drop index employee_name_login_date_of_birth_address_is_admin_index on employee;

drop index order_date_id_customer_id_employee_index on `order`;

drop index publishing_office_name_address_email_index on publishing_office;
