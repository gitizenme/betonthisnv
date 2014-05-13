/**
 * @author Joe Chavez
 */

exports.moodImages = ["/images/MoodHappyIcon.png", "/images/MoodSadIcon.png", "/images/MoodSleepyIcon.png", "/images/MoodSatisfiedIcon.png", "/images/MoodNoneIcon.png"];
exports.moodImagesSmall = ["/images/MoodHappyIconSmall.png", "/images/MoodSadIconSmall.png", "/images/MoodSleepyIconSmall.png", "/images/MoodSatisfiedIconSmall.png", "/images/MoodNoneIconSmall.png"];

exports.fatigueImages = ["/images/MoodHappyIcon.png", "/images/MoodSleepyIcon.png", "/images/MoodSatisfiedIcon.png"];
exports.fatigueImagesSmall = ["/images/MoodHappyIconSmall.png", "/images/MoodSleepyIconSmall.png", "/images/MoodSatisfiedIconSmall.png"];

exports.SECTION_DIARY = _SECTION_DIARY = 0;
exports.SECTION_DIARY_COMMENT = _SECTION_DIARY_COMMENT = 0;
exports.SECTION_DIARY_MOOD = _SECTION_DIARY_MOOD = 1;

exports.SECTION_ALERTS = _SECTION_ALERTS = 1;
exports.SECTION_ALERTS_DR_APPT = _SECTION_ALERTS_DR_APPT = 0;
exports.SECTION_ALERTS_MEDICATION = _SECTION_ALERTS_MEDICATION = 1;
exports.SECTION_ALERTS_ALERT = _SECTION_ALERTS_ALERT = 2;

exports.SECTION_HEALTH = _SECTION_HEALTH = 2;
exports.SECTION_HEALTH_TCELL = _SECTION_HEALTH_TCELL = 0;
exports.SECTION_HEALTH_WEIGHT = _SECTION_HEALTH_WEIGHT = 1;
exports.SECTION_HEALTH_SLEEP = _SECTION_HEALTH_SLEEP = 2;
exports.SECTION_HEALTH_FATIGUE = _SECTION_HEALTH_FATIGUE = 3;
exports.SECTION_HEALTH_BLOOD_PRESSURE = _SECTION_HEALTH_BLOOD_PRESSURE = 4;
exports.SECTION_HEALTH_MEASUREMENTS = _SECTION_HEALTH_MEASUREMENTS = 5;

exports.SECTION_ACTIVITY = _SECTION_ACTIVITY = 3;
exports.SECTION_ACTIVITY_HAD_SEX = _SECTION_ACTIVITY_HAD_SEX = 0;
exports.SECTION_ACTIVITY_ALCOHOL_TOBACCO = _SECTION_ACTIVITY_ALCOHOL_TOBACCO = 1;
exports.SECTION_ACTIVITY_OTHER = _SECTION_ACTIVITY_OTHER = 2;

exports.activityTypes = {
	0 : {
		0 : {
			type: "Comment",
			image : "/images/CommentIcon.png",
			title: "COMMENT",
			controllerName : "dayComment"
		},
		1 : {
			type: "Mood",
			image : "/images/MoodNoneIcon.png",
			title: "MOOD",
			controllerName : "Mood"
		}
	},
	1 : {
		0 : {
			type: "Dr. Appointment",
			image : "/images/DrAppointmentIcon.png",
			title: "DR APPPOINTMENT",
			controllerName : "DrAppointment"
		},
		1 : {
			type: "Medication Reminder",
			image : "/images/MedicationIcon.png",
			title: "MEDICATION",
			controllerName : "Medication"
		},
		2 : {
			type: "Alarm",
			image : "/images/AlarmIcon.png",
			title: "ALARM",
			controllerName : "Alarm"
		}
	},
	2 : {
		0 : {
			type: "Viral Load and CD4",
			image : "/images/TCellIcon.png",
			title: "Viral Load and CD4",
			controllerName : "TCell"
		},
		1 : {
			type: "Weight",
			image : "/images/WeightIcon.png",
			title: "WEIGHT",
			controllerName : "Weight"
		},
		2 : {
			type: "Sleep (hours)",
			image : "/images/SleepIcon.png",
			title: "SLEEP",
			controllerName : "Sleep"
		},
		3 : {
			type: "Fatigue",
			image : "/images/FatigueIcon.png",
			title: "FATIGUE",
			controllerName : "Fatigue"
		},
		4 : {
			type: "Blood Pressure",
			image : "/images/BloodPressureIcon.png",
			title: "BLOOD PRESSURE",
			controllerName : "BloodPressure"
		},
		5 : {
			type: "Body Measurements",
			image : "/images/BodyMeasurementIcon.png",
			title: "MEASUREMENTS",
			controllerName : "BodyMeasurements"
		}
	},
	3 : {
		0 : {
			type: "Sexual Activity",
			image : "/images/SexIcon.png",
			title: "HAD SEX",
			controllerName : "HadSex"
		},
		1 : {
			type: "Alcohol/Tobacco Use Activity",
			image : "/images/AlcoholTobaccoIcon.png",
			title: "ALCOHOL/TOBACCO",
			controllerName : "AlcoholTobacco"
		},
		2 : {
			type: "Other Substances Activity",
			image : "/images/OtherSubstanceIcon.png",
			title: "OTHER USE",
			controllerName : "OtherSubstances"
		}
	},
};
