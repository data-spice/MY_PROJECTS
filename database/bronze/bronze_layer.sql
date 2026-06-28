-- =====================================================
-- BRONZE LAYER TABLES
-- Database: healthcare_dw
-- Schema: bronze
-- =====================================================

CREATE SCHEMA IF NOT EXISTS bronze;

-- =====================================================
-- HOSPITALS
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.hospitals (
    hospital_id INTEGER,
    hospital_name VARCHAR(100),
    county VARCHAR(100),
    level VARCHAR(30),
    total_beds INTEGER,
    established_year SMALLINT,
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- DEPARTMENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.departments (
    department_id INTEGER,
    hospital_id INTEGER,
    department_name VARCHAR(100),
    floor_number INTEGER,
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- DOCTORS
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.doctors (
    doctor_id INTEGER,
    department_id INTEGER,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    specialization VARCHAR(100),
    employment_date DATE,
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- PATIENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.patients (
    patient_id INTEGER,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    gender VARCHAR(10),
    date_of_birth DATE,
    county VARCHAR(100),
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- ADMISSIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.admissions (
    admission_id BIGINT,
    patient_id INTEGER,
    hospital_id INTEGER,
    admission_date DATE,
    discharge_date DATE,
    diagnosis VARCHAR(200),
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- MEDICATIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.medications (
    medication_id INTEGER,
    medication_name VARCHAR(150),
    category VARCHAR(100),
    manufacturer VARCHAR(150),
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- PHARMACY INVENTORY
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.pharmacy_inventory (
    inventory_id BIGINT,
    hospital_id INTEGER,
    medication_id INTEGER,
    quantity_available INTEGER,
    reorder_level INTEGER,
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- LABORATORY TESTS
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.laboratory_tests (
    test_id BIGINT,
    patient_id INTEGER,
    hospital_id INTEGER,
    test_name VARCHAR(150),
    test_date DATE,
    result VARCHAR(100),
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- EQUIPMENT
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.equipment (
    equipment_id INTEGER,
    hospital_id INTEGER,
    equipment_name VARCHAR(150),
    purchase_date DATE,
    maintenance_due DATE,
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- STAFF
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.staff (
    staff_id INTEGER,
    hospital_id INTEGER,
    role VARCHAR(100),
    employment_date DATE,
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);