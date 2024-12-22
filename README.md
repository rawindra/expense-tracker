# Transactions Management Dashboard

This project is a transactions management system for tracking income and expenses, built with Laravel, Inertia.js, and React.

---

## Setup Instructions

### Use linux/Mac for docker for app to work better

### 1. Clone the Repository
```bash
git clone https://github.com/rawindra/expense-tracker.git
cd expense-tracker
```
### 2. Copy .env.example file to .env

### 3. Start Application using docker
```
docker-compose up -d
```
### 4. Run Migration and Seed Inside docker container
```
docker exec -it record_keeper_app bash
php artisan migrate --seed
```
### 5. Run the App
```
http://localhost:8000/ for app
http://localhost:8080/ for phpmyadmin
```
