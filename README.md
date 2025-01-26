# Description

This is backend for the Church management system, designed to facilitate all Church operations for better and more efficient management made with expressjs and PostgreSQL

**Roles:**
- **Admin:** can add pastors, events, financial-advisors
- **Pastors:** same as admin
- **Financial-advisors:** can add donations
- **Regular members:** can see events and their fellow regular members
## Installation

Clone the repository

```bash
git clone https://github.com/Arsene-MN/church-mis-backend.git
```
Navigate to the folder and install dependencies

```bash
npm install
```
## Usage
**1.** Create a **.env** file and set your environment variables. It should contain:
```bash
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=5000
JWT_SECRET=
BREVO_API_KEY
EMAIL_USER=
```
**2.** Run the development server
```bash
npm run dev
```
**3.** Testing **Endpoints** using Postman 

**Signup**
```bash
POST http://localhost:5000/api/auth/signup
{
  "name": "",
  "email": "",
  "password": "",
  "ministry": ""
}
```
**Login**
```bash
POST http://localhost:5000/api/auth/login
{
"email": "",
"password":""
}
```

**admin-addpastor**
```bash
POST http://localhost:5000/api/members
{
  "name": "",
  "email": "",
  "role": "pastor"
}
```
**admin-add financial advisor**
```bash
POST http://localhost:5000/api/members
{
  "name": "",
  "email": "",
  "role": "financial-advisor"
}
```
**admin-add event**
```bash
POST http://localhost:5000/api/events
{
  "title": "",
  "description": "",
  "date": "2023-12-10T10:00:00Z",
  "created_by": 1
}
```
**financial-advisor add donation**
```bash
POST http://localhost:5000/api/donations
{
  "amount":"" ,
  "date": ""
}
```
**Set password**
```bash
POST http://localhost:5000/api/auth/set-password
{
  "token": "",
  "password": ""
}
```
**Getting, Putting and Deleting are as usual**
```bash
GET/PUT/DELETE http://localhost:5000/api/...
```


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.
