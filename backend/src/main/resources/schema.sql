-- ============================================================
-- CONEXAO ILPI - MySQL DDL Script
-- Database: conexao_ilpi
-- ============================================================

-- ------------------------------------------------------------
-- Table: donation_need
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS donation_need (
    id               BIGINT          NOT NULL AUTO_INCREMENT,
    title            VARCHAR(150)    NOT NULL,
    description      TEXT,
    category         VARCHAR(80)     NOT NULL,
    target_quantity  INT             NOT NULL DEFAULT 0,
    current_quantity INT             NOT NULL DEFAULT 0,
    status           ENUM('NEEDED','PARTIALLY_MET','MET') NOT NULL DEFAULT 'NEEDED',
    created_at       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: volunteer_contact
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS volunteer_contact (
    id            BIGINT          NOT NULL AUTO_INCREMENT,
    name          VARCHAR(150)    NOT NULL,
    phone         VARCHAR(20)     NOT NULL,
    email         VARCHAR(150),
    interest_area VARCHAR(100),
    message       TEXT,
    request_type  ENUM('VOLUNTEER','SUPPORT_REQUEST') NOT NULL,
    sent_at       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: admin_user
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_user (
    id            BIGINT          NOT NULL AUTO_INCREMENT,
    name          VARCHAR(150)    NOT NULL,
    email         VARCHAR(150)    NOT NULL UNIQUE,
    password_hash VARCHAR(255)    NOT NULL,
    role          ENUM('ADMIN','STAFF') NOT NULL DEFAULT 'STAFF',
    created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
