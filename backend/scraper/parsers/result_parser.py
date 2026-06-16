from bs4 import BeautifulSoup


def parse_public_result(html, roll_no):

    soup = BeautifulSoup(
        html,
        "html.parser"
    )

    tables = soup.find_all("table")

    summary_table = tables[0]
    subject_table = tables[1]

    summary_rows = summary_table.find_all("tr")[1:]

    summary = {}

    for row in summary_rows:

        cols = row.find_all("td")

        if len(cols) < 5:
            continue

        summary = {
            "semester": cols[0].text.strip(),
            "sgpa": cols[1].text.strip(),
            "cgpa": cols[2].text.strip(),
            "total_credits": cols[3].text.strip(),
            "credits_secured": cols[4].text.strip()
        }

    subject_rows = subject_table.find_all("tr")[1:]

    subjects = []

    current_sem = None

    for row in subject_rows:

        cols = row.find_all("td")

        if len(cols) == 0:
            continue

        first_col = cols[0].text.strip()

        if "SEMESTER-" in first_col.upper():

            current_sem = (
                first_col
                .replace("SEMESTER-", "")
                .strip()
            )

            continue

        if len(cols) < 5:
            continue

        subjects.append({

            "subject_code": cols[0].text.strip(),

            "subject_name": cols[1].text.strip(),

            "credits": cols[2].text.strip(),

            "grade": cols[3].text.strip(),

            "result": cols[4].text.strip()
        })

    return {
        "roll_no": roll_no,
        "data_source": "public_results",
        "semester": summary,
        "subjects": subjects
    }