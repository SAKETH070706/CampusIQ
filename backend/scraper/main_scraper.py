from scraper.scraper_service import scrape_student

from scraper.scraper_save_service import save_scraped_data

from config.settings import (
    settings,
    load_students_from_excel
)

from database.mongo import connect_db


# -----------------------------------
# CONNECT DB
# -----------------------------------

connect_db()


# -----------------------------------
# LOAD EXCEL
# -----------------------------------

settings.roll_numbers = load_students_from_excel(
   r"D:\WEB DEVELOPMENT\Portal\backend\students.xlsx"
)






print(
    f"✅ Loaded {len(settings.roll_numbers)} students"
)


# -----------------------------------
# START SCRAPING
# -----------------------------------

print("🚀 Starting scraping process...")


failed_students = []

for student in settings.roll_numbers:

    roll_no = student["roll_no"]
    section = student["section"]

    try:

        print(f"🔍 Scraping -> {roll_no}")

        scraped_data = scrape_student(roll_no)

        scraped_data["student_info"]["section"] = section

        save_scraped_data(scraped_data)

        print(f"✅ Completed -> {roll_no}")

    except Exception as e:

        failed_students.append(roll_no)

        print(f"❌ Failed -> {roll_no}")
        print(e)

print("\n====================")
print("FAILED STUDENTS")
print("====================")

for roll in failed_students:
    print(roll)