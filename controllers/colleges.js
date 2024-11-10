import model from "../models/index.js";
import axios from "axios";
import loggers from "../config/logger.js";
import config from "../config/config.js";
import { CollegeDataMapper } from "../lib/mapper.js";
import {
  getCollegeOneSchema,
  getCollegesSchema,
} from "../validations/colleges.js";

const getCollegesList = async (req, res) => {
  try {
    const { error } = getCollegesSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
    const baseUrl = config?.colleges_api_endpoint;
    const api_key = config?.colleges_api_key;
    const overviewFields = [
      "id",
      "school.name",
      "school.ownership",
      "school.city",
      "school.state",
      "latest.cost.avg_net_price.overall",
    ];
    const { offset, limit, sortBy, sortOrder } = req.body;
    const sortOrderValue = {
      name: `${"school.name"}:${sortOrder || "asc"}`,
      city: `${"school.city"}:${sortOrder || "asc"}`,
      cost: `${"latest.cost.avg_net_price.overall"}:${sortOrder || "asc"}`,
    };
    const params = {
      api_key,
      fields: overviewFields.join(","),
      sort: sortOrderValue[sortBy || "name"],
      page: offset,
      per_page: limit,
    };
    const response = await axios.get(baseUrl, { params });
    const colleges = response.data.results;
    const collegesList = colleges.map((college) => {
      const { overview } = CollegeDataMapper(college);
      const {
        id,
        university_name,
        school_type,
        city_state,
        average_annual_cost,
      } = overview;
      return {
        id,
        university_name,
        school_type,
        city_state,
        average_annual_cost,
      };
    });
    return res.status(200).json({
      success: true,
      message: "Colleges fetched Successfully",
      collegesList,
    });
  } catch (error) {
    console.error("Error in getColleges:", error);

    loggers.error(error.message + " from getColleges function");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCollegeOne = async (req, res) => {
  try {
    const { error } = getCollegeOneSchema.validate(req.params, {
      abortEarly: false,
    });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
    const baseUrl = config?.colleges_api_endpoint;
    const api_key = config?.colleges_api_key;
    // Overview fields
    const overviewFields = [
      "id",
      "school.name",
      "latest.student.size",
      "school.school_url",
      "school.ownership",
      "school.locale",
      "school.city",
      "school.state",
      "latest.completion.outcome_percentage_suppressed.all_students.8yr.award_pooled",
      "latest.cost.avg_net_price.overall",
      "latest.earnings.10_yrs_after_entry.median",
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
      "latest.cost.avg_net_price.public",
      "latest.cost.avg_net_price.private",
      "latest.cost.avg_net_price.program_year",
      "latest.cost.avg_net_price.other_academic_year",
      "latest.cost.net_price.public.by_income_level.0-30000",
      "latest.cost.net_price.public.by_income_level.30001-48000",
      "latest.cost.net_price.public.by_income_level.48001-75000",
      "latest.cost.net_price.public.by_income_level.75001-110000",
      "latest.cost.net_price.public.by_income_level.110001-plus",
      "latest.cost.net_price.private.by_income_level.0-30000",
      "latest.cost.net_price.private.by_income_level.30001-48000",
      "latest.cost.net_price.private.by_income_level.48001-75000",
      "latest.cost.net_price.private.by_income_level.75001-110000",
      "latest.cost.net_price.private.by_income_level.110001-plus",
      "latest.cost.net_price.program_reporter.by_income_level.0-30000",
      "latest.cost.net_price.program_reporter.by_income_level.30001-48000",
      "latest.cost.net_price.program_reporter.by_income_level.48001-75000",
      "latest.cost.net_price.program_reporter.by_income_level.75001-110000",
      "latest.cost.net_price.program_reporter.by_income_level.110001-plus",
      "latest.cost.net_price.other_acad_calendar.by_income_level.0-30000",
      "latest.cost.net_price.other_acad_calendar.by_income_level.30001-48000",
      "latest.cost.net_price.other_acad_calendar.by_income_level.48001-75000",
      "latest.cost.net_price.other_acad_calendar.by_income_level.75001-110000",
      "latest.cost.net_price.other_acad_calendar.by_income_level.110001-plus",

      // Graduation and Retention
      "latest.completion.outcome_percentage_suppressed.all_students.8yr.award_pooled",
      "latest.student.retention_rate_suppressed.four_year.full_time_pooled",
      "latest.completion.outcome_percentage_suppressed.full_time.first_time.8yr.unknown_pooled",
      "latest.completion.outcome_percentage_suppressed.full_time.first_time.8yr.transfer_pooled",

      // Financial Aid and Debt
      "latest.aid.dcs_pell_grant_rate_pooled",
      "latest.aid.median_debt_suppressed.completers.overall",
      "latest.aid.dcs_federal_loan_rate_pooled",

      // Typical Earnings
      "latest.earnings.10_yrs_after_entry.median",

      // Campus Diversity
      "latest.student.size",
      "latest.student.part_time_share",
      "latest.student.demographics.student_faculty_ratio",
      "latest.student.demographics.race_ethnicity.aian",
      "latest.student.demographics.race_ethnicity.asian",
      "latest.student.demographics.race_ethnicity.black",
      "latest.student.demographics.race_ethnicity.hispanic",
      "latest.student.demographics.race_ethnicity.nhpi",
      "latest.student.demographics.race_ethnicity.non_resident_alien",
      "latest.student.demographics.race_ethnicity.two_or_more",
      "latest.student.demographics.race_ethnicity.unknown",
      "latest.student.demographics.race_ethnicity.white",

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
    const fieldsParam = allFields.join(",");
    const params = {
      api_key,
      fields: fieldsParam,
      id: req?.params?.id,
      fields: fieldsParam,
    };
    const response = await axios.get(baseUrl, { params });
    const data = response?.data?.results[0];
    if (data === undefined) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }
    const collegeData = CollegeDataMapper(data);
    const { id, university_name, city_state } = collegeData?.overview;
    await model.VisitedColleges.create(
      {
        user_id: req?.user?.id,
        college_id: id,
        college_name: university_name,
        city_state,
      },
      {
        updateOnDuplicate: ["updated_at"], // Columns to update on conflict
      }
    );
    return res.status(200).json({
      success: true,
      message: "Colleges fetched Successfully",
      collegeData,
    });
  } catch (error) {
    console.error("Error in getColleges:", error);
    loggers.error(error.message + " from getColleges function");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getCollegesList, getCollegeOne };
