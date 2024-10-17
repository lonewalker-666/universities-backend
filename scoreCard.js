import axios from "axios";

// Replace with your actual API key
const apiKey = "oqefxA6jad0cNOjUiaZ8saME4fGcollh0zI2ix0Z";
const baseUrl = "https://api.data.gov/ed/collegescorecard/v1/schools";

// Overview fields
const overviewFields = [
    'school.name', 'latest.student.size', 'school.school_url',
    'school.ownership', 'school.locale', 'school.city', 'school.state', 
    'latest.completion.outcome_percentage_suppressed.all_students.8yr.award_pooled',
    'latest.cost.avg_net_price.overall', 'latest.earnings.10_yrs_after_entry.median'
];

// Additional fields as per your request
const additionalFields = [

    // Field of study parameters
    "latest.programs.cip_4_digit.code",
    "latest.programs.cip_4_digit.title",
    "latest.programs.cip_4_digit.credential.level",
    "latest.programs.cip_4_digit.credential.title",
    "latest.programs.cip_4_digit.earnings.5_yr.overall_median_earnings",
    "latest.programs.cip_4_digit.counts.ipeds_awards2",

    // Costs parameters
    'latest.cost.avg_net_price.public', 'latest.cost.avg_net_price.private',
    'latest.cost.avg_net_price.program_year', 'latest.cost.avg_net_price.other_academic_year',
    'latest.cost.net_price.public.by_income_level.0-30000',
    'latest.cost.net_price.public.by_income_level.30001-48000',
    'latest.cost.net_price.public.by_income_level.48001-75000',
    'latest.cost.net_price.public.by_income_level.75001-110000',
    'latest.cost.net_price.public.by_income_level.110001-plus',
    'latest.cost.net_price.private.by_income_level.0-30000',
    'latest.cost.net_price.private.by_income_level.30001-48000',
    'latest.cost.net_price.private.by_income_level.48001-75000',
    'latest.cost.net_price.private.by_income_level.75001-110000',
    'latest.cost.net_price.private.by_income_level.110001-plus',
    'latest.cost.net_price.program_reporter.by_income_level.0-30000',
    'latest.cost.net_price.program_reporter.by_income_level.30001-48000',
    'latest.cost.net_price.program_reporter.by_income_level.48001-75000',
    'latest.cost.net_price.program_reporter.by_income_level.75001-110000',
    'latest.cost.net_price.program_reporter.by_income_level.110001-plus',
    'latest.cost.net_price.other_acad_calendar.by_income_level.0-30000',
    'latest.cost.net_price.other_acad_calendar.by_income_level.30001-48000',
    'latest.cost.net_price.other_acad_calendar.by_income_level.48001-75000',
    'latest.cost.net_price.other_acad_calendar.by_income_level.75001-110000',
    'latest.cost.net_price.other_acad_calendar.by_income_level.110001-plus',

    // Graduation and Retention
    'latest.completion.outcome_percentage_suppressed.all_students.8yr.award_pooled',
    'latest.student.retention_rate_suppressed.four_year.full_time_pooled',
    'latest.completion.outcome_percentage_suppressed.full_time.first_time.8yr.unknown_pooled', 
    'latest.completion.outcome_percentage_suppressed.full_time.first_time.8yr.transfer_pooled',

    // Financial Aid and Debt
    'latest.aid.dcs_pell_grant_rate_pooled',
    'latest.aid.median_debt_suppressed.completers.overall',
    'latest.aid.dcs_federal_loan_rate_pooled',

    // Typical Earnings
    'latest.earnings.10_yrs_after_entry.median',

    // Campus Diversity
    'latest.student.size', 'latest.student.part_time_share',
    'latest.student.demographics.student_faculty_ratio',
    'latest.student.demographics.race_ethnicity.aian',
    'latest.student.demographics.race_ethnicity.asian',
    'latest.student.demographics.race_ethnicity.black',
    'latest.student.demographics.race_ethnicity.hispanic',
    'latest.student.demographics.race_ethnicity.nhpi',
    'latest.student.demographics.race_ethnicity.non_resident_alien',
    'latest.student.demographics.race_ethnicity.two_or_more',
    'latest.student.demographics.race_ethnicity.unknown',
    'latest.student.demographics.race_ethnicity.white',

    // Test Scores and Acceptance
    "latest.admissions.sat_scores.average.overall",
    "latest.admissions.sat_scores.midpoint.critical_reading",
    "latest.admissions.sat_scores.midpoint.math",
    "latest.admissions.sat_scores.25th_percentile.critical_reading",
    "latest.admissions.sat_scores.75th_percentile.critical_reading",
    "latest.admissions.sat_scores.25th_percentile.math",
    "latest.admissions.sat_scores.75th_percentile.math",
    "latest.admissions.sat_scores.50th_percentile.critical_reading",
    "latest.admissions.sat_scores.50th_percentile.math",
    "latest.admissions.act_scores.midpoint.cumulative",
    "latest.admissions.act_scores.midpoint.english",
    "latest.admissions.act_scores.midpoint.math",
    "latest.admissions.act_scores.25th_percentile.cumulative",
    "latest.admissions.act_scores.75th_percentile.cumulative",
    "latest.admissions.act_scores.25th_percentile.english",
    "latest.admissions.act_scores.75th_percentile.english",
    "latest.admissions.act_scores.25th_percentile.math",
    "latest.admissions.act_scores.75th_percentile.math",
    "latest.admissions.act_scores.50th_percentile.cumulative",
    "latest.admissions.act_scores.50th_percentile.english",
    "latest.admissions.act_scores.50th_percentile.math",
    "latest.admissions.admission_rate_suppressed.overall",
];

// Combine all the fields into one list
const allFields = overviewFields.concat(additionalFields);

// Convert the list of fields into a comma-separated string
const fieldsParam = allFields.join(',');

// Set the parameters for the API call
const params = {
    api_key: apiKey,
    'school.name': "Stanford University",
    'fields': fieldsParam
};

// Mapping of ownership and locale values
const ownershipMap = {
    1: "Public",
    2: "Private Nonprofit",
    3: "Private For-Profit"
};

const localeMap = {
    11: "City", 12: "City", 13: "City",
    21: "Suburban", 22: "Suburban", 23: "Suburban",
    31: "Town", 32: "Town", 33: "Town",
    41: "Rural", 42: "Rural", 43: "Rural"
};

// Function to fetch and process data
async function fetchCollegeData() {
    try {
        const response = await axios.get(baseUrl, { params });
        if (response.status === 200) {
            const data = response.data;
            if (data.results.length === 0) {
                console.log("No results found for the specified query.");
                return;
            }

            const result = data.results[0];
            const programs = result['latest.programs.cip_4_digit'] || [];

            // Extracting and formatting the data

            // Overview
            const universityName = result['school.name'] || 'N/A';
            const studentSize = result['latest.student.size'] || 'N/A';
            const schoolUrl = result['school.school_url'] || 'N/A';
            const ownership = ownershipMap[result['school.ownership']] || 'N/A';
            const locale = localeMap[result['school.locale']] || 'N/A';
            const city = result['school.city'] || 'N/A';
            const state = result['school.state'] || 'N/A';
            const graduationRate = result['latest.completion.outcome_percentage_suppressed.all_students.8yr.award_pooled'] 
                ? `${(result['latest.completion.outcome_percentage_suppressed.all_students.8yr.award_pooled'] * 100).toFixed(1)}%` 
                : 'N/A';
            const avgAnnualCost = result['latest.cost.avg_net_price.overall'] 
                ? `$${Number(result['latest.cost.avg_net_price.overall']).toLocaleString()}`
                : 'N/A';
            const medianEarnings = result['latest.earnings.10_yrs_after_entry.median'] 
                ? `$${Number(result['latest.earnings.10_yrs_after_entry.median']).toLocaleString()}`
                : 'N/A';

            // Field of Study
            const earningCounts = programs
                .filter(program => 
                    program['earnings'] && 
                    program['earnings']['5_yr'] && 
                    program['earnings']['5_yr']['overall_median_earnings'] !== null && 
                    program['credential'] && 
                    program['credential']['level'] === 3
                )
                .map(program => ({
                    field: `${program['title']} - ${program['credential']['title']}`,
                    earnings: program['earnings']['5_yr']['overall_median_earnings'],
                    graduates: program['counts']['ipeds_awards2'] || 0
                }))
                .sort((a, b) => b.earnings - a.earnings)
                .slice(0, 10);

            // Costs
            const institutionType = result['school.ownership'];
            let incomeCosts = {};

            if (institutionType === 1) { // Public
                incomeCosts = {
                    "0-$30,000": result['latest.cost.net_price.public.by_income_level.0-30000'] || 0,
                    "$30,001-$48,000": result['latest.cost.net_price.public.by_income_level.30001-48000'] || 0,
                    "$48,001-$75,000": result['latest.cost.net_price.public.by_income_level.48001-75000'] || 0,
                    "$75,001-$110,000": result['latest.cost.net_price.public.by_income_level.75001-110000'] || 0,
                    "$110,001+": result['latest.cost.net_price.public.by_income_level.110001-plus'] || 0
                };
            } else if (institutionType === 2 || institutionType === 3) { // Private (Nonprofit or For-Profit)
                incomeCosts = {
                    "0-$30,000": result['latest.cost.net_price.private.by_income_level.0-30000'] || 0,
                    "$30,001-$48,000": result['latest.cost.net_price.private.by_income_level.30001-48000'] || 0,
                    "$48,001-$75,000": result['latest.cost.net_price.private.by_income_level.48001-75000'] || 0,
                    "$75,001-$110,000": result['latest.cost.net_price.private.by_income_level.75001-110000'] || 0,
                    "$110,001+": result['latest.cost.net_price.private.by_income_level.110001-plus'] || 0
                };
            } else { // Other (Program Year or Other Academic Calendar)
                incomeCosts = {
                    "0-$30,000": result['latest.cost.net_price.program_reporter.by_income_level.0-30000'] || 0,
                    "$30,001-$48,000": result['latest.cost.net_price.program_reporter.by_income_level.30001-48000'] || 0,
                    "$48,001-$75,000": result['latest.cost.net_price.program_reporter.by_income_level.48001-75000'] || 0,
                    "$75,001-$110,000": result['latest.cost.net_price.program_reporter.by_income_level.75001-110000'] || 0,
                    "$110,001+": result['latest.cost.net_price.program_reporter.by_income_level.110001-plus'] || 0
                };
            }

            // Graduation and Retention
            const retentionRate = result['latest.student.retention_rate_suppressed.four_year.full_time_pooled']
                ? `${(result['latest.student.retention_rate_suppressed.four_year.full_time_pooled'] * 100).toFixed(1)}%`
                : 'N/A';
            const withdrawalRate = result['latest.completion.outcome_percentage_suppressed.full_time.first_time.8yr.unknown_pooled']
                ? `${(result['latest.completion.outcome_percentage_suppressed.full_time.first_time.8yr.unknown_pooled'] * 100).toFixed(1)}%`
                : 'N/A';
            const transferRate = result['latest.completion.outcome_percentage_suppressed.full_time.first_time.8yr.transfer_pooled']
                ? `${(result['latest.completion.outcome_percentage_suppressed.full_time.first_time.8yr.transfer_pooled'] * 100).toFixed(1)}%`
                : 'N/A';

            // Financial Aid and Debt
            const pellGrantRate = result['latest.aid.dcs_pell_grant_rate_pooled']
                ? `${(result['latest.aid.dcs_pell_grant_rate_pooled'] * 100).toFixed(1)}%`
                : 'N/A';
            const medianDebt = result['latest.aid.median_debt_suppressed.completers.overall']
                ? `$${Number(result['latest.aid.median_debt_suppressed.completers.overall']).toLocaleString()}`
                : 'N/A';
            const federalLoans = result['latest.aid.dcs_federal_loan_rate_pooled']
                ? `${(result['latest.aid.dcs_federal_loan_rate_pooled'] * 100).toFixed(1)}%`
                : 'N/A';

            // Campus Diversity
            const partTimeShare = result['latest.student.part_time_share'] 
                ? `${Math.round(result['latest.student.part_time_share'] * 100)}%` 
                : 'N/A';
            const fullTimeShare = result['latest.student.part_time_share'] 
                ? `${Math.round((1 - result['latest.student.part_time_share']) * 100)}%` 
                : 'N/A';
            const studentFacultyRatio = result['latest.student.demographics.student_faculty_ratio']
                ? `${Math.round(result['latest.student.demographics.student_faculty_ratio'])}:1`
                : 'N/A';
            const demographics = {
                "American Indian/Alaska Native": result['latest.student.demographics.race_ethnicity.aian'] 
                    ? `${(result['latest.student.demographics.race_ethnicity.aian'] * 100).toFixed(1)}%` 
                    : 'N/A',
                "Asian": result['latest.student.demographics.race_ethnicity.asian'] 
                    ? `${(result['latest.student.demographics.race_ethnicity.asian'] * 100).toFixed(1)}%` 
                    : 'N/A',
                "Black": result['latest.student.demographics.race_ethnicity.black'] 
                    ? `${(result['latest.student.demographics.race_ethnicity.black'] * 100).toFixed(1)}%` 
                    : 'N/A',
                "Hispanic": result['latest.student.demographics.race_ethnicity.hispanic'] 
                    ? `${(result['latest.student.demographics.race_ethnicity.hispanic'] * 100).toFixed(1)}%` 
                    : 'N/A',
                "Native Hawaiian/Pacific Islander": result['latest.student.demographics.race_ethnicity.nhpi'] 
                    ? `${(result['latest.student.demographics.race_ethnicity.nhpi'] * 100).toFixed(1)}%` 
                    : 'N/A',
                "Non-Resident Alien": result['latest.student.demographics.race_ethnicity.non_resident_alien'] 
                    ? `${(result['latest.student.demographics.race_ethnicity.non_resident_alien'] * 100).toFixed(1)}%` 
                    : 'N/A',
                "Two or More Races": result['latest.student.demographics.race_ethnicity.two_or_more'] 
                    ? `${(result['latest.student.demographics.race_ethnicity.two_or_more'] * 100).toFixed(1)}%` 
                    : 'N/A',
                "Unknown": result['latest.student.demographics.race_ethnicity.unknown'] 
                    ? `${(result['latest.student.demographics.race_ethnicity.unknown'] * 100).toFixed(1)}%` 
                    : 'N/A',
                "White": result['latest.student.demographics.race_ethnicity.white'] 
                    ? `${(result['latest.student.demographics.race_ethnicity.white'] * 100).toFixed(1)}%` 
                    : 'N/A',
            };

            // Test Scores and Acceptance
            const satAverageTotal = result['latest.admissions.sat_scores.average.overall'] 
                ? Math.round(result['latest.admissions.sat_scores.average.overall'] / 10) * 10 
                : 'N/A';
            const satMidpointTotal = (result['latest.admissions.sat_scores.midpoint.critical_reading'] || 0) + 
                                      (result['latest.admissions.sat_scores.midpoint.math'] || 0);
            const satMidpointReadingWriting = result['latest.admissions.sat_scores.midpoint.critical_reading'] || 0;
            const satMidpointMath = result['latest.admissions.sat_scores.midpoint.math'] || 0;
            const sat25thTotal = (result['latest.admissions.sat_scores.25th_percentile.critical_reading'] || 0) + 
                                  (result['latest.admissions.sat_scores.25th_percentile.math'] || 0);
            const sat25thReadingWriting = result['latest.admissions.sat_scores.25th_percentile.critical_reading'] || 0;
            const sat25thMath = result['latest.admissions.sat_scores.25th_percentile.math'] || 0;
            const sat75thTotal = (result['latest.admissions.sat_scores.75th_percentile.critical_reading'] || 0) + 
                                  (result['latest.admissions.sat_scores.75th_percentile.math'] || 0);
            const sat75thReadingWriting = result['latest.admissions.sat_scores.75th_percentile.critical_reading'] || 0;
            const sat75thMath = result['latest.admissions.sat_scores.75th_percentile.math'] || 0;
            const sat50thTotal = (result['latest.admissions.sat_scores.50th_percentile.critical_reading'] || 0) + 
                                  (result['latest.admissions.sat_scores.50th_percentile.math'] || 0);
            const sat50thReadingWriting = result['latest.admissions.sat_scores.50th_percentile.critical_reading'] || 0;
            const sat50thMath = result['latest.admissions.sat_scores.50th_percentile.math'] || 0;

            const actMidpointComposite = result['latest.admissions.act_scores.midpoint.cumulative'] || 'N/A';
            const actMidpointEnglish = result['latest.admissions.act_scores.midpoint.english'] || 'N/A';
            const actMidpointMath = result['latest.admissions.act_scores.midpoint.math'] || 'N/A';
            const act25thComposite = result['latest.admissions.act_scores.25th_percentile.cumulative'] || 'N/A';
            const act25thEnglish = result['latest.admissions.act_scores.25th_percentile.english'] || 'N/A';
            const act25thMath = result['latest.admissions.act_scores.25th_percentile.math'] || 'N/A';
            const act75thComposite = result['latest.admissions.act_scores.75th_percentile.cumulative'] || 'N/A';
            const act75thEnglish = result['latest.admissions.act_scores.75th_percentile.english'] || 'N/A';
            const act75thMath = result['latest.admissions.act_scores.75th_percentile.math'] || 'N/A';
            const act50thComposite = result['latest.admissions.act_scores.50th_percentile.cumulative'] || 'N/A';
            const act50thEnglish = result['latest.admissions.act_scores.50th_percentile.english'] || 'N/A';
            const act50thMath = result['latest.admissions.act_scores.50th_percentile.math'] || 'N/A';
            const acceptanceRate = result['latest.admissions.admission_rate_suppressed.overall']
                ? `${(result['latest.admissions.admission_rate_suppressed.overall'] * 100).toFixed(1)}%`
                : 'N/A';

            // Determining the student size type
            let studentSizeType = "N/A";
            if (typeof studentSize === 'number') {
                if (studentSize < 2000) {
                    studentSizeType = "Small";
                } else if (studentSize < 15000) {
                    studentSizeType = "Medium";
                } else {
                    studentSizeType = "Large";
                }
            }

            // Printing the formatted output

            // Overview
            console.log("\nOverview");
            console.log("------");
            console.log(`University Name: ${universityName}`);
            console.log(`Number of Undergraduate Students: ${studentSize} (${studentSizeType})`);
            console.log(`Official Website: ${schoolUrl}`);
            console.log(`School Type: ${ownership}`);
            console.log(`Location Type: ${locale}`);
            console.log(`City, State: ${city}, ${state}`);
            console.log(`Graduation Rate: ${graduationRate}`);
            console.log(`Average Annual Cost: ${avgAnnualCost}`);
            console.log(`Median Earnings: ${medianEarnings}`);
            console.log();

            // Fields of Study
            console.log("Fields of Study");
            console.log("------");
            console.log(`Top Fields of Study at ${universityName}`);
            console.log(`Field of Study${' '.repeat(50)} Median Earnings${' '.repeat(5)} Graduates`);
            earningCounts.forEach(({ field, earnings, graduates }) => {
                console.log(`${field.padEnd(80)} $${earnings.toLocaleString()} ${graduates}`);
            });
            console.log();

            // Costs
            console.log("Costs");
            console.log("------");
            console.log(`Average Annual Cost: ${avgAnnualCost}`);
            console.log();
            console.log("By Family Income:");
            console.log(`Family Income${' '.repeat(20)} Average Annual Cost`);
            for (const [incomeBracket, cost] of Object.entries(incomeCosts)) {
                console.log(`${incomeBracket.padEnd(30)} $${Number(cost).toLocaleString()}`);
            }
            console.log();

            // Graduation and Retention
            console.log("Graduation and Retention");
            console.log("------");
            console.log(`Graduation Rate: ${graduationRate}`);
            console.log(`Retention Rate: ${retentionRate}`);
            console.log(`Withdrawal Rate: ${withdrawalRate}`);
            console.log(`Transfer Rate: ${transferRate}`);
            console.log();

            // Financial Aid and Debt
            console.log("Financial Aid and Debt");
            console.log("------");
            console.log(`Federal Pell Grant Recipients: ${pellGrantRate}`);
            console.log(`Median Total Debt After Graduation: ${medianDebt}`);
            console.log(`Students Receiving Federal Loans: ${federalLoans}`);
            console.log();

            // Typical Earnings
            console.log("Typical Earnings");
            console.log("------");
            console.log(`Median Earnings: ${medianEarnings}`);
            console.log();

            // Campus Diversity
            console.log("Campus Diversity");
            console.log("------");
            console.log(`Student Size Type: ${studentSizeType}`);
            console.log(`Student Size: ${studentSize}`);
            console.log(`Full Time Students: ${fullTimeShare}`);
            console.log(`Part Time Students: ${partTimeShare}`);
            console.log(`Student to Faculty Ratio: ${studentFacultyRatio}`);
            for (const [key, value] of Object.entries(demographics)) {
                console.log(`${key}: ${value}`);
            }
            console.log();

            // Test Scores and Acceptance
            console.log("Test Scores and Acceptance");
            console.log("------");
            console.log("SAT");
            console.log(`SAT Average: ${satAverageTotal}`);
            console.log();
            console.log(`SAT Score Midpoint: ${satMidpointTotal}`);
            console.log(`SAT Reading and Writing Midpoint: ${satMidpointReadingWriting}`);
            console.log(`SAT Math Midpoint: ${satMidpointMath}`);
            console.log();
            console.log(`SAT Score 25th Percentile: ${sat25thTotal}`);
            console.log(`SAT Reading and Writing 25th Percentile: ${sat25thReadingWriting}`);
            console.log(`SAT Math 25th Percentile: ${sat25thMath}`);
            console.log();
            console.log(`SAT Score 50th Percentile: ${sat50thTotal}`);
            console.log(`SAT Reading and Writing 50th Percentile: ${sat50thReadingWriting}`);
            console.log(`SAT Math 50th Percentile: ${sat50thMath}`);
            console.log();
            console.log(`SAT Score 75th Percentile: ${sat75thTotal}`);
            console.log(`SAT Reading and Writing 75th Percentile: ${sat75thReadingWriting}`);
            console.log(`SAT Math 75th Percentile: ${sat75thMath}`);
            console.log();
            console.log("ACT");
            console.log(`ACT Composite Midpoint: ${actMidpointComposite}`);
            console.log(`ACT English Midpoint: ${actMidpointEnglish}`);
            console.log(`ACT Math Midpoint: ${actMidpointMath}`);
            console.log();
            console.log(`ACT Composite 25th Percentile: ${act25thComposite}`);
            console.log(`ACT English 25th Percentile: ${act25thEnglish}`);
            console.log(`ACT Math 25th Percentile: ${act25thMath}`);
            console.log();
            console.log(`ACT Composite 50th Percentile: ${act50thComposite}`);
            console.log(`ACT English 50th Percentile: ${act50thEnglish}`);
            console.log(`ACT Math 50th Percentile: ${act50thMath}`);
            console.log();
            console.log(`ACT Composite 75th Percentile: ${act75thComposite}`);
            console.log(`ACT English 75th Percentile: ${act75thEnglish}`);
            console.log(`ACT Math 75th Percentile: ${act75thMath}`);
            console.log();
            console.log(`Acceptance Rate: ${acceptanceRate}`);
            console.log();

        } else {
            console.log(`Error: Received status code ${response.status}`);
        }

    } catch (error) {
        if (error.response) {
            console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
            console.error(error.response.data);
        } else {
            console.error(`Error: ${error.message}`);
        }
    }
}

// Execute the function
fetchCollegeData();
