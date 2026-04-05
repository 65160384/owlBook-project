# Test Cases

## Auth

| Test ID | Feature | Description | Input | Expected Output | Status |
|---------|---------|-------------|-------|-----------------|--------|
| TC-001 | Auth | Register with valid email | email, password, username | User created successfully | Pending |
| TC-002 | Auth | Register with duplicate email | existing email, password | Error: Email already exists | Pending |
| TC-003 | Auth | Login with correct password | email, password | Login successful / user session created | Pending |
| TC-004 | Auth | Login with wrong password | email, wrong_password | Error: Invalid credentials | Pending |
| TC-005 | Auth | Login with empty email | empty email, password | Validation error | Pending |
| TC-006 | Auth | Login with empty password | email, empty password | Validation error | Pending |
| TC-007 | Auth | View profile after login | valid user token | User profile displayed | Pending |
| TC-008 | Auth | Update profile with valid data | username, email | Profile updated successfully | Pending |
| TC-009 | Auth | Update profile with invalid email | invalid email | Validation error | Pending |

---

## User

| Test ID | Feature | Description | Input | Expected Output | Status |
|---------|---------|-------------|-------|-----------------|--------|
| TC-010 | User | View cartoon list | - | Cartoon list displayed | Pending |
| TC-011 | User | View cartoon details | cartoonId | Cartoon detail returned | Pending |
| TC-012 | User | View cartoon episodes | cartoonId | Episode list displayed | Pending |
| TC-013 | User | Add cartoon to favourites | userId, cartoonId | Favourite added successfully | Pending |
| TC-014 | User | Remove cartoon from favourites | userId, cartoonId | Favourite removed successfully | Pending |
| TC-015 | User | View purchased episode history | userId | Purchase history displayed | Pending |
| TC-016 | User | View cartoon categories | - | Category list displayed | Pending |
| TC-017 | User | View cartoons by category | categoryId | Matching cartoons displayed | Pending |

---

## Payment

| Test ID | Feature | Description | Input | Expected Output | Status |
|---------|---------|-------------|-------|-----------------|--------|
| TC-018 | Payment | Create payment with valid amount | userId, amount | Payment created successfully | Pending |
| TC-019 | Payment | Payment with invalid amount | userId, negative amount | Validation error | Pending |
| TC-020 | Payment | Payment status = pending | payment data | Payment status stored as pending | Pending |
| TC-021 | Payment | Payment status = paid | payment data | Payment status updated to paid | Pending |
| TC-022 | Payment | Payment status = failed | payment data | Payment status updated to failed | Pending |

---

## Admin

| Test ID | Feature | Description | Input | Expected Output | Status |
|---------|---------|-------------|-------|-----------------|--------|
| TC-023 | Admin | Add new cartoon | adminId, cartoon data | Cartoon added successfully | Pending |
| TC-024 | Admin | Update cartoon information | adminId, cartoonId, new data | Cartoon updated successfully | Pending |
| TC-025 | Admin | Delete cartoon | adminId, cartoonId | Cartoon removed successfully | Pending |
| TC-026 | Admin | Add new cartoon category | adminId, category name | Category created successfully | Pending |
| TC-027 | Admin | Assign category to cartoon | cartoonId, categoryId | Category linked successfully | Pending |

---

## Content Provider

| Test ID | Feature | Description | Input | Expected Output | Status |
|---------|---------|-------------|-------|-----------------|--------|
| TC-028 | Content Provider | Create new cartoon | providerId, cartoon data | Cartoon created successfully | Pending |
| TC-029 | Content Provider | Add new cartoon episode | providerId, cartoonId, episode data | Episode created successfully | Pending |
| TC-030 | Content Provider | Update episode price | providerId, episodeId, price | Episode price updated | Pending |
| TC-031 | Content Provider | Update episode title | providerId, episodeId, title | Episode title updated | Pending |

---

## Security

| Test ID | Feature | Description | Input | Expected Output | Status |
|---------|---------|-------------|-------|-----------------|--------|
| TC-032 | Security | SQL Injection attempt on login | `' OR '1'='1` | Login rejected / input sanitized | Pending |
| TC-033 | Security | Access admin function as user | user token | Access denied | Pending |
| TC-034 | Security | Access content provider function as normal user | user token | Access denied | Pending |

---

## Status Legend

- **Pending** = Test case prepared but not executed yet  
- **Pass** = Test executed successfully  
- **Fail** = Test executed but failed  
- **Blocked** = Test cannot be executed due to dependency or issue  

---

**Summary:** 34/34 test cases prepared

**Note:** Test cases have been prepared based on the system requirements and design documents.  
The test execution phase has not been conducted yet, so all test cases are currently marked as **Pending**.  
Status will be updated after the actual testing phase.