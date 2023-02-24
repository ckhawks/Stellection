# Abort on any error
set -e

cd apps/stllctn-backend
echo
echo Running Sequelize Migration
npx sequelize db:migrate
echo
echo Running Sequelize Full Seeding
npx sequelize db:seed:all
# cd ../..
touch /data/file.txt
echo
echo Running Backend
ts-node-dev ./src/index.ts