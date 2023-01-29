import sequelize, { Sequelize } from 'sequelize';

R_Cluster_Star = sequelize.define('r_cluster_star', {
    cluster_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'clusters',
            key: 'cluster_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
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
})