from scraper.browser.driver_setup import get_driver

from scraper.flows.login_flow import try_login
from scraper.flows.public_results_flow import public_results_flow

from scraper.parsers.dashboard_parser import parse_dashboard
from scraper.parsers.result_parser import parse_public_result

from config.settings import settings


def scrape_student(roll_no):

    driver = get_driver()

    try:

        login_success = try_login(
            driver,
            roll_no
        )

        if login_success:

            return parse_dashboard(
                driver,
                roll_no
            )

        print("⚠️ Switching to public flow")

        html = public_results_flow(
            driver,
            roll_no,
            f"{settings.target_exam_semester} "
            f"{settings.target_exam_type} "
            f"{settings.target_exam_year}"
        )

        if html:

            return parse_public_result(
                html,
                roll_no
            )

        return {
            "success": False,
            "roll_no": roll_no,
            "error": "Both flows failed"
        }

    finally:

        driver.quit()