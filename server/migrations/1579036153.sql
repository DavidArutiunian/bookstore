create index book_title_year_cost_index
    on book (title, year, cost);

create index author_name_surname_date_of_birth_id_publishing_office_index
    on author (name, surname, date_of_birth, id_publishing_office);

create index publishing_office_name_address_email_index
    on publishing_office (name, address, email);

create index customer_name_date_of_birth_email_index
    on customer (name, date_of_birth, email);

create index employee_name_login_date_of_birth_address_is_admin_index
    on employee (name, login, date_of_birth, address, is_admin);

create index order_date_id_customer_id_employee_index
    on `order` (date, id_customer, id_employee);
