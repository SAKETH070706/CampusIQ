from selenium.webdriver.common.by import By


def extract_summary_table(driver):

    rows = driver.find_elements(
        By.XPATH,
        "(//table)[1]//tr[position()>1]"
    )

    semesters = []

    for row in rows:

        cols = row.find_elements(By.TAG_NAME, "td")

        if len(cols) < 5:
            continue

        semesters.append({
            "semester": cols[0].text.strip(),
            "sgpa": cols[1].text.strip(),
            "cgpa": cols[2].text.strip(),
            "total_credits": cols[3].text.strip(),
            "credits_secured": cols[4].text.strip()
        })

    return semesters