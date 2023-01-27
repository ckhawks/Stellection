import { Model } from 'sequelize';

R_User_Cluster = sequelize.define('r_user_cluster', {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
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
    user_role: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})