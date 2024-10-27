# Django-React Invoices App

## Overview

This is a full-stack application built with Django as the backend and React as the frontend.

## Technologies Used

- **Backend:** Django, Django REST Framework, PostgreSQL, Python
- **Frontend:** React, Vite, Material-UI
- **Containerization:** Docker, Docker Compose

## Features

- View, create, and manage invoices
- Submit partial or full payments for invoices
- Input validation for invoice amounts and payment submissions

## Installation

### Prerequisites

- Docker
- Docker Compose
- Node.js and npm

### Getting Started

1. **Clone the repository:**
2. cd invoices
2. docker-compose up --build
3. docker-compose exec web python manage.py migrate
4. docker-compose exec web python manage.py loaddata invoice_manager/seed_data.json
5. cd frontend
6. npm install
7. npm run dev

Enjoy the app!

