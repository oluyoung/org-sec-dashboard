# XState Incident Tracker - Fullstack Sample Project

This repository is a **sample fullstack project** combining a **Next.js dashboard** and a **NestJS GraphQL API**.  
It simulates an organisations's cybersecurity dashboard displaying:

- Security Posture information
- Incident reports
- Vulnerabilities detected

---

# Technologies Used

| Stack            | Details |
|------------------|---------|
| Frontend         | [Next.js 14 (App Router)](https://nextjs.org/docs) |
| UI Framework     | [Chakra UI](https://chakra-ui.com/) |
| Backend          | [NestJS 10](https://docs.nestjs.com/) (GraphQL + Sequelize ORM) |
| Database         | [MySQL 8](https://hub.docker.com/_/mysql) |
| Containerization | [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/) |


---

# How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/oluyoung/org-sec-dashboard.git
cd org-sec-dashboard
```

---

### 2. Install all project dependencies

```bash
cd `apps/web` && npm install
cd `apps/api` && npm install
```


---

### 3. Start Local Docker Services (MySQL)

```bash
docker-compose up --build
```

This command will:

- Start the NestJS API on `http://localhost:4000`
- Start the Next.js frontend on `http://localhost:3000`
- Start MySQL database on `localhost:3306`

---

### 5. Run Migrations & Seeders

Open a terminal inside the `apps/api` directory and run:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

This ensures you have some dummy data

---

# Access the App

Go to `http://localhost:3000` to view the dashboard


---

# 🔥 Future Enhancements

- Add details pages for resources.
- Add WebSocket subscriptions for live updates
- Animate charts (using framer-motion)
- Authentication and authorization (JWT or OAut'h2)
- Real-time Kafka-driven incident ingestion
- Better pagination for tables and charts
- Integrate Admin UI panel for vulnerability management

---

# 📜 License

MIT License.