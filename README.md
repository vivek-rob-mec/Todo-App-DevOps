
## 📝 Phase 1: Application Setup

* **Todo-App Codebase**

  * Two services:

    * `todo-frontend` → React/Angular/any JS framework running on port 3000.
    * `todo-backend` → Node.js/Express API running on port 3002.
  * Connected via REST API (`frontend → backend`).

* **Local Development**

  * Both services tested locally using Node/npm.

---

## 🐳 Phase 2: Containerization (Docker)

* **Dockerfiles created** for both `frontend` and `backend`.
* **docker-compose.yml** setup to run both services together:

  * `todo-frontend` (mapped to host `3000:80`).
  * `todo-backend` (mapped to host `3002:3002`).
  * Shared `todo-network` for communication.
* Verified containers worked together locally.

---

## ☸️ Phase 3: Infrastructure as Code (Terraform on AWS)

* **Terraform Modules** created for:

  * **VPC + Networking** (subnets, IGW, route tables).
  * **EC2 instances** (for hosting app / runner).
  * **S3 bucket** (for frontend static hosting or storage).
  * **IAM roles + policies** (for permissions).
  * **CloudFront** (for CDN + HTTPS support).

* **Workspaces** used (`dev`, `prod`) for environment separation.

---

## 🔄 Phase 4: CI/CD with GitHub Actions

* **GitHub Actions pipeline** created:

  1. **Build & Push Docker Images** → Amazon ECR.
  2. **Terraform Apply** → Provision infra on AWS.
  3. **Deploy App to EC2** → via SSH & Docker Compose.

* Later, you **set up a self-hosted GitHub runner on EC2** so that deployments were automatic.

---

## 📦 Phase 5: Deployment on AWS

* **Backend service** deployed on EC2 using Docker Compose.
* **Frontend service** either served through Nginx container or uploaded to **S3 + CloudFront** for static hosting.
* Verified connectivity:

  * CloudFront → S3 (frontend).
  * Frontend → Backend API (EC2).

---

## 📊 Phase 6: Monitoring & Scaling (Work in Progress)

* You started exploring:

  * **Prometheus + Grafana** (metrics & dashboards).
  * **CloudWatch** for AWS-native monitoring.
  * **Load Balancing + Auto Scaling** for EC2.
  * **OpenTelemetry + ELK** for logging and tracing.

---

✅ **So far, I have:**

* A full-stack Todo app running in Docker.
* Automated infra with Terraform.
* CI/CD with GitHub Actions + self-hosted runner.
* AWS deployment with CloudFront, S3, EC2.
* Started integrating monitoring & logging.

---
