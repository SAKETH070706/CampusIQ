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

## Screenshots

### Student Dashboard

<img width="1907" height="947" alt="Screenshot 2026-06-16 153238" src="https://github.com/user-attachments/assets/8953e269-c661-4060-bc9d-1809d817916c" />

### Admin Dashboard

<img width="1886" height="965" alt="Screenshot 2026-06-16 152548" src="https://github.com/user-attachments/assets/decd011d-d160-4939-a811-4fbd677dcf14" />


### Global Rankings
<img width="1891" height="953" alt="Screenshot 2026-06-16 152603" src="https://github.com/user-attachments/assets/ea6e9ebc-535e-4110-9c6b-f69ff1cb9561" />

### Branch Analytics

<img width="1907" height="956" alt="Screenshot 2026-06-16 152641" src="https://github.com/user-attachments/assets/28c99776-6c5c-4135-be78-b41ae5740e30" />


### Section Analytics

<img width="1907" height="941" alt="Screenshot 2026-06-16 152729" src="https://github.com/user-attachments/assets/3808175e-d8cd-4633-b8ab-708a273fe6a2" />

### Subject Analytics
 <img width="1905" height="952" alt="Screenshot 2026-06-16 152845" src="https://github.com/user-attachments/assets/195cfb0a-3226-4f5f-97eb-07921124b64d" />


### Failure Analytics

<img width="1898" height="963" alt="Screenshot 2026-06-16 152902" src="https://github.com/user-attachments/assets/49b55183-828c-4852-8451-b65580d6cb2b" />


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
