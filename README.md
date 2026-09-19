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

---

## Estrutura do projeto

```
Conexao-ILPI/
├── backend/          # Spring Boot Maven project
├── frontend/         # Angular SPA
└── db/
    ├── schema.sql    # DDL – criar tabelas
    └── seed.sql      # Dados de exemplo
```

---

## Como rodar

### 1. Banco de dados

```sql
-- No MySQL 8+
source db/schema.sql
source db/seed.sql
```

### 2. Backend

```bash
cd backend
# Ajuste usuário/senha em src/main/resources/application.properties
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
