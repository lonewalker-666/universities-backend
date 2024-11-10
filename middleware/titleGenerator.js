function generateTitle(text) {
    // Define filler words commonly used in college search queries
    const fillerWords = [
      "find", "show", "look for", "tell me", "can you", "help me", "want", "list", "give me", "get",
      "near", "around", "best", "top", "good", "most", "recommend", "some", "any", "with", "about", 
      "based on", "score", "scores", "test", "requirement", "minimum", "maximum", "accepted", 
      "average", "SAT", "ACT", "GPA", "range", "percentile", "need", "in", "state", "city", 
      "county", "close to", "located in", "regions", "places", "area", "location", "nearby", 
      "college", "university", "school", "institute", "campus", "program", "department", "degrees", 
      "rankings", "accredited", "private", "public", "name of", "name", "students", "population", 
      "demographics", "diversity", "representation", "race", "ethnicity", "percentage of", 
      "background", "inclusion", "minorities", "majority", "international", "tuition", "costs", 
      "scholarships", "financial aid", "housing", "campus life", "clubs", "sports", "activities", 
      "opportunities", "admissions", "acceptance", "deadlines", "requirements", "programs", 
      "majors", "courses", "study", "apply", "application", "transfer", "undergraduate", 
      "graduate", "master’s", "bachelor’s", "associate", "online", "flexible"
    ];
  
    // Step 1: Clean up text by converting it to lowercase and splitting into words
    const words = text.toLowerCase().split(/\s+/);
  
    // Step 2: Filter out filler words and keep only meaningful words
    const meaningfulWords = words.filter(word => !fillerWords.includes(word));
  
    // Step 3: Capitalize each meaningful word
    const title = meaningfulWords.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  
    return title;
  }
  
  module.exports = generateTitle;
  