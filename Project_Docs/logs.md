# Logs do Projeto

## [Data] Inicialização do Projeto
- Esturtura Project_Docs criada.
- tasks.md criado.
- logs.md criado.

## [Data] Configuração Backend
- Estrutura Spring Boot criada manualmente.
- Implementado ChecklistDTO.
- Implementado ChecklistController.

## [Data] Configuração Frontend
- Projeto React (Vite) criado.
- Tailwind CSS v4 configurado (com plugin @tailwindcss/vite).
- Componentes ChecklistForm e ChecklistOutput implementados.
- Integração com Backend via fetch API implementada.
- Build verificado e corrigido.

## [Data] Melhorias UI/UX
- Implementado componente Navbar responsivo.
- Adicionado seletor de temas.
- Adicionada lógica de seleção de tipo de equipamento (Desktop/Notebook/MiniDesk).
- Implementada visibilidade condicional para campos "Adaptador AC/DC" e "Chave Windows".

## [2026-01-27] Preparação Deploy Vercel
- Adicionado `vercel.json` para suportar rotas SPA (rewrites).
- Validado build de produção (`npm run build`).
- Atualizado tasks.md com checklist de deploy.

## [2026-01-27] Migração Backend para Nuvem
- Configurado `Procfile` e `runtime.txt` para deploy no Render.
- Migrado banco de dados para suportar **PostgreSQL (Neon Database)** via `DATABASE_URL`.
- Adicionado driver `psycopg2-binary`.
- Criado Guia de Deploy (`deploy_guide.md`) com instruções de Neon + Render + UptimeRobot.
