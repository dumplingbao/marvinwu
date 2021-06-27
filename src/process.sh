set -e
mkdir -p tmp/export
mkdir -p tmp/db
mkdir -p tmp/json
rm -fr tils
mkdir -p tils
rm -f tmp/db/test.db
# ./bin/obsidian-export-linux tmp/raw  tmp/export
# ./bin/obsidian-export-mac tmp/raw  tmp/export
node bin/moverCli.js cleanDir 'tmp/raw/**/*.md'
node bin/moverCli.js mdToJson 'tmp/raw/**/*.md' > tmp/json/test1.json
node bin/moverCli.js createTable tmp/db/test.db tmp/json/test1.json 
cat tmp/json/test1.json | sqlite-utils insert tmp/db/test.db tils - 
sqlite3 tmp/db/test.db < src/process.sql
sqlite-utils tmp/db/test.db "SELECT DISTINCT (filename),
                file_url,file_path
  FROM tils_30
 WHERE filename LIKE '%survey%' OR 
       topic LIKE '%survey%';
" --json-cols > tmp/json/survey.json

sqlite-utils tmp/db/test.db "SELECT DISTINCT (filename),
                file_url, file_path
  FROM tils_30
 WHERE file_path LIKE '%tils%';
" --json-cols > tmp/json/tils.json

sqlite-utils tmp/db/test.db "SELECT DISTINCT (filename),
                file_url,file_path
  FROM tils_30
 WHERE filename LIKE '%cheat%' or topic like '%cheat%' or topic like '%faq%'
" --json-cols > tmp/json/cheatsheet.json

node bin/moverCli.js move tmp/json/tils.json
node bin/moverCli.js move tmp/json/cheatsheet.json
node bin/moverCli.js move tmp/json/survey.json