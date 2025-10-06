# IT News Portal

News portal built with Next.js 15, Strapi CMS, and Tailwind CSS.

## Quick Start

### 1. Install & Setup

```bash
npm install
cp env.template .env
```

### 2. Start Services

```bash
docker-compose up -d
cd strapi-backend
cp env.example.env
npm install
npm run develop
```

### 3. Configure Strapi

- Open http://localhost:1337/admin
- Create admin account
- Go to Settings → Users & Permissions → Roles → Public
- Enable `find` and `findOne` for `news-article`
- Add some news articles in Content Manager

### 4. Start Frontend

```bash
npm run dev
```

Open http://localhost:3000

## Scripts

```bash
npm run dev           # Start Next.js
npm run build         # Build for production

# Strapi
cd strapi-backend
npm run develop       # Start Strapi
```

## Ports

- **3000** - Next.js frontend
- **1337** - Strapi backend
- **5432** - PostgreSQL
- **9000** - MinIO API
- **9001** - MinIO Console

## Content Type

`news-article` fields:

- **title** (Text)
- **content** (Rich Text/Markdown)
- **tags** (JSON array)
- **preview** (Media)

---

Made with ❤️ using Next.js + Strapi
