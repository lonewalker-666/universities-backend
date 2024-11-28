import _gender from "./gender.cjs";
import _user from "./user.cjs";
import _majors from "./majors.cjs";
import _gradeLevel from "./gradeLevel.cjs";
import _race from "./race.cjs";
import _highSchool from "./highSchool.cjs";
import _plan from "./plan.cjs";
import _armedForceStatus from "./armed_force_status.cjs";
import _citizenship from "./citizenship.cjs";
import _financialAid from "./financialAid.cjs";
import _firstGeneration from "./firstGeneration.cjs";
import _planDescription from "./planDescription.cjs";
import _user_logs from "./userLogs.cjs";
import _blogs from "./blogs.cjs";
import _blogsTopic from "./blogsTopic.cjs";
import _blogsContentPara from "./blogsContentPara.cjs"; 
import _blogsOverviewHighlighted from "./blogsOverviewHighlighted.cjs";
import _blogsOverviewPara from "./blogsOverviewPara.cjs";
import _blogsContentHighlighted from "./blogsContentHighlighted.cjs";
import _blogsCategory from "./blogCategory.cjs";
import _standardizedTests from "./standardizedTests.cjs";
import _testSubjects from "./testSubjects.cjs";
import _testScore from "./testScore.cjs";
import _extraCurriculars from "./extraCurriculars.cjs";
import _preferedColleges from "./preferedColleges.cjs";
import _preferedMajors from "./preferedMajors.cjs";
import _essay from "./essay.cjs";
import _visitedColleges from "./visitedColleges.cjs"
import _wishlist from "./wishlist.cjs"
import _verifiedEmails from "./verifiedEmails.cjs"
import _chatHistory from "./chatHistory.cjs"
import _chatResponse from "./chatResponse.cjs"

export default function dbModel(sequelize, Sequelize) {
  const Gender = _gender(sequelize, Sequelize);
  const Majors = _majors(sequelize, Sequelize);
  const User = _user(sequelize, Sequelize);
  const GradeLevel = _gradeLevel(sequelize, Sequelize);
  const Race = _race(sequelize, Sequelize);
  const Armed_Force_Status = _armedForceStatus(sequelize, Sequelize);
  const Citizenship = _citizenship(sequelize, Sequelize);
  const HighSchool = _highSchool(sequelize, Sequelize);
  const Plan = _plan(sequelize, Sequelize);
  const FinancialAid = _financialAid(sequelize, Sequelize);
  const FirstGeneration = _firstGeneration(sequelize, Sequelize);
  const PlanDescription = _planDescription(sequelize, Sequelize);
  const UserLogs = _user_logs(sequelize, Sequelize);
  const Blogs = _blogs(sequelize, Sequelize);
  const BlogsOverviewPara = _blogsOverviewPara(sequelize,Sequelize);
  const BlogsOverviewHighlighted = _blogsOverviewHighlighted(sequelize,Sequelize);
  const BlogsTopic = _blogsTopic(sequelize,Sequelize);
  const BlogsContentHighlighted = _blogsContentHighlighted(sequelize,Sequelize);
  const BlogsContentPara = _blogsContentPara(sequelize,Sequelize);
  const BlogCategory = _blogsCategory(sequelize,Sequelize);
  const TestSubjects = _testSubjects(sequelize,Sequelize);
  const StandardizedTests = _standardizedTests(sequelize,Sequelize);
  const TestScore = _testScore(sequelize,Sequelize);
  const ExtraCurriculars = _extraCurriculars(sequelize,Sequelize);
  const PreferedColleges = _preferedColleges(sequelize,Sequelize);
  const PreferedMajors = _preferedMajors(sequelize,Sequelize);
  const Essay = _essay(sequelize,Sequelize);
  const VisitedColleges = _visitedColleges(sequelize,Sequelize);
  const Wishlist = _wishlist(sequelize,Sequelize);
  const VerifiedEmails = _verifiedEmails(sequelize,Sequelize);
  const ChatHistory = _chatHistory(sequelize,Sequelize);
  const ChatResponse = _chatResponse(sequelize,Sequelize);

  User.belongsTo(Gender, { foreignKey: "gender_id" });
  Plan.hasMany(PlanDescription, { foreignKey: "plan_id" });
  User.belongsTo(FirstGeneration, { foreignKey: "first_generation_id" });
  User.belongsTo(Race, { foreignKey: "race_id" });
  User.belongsTo(Armed_Force_Status, { foreignKey: "armed_force_status_id" });
  User.belongsTo(Citizenship, { foreignKey: "citizenship_id" });
  User.belongsTo(FinancialAid, { foreignKey: "financial_aid_id" });
  User.belongsTo(HighSchool, { foreignKey: "high_school_id" });
  User.belongsTo(GradeLevel, { foreignKey: "grade_level_id" });
  User.belongsTo(Plan, { foreignKey: "plan_id" });
  User.hasMany(UserLogs, { foreignKey: "user_id" });
  User.hasMany(ExtraCurriculars, { foreignKey: "user_id" });
  User.hasMany(PreferedColleges, { foreignKey: "user_id" });
  User.hasMany(PreferedMajors, { foreignKey: "user_id" });
  TestSubjects.belongsTo(StandardizedTests, { foreignKey: "test_id" });
  TestScore.belongsTo(TestSubjects, { foreignKey: "subject_id" });
  User.hasMany(TestScore, { foreignKey: "user_id" });
  TestScore.belongsTo(StandardizedTests, { foreignKey: "test_id" });
  Blogs.hasMany(BlogsOverviewPara, {
    foreignKey: "blog_id",
    as: "overviewParas",
  });
  BlogsOverviewPara.hasMany(BlogsOverviewHighlighted, {
    foreignKey: "paragraph_id",
    as: "overviewHighlights",
  });
  Blogs.belongsTo(BlogCategory, { foreignKey: "blog_category_id" });
  Blogs.hasMany(BlogsTopic, { foreignKey: "blog_id", as: "topics" });
  BlogsTopic.hasMany(BlogsContentPara, { foreignKey: 'blog_topic_id', as: 'contentParas' });
  BlogsContentPara.hasMany(BlogsContentHighlighted, { foreignKey: 'paragraph_id', as: 'contentHighlights' });

  Essay.belongsTo(User, { foreignKey: "user_id" });

  Wishlist.belongsTo(User, { foreignKey: "user_id" });
  VisitedColleges.belongsTo(User, { foreignKey: "user_id" });
  User.hasMany(ChatHistory, { foreignKey: "user_id" });
  ChatHistory.belongsTo(User, { foreignKey: "user_id" });
  ChatHistory.hasMany(ChatResponse, { foreignKey: "chat_id" });
  ChatResponse.belongsTo(ChatHistory, { foreignKey: "chat_id" });

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
    FinancialAid,
    PlanDescription,
    UserLogs,
    Blogs,
    BlogsOverviewPara,
    BlogsOverviewHighlighted,
    BlogsTopic,
    BlogsContentHighlighted,
    BlogsContentPara,
    BlogCategory,
    StandardizedTests,
    TestSubjects,
    TestScore,
    FirstGeneration,
    ExtraCurriculars,
    PreferedColleges,
    PreferedMajors,
    Essay,
    VisitedColleges,
    Wishlist,
    VerifiedEmails,
    ChatHistory,
    ChatResponse
  };
}
