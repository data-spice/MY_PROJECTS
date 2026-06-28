-- ==========================================================
-- GOLD LAYER
-- 01_materialized_views.sql
-- ==========================================================

CREATE SCHEMA IF NOT EXISTS gold;

-- ==========================================================
-- MONTHLY ADMISSIONS
-- ==========================================================

CREATE MATERIALIZED VIEW gold.mv_monthly_admissions AS

SELECT
    h.hospital_id,
    h.hospital_name,

    EXTRACT(YEAR FROM a.admission_date) AS year,
    EXTRACT(MONTH FROM a.admission_date) AS month,

    COUNT(*) AS total_admissions

FROM silver.admissions a

JOIN silver.hospitals h
ON a.hospital_id = h.hospital_id

GROUP BY
    h.hospital_id,
    h.hospital_name,
    year,
    month;

------------------------------------------------------------

CREATE UNIQUE INDEX idx_mv_monthly_admissions

ON gold.mv_monthly_admissions
(
hospital_id,
year,
month
);

-- ==========================================================
-- HOSPITAL BED UTILIZATION
-- ==========================================================

CREATE MATERIALIZED VIEW gold.mv_hospital_bed_utilization AS

SELECT

    h.hospital_id,

    h.hospital_name,

    h.total_beds,

    COUNT(a.admission_id) AS occupied_beds,

    ROUND(
        COUNT(a.admission_id)::numeric
        /
        NULLIF(h.total_beds,0)
        *100,
        2
    ) AS occupancy_rate

FROM silver.hospitals h

LEFT JOIN silver.admissions a

ON h.hospital_id=a.hospital_id

GROUP BY

h.hospital_id,
h.hospital_name,
h.total_beds;

------------------------------------------------------------

CREATE UNIQUE INDEX idx_mv_bed_utilization

ON gold.mv_hospital_bed_utilization(hospital_id);

-- ==========================================================
-- DISEASE TRENDS
-- ==========================================================

CREATE MATERIALIZED VIEW gold.mv_disease_trends AS

SELECT

diagnosis,

EXTRACT(YEAR FROM admission_date) AS year,

EXTRACT(MONTH FROM admission_date) AS month,

COUNT(*) AS total_cases

FROM silver.admissions

GROUP BY

diagnosis,
year,
month;

------------------------------------------------------------

CREATE UNIQUE INDEX idx_mv_disease

ON gold.mv_disease_trends
(
diagnosis,
year,
month
);

-- ==========================================================
-- MEDICATION INVENTORY
-- ==========================================================

CREATE MATERIALIZED VIEW gold.mv_medication_inventory AS

SELECT

h.hospital_name,

m.medication_name,

i.quantity_available,

i.reorder_level

FROM silver.pharmacy_inventory i

JOIN silver.hospitals h

ON h.hospital_id=i.hospital_id

JOIN silver.medications m

ON m.medication_id=i.medication_id;

------------------------------------------------------------

CREATE INDEX idx_mv_inventory

ON gold.mv_medication_inventory(hospital_name);

-- ==========================================================
-- LABORATORY WORKLOAD
-- ==========================================================

CREATE MATERIALIZED VIEW gold.mv_lab_workload AS

SELECT

hospital_id,

EXTRACT(YEAR FROM test_date) AS year,

EXTRACT(MONTH FROM test_date) AS month,

COUNT(*) total_tests

FROM silver.laboratory_tests

GROUP BY

hospital_id,
year,
month;

------------------------------------------------------------

CREATE UNIQUE INDEX idx_mv_lab

ON gold.mv_lab_workload
(
hospital_id,
year,
month
);
