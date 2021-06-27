create view tils_10 as
select
    substr(file, 5, length(file)) AS file_path,
    *
from
    tils;

create view tils_20 as
select
    lower(value) topic,
    filename,
    file_path,
    'tils/' || file_url file_url,
    ref,
    title
from
    tils_10,
    json_each(tils_10.topic);

create view tils_30 as
select
    *
from
    tils_20
where
    topic not like '%urban%'