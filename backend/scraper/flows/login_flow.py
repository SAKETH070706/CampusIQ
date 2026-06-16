from selenium.webdriver.common.by import By
from scraper.utils.safe_wait import safe_wait
from config.settings import settings


def try_login(driver, reg_no):

    driver.get(settings.base_url)

    # Username
    driver.find_element(
        By.ID,
        "ContentPlaceHolder1_txtUsername"
    ).send_keys(reg_no)

    # Password
    driver.find_element(
        By.ID,
        "ContentPlaceHolder1_txtPassword"
    ).send_keys(reg_no)

    # Login button
    driver.find_element(
        By.ID,
        "ContentPlaceHolder1_btnLogin"
    ).click()

    # Wait for page load
    safe_wait(
        driver,
        By.TAG_NAME,
        "body",
        timeout=15
    )

    # Student Performance menu
    performance_link = safe_wait(
        driver,
        By.XPATH,
        "//span[contains(text(),'Student Performance')]",
        timeout=20
    )

    performance_link.click()

    # WAIT FOR DASHBOARD INPUT FIELD
    safe_wait(
        driver,
        By.XPATH,
        "//input[contains(@value,'" + reg_no + "')]",
        timeout=20
    )

    print(f"✅ Login success for {reg_no}")

    return True