import sequelize, { Sequelize, INTEGER, DATE, NOW, TEXT, UUID, UUIDV4 } from 'sequelize';

Slugs = sequelize.define('slugs', {
    slug_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    slug_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    type: {
        type: Sequelize.ENUM,
        values: ['Star', 'Cluster'],
        allowNull: false,
        defaultValue: "Star",
    }
})