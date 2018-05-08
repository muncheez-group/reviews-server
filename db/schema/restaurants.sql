create table restaurants (
  place_id int,
  "name" varchar(255) not null,
  price_level smallint not null,
  neighborhood varchar(255) not null,
  city varchar(255) not null,
  street varchar(255) not null,
  rating numeric(2,1) not null,
  primary key(place_id)
);
