# Course outline

Status: `[x]` built and verified · `[ ]` not built yet.
Lesson file: `modules/<module-slug>/<NN-lesson-slug>.html`. The lesson list here and the manifest in `assets/course.js` must always match.

## Exam objectives (restated in our own words)

IDs are ours. Weights are per section of the exam guide. Wording is our own summary, not the guide's text: read the official guide on databricks.com for the real list.

| ID | Objective, in plain words |
|---|---|
| **S1** | **Developing code for data processing with Python and SQL — 23%** |
| S1.1 | Lay out a Python project as a bundle so pieces are modular and CI/CD can deploy it |
| S1.2 | Find and fix library install problems (PyPI, wheel files, source archives) on serverless, pipelines and bundle deploys |
| S1.3 | Write UDFs in Python, pandas and SQL, including functions stored in Unity Catalog, and pick the right kind |
| S1.4 | Build production streaming pipelines with Lakeflow pipelines and Auto Loader |
| S1.5 | Create and schedule ETL jobs with Lakeflow Jobs from the UI, the REST API and the CLI |
| S1.6 | Pick a streaming table or a materialized view based on freshness, cost and refresh needs |
| S1.7 | Build CDC flows with the AUTO CDC APIs, keeping history (SCD 2) or not (SCD 1) |
| S1.8 | Decide between hand-written Structured Streaming and Spark Declarative Pipelines for a situation |
| S1.9 | Add branching (If/else) and looping (For each) to jobs |
| S1.10 | Match compute to the work: when serverless fits and how its environments, libraries and performance mode behave; when a notebook task needs extra memory; which automatic behaviours (such as retries) to switch off |
| S1.11 | Test transformations with `assertDataFrameEqual`, `assertSchemaEqual`, `DataFrame.transform` and a test framework |
| S1.12 | Use watermarks, output modes, `foreachBatch` and checkpoints so stateful streams recover exactly once |
| **S2** | **Data ingestion and acquisition — 12%** |
| S2.1 | Ingest Delta, Parquet, JSON, Iceberg, CSV and binary files from cloud storage and message buses (Kafka, Kinesis, Pub/Sub) |
| S2.2 | Set up incremental CDC in Lakeflow pipelines that writes Delta or Iceberg tables |
| S2.3 | Pull change data from SQL Server, MySQL and PostgreSQL with Lakeflow Connect |
| S2.4 | Share data safely with OpenSharing (Databricks-to-Databricks and open) and work together in Clean Rooms |
| S2.5 | Query outside databases in place with Lakehouse Federation, governed by Unity Catalog grants and connection credentials |
| **S3** | **Data manipulation — 12%** |
| S3.1 | Use joins, aggregations and window functions in Spark SQL and PySpark on big data |
| S3.2 | Store and query semi-structured data with the VARIANT type (`parse_json`, `variant_get`, …) |
| S3.3 | Call models from a pipeline with AI functions such as `ai_query` to enrich or classify rows |
| S3.4 | Use expectations in pipelines to keep, drop, quarantine or stop on bad rows |
| **S4** | **Monitoring and alerting — 10%** |
| S4.1 | Query system tables (billing, compute, access, Lakeflow) to track cost, audit activity and watch workloads |
| S4.2 | Monitor jobs and pipelines from the REST API, CLI and SDK |
| S4.3 | Read the pipeline event log for health and data-quality results |
| S4.4 | Know what alerts can watch (business numbers, data quality, spend, warehouse and query health, security events, agent quality) and how an alert result can steer a job down a branch. Name: the guide says "Lakehouse alerts", the docs say "Databricks SQL alerts" — verify in the docs |
| S4.5 | Watch job status and performance in the Jobs UI and Jobs API |
| **S5** | **Cost and performance optimization — 15%** |
| S5.1 | Explain how managed tables, predictive optimization and liquid clustering cut maintenance work |
| S5.2 | Pick deletion vectors, liquid clustering or `CLUSTER BY AUTO` for an access pattern |
| S5.3 | Explain how caching (the disk cache, formerly Delta cache) speeds up repeat reads |
| S5.4 | Use change data feed to pass row-level changes downstream cheaply |
| S5.5 | Read the query profile to spot poor data skipping, bad join choices and heavy shuffles |
| S5.6 | Compare liquid clustering with partitioning and Z-ordering for a table's size and queries |
| **S6** | **Data security and compliance — 8%** |
| S6.1 | Grant only the access needed on Unity Catalog objects and workspace resources |
| S6.2 | Use ABAC policies and governed tags to apply row filters and column masks at scale |
| S6.3 | Anonymize or pseudonymize sensitive columns (hashing, tokens, suppression, generalization) |
| S6.4 | Build a pipeline that finds and masks PII in batch and streaming |
| S6.5 | Delete data to meet retention rules and erasure requests with Delta and Unity Catalog |
| **S7** | **Data governance — 5%** |
| S7.1 | Use tags and comments so people can find and understand data |
| S7.2 | Explain how permissions flow down from catalog to schema to object |
| **S8** | **Debugging and deploying — 10%** |
| S8.1 | Find the useful clues in the Spark UI, cluster logs, system tables and query profiles |
| S8.2 | Fix failed job runs with repair runs and parameter overrides |
| S8.3 | Deploy resources with bundles |
| S8.4 | Set up Git-based CI/CD with Git folders |
| **S9** | **Data modeling — 5%** |
| S9.1 | Lay out a huge Delta or Iceberg table well: which column (if any) earns a partition, which columns to cluster on given how people join it, and how to stop file sizes drifting apart |
| S9.2 | Build star schemas for reporting, and know when a materialized view should hold pre-computed totals versus when a metric view should hold one shared, governed metric definition |

## Modules and lessons

### Module 00 — Foundations (start here, not an exam section)

| # | Lesson | Covers | Before this | Status |
|---|---|---|---|---|
| 00-01 | What is data engineering? | groundwork | — | [x] |
| 00-02 | Files vs tables | groundwork | 00-01 | [ ] |
| 00-03 | File formats: CSV, JSON, Parquet, Avro, Delta, Iceberg | groundwork (S2.1) | 00-02 | [ ] |
| 00-04 | Batch vs streaming | groundwork (S1.4, S1.12) | 00-01 | [ ] |
| 00-05 | What is Apache Spark? | groundwork | 00-02 | [ ] |
| 00-06 | DataFrames and Spark SQL | groundwork (S3.1) | 00-05 | [ ] |
| 00-07 | Cloud object storage | groundwork | 00-02 | [ ] |
| 00-08 | What is Databricks? Workspace and notebooks | groundwork | 00-05, 00-07 | [ ] |
| 00-09 | Compute: clusters, SQL warehouses, serverless | groundwork (S1.10) | 00-08 | [ ] |
| 00-10 | Delta Lake basics | groundwork (S5) | 00-03, 00-07 | [ ] |
| 00-11 | Unity Catalog basics | groundwork (S6, S7) | 00-08, 00-10 | [ ] |
| 00-12 | Medallion architecture | groundwork | 00-10, 00-11 | [ ] |

### Module 01 — Developing Code for Data Processing (23%)

| # | Lesson | Covers | Before this | Status |
|---|---|---|---|---|
| 01-01 | Declarative Automation Bundles: what and why | S1.1 | 00-08 | [ ] |
| 01-02 | Structuring a modular Python bundle project | S1.1 | 01-01 | [ ] |
| 01-03 | Installing libraries: PyPI, wheels, source archives | S1.2 | 00-09 | [ ] |
| 01-04 | Troubleshooting dependency conflicts | S1.2 | 01-03, 01-02 | [ ] |
| 01-05 | Python and SQL UDFs | S1.3 | 00-06 | [ ] |
| 01-06 | Pandas UDFs | S1.3 | 01-05 | [ ] |
| 01-07 | Unity Catalog functions | S1.3 | 01-05, 00-11 | [ ] |
| 01-08 | Lakeflow pipelines: the declarative way | S1.4 | 00-04, 00-12 | [ ] |
| 01-09 | Streaming ingestion with Auto Loader in pipelines | S1.4 | 01-08 | [ ] |
| 01-10 | Streaming tables vs materialized views | S1.6 | 01-08 | [ ] |
| 01-11 | AUTO CDC and SCD Type 1 | S1.7 | 01-10 | [ ] |
| 01-12 | AUTO CDC and SCD Type 2 | S1.7 | 01-11 | [ ] |
| 01-13 | Checkpoints and exactly-once recovery | S1.12 | 00-04 | [ ] |
| 01-14 | Output modes and watermarks | S1.12 | 01-13 | [ ] |
| 01-15 | Stateful streaming and foreachBatch | S1.12 | 01-14 | [ ] |
| 01-16 | Structured Streaming vs Spark Declarative Pipelines | S1.8 | 01-08, 01-13 | [ ] |
| 01-17 | Lakeflow Jobs in the UI | S1.5 | 00-09 | [ ] |
| 01-18 | Automating jobs with the API and CLI | S1.5 | 01-17 | [ ] |
| 01-19 | Job control flow: If/else and For each | S1.9 | 01-17 | [ ] |
| 01-20 | Serverless compute: environments and performance mode | S1.10 | 00-09, 01-03 | [ ] |
| 01-21 | Choosing compute: high memory, retries and auto-optimization | S1.10 | 01-20, 01-17 | [ ] |
| 01-22 | Unit tests with assertDataFrameEqual and assertSchemaEqual | S1.11 | 00-06 | [ ] |
| 01-23 | Integration tests and testable transforms | S1.11 | 01-22, 01-02 | [ ] |

### Module 02 — Data Ingestion and Acquisition (12%)

| # | Lesson | Covers | Before this | Status |
|---|---|---|---|---|
| 02-01 | Reading every format: Delta, Parquet, JSON, Iceberg, CSV, binary | S2.1 | 00-03 | [ ] |
| 02-02 | Auto Loader from cloud storage | S2.1 | 02-01, 01-09 | [ ] |
| 02-03 | Message buses: Kafka, Kinesis, Pub/Sub | S2.1 | 01-13 | [ ] |
| 02-04 | Incremental CDC into Delta or Iceberg targets | S2.2 | 01-11 | [ ] |
| 02-05 | Lakeflow Connect: CDC from SQL Server, MySQL, PostgreSQL | S2.3 | 02-04 | [ ] |
| 02-06 | OpenSharing: Databricks-to-Databricks and open sharing (formerly Delta Sharing) | S2.4 | 00-11 | [ ] |
| 02-07 | Clean Rooms | S2.4 | 02-06 | [ ] |
| 02-08 | Lakehouse Federation | S2.5 | 00-11 | [ ] |

### Module 03 — Data Manipulation (12%)

| # | Lesson | Covers | Before this | Status |
|---|---|---|---|---|
| 03-01 | Joins at scale | S3.1 | 00-06 | [ ] |
| 03-02 | Aggregations and grouping | S3.1 | 00-06 | [ ] |
| 03-03 | Window functions | S3.1 | 03-02 | [ ] |
| 03-04 | The VARIANT type and parse_json | S3.2 | 00-03 | [ ] |
| 03-05 | Querying VARIANT data: variant_get and paths | S3.2 | 03-04 | [ ] |
| 03-06 | AI functions and ai_query | S3.3 | 01-08 | [ ] |
| 03-07 | Expectations: warn, drop, fail | S3.4 | 01-08 | [ ] |
| 03-08 | Quarantining bad records | S3.4 | 03-07 | [ ] |

### Module 04 — Monitoring and Alerting (10%)

| # | Lesson | Covers | Before this | Status |
|---|---|---|---|---|
| 04-01 | System tables overview | S4.1 | 00-11 | [ ] |
| 04-02 | Cost analysis with billing tables | S4.1 | 04-01 | [ ] |
| 04-03 | Audit, compute and Lakeflow system tables | S4.1 | 04-01 | [ ] |
| 04-04 | Monitoring with the REST API, CLI and SDK | S4.2 | 01-18 | [ ] |
| 04-05 | The pipeline event log | S4.3 | 03-07 | [ ] |
| 04-06 | Alerts: how they work (verify product name in the docs) | S4.4 | 04-01 | [ ] |
| 04-07 | What to alert on | S4.4 | 04-06 | [ ] |
| 04-08 | Monitoring jobs in the UI and Jobs API | S4.5 | 01-17, 04-04 | [ ] |

### Module 05 — Cost and Performance Optimization (15%)

| # | Lesson | Covers | Before this | Status |
|---|---|---|---|---|
| 05-01 | Managed tables and predictive optimization | S5.1 | 00-10, 00-11 | [ ] |
| 05-02 | Liquid clustering | S5.1, S5.2 | 05-01 | [ ] |
| 05-03 | Deletion vectors | S5.2 | 00-10 | [ ] |
| 05-04 | CLUSTER BY AUTO | S5.2 | 05-02 | [ ] |
| 05-05 | Liquid clustering vs partitioning and Z-ordering | S5.6 | 05-02 | [ ] |
| 05-06 | Caching repeated reads (disk cache, formerly Delta cache) | S5.3 | 00-09 | [ ] |
| 05-07 | Change data feed | S5.4 | 00-10 | [ ] |
| 05-08 | Reading the query profile | S5.5 | 00-05 | [ ] |
| 05-09 | Join strategies, shuffles and data skipping | S5.5 | 05-08, 03-01 | [ ] |

### Module 06 — Ensuring Data Security and Compliance (8%)

| # | Lesson | Covers | Before this | Status |
|---|---|---|---|---|
| 06-01 | Least-privilege grants on Unity Catalog objects | S6.1 | 00-11 | [ ] |
| 06-02 | Workspace resource permissions | S6.1 | 06-01 | [ ] |
| 06-03 | Row filters and column masks | S6.2, S6.3 | 06-01, 01-07 | [ ] |
| 06-04 | ABAC policies with governed tags | S6.2 | 06-03 (introduces governed tags; 07-01 goes deeper later) | [ ] |
| 06-05 | Hashing, tokenization, suppression, generalization | S6.3 | 06-03 | [ ] |
| 06-06 | A PII-aware pipeline for batch and streaming | S6.4 | 06-05, 01-08 | [ ] |
| 06-07 | Purging data for retention and right-to-erasure | S6.5 | 05-03, 05-07 | [ ] |

### Module 07 — Data Governance (5%)

| # | Lesson | Covers | Before this | Status |
|---|---|---|---|---|
| 07-01 | Tags and comments for discoverability | S7.1 | 00-11 | [ ] |
| 07-02 | How permissions inherit | S7.2 | 06-01 | [ ] |

### Module 08 — Debugging and Deploying (10%)

| # | Lesson | Covers | Before this | Status |
|---|---|---|---|---|
| 08-01 | Finding problems in the Spark UI | S8.1 | 00-05 | [ ] |
| 08-02 | Cluster logs, system tables and query profiles for diagnosis | S8.1 | 08-01, 04-01, 05-08 | [ ] |
| 08-03 | Repairing failed runs with parameter overrides | S8.2 | 01-17 | [ ] |
| 08-04 | Deploying resources with bundles | S8.3 | 01-02 | [ ] |
| 08-05 | Bundle targets and CI/CD | S8.3 | 08-04 | [ ] |
| 08-06 | Git folders (formerly Repos) | S8.4 | 00-08 | [ ] |
| 08-07 | Git-based CI/CD workflows | S8.4 | 08-06, 08-05 | [ ] |

### Module 09 — Data Modeling (5%)

| # | Lesson | Covers | Before this | Status |
|---|---|---|---|---|
| 09-01 | Table layout: partitioning and data grain | S9.1 | 05-05 | [ ] |
| 09-02 | Clustering and balanced file sizes | S9.1 | 09-01 | [ ] |
| 09-03 | Dimensional modeling: facts and dimensions | S9.2 | 00-12 | [ ] |
| 09-04 | Materialized views for pre-computed aggregates | S9.2 | 09-03, 01-10 | [ ] |
| 09-05 | Unity Catalog metric views | S9.2 | 09-04 | [ ] |

**Totals:** 10 modules, 89 lessons, 45 objectives, every objective mapped to at least one lesson.
