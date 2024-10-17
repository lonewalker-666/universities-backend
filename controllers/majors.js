import model from "../models/index.js";



const race = [

    "Asian/Cambodia",
    "Asian/China",
    "Asian/India",
    "Asian/Japan",
    "Asian/Korea",
    "Asian/Malaysia",
    "Asian/Pakistan",
    "Asian/Philippines",
    "Asian/Vietnam",
    "Asian/Other East Asia",
    "Asian/Other South Asia",
    "Asian/Other Southeast Asia",
    "Black or African American/U.S. / African American",
    "Black or African American/Africa",
    "Black or African American/Caribbean",
    "Black or African American/Other",
    "Hispanic/Latino/Central America",
    "Hispanic/Latino/Cuba",
    "Hispanic/Latino/Mexico",
    "Hispanic/Latino/Puerto Rico",
    "Hispanic/Latino/South America",
    "Hispanic/Latino/Spain",
    "Hispanic/Latino/Other",
    "Native Hawaiian or Other Pacific Islander/Guam",
    "Native Hawaiian or Other Pacific Islander/Hawaii",
    "Native Hawaiian or Other Pacific Islander/Samoa",
    "Native Hawaiian or Other Pacific Islander/Other Pacific Islands",
    "White/Europe",
    "White/Middle East",
    "White/Other",
    "Prefer Not to Answer"
  ]
  

  async function insertMajors(req,res) {
    try {
      // Use bulkCreate to insert all majors at once
      await model.Race.bulkCreate(
        race.map((major) => ({
          name: major,
          created_by:"kishorekk54321@gmail.com"
        }))
      );
      
      console.log("Majors inserted successfully!");
      return res.json("Success")
    } catch (error) {
      console.error("Error inserting majors:", error);
      return res.json("Success",failed)
    }
  }

  export {
    insertMajors
  }