create table if not exists contact_submissions (
  id bigserial primary key,
  name text not null,
  email text not null,
  message text not null,
  user_agent text,
  source_ip text,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on contact_submissions (created_at desc);
