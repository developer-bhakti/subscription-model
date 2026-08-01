import getWorkingDays from "./getWorkingDays";

const DAYS_PER_MONTH = 25; // 1 month of teaching
const FORMATIVE_ASSESSMENT_DAYS = 3;
const MID_TERM_EXAM_DAYS = 7;
const TERM_END_EXAM_DAYS = 10; // includes PTM

// A school year is split into 2 terms of ~6 months each.
// Term 1: 4 months syllabus -> Formative Assessment - I -> Summative Assessment - I (Mid Term Exam)
// Term 2: 4 months syllabus -> Formative Assessment - II -> Summative Assessment - II (Term End Exam)
const TERM_CONFIG = {
  term1: {
    formativeLabel: "📝 Formative Assessment - I",
    summativeLabel: "🎯 Summative Assessment - I (Mid Term Exam)",
    summativeDays: MID_TERM_EXAM_DAYS,
  },
  term2: {
    formativeLabel: "📝 Formative Assessment - II",
    summativeLabel: "🏆 Summative Assessment - II (Term End Exam + PTM)",
    summativeDays: TERM_END_EXAM_DAYS,
  },
};

const generateSyllabusAndEvaluations = (
  startDate,
  endDate,
  vacations,
  termType = "term1",
) => {
  let syllabus = [];
  let workingDays = getWorkingDays(startDate, endDate, vacations);
  const config = TERM_CONFIG[termType] ?? TERM_CONFIG.term1;

  const totalDaysRequired =
    DAYS_PER_MONTH * 4 + FORMATIVE_ASSESSMENT_DAYS + config.summativeDays;

  if (workingDays.length < totalDaysRequired) {
    alert(
      `Insufficient days! You need at least ${totalDaysRequired} working days for this term (4 months + Formative + Summative assessments).`,
    );
    return [];
  }

  let monthCounter = 1;

  const takeSyllabus = (label, days) => {
    const block = workingDays.splice(0, days);
    return {
      month: label,
      syllabusStart: block[0],
      syllabusEnd: block[block.length - 1],
      evaluationStart: "-",
      evaluationEnd: "-",
    };
  };

  const takeAssessment = (label, days) => {
    const block = workingDays.splice(0, days);
    return {
      month: label,
      syllabusStart: block[0],
      syllabusEnd: block[block.length - 1],
      evaluationStart: block[0],
      evaluationEnd: block[block.length - 1],
    };
  };

  const takeMonths = (count) => {
    for (let i = 0; i < count; i++) {
      syllabus.push(
        takeSyllabus(`📚 Month ${monthCounter} Syllabus`, DAYS_PER_MONTH),
      );
      monthCounter++;
    }
  };

  // Month 1-2 -> Formative Assessment
  takeMonths(2);
  syllabus.push(takeAssessment(config.formativeLabel, FORMATIVE_ASSESSMENT_DAYS));

  // Month 3-4 -> Summative Assessment (Mid Term for Term 1, Term End for Term 2)
  takeMonths(2);
  syllabus.push(takeAssessment(config.summativeLabel, config.summativeDays));

  // Vacations, wherever the user placed them chronologically
  vacations.forEach((vac) => {
    syllabus.push({
      month: `🌴 Vacation: ${vac.name}`,
      syllabusStart: vac.start,
      syllabusEnd: vac.end,
      evaluationStart: "-",
      evaluationEnd: "-",
    });
  });

  // Always display everything in real chronological (date-wise) order,
  // regardless of the order vacations/terms were entered in.
  syllabus.sort((a, b) => new Date(a.syllabusStart) - new Date(b.syllabusStart));

  return syllabus;
};

export default generateSyllabusAndEvaluations;
