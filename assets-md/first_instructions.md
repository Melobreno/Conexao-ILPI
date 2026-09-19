# PROMPT FOR MVP DEVELOPMENT: INFORMATIVE AND SUPPORT SYSTEM FOR ILPI CAZUZA PINHEIRO

## CONTEXT & OBJECTIVE
Act as a Senior Full Stack Software Engineer specializing in Java (Spring Boot), Angular, and UX/UI Design. 
Create the initial structure, architecture, and core components for an MVP of a web-based informative and social engagement platform for the Long-Term Care Institution for the Elderly (ILPI) Cazuza Pinheiro, located in Paudalho, PE, Brazil.

The system's goal is to connect the local community with the institution, making it easy to access institutional information, donate money or physical goods, and sign up as a volunteer or request assistance.

---

## 1. TECH STACK & TECHNICAL REQUIREMENTS

* **Backend:** Java 17+ with Spring Boot 3+ (Spring Data JPA, Spring Web, Spring Validation).
* **Frontend:** Angular 16+ (Standalone Components, TypeScript, RxJS).
* **Database:** MySQL 8+.
* **Styling & Design:** Tailwind CSS or Angular Material (customized).
* **Architecture:** REST API on the backend + responsive SPA (Single Page Application) on the frontend.

---

## 2. DESIGN & UX/UI REQUIREMENTS

* **Warm & Welcoming Visual Identity:** Use a soothing, warm color palette (soft earth tones, cream/beige `#FDFBF7`, soft olive green `#4A6B5D` for care/hope, and soft terracotta `#D97757` for call-to-action accents).
* **Simple & Accessible Interface:** Legible sans-serif typography, large touch targets, and high contrast for comfortable reading (tailored for senior users and donors of all age groups).
* **Mobile-First & Responsive:** The layout must be fully optimized for smartphones, prioritizing touch navigation (minimum 48px touch targets).

---

## 3. MVP FEATURES & CORE PAGES

### Main Frontend Components / Pages
1. **Home / About Us:** History, mission, and daily routine of ILPI Cazuza Pinheiro.
2. **Needs Board & How to Donate:** 
   * A visual list of high-priority item needs (e.g., adult diapers, milk, hygiene products).
   * Quick donation section featuring a PIX key with a "Copy Key" button alongside traditional bank transfer details.
3. **Become a Volunteer / Request Support:** 
   * Simple form for volunteer registration (Name, Phone Number, Area of Interest, Availability).
   * Contact form for support inquiries or admission/care questions.
4. **Simple Admin Dashboard (Protected/Internal):**
   * A basic management view for staff to update the donation needs list and view submitted contact/volunteer entries.

---

## 4. DATABASE SCHEMA (MySQL)

Generate the DDL (SQL) for the core tables:
1. `donation_need` (id, title, description, category, target_quantity, current_quantity, status, created_at)
2. `volunteer_contact` (id, name, phone, email, interest_area, message, request_type ['VOLUNTEER', 'SUPPORT_REQUEST'], sent_at)
3. `admin_user` (id, name, email, password_hash, role)

---

## 5. EXPECTED DELIVERABLES

Provide a working boilerplate containing:

1. **SQL DDL:** MySQL script to set up tables and insert dummy seed data for testing.
2. **Java Spring Boot Backend:**
   * JPA Entities (`DonationNeed`, `VolunteerContact`).
   * Repositories (Spring Data JPA).
   * DTOs and REST Controllers with endpoints to list and create donation needs and volunteer submissions.
3. **Angular Frontend:**
   * Routing setup and key standalone components (`HomeComponent`, `DonationsComponent`, `VolunteerFormComponent`).
   * Angular Services (`HttpClient`) to consume backend REST APIs.
   * Responsive HTML/Tailwind template for the main **Donations & Volunteering** screen highlighting the mobile-first design and warm color scheme.