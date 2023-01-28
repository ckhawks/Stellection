cd apps/stllctn-backend
echo
echo Running Sequelize Migration
npx sequelize db:migrate
echo
echo Running Sequelize Full Seeding
npx sequelize db:seed:all
cd ../..
echo
echo Running Backend
npm run backend