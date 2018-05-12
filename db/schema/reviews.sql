create table reviews (
  place_id int,
  author_name varchar(255) not null,
  profile_photo_url varchar(255),
  review_rating smallint not null,
  relative_time_description varchar(255) not null,
  text varchar not null
);
