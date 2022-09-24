drop table tasks;
create table tasks
(
    id          uuid unique primary key default uuid_generate_v4(),
    name        text not null,
    description text,
    due_date    date,
    created_at  date                    default current_date
);
