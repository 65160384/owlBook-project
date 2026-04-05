# Architecture Overview
เอกสารฉบับนี้จัดทำขึ้นเพื่อเป็นแนวทางหลักในการทำความเข้าใจสถาปัตยกรรมของโปรเจค OwlBook ช่วยให้นักพัฒนาสามารถนำไปใช้งานและต่อยอดระบบได้อย่างมีประสิทธิภาพตลอดการพัฒนา

## 1. Project Structure
โครงสร้างโฟลเดอร์ถูกจัดแบ่งตามหน้าที่และเลเยอร์ของระบบ (Separation of Concerns) เพื่อให้ง่ายต่อการค้นหาไฟล์และแยกส่วนการทำงานระหว่าง Frontend และ Backend:

```text
project-root/
├── Coding_Standards.md       # มาตรฐานการเขียนโค้ดของทีม (ภารกิจ 7.1)
├── README.md                 # คู่มือแนะนำโปรเจคเบื้องต้น (ภารกิจ 7.1)
├── .env.example              # ตัวอย่างการตั้งค่าสภาพแวดล้อม (ภารกิจ 7.2)
├── setup.sh                  # สคริปต์ติดตั้งระบบอัตโนมัติ (ภารกิจ 7.2)
│
├── backend/                  # ส่วนของ Server-side (ExpressJS)
│   ├── src/
│   │   ├── api/              # API Endpoints & Controllers (จัดการ UC-01 ถึง UC-15)
│   │   ├── client/           # ส่วน Business Logic (Services เช่น ระบบคำนวณเหรียญ)
│   │   ├── models/           # Database Models สำหรับติดต่อ MySQL
│   │   └── utils/            # ฟังก์ชันอำนวยความสะดวก (เช่น bcrypt สำหรับ Email/PW)
│   ├── config/               # ตั้งค่าการเชื่อมต่อ Database (Singleton Pattern)
│   ├── tests/                # Unit Test และ Integration Test ของ Backend
│   └── Dockerfile            # การตั้งค่า Container สำหรับ Deployment
│
├── frontend/                 # ส่วนของ User Interface (Vue.js)
│   ├── src/
│   │   ├── components/       # UI Components (เช่น การ์ดการ์ตูน, ปุ่มหัวใจ UC-13)
│   │   ├── pages/            # หน้าหลัก (เช่น หน้าแรก UC-04, หน้าอ่านตอน UC-08)
│   │   ├── assets/           # ไฟล์ Static เช่น รูปภาพและฟอนต์
│   │   ├── services/         # ตัวกลางเรียกใช้ API จาก Backend (Axios)
│   │   └── store/            # การจัดการ State ข้อมูลผู้ใช้และยอดเหรียญ (Vuex/Pinia)
│   ├── public/               # ไฟล์ที่เข้าถึงได้สาธารณะ
│   └── package.json          # รายการ Dependencies และ Scripts ของ Frontend
│
├── database/                 # การจัดการฐานข้อมูล (ภารกิจ 7.2)
│   ├── schema.sql            # โครงสร้างตาราง (3NF) ตาม ER Diagram
│   ├── seeds.sql             # ข้อมูลเริ่มต้น (Cartoons & Episodes)
│   └── migrations/           # ประวัติการเปลี่ยนแปลงฐานข้อมูล
│
├── docs/                     # แฟ้มเอกสารประกอบโครงการ (ภารกิจ 7.2, 7.3)
│   ├── Sprint_Plans/         # แผนการทำงานแต่ละ Sprint
│   ├── Setup/                # คู่มือติดตั้งเครื่อง (DEVELOPMENT.md)
│   ├── Risk_Register.md      # ทะเบียนความเสี่ยงของโปรเจค
│   └── Code_Review_Checklist.md # แบบฟอร์มการตรวจโค้ดในทีม
│
└── .github/                  # การตั้งค่า CI/CD และ Templates (ภารกิจ 7.1)
```


## 2. High-Level System Diagram
สถาปัตยกรรมของ OwlBook เป็นแบบ 3-Tier Architecture เพื่อความปลอดภัยและรองรับการใช้งานบนมือถือ (UC-16)
- **Presentation Layer (Vue.js)**: จัดการการแสดงผลและการนำทางของผู้ใช้
- **Application Layer (ExpressJS)**: ประมวลผลตรรกะทางธุรกิจและจัดการ 15 API Endpoints
- **Data Layer (MySQL)**: จัดเก็บข้อมูลการ์ตูนและประวัติการทำรายการอย่างเป็นระบบ

## Client-Server Architecture

OwlBook เป็น Web Application ที่ใช้รูปแบบ Client–Server Architecture  
โดยแยกระบบออกเป็น 3 ส่วนหลัก ได้แก่ Client, Server และ Database

### Architecture Diagram

```text
+-------------+        HTTP/API        +------------------+        SQL        +-----------+
|   Client    |  <------------------>  |  Application     |  <------------->  | Database  |
|   (Vue.js)  |                        |  Server          |                   |  MySQL    |
|   Browser   |                        |  Node.js Express |                   |           |
+-------------+                        +------------------+                   +-----------+                       
```
## MVC Architecture

ระบบ OwlBook ใช้แนวคิด Model-View-Controller (MVC)  
เพื่อแยกหน้าที่ของระบบออกเป็นส่วนต่าง ๆ ทำให้โค้ดมีโครงสร้างที่ชัดเจนและดูแลรักษาง่าย
```text
        User
         |
         v
      (View)
     Vue.js UI
         |
         v
     Controller
   Express Routes
         |
         v
        Model
   Database Access
         |
         v
       MySQL                 
```
### Components

**View**
- Vue.js Components
- แสดงผล UI

**Controller**
- Express Routes
- รับ request และควบคุม flow

**Model**
- ติดต่อ MySQL
- Query และจัดการข้อมูล
## Layered Architecture

ระบบ OwlBook ถูกออกแบบด้วย Layered Architecture  
เพื่อแยกความรับผิดชอบของแต่ละส่วนของระบบ
### Architecture Diagram
```text
+-------------------------+
| Presentation Layer      |
| Vue.js Components       |
+-------------------------+
            |
            v
+-------------------------+
| Controller Layer        |
| Express Routes          |
+-------------------------+
            |
            v
+-------------------------+
| Service Layer           |
| Business Logic          |
+-------------------------+
            |
            v
+-------------------------+
| Data Access Layer       |
| Models / Queries        |
+-------------------------+
            |
            v
+-------------------------+
| Database Layer          |
| MySQL                   |
+-------------------------+           
```
### Layers

**Presentation Layer**
- Vue.js
- UI และ interaction

**Controller Layer**
- Express routes
- รับ HTTP request

**Service Layer**
- Business logic
- ประมวลผลข้อมูล

**Data Layer**
- ติดต่อฐานข้อมูล

**Database**
- MySQL

## 3. Core Components
- **Frontend**: พัฒนาด้วย Vue.js เน้นความลื่นไหลในการเลื่อนอ่านการ์ตูน (UC-08).

- **Backend**: ใช้ ExpressJS จัดการระบบสมาชิกที่ใช้ Email และ Password เท่านั้น โดยไม่มีการเก็บ Username เพื่อความรวดเร็วในการสมัครสมาชิก (UC-01).

- **Services**: อยู่ใน backend/src/client/ ทำหน้าที่คำนวณยอดเหรียญและปลดล็อกตอนการ์ตูน (UC-11).

### 3.1. Frontend

- **Name**: OwlBook Web Application

- **Description**: ส่วนติดต่อผู้ใช้หลักที่พัฒนาแบบ Single Page Application (SPA) เพื่อให้ผู้ใช้สามารถค้นหาการ์ตูน อ่านการ์ตูนแบบเลื่อนหน้า จัดการรายการที่ถูกใจ และเติมเหรียญได้ในที่เดียวอย่างรวดเร็ว

- **Technologies**: Vue.js, Vite, Tailwind CSS, Axios

- **Deployment**:  Vercel, Netlify, S3/CloudFront

### 3.2. Backend Services

#### 3.2.1. OwlBook Core API

- **Name**: Management & Logic Service API

- **Description**: บริการหลักที่จัดการตรรกะทางธุรกิจทั้งหมด รวมถึงระบบสมาชิกที่ใช้เฉพาะ Email และ Password (ไม่เก็บ Username), การประมวลผลการปลดล็อกตอนการ์ตูนด้วยเหรียญ (UC-11) และการตรวจสอบสิทธิ์การเข้าถึง

- **Technologies**: Node.js (ExpressJS), JWT (Authentication), bcrypt (Security)

- **Deployment**: AWS EC2 / Railway / Render

#### 3.2.2. Content & Admin Service

- **Name**: Content Management API

- **Description**: ส่วนจัดการข้อมูลสำหรับผู้ดูแลระบบ (Admin) และผู้สร้างเนื้อหา (Content Provider) ในการเพิ่ม แก้ไข หรือลบข้อมูลการ์ตูนและตอนการ์ตูนต่าง ๆ (UC-14, UC-15)

- **Technologies**: ExpressJS

- **Deployment**: รวมอยู่กับหน่วย Core API (Monolithic Framework)

## 4. Data Stores

### 4.1. Primary Relational Database

- **Name**: OwlBook Database
- **Type**: MySQL 8.0
- **Purpose**: จัดเก็บข้อมูลหลักที่มีความสัมพันธ์กันอย่างเป็นระบบ (3NF) เพื่อรักษาความถูกต้องของข้อมูลสมาชิกและการทำธุรกรรม

- **Key Tables**:
    - users: เก็บ Email, Password, และยอด Coin คงเหลือ (ไม่ใช้ username)
    - cartoons & cartoon_episodes: ข้อมูลเรื่องย่อและภาพแต่ละตอน
    - user_cartoon_histories: ประวัติการซื้อตอนการ์ตูนเพื่อให้ผู้ใช้อ่านซ้ำได้
    - user_favourites: รายการการ์ตูนที่ผู้ใช้กดถูกใจไว้ (UC-13)
    - payments: บันทึกข้อมูลการเติมเหรียญสำเร็จ (UC-10, UC-12)

## 5. External Integrations / APIs

- **Service Name**: External Payment System (UC-10)
- **Purpose**: ระบบภายนอกที่ใช้ในการยืนยันยอดเงินจริงและแจ้งเตือนระบบเพื่อเพิ่มเหรียญเข้าสู่บัญชีสมาชิก
- **Integration Method**: REST API / Webhooks

## 6. Deployment & Infrastructure

- **Cloud Provider**: Vercel (Frontend), Railway (Backend & DB)

- **Key Services Used**: Vercel Web Hosting, Railway Managed MySQL

- **CI/CD Pipeline**: GitHub Actions สำหรับ Automated Testing และ Quality Check

- **Monitoring & Logging**: ใช้งาน Morgan ในฝั่ง Backend (ExpressJS) เพื่อทำหน้าที่เป็น HTTP request logger middleware โดยจะบันทึกรายละเอียดของทุกคำขอ (Request) ที่ส่งเข้ามายัง Server ช่วยให้นักพัฒนาสามารถติดตามการทำงานและวิเคราะห์ปัญหาที่เกิดขึ้นในระบบได้อย่างแม่นยำ

## 7. Security Considerations

- **Authentication**: ใช้ JWT (JSON Web Token) ในการรักษาความปลอดภัยของ Session และใช้ Email เป็นข้อมูลหลักในการระบุตัวตน

- **Authorization**: แบ่งระดับการเข้าถึงตามบทบาท (Roles) เช่น Guest, Member, Admin และ Content Provider (UC-14)

- **Data Encryption**: รหัสผ่านของผู้ใช้จะถูกเข้ารหัสด้วย bcrypt ก่อนบันทึกลงฐานข้อมูล และใช้ HTTPS (TLS) สำหรับข้อมูลที่วิ่งผ่านเครือข่าย

- **Key Security Tools/Practices**: bcrypt, JSON Web Token (JWT), Helmet.js,Environment Variables (.env),CORS (Cross-Origin Resource Sharing),Input Validation & Sanitization,HTTPS/TLS

## 8. Development & Testing Environment

- **Local Setup Instructions**: ดูรายละเอียดได้ที่ docs/Setup/DEVELOPMENT.md.

- **Testing Frameworks**: Jest (สำหรับ Backend Unit Tests).

- **Code Quality Tools**: ESLint, Prettier (ตามมาตรฐาน Coding_Standards.md).

## 9. Future Considerations / Roadmap

- พัฒนาระบบแนะนำการ์ตูน (AI Recommendation) ตามพฤติกรรมการอ่านของผู้ใช้ (UC-06, UC-13).
- พัฒนาระบบแจ้งเตือน (Notification System) เมื่อมีการอัปเดตตอนใหม่ (UC-15).

## 10. Project Identification

- **Project Name**: OwlBook Comic Reader Website

- **Repository URL**: https://github.com/65160384/owlBook-project.git

- **Primary Contact/Team**: Nathawat Thampanya (Dev1), Chompunut Rueangrit(Dev2), Team name: Ho Nok-Hook

- **Date of Last Update**: 2026-02-19

## 11. Glossary / Acronyms

- **UC**: Use Case (กรณีการใช้งาน)
- **3NF**: Third Normal Form (การจัดการฐานข้อมูลเพื่อลดความซ้ำซ้อน)
- **JWT**: JSON Web Token (มาตรฐานสำหรับการรับส่งข้อมูลความปลอดภัย)
- **MVP**: Minimum Viable Product (ผลิตภัณฑ์ขั้นต่ำที่ใช้งานได้จริง)
