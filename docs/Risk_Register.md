# Risk Register - Sprint 1

## Risk #1: ปัญหาการเชื่อมต่อฐานข้อมูล

- Probability: Medium  
- Impact: High  
- Description: ระบบอาจไม่สามารถเชื่อมต่อฐานข้อมูลได้ หรือฐานข้อมูลทำงานผิดพลาด ทำให้ไม่สามารถทดสอบฟังก์ชันได้  
- Mitigation Strategy:  
  - เตรียม environment สำรอง 
  - จัดทำคู่มือแก้ไขปัญหาเบื้องต้น  
  - สำรองไฟล์ schema และข้อมูลตัวอย่าง  
- Owner: Backend Developer  
- Status: Identified  

---

## Risk #2: การเพิ่มขอบเขตงานระหว่าง Sprint

- Probability: High  
- Impact: High  
- Description: อาจมีการร้องขอฟีเจอร์เพิ่มเติมนอกเหนือจากที่วางแผนไว้ ทำให้ไม่สามารถส่งมอบงานได้ทันเวลา  
- Mitigation Strategy:  
  - กำหนดขอบเขตงานชัดเจนใน Sprint Planning  
  - Scrum Master ควบคุมไม่ให้เพิ่มงานระหว่าง Sprint  
  - หากจำเป็นต้องเพิ่มงาน ให้ย้ายไป Sprint ถัดไป  
- Owner: Scrum Master  
- Status: Identified  

---

## Risk #3: การตั้งค่าระบบยืนยันตัวตนไม่ปลอดภัย

- Probability: Medium  
- Impact: High  
- Description: การจัดการ Session หรือ JWT อาจตั้งค่าไม่เหมาะสม ทำให้เกิดความเสี่ยงด้านความปลอดภัย  
- Mitigation Strategy:  
  - ตั้งค่า token expiration  
  - ใช้ httpOnly และ secure cookie  
  - ทดสอบ protected routes ทุกกรณี  
- Owner: Backend Developer  
- Status: Monitoring  

---

## Risk #4: ประสิทธิภาพการโหลดภาพการ์ตูนต่ำ

- Probability: Medium  
- Impact: Medium  
- Description: ภาพหน้าปกหรือภาพตอนการ์ตูนอาจโหลดช้า ส่งผลต่อประสบการณ์ผู้ใช้  
- Mitigation Strategy:  
  - บีบอัดภาพก่อนอัปโหลด  
  - ใช้เทคนิค lazy loading  
  - ทดสอบความเร็วบนเครือข่ายจำลอง  
- Owner: Frontend Developer  
- Status: Identified  

---

## Risk #5: การทดสอบไม่ครอบคลุมทุกกรณี

- Probability: Medium  
- Impact: High  
- Description: Functional Test และ Integration Test อาจไม่ครอบคลุมทุกกรณีการใช้งาน ทำให้เกิดบั๊กหลังส่งมอบงาน  
- Mitigation Strategy:  
  - จัดทำ Test Case จาก Acceptance Criteria ทุก Story  
  - ทดสอบทั้งกรณีปกติและกรณีผิดพลาด  
  - QA ตรวจสอบก่อนปิดงาน  
- Owner: QA  
- Status: Identified  

---

## Risk #6: กำลังการพัฒนาของทีมไม่เป็นไปตามแผน

- Probability: Medium  
- Impact: Medium  
- Description: สมาชิกทีมอาจมีภารกิจอื่น หรือการทำงานไม่เป็นไปตามแผนที่วางไว้ ทำให้ความเร็วในการพัฒนาลดลง  
- Mitigation Strategy:  
  - ประเมิน Story Points อย่างรอบคอบ  
  - ติดตามความคืบหน้าใน Daily Standup  
  - ปรับลำดับความสำคัญของงานตามความจำเป็น  
- Owner: Scrum Master  
- Status: Identified  
