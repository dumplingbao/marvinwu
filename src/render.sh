set -e
rm -f README.md
node src/render.js > README.md
echo 'rendering done'