# ChecklistSys (Gerador de Checklist)

Sistema web para padronização e geração automática de checklists de manutenção de equipamentos, com integração para busca de informações de BIOS via leitura de PDF.

## 🚀 Tecnologias

- **Backend**: Java 17, Spring Boot 3.x, Apache PDFBox (para leitura de BIOS).
- **Frontend**: React, TypeScript, Vite, Tailwind CSS v4.

## 📋 Funcionalidades

1.  **Gerador de Checklist**: Formulário padronizado que gera um texto formatado para tickets de suporte.
2.  **Busca Rápida de BIOS**: Preenchimento automático da versão da BIOS ao digitar o SKU no formulário principal.
3.  **Pesquisa Detalhada de BIOS** (Novo): Modal dedicado para consultar SKU, Descrição, PEP, Código e Versão completa da BIOS.
4.  **Temas**: Suporte a múltiplos temas visuais (Padrão, Dark Mode, Cyberpunk, etc.).
5.  **Histórico Local**: Salva os últimos checklists gerados no navegador.

## ⚙️ Pré-requisitos

- Java JDK 17+
- Node.js 18+
- Maven

## 🛠️ Instalação e Execução

### 1. Configurar o Backend
O backend procura pelo arquivo PDF de BIOS no caminho absoluto hardcoded em `BiosService.java`.
*Certifique-se de que o arquivo `Bios Governo.pdf` esteja no local correto ou ajuste o caminho no código.*

```bash
cd backend
mvn spring-boot:run
```
O servidor iniciará em `http://localhost:8080`.

### 2. Rodar o Frontend
Em um novo terminal:

```bash
cd frontend
npm install  # Apenas na primeira vez
npm run dev
```
O frontend iniciará (geralmente em `http://localhost:5173`).

## 📖 Como Usar

### Pesquisa Detalhada de BIOS
1.  No canto superior direito, clique em **Configurações** (ou no ícone de engrenagem).
2.  Selecione **🔍 Pesquisa Detalhada BIOS**.
3.  Digite o SKU (ex: `1503709`) e pressione Enter ou clique em **Buscar**.
4.  As informações detalhadas (PEP, Código, Versão Completa) serão exibidas.

### Geração de Checklist
1.  Preencha o SKU na barra superior da página inicial e clique em **Pesquisar** para auto-preencher a versão da BIOS.
2.  Complete o formulário com os testes realizados.
3.  Clique em **Gerar Checklist**.
4.  Copie o texto gerado na área de "Resultado".
