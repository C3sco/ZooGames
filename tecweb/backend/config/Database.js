import { Sequelize } from "sequelize";

const db = new Sequelize('users','root','',{
    host:"localhost",
    dialect:"mysql"
});

export default db;