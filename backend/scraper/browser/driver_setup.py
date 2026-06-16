from selenium import webdriver
from selenium.webdriver.chrome.options import Options


def get_driver(headless: bool = True):

    options = Options()

    if headless:
        options.add_argument("--headless=new")
        options.add_argument("--disable-gpu")

    options.add_argument("--window-size=1920,1080")

    # Stability options
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-popup-blocking")
    options.add_argument("--disable-notifications")

    # Reduce memory usage
    options.add_argument("--memory-pressure-off")
    options.add_argument("--disable-background-networking")
    options.add_argument("--disable-background-timer-throttling")

    driver = webdriver.Chrome(options=options)

    driver.set_page_load_timeout(30)

    return driver