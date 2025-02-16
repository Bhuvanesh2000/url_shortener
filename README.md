# URL Shortener (Rails + React)

## Features
Shorten long URLs into unique link
View list of all inputted and shortened URLs
Copy shortened URLs
Validations for input URL

## Tech
Rails
React
Tailwind
PostgreSQL

## Setup
Clone the repository and Navigate to application directory
cd backend
bundle install

(Set below ENV variables for DB setup)
DEV_DB_NAME
DEV_DB_USER
DEV_DB_PASSWORD
DEV_DB_ENDPOINT
DOMAIN - server domain # eg: http://localhost:3001

. .env
rails db:create db:migrate
rails s

cd ../frontend
npm install
npm run dev
