Code Review Training Report — owlBook-project
- Date

18–20 February 2026

- Attendees
Phatcha Saengphoem (Product Owner)
Tassana Pralao (Scrum Master)
Nathawat Thampanya (Lead Developer)
Chompunut Rueangrit (Developer)
Piyada Chokchai (QA1)
Pasin Yujiseree (QA2)


- Objective

กิจกรรมนี้จัดขึ้นเพื่อฝึกกระบวนการ Code Review ภายในทีม โดยใช้ไฟล์
Sample_UserService.java ร่วมกับ Code_Review_Checklist.md เพื่อช่วยให้สมาชิกในทีมสามารถตรวจสอบคุณภาพโค้ด ความปลอดภัย และมาตรฐานการพัฒนาได้อย่างเป็นระบบ

- Review Activity
Exercise 1: Individual Review

สมาชิกแต่ละคนทำการตรวจสอบโค้ด Sample_UserService.java โดยใช้ Code Review Checklist เป็นแนวทาง และบันทึกปัญหาที่พบ รวมถึงข้อเสนอแนะในการปรับปรุงโค้ด

Exercise 2: Team Discussion

ทีมได้แลกเปลี่ยนความคิดเห็นเกี่ยวกับปัญหาที่พบในโค้ด และสรุปประเด็นสำคัญที่ควรปรับปรุงเพื่อเพิ่มคุณภาพและความปลอดภัยของระบบ

- Common Issues Found 

จากการ review ของทีม พบปัญหาหลักที่ตรงกันหลายประเด็น ได้แก่

การเก็บและเปรียบเทียบรหัสผ่านแบบ Plain Text

ไม่มีการเข้ารหัสรหัสผ่าน (Password Hashing)

ความเสี่ยงต่อ SQL Injection

มีการสร้าง SQL Query โดยการต่อ String โดยตรง

ไม่มี Input Validation

ไม่มีการตรวจสอบค่า null หรือค่าที่ไม่ถูกต้องก่อนใช้งาน

ไม่มี Error Handling และ Exception Handling ที่ชัดเจน

ไม่มี Logging ในกระบวนการสำคัญ เช่น login หรือ purchase

Naming บาง method ไม่สื่อความหมาย

เช่น method check()

Model Class ใช้ Public Fields

ทำให้ขาด Encapsulation

- Positive Feedback from Team

ทีมพบว่ามีข้อดีของโค้ดตัวอย่างดังนี้

โครงสร้างโค้ดอ่านง่าย

Method แยกตามหน้าที่ชัดเจน

เหมาะสำหรับใช้เป็นตัวอย่างฝึก Code Review

Flow การทำงานของระบบเข้าใจง่าย

- Key Lessons Learned

จากกิจกรรม Code Review ทีมได้เรียนรู้ว่า

การทำ Code Review ต้องดูมากกว่าแค่โค้ดทำงานได้หรือไม่

Security เป็นสิ่งสำคัญที่ต้องตรวจสอบเสมอ

การใช้ Checklist ช่วยให้ทีม review โค้ดได้เป็นมาตรฐานเดียวกัน

ควรมีการตรวจสอบ input ทุกครั้งก่อนใช้งาน

การเขียนโค้ดที่ดีควรคำนึงถึง Maintainability และความปลอดภัย

- Team Agreements

ทีมได้ตกลงแนวทางร่วมกันดังนี้

ใช้ Code_Review_Checklist.md สำหรับทุก Pull Request

ห้ามใช้ SQL String Concatenation

ต้องมี Input Validation ในทุกฟังก์ชัน

Password ต้องถูกเข้ารหัสก่อนจัดเก็บ

ควรมี Logging ใน Service Layer

Method ควรมีชื่อที่สื่อความหมาย

- Action Items

เพิ่มมาตรฐาน Secure Coding ในทีม

ปรับปรุง Coding Standards

เพิ่ม Input Validation ในทุก Service

เพิ่มระบบ Logging

ใช้ Prepared Statement หรือ ORM

- Next Steps

นำ Code Review Checklist ไปใช้กับทุก Pull Request ของโปรเจกต์

ตั้งค่า GitHub Actions สำหรับ Linting และ Code Coverage

จัดทำมาตรฐาน Coding Standards สำหรับทีม