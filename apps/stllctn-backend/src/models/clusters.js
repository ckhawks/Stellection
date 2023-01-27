import { Model } from 'sequelize';

Clusters = sequelize.define('clusters', {
    cluster_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cluster_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
    cluster_desc: { // do we need a cluster desc? 
        type: Sequelize.STRING,
        defaultValue: "basic tag",
    },
    public: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false // public or private default ? 
    }
});