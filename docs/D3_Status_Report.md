# D3 Testing Status Report

## Project Information

Project Name: OwlBook Online Comic Platform
Version: 1.0
Date: 13 March 2026
Prepared by: Scrum Master

---

## 1. Overview

This report summarizes the results of testing activities performed during D3 (Testing Phase) of the OwlBook project. The purpose of this testing phase is to verify that the system functions correctly, meets user requirements, and is ready for deployment.

The testing process includes:

* Unit Testing
* Integration Testing
* System Testing
* User Acceptance Testing (UAT)

---

## 2. Unit Testing

Unit testing was conducted to verify individual modules and functions in the system.

Testing Framework:

* Jest

Modules Tested:

* Authentication Service
* Comic Service
* Favorite Service
* Coin System

Results:

Total Unit Test Cases: 18
Passed: 18
Failed: 0

Status: PASS

---

## 3. Integration Testing

Integration testing was performed to ensure that different modules interact correctly.

Tested Integrations:

1. Authentication Flow
   Register → Login → Access protected routes

2. Comic API
   Retrieve comic list and search functionality

3. Favorite System
   Add comic to favorites and remove from favorites

4. Coin Unlock System
   Unlock premium comic episodes using coins

5. Database Operations
   Create, read, update, and delete records

Results:

Total Integration Test Suites: 5
Passed: 5
Failed: 0

Status: PASS

---

## 4. System Testing

System testing was conducted to verify the complete workflow of the application.

Tested User Workflows:

* User registration and login
* Searching for comics
* Viewing comic details
* Reading comic episodes
* Adding comics to favorites
* Unlocking premium episodes with coins

Results:

All core features functioned as expected.

Status: PASS

---

## 5. User Acceptance Testing (UAT)

User Acceptance Testing was conducted by the QA team and Product Owner to verify that the system meets user requirements.

Test Scenarios:

1. Register and login to the system
2. Search for comics
3. Add comics to favorites
4. Unlock comic episodes using coins
5. Admin manages comic data

Results:

All UAT scenarios were completed successfully.

Status: PASS

---

## 6. Test Coverage

Code coverage was measured to ensure adequate testing of the application.

Line Coverage: 84%
Function Coverage: 86%
Branch Coverage: 81%

Target Coverage: ≥ 80%

Status: PASS

---

## 7. Issues Found

During the testing phase, no critical issues were identified.

Minor improvements suggested:

* Improve input validation for user forms
* Enhance error messages for API responses

These issues do not affect the core functionality of the system.

---

## 8. Overall Testing Status

All testing objectives have been successfully achieved.

Summary:

* Unit tests passed
* Integration tests passed
* System testing passed
* UAT completed successfully
* Code coverage meets the required target

System Status: READY FOR SUBMISSION

---

## Test Approval

Scrum Master: 65160024 Sirima
Product Owner: 65160384 Patcha
