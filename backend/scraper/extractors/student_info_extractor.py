from selenium.webdriver.common.by import By


def extract_student_info(driver):

    inputs = driver.find_elements(
        By.XPATH,
        "//input[contains(@class,'form-control')]"
    )

    return {

        "hallticket_no": inputs[0].get_attribute("value").strip(),

        "student_name": inputs[1].get_attribute("value").strip(),

        "programme": inputs[2].get_attribute("value").strip(),

        "branch_code": inputs[3].get_attribute("value").strip()
    }