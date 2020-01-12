create table if not exists book
(
    id_book int auto_increment
        primary key,
    title   varchar(255)    null,
    year    year           null,
    cost    decimal(15, 2) null
);

create table if not exists customer
(
    id_customer   int auto_increment
        primary key,
    name          varchar(255) null,
    date_of_birth date        null,
    email         varchar(255) null
);

create table if not exists employee
(
    id_employee   int auto_increment
        primary key,
    name          varchar(255)         null,
    login         varchar(255)         null,
    password      varchar(255)         null,
    date_of_birth date                 null,
    address       varchar(255)         null,
    is_admin      tinyint(1) default 0 null,
    constraint employee_login_uindex
        unique (login)
);

create table if not exists `order`
(
    id_order    int auto_increment
        primary key,
    id_customer int  null,
    id_employee int  null,
    date        date null,
    constraint order_customer_id_customer_fk
        foreign key (id_customer) references customer (id_customer),
    constraint order_employee_id_employee_fk
        foreign key (id_employee) references employee (id_employee)
);

create table if not exists book_x_order
(
    id_order int null,
    id_book  int null,
    constraint book_x_order_book_id_book_fk
        foreign key (id_book) references book (id_book),
    constraint book_x_order_order_id_order_fk
        foreign key (id_order) references `order` (id_order)
);

create table if not exists publishing_office
(
    id_publishing_office int auto_increment
        primary key,
    name                 varchar(255) null,
    address              varchar(255) null,
    email                varchar(255) null
);

create table if not exists author
(
    id_author            int auto_increment
        primary key,
    name                 varchar(255) null,
    surname              varchar(255) null,
    date_of_birth        date        null,
    id_publishing_office int         null,
    constraint author_publishing_office_id_publishing_office_fk
        foreign key (id_publishing_office) references publishing_office (id_publishing_office)
);

create table if not exists book_x_author
(
    id_book   int null,
    id_author int null,
    constraint book_x_author_author_id_author_fk
        foreign key (id_author) references author (id_author),
    constraint book_x_author_book_id_book_fk
        foreign key (id_book) references book (id_book)
);

