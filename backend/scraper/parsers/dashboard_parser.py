from scraper.extractors.student_info_extractor import extract_student_info
from scraper.extractors.summary_extractor import extract_summary_table
from scraper.extractors.subject_extractor import extract_subjects

def normalize_subjects(subjects):

   
  

    latest_subjects = {}

    for subject in subjects:

        code = subject.get("subject_code", "").strip().upper()

        if not code:
          print("INVALID SUBJECT:", subject)
          continue

        

        if code not in latest_subjects:

            latest_subjects[code] = {
                **subject,
                "attempts": 1
            }

        else:

            latest_subjects[code]["attempts"] += 1

            latest_subjects[code]["grade"] = subject["grade"]
            latest_subjects[code]["result"] = subject["result"]
            latest_subjects[code]["exam_month"] = subject["exam_month"]

    

    return list(latest_subjects.values())

def parse_dashboard(driver, roll_no):

    student_info = extract_student_info(driver)

    semesters = extract_summary_table(driver)

    subjects_data = extract_subjects(driver)

    for sem in semesters:

        sem_name = sem["semester"]

        raw_subjects = subjects_data.get(
            sem_name,
            []
        )

        sem["subjects"] = normalize_subjects(
            raw_subjects
        )

    return {
        "roll_no": roll_no,
        "data_source": "login",
        "student_info": student_info,
        "semesters": semesters
    }