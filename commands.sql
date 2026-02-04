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