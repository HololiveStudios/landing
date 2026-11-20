# Landing Pages - NS Engenharia & NS Wind

## 1. Objetivo e Finalidade
Conjunto de landing pages institucionais e comerciais de alta velocidade para captação de clientes em engenharia elétrica e energia solar/eólica.

## 2. Tecnologias Utilizadas
- HTML5, CSS3, JavaScript, Python (Scripts de automação e build), Firebase Hosting, Puppeteer, Sharp

## 3. Arquitetura e Estrutura de Diretórios
Monorepo de sites estáticos otimizados dividido em:
- `nseng/`: Landing page institucional da NS Engenharia.
- `nswind/`: Landing page comercial da NS Wind.
- `scripts/` e arquivos Python (`build_nswind.py`, `fix_nswind_v2.py`): Automação de otimização de imagens e minificação.

## 4. Principais Arquivos e Responsabilidades
- `firebase.json`: Configuração de múltiplos sites no Firebase Hosting.
- `build_nswind.py`: Script Python para empacotamento e otimização das páginas.
- `nseng/`: Código-fonte e assets da NS Engenharia.
- `nswind/`: Código-fonte e assets da NS Wind.

## 5. Funcionalidades Identificadas
- Páginas com pontuação máxima no Google PageSpeed
- Otimização automatizada de imagens para WebP/AVIF com Sharp e Python
- Rastreamento de conversão com formulários integrados
- Hospedagem rápida e escalável via Firebase CDN

## 6. Como Compilar ou Executar
```bash
# Otimização e build
python3 build_nswind.py
# Deploy no Firebase
firebase deploy
```

## 7. Estado Atual do Projeto
**Completo**

## 8. Pendências e Limitações Identificadas
Atualizar depoimentos de clientes e certificados das instalações recentes.
