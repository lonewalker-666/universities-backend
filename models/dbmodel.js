import _gender from "./gender.cjs"
import _user from "./user.cjs"
import _majors from "./majors.cjs"
import _gradeLevel from "./gradeLevel.cjs"
import _race from "./race.cjs"
import _highSchool from "./highSchool.cjs"
import _plan from "./plan.cjs"
import _planDescription from "./planDescription.cjs"
import _armedForceStatus from "./armed_force_status.cjs"
import _citizenship from "./citizenship.cjs"
import _financialAid from "./financialAid.cjs"
import _firstGeneration from "./firstGeneration.cjs"


export default function dbModel(sequelize, Sequelize) {
    const Gender = _gender(sequelize, Sequelize);
    const Majors = _majors(sequelize,Sequelize)
    const User = _user(sequelize, Sequelize);
    const GradeLevel = _gradeLevel(sequelize,Sequelize) 
    const Race = _race(sequelize,Sequelize)
    const Armed_Force_Status = _armedForceStatus(sequelize,Sequelize)
    const Citizenship = _citizenship(sequelize,Sequelize)
    const HighSchool = _highSchool(sequelize,Sequelize)
    const Plan = _plan(sequelize,Sequelize)
    const FinancialAid = _financialAid(sequelize,Sequelize)
    const FirstGeneration = _firstGeneration(sequelize,Sequelize)

  User.belongsTo(Gender, { foreignKey: "gender_id" });
  User.belongsTo(FirstGeneration, { foreignKey: "first_generation_id" });
  User.belongsTo(Race, { foreignKey: "race_id" });
  User.belongsTo(Armed_Force_Status, { foreignKey: "armed_force_status_id" });
  User.belongsTo(Citizenship, { foreignKey: "citizenship_id" });
  User.belongsTo(FinancialAid, { foreignKey: "financial_aid_id" });
  User.belongsTo(HighSchool, { foreignKey: "high_school_id" });
  User.belongsTo(GradeLevel, { foreignKey: "grade_level_id" });
  User.belongsTo(Plan, { foreignKey: "plan_id" });
    return {
    Gender,
    User,
    Majors,
    Armed_Force_Status,
    Citizenship,
    HighSchool,
    GradeLevel,
    Plan,
    Race,
    FinancialAid
    };
  }

