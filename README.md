# CampusIQ

CampusIQ is a full-stack academic analytics platform designed for students and administrators. The system automatically collects university result data, stores it in MongoDB, and provides detailed dashboards, rankings, analytics, and performance insights.

## Features

### Student Portal

* Secure authentication using JWT
* Student profile dashboard
* Semester-wise result view
* SGPA and CGPA tracking
* Backlog analysis
* Subject-wise performance breakdown
* Academic trend visualization

### Admin Portal

* Global student rankings
* Branch-wise analytics
* Section-wise analytics
* Subject performance analysis
* Failure and backlog analytics
* Student search and filtering
* Top performer identification
* Comparative academic insights

### Scraping Engine

* Automated result collection using Selenium
* Login-based result extraction
* Public result scraping fallback
* Structured parsing of academic records
* Automatic MongoDB storage
* Supports bulk student scraping through Excel uploads

## Tech Stack

### Frontend

* React.js
* React Router
* React Query
* Axios
* Recharts
* React Hot Toast

### Backend

* FastAPI
* Python
* JWT Authentication
* Passlib

### Database

* MongoDB Atlas
* Mongoose-style document modeling with Pydantic schemas

### Automation

* Selenium WebDriver
* ChromeDriver

## Project Structure

```text
backend/
├── auth/
├── config/
├── controllers/
├── database/
├── models/
├── repositories/
├── scraper/
├── services/

frontend/
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   └── styles/
```

## Current Dataset

* Approximately 1000+ student records scraped
* Multiple branches supported
* Multiple sections supported
* Semester-wise academic history stored



## Installation

### Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd frontend/my-app

npm install

npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory.

```env
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

## Future Improvements

* Redis caching for leaderboards and analytics
* Admin-triggered scraping from dashboard
* Scheduled scraping jobs
* Deployment with Docker
* PDF report generation
* Export analytics to Excel
* Real-time performance monitoring

## Author

Saketh L.G

Computer Science and Engineering

SRKR Engineering College
