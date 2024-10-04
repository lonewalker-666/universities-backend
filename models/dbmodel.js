import _gender from "./gender.cjs"


export default function dbModel(sequelize, Sequelize) {
    const Gender = _gender(sequelize, Sequelize);
    
  
    return {
    Gender,
    };
  }