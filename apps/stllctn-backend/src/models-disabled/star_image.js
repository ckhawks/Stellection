import sequelize, { Sequelize } from 'sequelize';

Star_Image = sequelize.define('star_image', {
    star_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'stars',
            key: 'star_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    image_mimetype: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})