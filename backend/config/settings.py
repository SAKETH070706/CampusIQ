import pandas as pd
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    MONGO_URI: str = "mongodb://localhost:27017"
    DB_NAME: str = "srkr_results"

    SECRET_KEY: str = "SUPER_SECRET_KEY"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 120

    base_url: str = "https://www.srkrexams.in/Login.aspx"

    port: int = 5000
    debug: bool = True

    roll_numbers: list[dict] = []  # {"roll_no": ..., "section": ...}

    target_exam_type: str = "regular"
    target_exam_year: int = 2026
    target_exam_semester: str = "IV"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()




def load_students_from_excel(path: str):

    df = pd.read_excel(path)

    # remove empty rows
    df = df.dropna()

    students = []

    for _, row in df.iterrows():

        students.append({
            "roll_no": str(row["HallTicketNo"]).strip(),
            "section": str(row["SECTION"]).strip()
        })

    return students
