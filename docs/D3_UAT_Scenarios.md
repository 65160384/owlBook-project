# UAT (User Acceptance Testing) Scenarios — owlBook-project

---

## Scenario 1: User Registration & Login

**Objective:** ผู้ใช้สามารถสมัครสมาชิกและเข้าสู่ระบบได้สำเร็จ

**Steps:**

1. เปิดหน้าเว็บไซต์
2. กดปุ่ม "Register"
3. กรอกข้อมูล:
   - Email: user@test.com
   - Password: 123456
   - Name: Test User
4. กด "Submit"
5. ไปที่หน้า Login
6. กรอก Email และ Password
7. กด "Login"

**Expected Outcome:**
✓ สมัครสมาชิกสำเร็จ  
✓ เข้าสู่ระบบได้  
✓ ระบบ redirect ไปหน้า Home  

**Test Date:** 01/04/2026  
**Tester:** Product Owner  
**Result:** PASS  
**Sign:** __________

---

## Scenario 2: View Cartoon & Episode

**Objective:** ผู้ใช้สามารถดูรายการการ์ตูนและตอนต่าง ๆ ได้

**Steps:**

1. Login เข้าระบบ
2. ไปที่หน้า Cartoon List
3. เลือกการ์ตูน 1 เรื่อง
4. ดูรายการ Episode

**Expected Outcome:**
✓ แสดงรายการการ์ตูน  
✓ แสดงรายละเอียดการ์ตูน  
✓ แสดง episode ครบ  

**Test Date:** 01/04/2026  
**Tester:** Product Owner  
**Result:** PASS  

---

## Scenario 3: Add Favourite Cartoon

**Objective:** ผู้ใช้สามารถเพิ่มการ์ตูนเป็นรายการโปรดได้

**Steps:**

1. Login เข้าระบบ
2. เปิดหน้า Cartoon Detail
3. กด "Add to Favourite"

**Expected Outcome:**
✓ เพิ่ม Favourite สำเร็จ  
✓ รายการ Favourite อัปเดต  

**Test Date:** 01/04/2026  
**Tester:** Product Owner  
**Result:** PASS  

---

## Scenario 4: Purchase Episode

**Objective:** ผู้ใช้สามารถซื้อ Episode ได้

**Steps:**

1. Login
2. เลือก Episode
3. กด "Buy"
4. ยืนยันการชำระเงิน

**Expected Outcome:**
✓ Payment ถูกบันทึก  
✓ Episode ถูกเพิ่มใน History  
✓ สถานะ payment = paid  

**Test Date:** 02/04/2026  
**Tester:** Product Owner  
**Result:** PASS  

---

## Scenario 5: View Purchase History

**Objective:** ผู้ใช้สามารถดูประวัติการซื้อได้

**Steps:**

1. Login
2. ไปที่หน้า History

**Expected Outcome:**
✓ แสดงรายการ episode ที่ซื้อ  
✓ แสดงจำนวนเงินที่จ่าย  

**Test Date:** 02/04/2026  
**Tester:** Product Owner  
**Result:** PASS  

---

## Scenario 6: Admin Manage Cartoon

**Objective:** Admin สามารถจัดการการ์ตูนได้

**Steps:**

1. Login เป็น Admin
2. เพิ่ม Cartoon ใหม่
3. แก้ไข Cartoon
4. ลบ Cartoon

**Expected Outcome:**
✓ เพิ่มสำเร็จ  
✓ แก้ไขสำเร็จ  
✓ ลบสำเร็จ  

**Test Date:** 02/04/2026  
**Tester:** QA Lead  
**Result:** PASS  

---

## Scenario 7: Admin Manage Category

**Objective:** Admin สามารถจัดการ Category ได้

**Steps:**

1. Login เป็น Admin
2. เพิ่ม Category
3. ผูก Category กับ Cartoon

**Expected Outcome:**
✓ Category ถูกสร้าง  
✓ เชื่อมกับ Cartoon สำเร็จ  

**Test Date:** 02/04/2026  
**Tester:** QA Lead  
**Result:** PASS  

---

## Scenario 8: Content Provider Create Cartoon

**Objective:** Content Provider สามารถสร้างการ์ตูนได้

**Steps:**

1. Login เป็น Content Provider
2. สร้าง Cartoon ใหม่

**Expected Outcome:**
✓ Cartoon ถูกสร้าง  
✓ เชื่อมกับผู้สร้าง (author_cartoon)  

**Test Date:** 03/04/2026  
**Tester:** QA Lead  
**Result:** PASS  

---

## Scenario 9: Content Provider Add Episode

**Objective:** Content Provider สามารถเพิ่ม Episode ได้

**Steps:**

1. Login เป็น Content Provider
2. เลือก Cartoon
3. เพิ่ม Episode

**Expected Outcome:**
✓ Episode ถูกเพิ่ม  
✓ ราคาและชื่อถูกบันทึก  

**Test Date:** 03/04/2026  
**Tester:** QA Lead  
**Result:** PASS  

---

## Scenario 10: Unauthorized Access Protection

**Objective:** ผู้ใช้ทั่วไปไม่สามารถเข้าถึง Admin/Provider ได้

**Steps:**

1. Login เป็น User
2. พยายามเข้า Admin Page

**Expected Outcome:**
✓ Access denied  
✓ ระบบไม่ให้เข้าถึง  

**Test Date:** 03/04/2026  
**Tester:** QA Lead  
**Result:** PASS  

---

## UAT Summary

- Total Scenarios: 10  
- Passed: 10  
- Failed: 0  
- Success Rate: 100%  
