import { INTEGER, Sequelize, STRING, JSONB } from 'sequelize';
import { User } from './models/user.model';
import{ config}  from './config';

const sequelize = new Sequelize(
	config.DB,
	config.USER,
	config.PASSWORD,
	{
		host: config.HOST,
		dialect: 'postgres',

		pool: {
			max: config.pool.max,
			min: config.pool.min,
			acquire: config.pool.acquire,
			idle: config.pool.idle
		}
	}
);

// Init all models
User.init(
	{
		nonce: {
			allowNull: false,
			type: INTEGER.UNSIGNED,
			defaultValue: (): number => Math.floor(Math.random() * 10000),
		},
		publicAddress: {
			allowNull: false,
			type: STRING,
			unique: true,
			validate: { isLowercase: true },
		},
		username: {
			type: STRING,
			unique: true,
		},
		favoriteNFTS: {
			type: JSONB,
			defaultValue: []
		}
	},
	{
		modelName: 'user',
		sequelize, 
		timestamps: false,
	}
);

sequelize.sync();

export { sequelize };
