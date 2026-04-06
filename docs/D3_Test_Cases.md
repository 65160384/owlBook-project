# Test Cases — owlBook-project

## Auth

| Test ID | Feature | Description | Input | Expected Output | Status |
|---------|---------|-------------|-------|-----------------|--------|
| TC-001 | Auth | Register with valid email | email, password, username | User created successfully | Pending |
| TC-002 | Auth | Register with duplicate email | existing email, password | Error: Email already exists | Pending |
| TC-003 | Auth | Login with correct password | email, password | Login successful / user session created | Pending |
| TC-004 | Auth | Login with wrong password | email, wrong_password | Error: Invalid credentials | Pending |

---

## User

| Test ID | Feature | Description | Input | Expected Output | Status |
|---------|---------|-------------|-------|-----------------|--------|
| TC-005 | User | View cartoon list | - | Cartoon list displayed | Pending |
| TC-006 | User | View cartoon details | cartoonId | Cartoon detail returned | Pending |
| TC-007 | User | View cartoon episodes | cartoonId | Episode list displayed | Pending |
| TC-008 | User | Add cartoon to favourites | userId, cartoonId | Favourite added successfully | Pending |
| TC-009 | User | Remove cartoon from favourites | userId, cartoonId | Favourite removed successfully | Pending |
| TC-010 | User | View purchased episode history | userId | Purchase history displayed | Pending |

---

## Payment / Unlock

| Test ID | Feature | Description | Input | Expected Output | Status |
|---------|---------|-------------|-------|-----------------|--------|
| TC-011 | Payment | Purchase episode successfully | userId, episodeId, valid payment/coin | Payment recorded and episode unlocked | Pending |
| TC-012 | Payment | Purchase episode with insufficient coins | userId, episodeId, insufficient coin | Error: Not enough coins / payment failed | Pending |
| TC-013 | Payment | Payment with invalid amount | userId, negative amount | Validation error | Pending |

---

## Admin

| Test ID | Feature | Description | Input | Expected Output | Status |
|---------|---------|-------------|-------|-----------------|--------|
| TC-014 | Admin | Add new cartoon | adminId, cartoon data | Cartoon added successfully | Pending |
| TC-015 | Admin | Update cartoon information | adminId, cartoonId, new data | Cartoon updated successfully | Pending |
| TC-016 | Admin | Delete cartoon | adminId, cartoonId | Cartoon removed successfully | Pending |
| TC-017 | Admin | Add new cartoon category | adminId, category name | Category created successfully | Pending |

---

## Content Provider

| Test ID | Feature | Description | Input | Expected Output | Status |
|---------|---------|-------------|-------|-----------------|--------|
| TC-018 | Content Provider | Create new cartoon | providerId, cartoon data | Cartoon created successfully | Pending |
| TC-019 | Content Provider | Add new cartoon episode | providerId, cartoonId, episode data | Episode created successfully | Pending |

---

## Security / Authorization

| Test ID | Feature | Description | Input | Expected Output | Status |
|---------|---------|-------------|-------|-----------------|--------|
| TC-020 | Security | Access admin function as normal user | user token / user role | Access denied | Pending |
| TC-021 | Security | Unauthorized access to content provider function | normal user token | Access denied | Pending |

---

## Status Legend

- **Pending** = Test case prepared but not executed yet
- **Pass** = Test executed successfully
- **Fail** = Test executed but failed
- **Blocked** = Test cannot be executed due to dependency or issue

---

**Summary:** 21/21 test cases prepared

**Note:** Test cases have been prepared based on the system requirements, project repository, and main user flows of owlBook-project. The actual execution phase has not been conducted yet, so all test cases are currently marked as **Pending**.