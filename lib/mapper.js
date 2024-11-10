const CollegeDataMapper = (data) => {
  // Mapping of ownership and locale values
  const ownershipMap = {
    1: 'Public',
    2: 'Private Nonprofit',
    3: 'Private For-Profit'
  }

  const localeMap = {
    11: 'City',
    12: 'City',
    13: 'City',
    21: 'Suburban',
    22: 'Suburban',
    23: 'Suburban',
    31: 'Town',
    32: 'Town',
    33: 'Town',
    41: 'Rural',
    42: 'Rural',
    43: 'Rural'
  }

  const programs = data['latest.programs.cip_4_digit'] || []

  // Extracting and formatting the data

  // Overview
  const id = data['id'] || 'N/A'
  const universityName = data['school.name'] || 'N/A'
  const studentSize = data['latest.student.size'] || 'N/A'
  const schoolUrl = data['school.school_url'] || 'N/A'
  const ownership = ownershipMap[data['school.ownership']] || 'N/A'
  const locale = localeMap[data['school.locale']] || 'N/A'
  const city = data['school.city'] || 'N/A'
  const state = data['school.state'] || 'N/A'
  const graduationRate = data[
    'latest.completion.outcome_percentage_suppressed.all_students.8yr.award_pooled'
  ]
    ? `${(
        data[
          'latest.completion.outcome_percentage_suppressed.all_students.8yr.award_pooled'
        ] * 100
      ).toFixed(1)}%`
    : 'N/A'
  const avgAnnualCost = data['latest.cost.avg_net_price.overall']
    ? `$${Number(data['latest.cost.avg_net_price.overall']).toLocaleString()}`
    : 'N/A'
  const medianEarnings = data['latest.earnings.10_yrs_after_entry.median']
    ? `$${Number(
        data['latest.earnings.10_yrs_after_entry.median']
      ).toLocaleString()}`
    : 'N/A'

  // Field of Study
  const earningCounts = programs
    .filter(
      program =>
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
    .slice(0, 10)

  // Costs
  const institutionType = data['school.ownership']
  let incomeCosts = {}

  if (institutionType === 1) {
    // Public
    incomeCosts = {
      '0-$30,000':
        data['latest.cost.net_price.public.by_income_level.0-30000'] || 0,
      '$30,001-$48,000':
        data['latest.cost.net_price.public.by_income_level.30001-48000'] || 0,
      '$48,001-$75,000':
        data['latest.cost.net_price.public.by_income_level.48001-75000'] || 0,
      '$75,001-$110,000':
        data['latest.cost.net_price.public.by_income_level.75001-110000'] || 0,
      '$110,001+':
        data['latest.cost.net_price.public.by_income_level.110001-plus'] || 0
    }
  } else if (institutionType === 2 || institutionType === 3) {
    // Private (Nonprofit or For-Profit)
    incomeCosts = {
      '0-$30,000':
        data['latest.cost.net_price.private.by_income_level.0-30000'] || 0,
      '$30,001-$48,000':
        data['latest.cost.net_price.private.by_income_level.30001-48000'] || 0,
      '$48,001-$75,000':
        data['latest.cost.net_price.private.by_income_level.48001-75000'] || 0,
      '$75,001-$110,000':
        data['latest.cost.net_price.private.by_income_level.75001-110000'] || 0,
      '$110,001+':
        data['latest.cost.net_price.private.by_income_level.110001-plus'] || 0
    }
  } else {
    // Other (Program Year or Other Academic Calendar)
    incomeCosts = {
      '0-$30,000':
        data[
          'latest.cost.net_price.program_reporter.by_income_level.0-30000'
        ] || 0,
      '$30,001-$48,000':
        data[
          'latest.cost.net_price.program_reporter.by_income_level.30001-48000'
        ] || 0,
      '$48,001-$75,000':
        data[
          'latest.cost.net_price.program_reporter.by_income_level.48001-75000'
        ] || 0,
      '$75,001-$110,000':
        data[
          'latest.cost.net_price.program_reporter.by_income_level.75001-110000'
        ] || 0,
      '$110,001+':
        data[
          'latest.cost.net_price.program_reporter.by_income_level.110001-plus'
        ] || 0
    }
  }

  // Graduation and Retention
  const retentionRate = data[
    'latest.student.retention_rate_suppressed.four_year.full_time_pooled'
  ]
    ? `${(
        data[
          'latest.student.retention_rate_suppressed.four_year.full_time_pooled'
        ] * 100
      ).toFixed(1)}%`
    : 'N/A'
  const withdrawalRate = data[
    'latest.completion.outcome_percentage_suppressed.full_time.first_time.8yr.unknown_pooled'
  ]
    ? `${(
        data[
          'latest.completion.outcome_percentage_suppressed.full_time.first_time.8yr.unknown_pooled'
        ] * 100
      ).toFixed(1)}%`
    : 'N/A'
  const transferRate = data[
    'latest.completion.outcome_percentage_suppressed.full_time.first_time.8yr.transfer_pooled'
  ]
    ? `${(
        data[
          'latest.completion.outcome_percentage_suppressed.full_time.first_time.8yr.transfer_pooled'
        ] * 100
      ).toFixed(1)}%`
    : 'N/A'

  // Financial Aid and Debt
  const pellGrantRate = data['latest.aid.dcs_pell_grant_rate_pooled']
    ? `${(data['latest.aid.dcs_pell_grant_rate_pooled'] * 100).toFixed(1)}%`
    : 'N/A'
  const medianDebt = data[
    'latest.aid.median_debt_suppressed.completers.overall'
  ]
    ? `$${Number(
        data['latest.aid.median_debt_suppressed.completers.overall']
      ).toLocaleString()}`
    : 'N/A'
  const federalLoans = data['latest.aid.dcs_federal_loan_rate_pooled']
    ? `${(data['latest.aid.dcs_federal_loan_rate_pooled'] * 100).toFixed(1)}%`
    : 'N/A'

  // Campus Diversity
  const partTimeShare = data['latest.student.part_time_share']
    ? `${Math.round(data['latest.student.part_time_share'] * 100)}%`
    : 'N/A'
  const fullTimeShare = data['latest.student.part_time_share']
    ? `${Math.round((1 - data['latest.student.part_time_share']) * 100)}%`
    : 'N/A'
  const studentFacultyRatio = data[
    'latest.student.demographics.student_faculty_ratio'
  ]
    ? `${Math.round(
        data['latest.student.demographics.student_faculty_ratio']
      )}:1`
    : 'N/A'
  const demographics = {
    'American Indian/Alaska Native': data[
      'latest.student.demographics.race_ethnicity.aian'
    ]
      ? `${(
          data['latest.student.demographics.race_ethnicity.aian'] * 100
        ).toFixed(1)}%`
      : 'N/A',
    Asian: data['latest.student.demographics.race_ethnicity.asian']
      ? `${(
          data['latest.student.demographics.race_ethnicity.asian'] * 100
        ).toFixed(1)}%`
      : 'N/A',
    Black: data['latest.student.demographics.race_ethnicity.black']
      ? `${(
          data['latest.student.demographics.race_ethnicity.black'] * 100
        ).toFixed(1)}%`
      : 'N/A',
    Hispanic: data['latest.student.demographics.race_ethnicity.hispanic']
      ? `${(
          data['latest.student.demographics.race_ethnicity.hispanic'] * 100
        ).toFixed(1)}%`
      : 'N/A',
    'Native Hawaiian/Pacific Islander': data[
      'latest.student.demographics.race_ethnicity.nhpi'
    ]
      ? `${(
          data['latest.student.demographics.race_ethnicity.nhpi'] * 100
        ).toFixed(1)}%`
      : 'N/A',
    'Non-Resident Alien': data[
      'latest.student.demographics.race_ethnicity.non_resident_alien'
    ]
      ? `${(
          data[
            'latest.student.demographics.race_ethnicity.non_resident_alien'
          ] * 100
        ).toFixed(1)}%`
      : 'N/A',
    'Two or More Races': data[
      'latest.student.demographics.race_ethnicity.two_or_more'
    ]
      ? `${(
          data['latest.student.demographics.race_ethnicity.two_or_more'] * 100
        ).toFixed(1)}%`
      : 'N/A',
    Unknown: data['latest.student.demographics.race_ethnicity.unknown']
      ? `${(
          data['latest.student.demographics.race_ethnicity.unknown'] * 100
        ).toFixed(1)}%`
      : 'N/A',
    White: data['latest.student.demographics.race_ethnicity.white']
      ? `${(
          data['latest.student.demographics.race_ethnicity.white'] * 100
        ).toFixed(1)}%`
      : 'N/A'
  }

  // Test Scores and Acceptance
  const satAverageTotal = data['latest.admissions.sat_scores.average.overall']
    ? Math.round(data['latest.admissions.sat_scores.average.overall'] / 10) * 10
    : 'N/A'
  const satMidpointTotal =
    (data['latest.admissions.sat_scores.midpoint.critical_reading'] || 0) +
    (data['latest.admissions.sat_scores.midpoint.math'] || 0)
  const satMidpointReadingWriting =
    data['latest.admissions.sat_scores.midpoint.critical_reading'] || 0
  const satMidpointMath =
    data['latest.admissions.sat_scores.midpoint.math'] || 0
  const sat25thTotal =
    (data['latest.admissions.sat_scores.25th_percentile.critical_reading'] ||
      0) + (data['latest.admissions.sat_scores.25th_percentile.math'] || 0)
  const sat25thReadingWriting =
    data['latest.admissions.sat_scores.25th_percentile.critical_reading'] || 0
  const sat25thMath =
    data['latest.admissions.sat_scores.25th_percentile.math'] || 0
  const sat75thTotal =
    (data['latest.admissions.sat_scores.75th_percentile.critical_reading'] ||
      0) + (data['latest.admissions.sat_scores.75th_percentile.math'] || 0)
  const sat75thReadingWriting =
    data['latest.admissions.sat_scores.75th_percentile.critical_reading'] || 0
  const sat75thMath =
    data['latest.admissions.sat_scores.75th_percentile.math'] || 0
  const sat50thTotal =
    (data['latest.admissions.sat_scores.50th_percentile.critical_reading'] ||
      0) + (data['latest.admissions.sat_scores.50th_percentile.math'] || 0)
  const sat50thReadingWriting =
    data['latest.admissions.sat_scores.50th_percentile.critical_reading'] || 0
  const sat50thMath =
    data['latest.admissions.sat_scores.50th_percentile.math'] || 0

  const actMidpointComposite =
    data['latest.admissions.act_scores.midpoint.cumulative'] || 'N/A'
  const actMidpointEnglish =
    data['latest.admissions.act_scores.midpoint.english'] || 'N/A'
  const actMidpointMath =
    data['latest.admissions.act_scores.midpoint.math'] || 'N/A'
  const act25thComposite =
    data['latest.admissions.act_scores.25th_percentile.cumulative'] || 'N/A'
  const act25thEnglish =
    data['latest.admissions.act_scores.25th_percentile.english'] || 'N/A'
  const act25thMath =
    data['latest.admissions.act_scores.25th_percentile.math'] || 'N/A'
  const act75thComposite =
    data['latest.admissions.act_scores.75th_percentile.cumulative'] || 'N/A'
  const act75thEnglish =
    data['latest.admissions.act_scores.75th_percentile.english'] || 'N/A'
  const act75thMath =
    data['latest.admissions.act_scores.75th_percentile.math'] || 'N/A'
  const act50thComposite =
    data['latest.admissions.act_scores.50th_percentile.cumulative'] || 'N/A'
  const act50thEnglish =
    data['latest.admissions.act_scores.50th_percentile.english'] || 'N/A'
  const act50thMath =
    data['latest.admissions.act_scores.50th_percentile.math'] || 'N/A'
  const acceptanceRate = data[
    'latest.admissions.admission_rate_suppressed.overall'
  ]
    ? `${(
        data['latest.admissions.admission_rate_suppressed.overall'] * 100
      ).toFixed(1)}%`
    : 'N/A'

  // Determining the student size type
  let studentSizeType = 'N/A'
  if (typeof studentSize === 'number') {
    if (studentSize < 2000) {
      studentSizeType = 'Small'
    } else if (studentSize < 15000) {
      studentSizeType = 'Medium'
    } else {
      studentSizeType = 'Large'
    }
  }
  const collegeData = {
    overview: {
      id: id,
      university_name: universityName,
      number_of_undergraduate_students: `${studentSize} (${studentSizeType})`,
      official_website: schoolUrl,
      school_type: ownership,
      location_type: locale,
      city_state: `${city}, ${state}`,
      graduation_rate: graduationRate,
      average_annual_cost: avgAnnualCost,
      median_earnings: medianEarnings
    },
    fields_of_study: {
      top_fields: earningCounts.map(({ field, earnings, graduates }) => ({
        field_of_study: field,
        median_earnings: `$${earnings.toLocaleString()}`,
        graduates: `${graduates}`
      }))
    },
    costs: {
      average_annual_cost: avgAnnualCost,
      by_family_income: Object.fromEntries(
        Object.entries(incomeCosts).map(([incomeBracket, cost]) => [
          incomeBracket.toLowerCase().replace(/\s+/g, '_'),
          `$${Number(cost).toLocaleString()}`
        ])
      )
    },
    graduation_and_retention: {
      graduation_rate: graduationRate,
      retention_rate: retentionRate,
      withdrawal_rate: withdrawalRate,
      transfer_rate: transferRate
    },
    financial_aid_and_debt: {
      federal_pell_grant_recipients: pellGrantRate,
      median_total_debt_after_graduation: medianDebt,
      students_receiving_federal_loans: federalLoans
    },
    typical_earnings: {
      median_earnings: medianEarnings
    },
    campus_diversity: {
      student_size_type: studentSizeType,
      student_size: studentSize,
      full_time_students: fullTimeShare,
      part_time_students: partTimeShare,
      student_to_faculty_ratio: studentFacultyRatio,
      demographics: Object.fromEntries(
        Object.entries(demographics).map(([key, value]) => [
          key.toLowerCase().replace(/\s+/g, '_'),
          `${value}`
        ])
      )
    },
    test_scores_and_acceptance: {
      sat: {
        sat_average: satAverageTotal,
        sat_midpoint: satMidpointTotal,
        sat_reading_and_writing_midpoint: satMidpointReadingWriting,
        sat_math_midpoint: satMidpointMath,
        sat_25th_percentile: sat25thTotal,
        sat_reading_and_writing_25th_percentile: sat25thReadingWriting,
        sat_math_25th_percentile: sat25thMath,
        sat_50th_percentile: sat50thTotal,
        sat_reading_and_writing_50th_percentile: sat50thReadingWriting,
        sat_math_50th_percentile: sat50thMath,
        sat_75th_percentile: sat75thTotal,
        sat_reading_and_writing_75th_percentile: sat75thReadingWriting,
        sat_math_75th_percentile: sat75thMath
      },
      act: {
        act_composite_midpoint: actMidpointComposite,
        act_english_midpoint: actMidpointEnglish,
        act_math_midpoint: actMidpointMath,
        act_composite_25th_percentile: act25thComposite,
        act_english_25th_percentile: act25thEnglish,
        act_math_25th_percentile: act25thMath,
        act_composite_50th_percentile: act50thComposite,
        act_english_50th_percentile: act50thEnglish,
        act_math_50th_percentile: act50thMath,
        act_composite_75th_percentile: act75thComposite,
        act_english_75th_percentile: act75thEnglish,
        act_math_75th_percentile: act75thMath
      },
      acceptance_rate: acceptanceRate
    }
  }
  return collegeData
}

export {
    CollegeDataMapper
}