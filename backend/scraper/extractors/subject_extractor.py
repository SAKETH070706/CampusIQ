from selenium.webdriver.common.by import By


def extract_subjects(driver):

    table = driver.find_elements(
        By.TAG_NAME,
        "table"
    )[1]

    rows = table.find_elements(
        By.TAG_NAME,
        "tr"
    )

    semester_subjects = {}

    current_semester = None

    for row in rows:

        cols = row.find_elements(By.TAG_NAME, "td")

        if len(cols) == 0:
            continue

        row_text = row.text.strip()

        # Detect semester heading row
        if "SEMESTER-" in row_text:

            current_semester = (
                row_text
                .replace("SEMESTER-", "")
                .strip()
            )

            semester_subjects[current_semester] = []

            continue

        # Actual subject rows
        if len(cols) >= 6 and current_semester:

           if len(cols) >= 6 and current_semester:
              subject_data = {
                 "subject_code": cols[0].text.strip(),
                 "subject_name": cols[1].text.strip(),
                 "credits": cols[2].find_element(By.TAG_NAME, "input").get_attribute("value"),
                 "grade": cols[3].find_element(By.TAG_NAME, "input").get_attribute("value"),
                 "exam_month": cols[4].find_element(By.TAG_NAME, "input").get_attribute("value"),
                 "result": cols[5].find_element(By.TAG_NAME, "input").get_attribute("value"),
               }

        
        semester_subjects[current_semester].append(
                subject_data
            )

    return semester_subjects