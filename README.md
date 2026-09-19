# Conexão ILPI – Cazuza Pinheiro

Plataforma web MVP para conectar a comunidade com o **ILPI Cazuza Pinheiro**, em Paudalho – PE.  
Permite consultar necessidades de doação, realizar doações via PIX, cadastrar-se como voluntário e solicitar apoio.

---

## Stack

| Camada     | Tecnologia                                      |
|------------|------------------------------------------------|
| Backend    | Java 17 + Spring Boot 3.3 (Web, JPA, Validation) |
| Banco      | MySQL 8+                                        |
| Frontend   | Angular 17 (Standalone Components, RxJS)        |
| Estilo     | Tailwind CSS 3                                  |
| Infra      | Render (Backend) + GitHub Pages (Frontend)      |

---

## Estrutura do projeto

```
Conexao-ILPI/
├── backend/                  # Spring Boot Maven project
├── frontend/                 # Angular SPA
├── .github/workflows/
│   ├── backend-deploy.yml   # CI/CD: build & deploy backend to Render
│   └── frontend-deploy.yml  # CI/CD: build & deploy frontend to GitHub Pages
└── .gitignore               # Protege segredos e artifacts
```

---

## Deployment & CI/CD

### Frontend (GitHub Pages)
O **frontend é deployado automaticamente via GitHub Actions** sempre que você faz push na branch `main` dentro da pasta `frontend/`:

1. **Workflow:** `.github/workflows/frontend-deploy.yml`
   - Instala dependências (`npm ci`)
   - Gera `environment.prod.ts` com a URL da API (via secret `PROD_API_URL`)
   - Build: `ng build --configuration production --base-href /Conexao-ILPI/`
   - Deploy automático para GitHub Pages

2. **Setup (one-time):**
   - Repository → Settings → Pages → Source: `GitHub Actions`
   - Repository → Settings → Secrets → Actions → Adicionar `PROD_API_URL` = `https://seu-render-backend.onrender.com/api`

### Backend (Render + Railway MySQL)
O **backend é deployado automaticamente via GitHub Actions** sempre que você faz push na branch `main` dentro da pasta `backend/`:

1. **Workflow:** `.github/workflows/backend-deploy.yml`
   - Build JAR com Maven
   - Cria imagem Docker (multi-stage, JRE Alpine)
   - Push para GitHub Container Registry (ghcr.io)
   - Aciona Render via Deploy Hook

2. **Setup (one-time):**
   - MySQL hospedado no [Railway.app](https://railway.app) (plano gratuito)
   - Backend hospedado no [Render](https://render.com) (plano gratuito) — Web Service com Docker
   - Adicione as variáveis de ambiente no Render:
     | Variável | Valor |
     |---|---|
     | `DATASOURCE_URL` | `jdbc:mysql://user:pass@host:port/railway?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true` |
     | `DATASOURCE_USER` | usuário do Railway |
     | `DATASOURCE_PASS` | senha do Railway |
     | `SETUP_SECRET_KEY` | chave forte para criar admin (`openssl rand -hex 32`) |
   - Repository → Settings → Secrets → Actions → Adicionar `RENDER_DEPLOY_HOOK_URL` (copiada do Render → Settings → Deploy Hook)

---

## Como rodar localmente

### 1. Banco de dados

```sql
-- No MySQL 8+
CREATE DATABASE conexao_ilpi CHARACTER SET utf8mb4;
source backend/src/main/resources/schema.sql
source backend/src/main/resources/data.sql
```

### 2. Backend

```bash
cd backend
# Ajuste credenciais em src/main/resources/application.properties
mvn spring-boot:run
# API disponível em http://localhost:8080
```

### 3. Frontend

```bash
cd frontend
npm install
npm start
# App disponível em http://localhost:4200
```

---

## Criar um novo administrador

Após o primeiro deploy, chamar:

```bash
curl -X POST https://seu-backend.onrender.com/api/setup/admin \
  -H "Content-Type: application/json" \
  -d '{
    "setupKey": "sua-SETUP_SECRET_KEY",
    "name": "Seu Nome",
    "email": "admin@exemplo.com",
    "password": "SenhaForte@123"
  }'
```

Acesse depois em `/admin` para gerenciar necessidades de doação e visualizar contatos recebidos.

---

## Endpoints da API

| Método | Rota                        | Descrição                              |
|--------|-----------------------------|----------------------------------------|
| GET    | `/api/donation-needs`       | Lista necessidades (`?activeOnly=true`)|
| GET    | `/api/donation-needs/{id}`  | Busca necessidade por ID               |
| POST   | `/api/donation-needs`       | Cria nova necessidade                  |
| PUT    | `/api/donation-needs/{id}`  | Atualiza necessidade                   |
| DELETE | `/api/donation-needs/{id}`  | Remove necessidade                     |
| GET    | `/api/contacts`             | Lista contatos (`?type=VOLUNTEER`)     |
| GET    | `/api/contacts/{id}`        | Busca contato por ID                   |
| POST   | `/api/contacts`             | Envia formulário de voluntário/apoio   |
| POST   | `/api/setup/admin`          | Criar administrador (protegido por `SETUP_SECRET_KEY`) |

---

## Páginas do frontend

| Rota             | Componente              | Descrição                                  |
|------------------|-------------------------|--------------------------------------------|
| `/`              | `HomeComponent`         | Apresentação institucional                 |
| `/doacoes`       | `DonationsComponent`    | Quadro de necessidades + PIX               |
| `/voluntariado`  | `VolunteerFormComponent`| Cadastro de voluntário e pedido de apoio   |
| `/admin`         | `AdminComponent`        | Painel interno – CRUD de necessidades + contatos recebidos |

---

## Paleta de cores

| Token        | Hex       | Uso                    |
|--------------|-----------|------------------------|
| `cream`      | `#FDFBF7` | Background principal   |
| `olive`      | `#4A6B5D` | Cor primária / headers |
| `terra`      | `#D97757` | CTAs / destaque        |
| `sand`       | `#F5F0E8` | Fundos de seções       |
| `warm-gray`  | `#8C7B6B` | Textos secundários     |
