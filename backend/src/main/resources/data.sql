-- ============================================================
-- CONEXAO ILPI - Seed Data
-- Runs after schema.sql on every startup (spring.sql.init.mode=always).
-- INSERT IGNORE ensures re-runs are idempotent — existing rows are skipped.
-- ============================================================

-- ------------------------------------------------------------
-- Donation needs
-- ------------------------------------------------------------
INSERT IGNORE INTO donation_need (id, title, description, category, target_quantity, current_quantity, status, created_at) VALUES
(1,  'Fraldas Geriátricas G',     'Fraldas descartáveis para adultos tamanho G. Uso diário pelos residentes.',  'Higiene',     200, 30,  'NEEDED',        NOW()),
(2,  'Fraldas Geriátricas M',     'Fraldas descartáveis para adultos tamanho M.',                                'Higiene',     150, 60,  'NEEDED',        NOW()),
(3,  'Leite Integral (cx 1L)',    'Leite integral UHT para complementação alimentar dos idosos.',                'Alimentação', 100, 20,  'NEEDED',        NOW()),
(4,  'Sabonete Líquido',          'Sabonete líquido neutro para higiene pessoal dos residentes.',                'Higiene',      50, 10,  'NEEDED',        NOW()),
(5,  'Shampoo Neutro',            'Shampoo suave/neutro para uso diário.',                                       'Higiene',      40, 40,  'MET',           NOW()),
(6,  'Lenços Umedecidos',         'Caixas de lenços umedecidos sem perfume.',                                    'Higiene',      80, 25,  'NEEDED',        NOW()),
(7,  'Creme Hidratante Corporal', 'Creme hidratante para prevenção de lesões por pressão.',                     'Higiene',      30, 10,  'NEEDED',        NOW()),
(8,  'Arroz (5kg)',               'Arroz branco tipo 1 para a cozinha da instituição.',                          'Alimentação',  60, 30,  'PARTIALLY_MET', NOW()),
(9,  'Feijão Carioca (1kg)',      'Feijão carioca para a alimentação diária dos residentes.',                    'Alimentação',  60, 15,  'NEEDED',        NOW()),
(10, 'Óleo de Soja (900ml)',      'Óleo de soja para preparo das refeições.',                                    'Alimentação',  40, 40,  'MET',           NOW()),
(11, 'Cadeiras de Rodas',         'Cadeiras de rodas em bom estado de conservação.',                             'Equipamento',   5,  1,  'NEEDED',        NOW()),
(12, 'Andadores',                 'Andadores para apoio de locomoção dos idosos.',                               'Equipamento',  10,  3,  'NEEDED',        NOW());

-- ------------------------------------------------------------
-- Volunteer / contact entries (demo)
-- ------------------------------------------------------------
INSERT IGNORE INTO volunteer_contact (id, name, phone, email, interest_area, message, request_type, sent_at) VALUES
(1, 'Maria Silva',  '(81) 99001-1234', 'maria.silva@email.com', 'Saúde / Enfermagem',     'Sou técnica de enfermagem e gostaria de ajudar aos fins de semana.', 'VOLUNTEER',       NOW()),
(2, 'João Pereira', '(81) 98765-4321', 'joao.p@email.com',      'Atividades Recreativas', 'Músico amador, quero levar alegria aos idosos com violão.',         'VOLUNTEER',       NOW()),
(3, 'Ana Souza',    '(81) 91234-5678', NULL,                     NULL,                     'Preciso de informações sobre como internar minha mãe de 80 anos.', 'SUPPORT_REQUEST', NOW());

-- ------------------------------------------------------------
-- Admin users (password: Admin@123 — bcrypt hash, dev only)
-- ------------------------------------------------------------
INSERT IGNORE INTO admin_user (id, name, email, password_hash, role) VALUES
(1, 'Administrador', 'admin@conexaoilpi.com.br',  '$2a$12$KIX6b1V9tg4OhBqDtbkXSeP2FvLHqzQGl7VlnZw0hLCPqJ4RpPVYe', 'ADMIN'),
(2, 'Equipe ILPI',   'equipe@conexaoilpi.com.br', '$2a$12$KIX6b1V9tg4OhBqDtbkXSeP2FvLHqzQGl7VlnZw0hLCPqJ4RpPVYe', 'STAFF');
