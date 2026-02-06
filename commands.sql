create table blogs (
  id serial primary key,
  author varchar,
  url varchar not null,
  title varchar not null,
  likes int default 0
);

insert into blogs (author, url, title) values (
  'Willian Shakespeare',
  'http://hamlet-not-actually-a-real-link.com',
  'Hamlet'
);

insert into blogs (author, url, title) values (
  'Me',
  'http://my-totally-real-book-that-exists.com',
  'My totally real book that exists'
);

-- query to retrieve the books in the reading list for each user
select
  u.name,
  u.username,
  b.id,
  b.url,
  b.title,
  b.author,
  b.likes,
  b.year
  from blogs b
  join reading_lists r on b.id = r.blog_id
  join users u on u.id = r.user_id;