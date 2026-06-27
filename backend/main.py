from fastapi import FastAPI

from config.settings import (
    settings,
    load_students_from_excel
)
from database.mongo import connect_db

from controllers import (
    auth_controller,
    student_controller,
    result_controller,
    analytics_controller,
    
)

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Student Result Analytics API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://campus-iq-sigma.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():

    connect_db()
    

# -------------------------------
# AUTH ROUTES
# -------------------------------

app.include_router(
    auth_controller.router,
    prefix="/auth",
    tags=["Auth"]
)


# -------------------------------
# STUDENT ROUTES
# -------------------------------

app.include_router(
    student_controller.router,
    prefix="/students",
    tags=["Students"]
)


# -------------------------------
# RESULT ROUTES
# -------------------------------

app.include_router(
    result_controller.router,
    prefix="/results",
    tags=["Results"]
)


# -------------------------------
# ANALYTICS ROUTES
# -------------------------------

app.include_router(
    analytics_controller.router,
    prefix="/analytics",
    tags=["Analytics"]
)


# -------------------------------
# SCRAPER ROUTES
# -------------------------------


