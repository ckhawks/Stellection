import sequelize, { Sequelize, INTEGER, DATE, NOW, TEXT, UUID, UUIDV4 } from 'sequelize';

Stars = sequelize.define('stars', {
    star_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    slug_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'slugs',
            key: 'slug_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    uploader_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    star_title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    origin: {
        type: Sequelize.STRING,
    },
    file_path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    thumbnail_url: {
        type: Sequelize.STRING,
        unique: true,
    }
})