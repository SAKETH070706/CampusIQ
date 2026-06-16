from selenium.webdriver.common.by import By

from scraper.utils.safe_wait import safe_wait
from scraper.utils.anchor_matcher import match_anchor

from config.settings import settings


def public_results_flow(driver, reg_no, target_exam):

    try:

        driver.get(settings.base_url)

        safe_wait(
            driver,
            By.ID,
            "ContentPlaceHolder1_lnkResults"
        )

        driver.find_element(
            By.ID,
            "ContentPlaceHolder1_lnkResults"
        ).click()

        anchors = driver.find_elements(
            By.XPATH,
            "//a[contains(@id,'Linkbtn2')]"
        )

        chosen_anchor = next(
            (
                a for a in anchors
                if match_anchor(
                    a.text.strip(),
                    target_exam
                )
            ),
            None
        )
  
        if not chosen_anchor:
            print("❌ No matching result anchor found")
            return None

        chosen_anchor.click()

        safe_wait(
            driver,
            By.ID,
            "ContentPlaceHolder1_txtRegNo"
        )

        reg_input = driver.find_element(
            By.ID,
            "ContentPlaceHolder1_txtRegNo"
        )

        reg_input.clear()

        reg_input.send_keys(reg_no)

        driver.find_element(
            By.ID,
            "ContentPlaceHolder1_btnGetResult"
        ).click()

        safe_wait(
            driver,
            By.XPATH,
            "//table"
        )

        print(f"✅ Public result fetched for {reg_no}")

        return driver.page_source

    except Exception as e:
        print(f"❌ Public flow failed: {e}")
        return None