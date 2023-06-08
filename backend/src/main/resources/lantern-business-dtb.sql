create database lantern_business;
use lantern_business;
create table role
(
    id          int primary key auto_increment,
    name        varchar(50) not null,
    description varchar(100)
);
insert into role (id, name, description)
VALUES (1, "ROLE_ADMIN", "Quản trị viên"),
       (2, "ROLE_CUSTOMER", "Khách hàng");
create table user
(
    id             bigint primary key auto_increment,
    active         boolean default true,
    email          varchar(50) unique not null,
    fullName       varchar(50)        not null,
    password       text               not null,
    phone          varchar(12) unique not null,
    remember_token varchar(255),
    username       varchar(20) unique not null
);
insert into user (id, email, fullName, phone, username, password)
VALUES (1, "huong@gmail.com", "ADMIN Đoàn Hưởng", "0888442448", "admin",
        "$2a$10$/fEKrX3F3sRz/CMMCgIaXuYaM01ZamVlqvf4TeQxOUupGUDBkpliK"),
       (2, "test@gmail.com", "Test Customer", "0999999999", "khachtest",
        "$2a$10$/fEKrX3F3sRz/CMMCgIaXuYaM01ZamVlqvf4TeQxOUupGUDBkpliK");
# Mật khẩu: Huong@123
create table users_roles
(
    user_id bigint,
    role_id int,
    primary key (user_id, role_id)
);
insert into users_roles (user_id, role_id)
VALUES (1, 1),
       (2, 2);
create table category
(
    id     bigint primary key auto_increment,
    name   varchar(50) not null,
    active boolean default true
);
insert into category (name)
values ("Đèn lồng tú cầu"),
       ("Đèn lồng ngôi sao"),
       ("Đèn lồng hội an"),
       ("Đèn lồng giấy");
create table product
(
    id          bigint primary key auto_increment,
    name        varchar(255) not null,
    image       text,
    description text,
    active      boolean default true,
    category_id bigint,
    foreign key (category_id) references category (id)
);
create table size
(
    id          bigint primary key auto_increment,
    name        varchar(25) not null
);
create table color
(
    id          bigint primary key auto_increment,
    name        varchar(25) not null
);
create table variant
(
    id          bigint primary key auto_increment,
    price       double not null CHECK ( price >= 0 ),
    quantity    int not null CHECK ( quantity >= 0 ),
    product_id  bigint,
    size_id     bigint,
    color_id    bigint,
    foreign key (product_id) references product(id),
    foreign key (size_id) references size(id),
    foreign key (color_id) references color(id)
);