#!/usr/bin/env python3
"""
build_nseng_v2.py
Substitui TODO o conteúdo do clone nsengenharia.com.br com as informações
da NS Engenharia & Energia (de ns-engenharia/index.html).
"""
import re, os

BASE = "/home/carlos/Antigravity/landing/copia-nsengenharia/ns-engenharia-v2"
SRC  = os.path.join(BASE, "index.html")

with open(SRC, "r", encoding="utf-8") as f:
    html = f.read()

# ═══════════════════════════════════════════════════════════════════════════
# HELPER
# ═══════════════════════════════════════════════════════════════════════════
def r(old, new, count=0):
    """Replace wrapper that reports what happened."""
    global html
    c = html.count(old)
    if c == 0:
        print(f"  ⚠️  NOT FOUND: {old[:80]}")
        return
    if count:
        html = html.replace(old, new, count)
    else:
        html = html.replace(old, new)
    print(f"  ✅ Replaced ({c}x): {old[:60].strip()}")


print("=" * 70)
print("1. TITLE & META")
print("=" * 70)

r("Grupo Novais Santos | Engenharia e Arquitetura em São Paulo",
  "NS Engenharia & Energia | Projetos Elétricos em Parnaíba-PI")

r("Engenharia e arquitetura integradas desde 1996. Mais de 1.000 projetos executados para hospitais, hotéis e shoppings em São Paulo. Solicite um orçamento.",
  "Soluções completas em projetos elétricos de baixa e média tensão, subestações abrigadas e aéreas, redes e iluminação, fotovoltaico até 5 MW e energia crítica. Sede em Parnaíba-PI.")

r("Grupo Novais Santos",
  "NS Engenharia & Energia")

print()
print("=" * 70)
print("2. HEADER LOGO")
print("=" * 70)

# Replace nav logo
r('wp-content/uploads/2026/09/logo-icon.svg',
  'assets-nseng/img/logo-horizontal-180.webp')

# Footer logo
r('wp-content/uploads/2026/09/logo-full.svg',
  'assets-nseng/img/logo-horizontal-white-180.webp')

print()
print("=" * 70)
print("3. NAV LINKS")
print("=" * 70)

r('>Quem Somos</a>', '>Quem Somos</a>')  # keep
r('>Serviços<', '>Escopo de Projetos<')
r('>Cases<', '>Diferenciais<')
r('>Clientes</a>', '>Homologações</a>')
r('>Blog</a>', '>Outros Serviços</a>')
r('>Contato</a>', '>Fale Conosco</a>')

print()
print("=" * 70)
print("4. HERO SECTION")
print("=" * 70)

# Hero title
r("Engenharia e arquitetura integradas para soluções completas",
  "Soluções em Projetos de Engenharia Elétrica")

# Hero subtitle
r("Desde 1996, unimos projetos e execução para entregar empreendimentos com mais segurança, sustentabilidade, eficiência, controle e funcionalidade.",
  "Alta Confiabilidade Técnica e Eficiência Energética. Projetos elétricos sob medida de baixa e média tensão, subestações, fotovoltaico e O&M de energia crítica.")

# Hero CTA buttons
r(">Solicite um Orçamento</a>",
  ">Conhecer Escopo de Projetos</a>")
r(">Confira nosso Portfólio</a>",
  ">Fale Conosco</a>")

# Hero background image
r("wp-content/uploads/2026/09/hero-bg.webp",
  "assets-nseng/img/hero-clean-960.webp")

# Hero icone
r("wp-content/uploads/2026/09/hero-icone.svg",
  "assets-nseng/img/logo-horizontal-180.webp")

print()
print("=" * 70)
print("5. STATS / COUNTERS")
print("=" * 70)

# Original: 28+ anos, +1.000 projetos, +400 obras
r(">28+</", ">01</")
r(">anos de experiência</", ">Engenheiro Eletricista</")
r(">+1.000</", ">01</")
r(">projetos executados</", ">Engenheiro Civil</")
r(">+400</", ">02</")
r(">obras entregues</", ">Técnicos Projetistas</")

print()
print("=" * 70)
print("6. SERVICE CARDS SECTION")
print("=" * 70)

# Section title: "Soluções completas para cada etapa do projeto"
r("Soluções completas<br> para cada etapa do projeto",
  "Portfólio de Atuação<br>Escopo de Projetos em Engenharia Elétrica")

# Service Card 1: Engenharia → Projetos Elétricos BT/MT
r(">Engenharia</h3>",
  ">Projetos Elétricos BT/MT</h3>")

# Service Card 2: Arquitetura → Subestações Abrigadas
r(">Arquitetura</h3>",
  ">Subestações Abrigadas</h3>")

# Service Card 3: Instalações → Redes e Iluminação
r(">Instalações</h3>",
  ">Redes e Iluminação</h3>")

# Service Card 4: Infraestruturas → Subestação Aérea e EMUC
r(">Infraestruturas</h3>",
  ">Subestação Aérea e EMUC</h3>")

# Service Card 5: Manutenção e Suporte Técnico → Fotovoltaico
r("Manutenção e<br>Suporte Técnico</h3>",
  "Usinas Solares<br>Fotovoltaicas</h3>")

# Descriptions under service cards
r("Desenvolvimento de projetos técnicos, estruturais, hidráulicos e elétricos com precisão e economia.",
  "Projetos completos para instalações elétricas prediais, comerciais e industriais — BT, MT, SPDA e iluminação.")

r("Projetos residenciais, comerciais e corporativos com design funcional e linguagem contemporânea.",
  "Subestações em alvenaria e cabines blindadas (abrigadas), transformadores a óleo e a seco, QTA e geradores. 300 kVA a 2.500 kVA.")

r("Execução e gerenciamento de obras, reformas e retrofits com controle de qualidade e cronograma.",
  "Redes aéreas e subterrâneas em média e baixa tensão, eletrificação para loteamentos e iluminação pública LED.")

r("Projetos de redes elétricas, hidráulicas, drenagem e pavimentação de infraestrutura urbana.",
  "Subestações aéreas em poste, EMUC para centros comerciais e compatibilização com normas da concessionária. 35 kVA a 300 kVA.")

r("Contratos de manutenção preventiva e corretiva para edificações e sistemas técnicos.",
  "Usinas solares de minigeração distribuída, sistemas on-grid, estudos de sombreamento e dimensionamento. Até 5 MW.")

print()
print("=" * 70)
print("7. ATUAÇÃO INTEGRADA → CORPO TÉCNICO")
print("=" * 70)

r("<strong>Atuação integrada</strong> em soluções técnicas e <strong>execução de alto padrão.</strong>",
  "<strong>Corpo Técnico Qualificado</strong> — Profissionais experientes em <strong>engenharia elétrica e energia.</strong>")

# Platform cards: Corporativo, Hospitalar, etc → Especialidades
r(">Corporativo</h3>", ">Baixa Tensão</h3>")
r(">Hospitalar</h3>", ">Média Tensão</h3>")
r(">Comercial</h3>", ">Fotovoltaico</h3>")
r(">Hotelaria</h3>", ">Subestações</h3>")
r(">Industrial</h3>", ">Aterramento</h3>")
r("Projetos<br>de Retrofit</h3>", "SPDA<br>e Para-raios</h3>")

print()
print("=" * 70)
print("8. CLIENTS → HOMOLOGAÇÕES")
print("=" * 70)

r("Empresas que <span>confiam</span> na <strong>Novais Santos</strong>",
  "Homologação junto a <span>concessionárias</span> — <strong>Aprovação Garantida</strong>")

# Client logos → Concessionária logos
r("wp-content/uploads/2026/09/nike.webp", "assets-nseng/img/equa.avif")
r("wp-content/uploads/2026/09/globo.webp", "assets-nseng/img/cpfl.avif")
r("wp-content/uploads/2026/09/armarinhos-fernando.webp", "assets-nseng/img/enel.avif")
r("wp-content/uploads/2026/09/john-deere.webp", "assets-nseng/img/neo.avif")
r("wp-content/uploads/2026/09/santa-marcelina.webp", "assets-nseng/img/equa.avif")
r("wp-content/uploads/2026/09/smart-white.webp", "assets-nseng/img/cpfl.avif")
r("wp-content/uploads/2026/10/nike-white.webp", "assets-nseng/img/equa.avif")

print()
print("=" * 70)
print("9. CASES → ESCOPO DE PROJETOS")
print("=" * 70)

r("Resultados que comprovam<br><strong>nossa excelência</strong>",
  "Desenhos técnicos CAD<br><strong>de nossos projetos executivos</strong>")

# Case 1
r("Hospital Santa<br>Marcelina | Teatro",
  "Projetos Elétricos<br>Baixa e Média Tensão")

# Case 2
r("Cidade<br>Matarazzo",
  "Subestações<br>Abrigadas")

# Case 3
r("Hotel W<br>São Paulo",
  "Redes de<br>Distribuição")

# Case 4
r("Shopping<br>Iguatemi SP",
  "Usina Solar<br>Fotovoltaica")

# Case images → CAD drawings
r("wp-content/uploads/2026/09/case-santa-marcelina.jpg", "assets-nseng/img/s5-cad-eletrico.webp")
r("wp-content/uploads/2026/09/case-cidade-matarazzo.jpg", "assets-nseng/img/s5-cad-abrigada.webp")
r("wp-content/uploads/2026/09/case-hotel-w.jpg", "assets-nseng/img/s5-cad-redes.webp")
r("wp-content/uploads/2026/09/case-iguatemi.jpg", "assets-nseng/img/s5-cad-solar.webp")

# Smaller versions
r("wp-content/uploads/2026/09/case-santa-marcelina-169x300.jpg", "assets-nseng/img/s5-cad-eletrico-480.webp")
r("wp-content/uploads/2026/09/case-santa-marcelina-576x1024.jpg", "assets-nseng/img/s5-cad-eletrico.webp")
r("wp-content/uploads/2026/09/case-cidade-matarazzo-169x300.jpg", "assets-nseng/img/s5-cad-abrigada-480.webp")
r("wp-content/uploads/2026/09/case-cidade-matarazzo-576x1024.jpg", "assets-nseng/img/s5-cad-abrigada.webp")
r("wp-content/uploads/2026/09/case-hotel-w-169x300.jpg", "assets-nseng/img/s5-cad-redes-480.webp")
r("wp-content/uploads/2026/09/case-hotel-w-576x1024.jpg", "assets-nseng/img/s5-cad-redes.webp")
r("wp-content/uploads/2026/09/case-iguatemi-169x300.jpg", "assets-nseng/img/s5-cad-solar-480.webp")
r("wp-content/uploads/2026/09/case-iguatemi-576x1024.jpg", "assets-nseng/img/s5-cad-solar.webp")

print()
print("=" * 70)
print("10. ABOUT / HISTORY → QUEM SOMOS")
print("=" * 70)

r("Uma história construída com <strong>trabalho, evolução e excelência</strong>",
  "Quem Somos — Engenharia com <strong>eficiência, segurança e inovação</strong>")

# History timeline text
r("O Grupo Novais Santos nasceu em 1996, quando o engenheiro civil Renato Novais Santos fundou a empresa com um propósito claro: oferecer soluções completas em engenharia e arquitetura, com qualidade e excelência em cada projeto.",
  "A NS Engenharia & Energia atua de forma estratégica na elaboração e execução de projetos elétricos sob medida, atendendo aos mais rigorosos padrões técnicos e regulatórios do setor.")

r("Ao longo de quase três décadas, a Novais Santos evoluiu continuamente, expandindo sua atuação para grandes obras corporativas, hospitalares e comerciais, consolidando-se como referência no mercado paulistano.",
  "Com sede em Parnaíba - Piauí, nosso compromisso é aliar eficiência energética, segurança operacional e viabilidade econômica a cada solução desenvolvida, garantindo instalações modernas, seguras e em conformidade com as normas vigentes.")

r("Hoje, a empresa opera com equipe multidisciplinar especializada, capaz de atuar desde a concepção do projeto até a entrega final da obra, com controle rigoroso de qualidade, prazo e custo.",
  "Desde 2019, somos referência em engenharia elétrica e energia renovável, com atuação em projetos de baixa e média tensão, subestações, fotovoltaico e O&M de energia crítica.")

# History image
r("wp-content/uploads/2026/09/about-history-founders.jpg", "assets-nseng/img/quem-somos-clean-960.webp")
r("wp-content/uploads/2026/09/about-history-founders-300x200.jpg", "assets-nseng/img/quem-somos-clean-480.webp")
r("wp-content/uploads/2026/09/about-history-founders-1024x683.jpg", "assets-nseng/img/quem-somos-clean-960.webp")
r("wp-content/uploads/2026/09/about-history-founders-768x512.jpg", "assets-nseng/img/quem-somos-clean-960.webp")

print()
print("=" * 70)
print("11. DIFFERENTIALS → DIFERENCIAIS")
print("=" * 70)

r("Mais controle, mais eficiência e <strong>melhores resultados.</strong>",
  "Diferenciais Competitivos — <strong>Excelência em Cada Detalhe</strong>")

r("Integração entre<br>projeto e execução",
  "Conformidade e<br>Aprovação Rápida")

r("Equipe técnica<br>especializada.",
  "Segurança e<br>Eficiência Energética")

r("Controle técnico<br>em todas as etapas",
  "Atendimento<br>Regional Personalizado")

r("Otimização de<br>prazos", "Experiência em<br>Energia Renovável")
r("Visão prática<br>de obra", "Compatibilidade com<br>Normas ABNT")

# Differential descriptions
r("Do projeto à execução, integramos todas as frentes com planejamento técnico unificado — evitando retrabalhos e otimizando resultados.",
  "Projetos em estrita conformidade com ABNT e padrões das concessionárias (Equatorial, ENEL, CPFL), minimizando exigências e prazos de aprovação.")

r("Engenheiros e arquitetos seniores que dominam normas, compatibilização e as exigências reais de cada tipo de obra.",
  "Dimensionamento criterioso focado na redução de perdas, segurança dos usuários e máxima eficiência das instalações elétricas.")

r("Acompanhamento contínuo de prazos, custos e qualidade com indicadores objetivos e relatórios técnicos periódicos.",
  "Presença ativa e conhecimento da realidade técnica e regulatória local, com agilidade e proximidade com o cliente em Parnaíba-PI.")

r("Planejamento detalhado de cronograma com foco em antecipação de interferências e entregas dentro do prazo.",
  "Engenharia completa para geração solar distribuída, usinas em solo ou telhado, O&M de usinas solares e energia crítica.")

r("Experiência real de canteiro aplicada desde a fase de projeto, evitando soluções que só funcionam no papel.",
  "Projetos elaborados em total conformidade com NR10, NBR 5410, NBR 14039, NBR 5419 e normas das distribuidoras locais.")

print()
print("=" * 70)
print("12. TESTIMONIALS → NOSSOS SERVIÇOS COMPLEMENTARES")
print("=" * 70)

r("O que dizem sobre a <strong>nossa entrega</strong>",
  "Outros Serviços — <strong>Soluções Complementares</strong>")

# Testimonial 1
r("A equipe da Novais Santos entregou o projeto do hospital com nível de detalhe e precisão que dificilmente encontramos no mercado.",
  "Operação e Manutenção (O&M) de Usinas Solares — monitoramento contínuo, limpeza de módulos, análise termográfica e relatórios de desempenho.")

r("Dr. Eduardo Yamane<br>Diretor Clínico — Hospital Santa Marcelina",
  "Serviço Especializado<br>Energia Solar Fotovoltaica")

# Testimonial 2
r("A entrega foi impecável, dentro do prazo e com soluções que otimizaram nosso investimento. Recomendamos sem hesitar.",
  "Sistemas de Energia Crítica: Nobreaks e Geradores — dimensionamento, instalação, comissionamento e manutenção preventiva de UPS e grupos geradores.")

r("Arq. Marina Lopes<br>Coordenadora de Incorporação — Matarazzo Inc.",
  "Serviço Especializado<br>Energia Crítica e Backup")

# Testimonial 3
r("Profissionais comprometidos, com domínio técnico e capacidade de resolver problemas complexos em obras de alta complexidade.",
  "Laudos Técnicos, Estudos de Proteção e Seletividade, e Consultoria em Eficiência Energética e Mercado Livre de energia.")

r("Eng. Roberto Tanaka<br>Gerente de Obras — Iguatemi Empresa de Shopping Centers",
  "Serviço Especializado<br>Laudos e Consultoria Energética")

print()
print("=" * 70)
print("13. BLOG → ESCOPO DETALHADO")
print("=" * 70)

r("Artigos e notícias",
  "Áreas de Atuação Detalhadas")

r("Compatibilização de Projetos: O Custo de Não Fazer",
  "Projetos Elétricos de Baixa e Média Tensão — Residencial, Comercial e Industrial")

r("Arquitetura Minimalista para espaços corporativos",
  "Subestações Transformadoras Abrigadas — 300 kVA a 2.500 kVA")

r("Top 5 materiais sustentáveis na construção moderna",
  "Redes de Distribuição, Iluminação Pública e Subestação Aérea / EMUC")

# Blog images → NS Eng project images
r("wp-content/uploads/2026/09/blog-compatibilizacao.jpg", "assets-nseng/img/s5-cad-eletrico.webp")
r("wp-content/uploads/2026/09/blog-compatibilizacao-300x200.jpg", "assets-nseng/img/s5-cad-eletrico-480.webp")
r("wp-content/uploads/2026/09/blog-compatibilizacao-1024x683.jpg", "assets-nseng/img/s5-cad-eletrico.webp")

r("wp-content/uploads/2026/09/blog-arquitetura.jpg", "assets-nseng/img/s5-cad-abrigada.webp")
r("wp-content/uploads/2026/09/blog-arquitetura-300x200.jpg", "assets-nseng/img/s5-cad-abrigada-480.webp")
r("wp-content/uploads/2026/09/blog-arquitetura-1024x683.jpg", "assets-nseng/img/s5-cad-abrigada.webp")

r("wp-content/uploads/2026/09/blog-sustentavel.jpg", "assets-nseng/img/s5-cad-redes.webp")
r("wp-content/uploads/2026/09/blog-sustentavel-300x200.jpg", "assets-nseng/img/s5-cad-redes-480.webp")
r("wp-content/uploads/2026/09/blog-sustentavel-1024x683.jpg", "assets-nseng/img/s5-cad-redes.webp")

print()
print("=" * 70)
print("14. CONTACT SECTION")
print("=" * 70)

r("Envie uma mensagem <br>e fale com nossos especialistas",
  "Fale Conosco —<br>Vamos Conversar Sobre o Seu Projeto?")

# Phone
r("(11) 97000-0000", "(86) 9 9595-5663")
r("+5511970000000", "+5586995955663")
# Email
r("contato@novaissantos.com.br", "contato@nsengenharia.com.br")
# Address
r("São Paulo – SP", "Parnaíba – PI")
r("Av. Paulista, 1000", "Rua Caramuru, nº 400, 1º andar, Sala 03")
r("Bela Vista, São Paulo", "Bairro São Francisco — Parnaíba")
# Footer copyright
r("© 2026 Grupo Novais Santos. Todos os direitos reservados.",
  "© 2026 NS Engenharia e Energia Renovável. Todos os direitos reservados.")
r("CNPJ: 00.000.000/0001-00 — Responsável Técnico: Eng. Renato Novais Santos (CREA/SP 0000000000)",
  "Parnaíba — Piauí · Responsável Técnico: Ranieri Freitas (Engenheiro Eletricista)")

print()
print("=" * 70)
print("15. SERVICE SECTION IMAGES → NS ENG IMAGES")
print("=" * 70)

# Service section images that still point to wp-content
r("wp-content/uploads/2026/09/servico-engenharia-opt.webp", "assets-nseng/img/painel-multimetro-clean-960.webp")
r("wp-content/uploads/2026/09/servico-arquitetura-opt.webp", "assets-nseng/img/quem-somos-clean-960.webp")
r("wp-content/uploads/2026/09/servico-instalacoes-opt.webp", "assets-nseng/img/rede-tech-clean-960.webp")
r("wp-content/uploads/2026/09/servico-infraestrutura-opt.webp", "assets-nseng/img/time-tecnico-clean-960.webp")
r("wp-content/uploads/2026/09/servico-manutencao-opt.webp", "assets-nseng/img/hero-clean-960.webp")

print()
print("=" * 70)
print("16. INLINE JSON-LD SCHEMA")
print("=" * 70)

# Schema.org
r('"name":"NS Engenharia & Energia | Engenharia e Arquitetura em São Paulo"',
  '"name":"NS Engenharia & Energia | Projetos Elétricos em Parnaíba-PI"')

# WhatsApp link
r("https://wa.me/5511970000000", "https://wa.me/5586995955663")

print()
print("=" * 70)
print("17. BANNER → NS ENGENHARIA")
print("=" * 70)

# Remove old banner completely and add new one
old_banner_start = '<div style="background:#0C2740;'
if old_banner_start in html:
    banner_end = '</div>\n\n\n\n'
    start_idx = html.find(old_banner_start)
    end_idx = html.find(banner_end, start_idx)
    if end_idx > start_idx:
        old_banner = html[start_idx:end_idx + len(banner_end)]
        new_banner = '''<div style="background:#0C2740;color:#ffffff;padding:8px 16px;display:flex;align-items:center;justify-content:space-between;font-family:'Roboto',sans-serif;font-size:13px;border-bottom:1px solid #F5821F;position:relative;z-index:999999;">
  <div style="display:flex;align-items:center;gap:12px;">
    <strong style="color:#F5821F;letter-spacing:0.5px;">NS ENGENHARIA & ENERGIA</strong>
    <span style="opacity:0.85;">Preview com design do nsengenharia.com.br — conteúdo NS Engenharia & Energia</span>
  </div>
  <div style="display:flex;gap:10px;">
    <span style="color:#F5821F;font-weight:600;padding:4px 8px;border:1px solid #F5821F;border-radius:4px;">Parnaíba - PI</span>
  </div>
</div>


'''
        html = html.replace(old_banner, new_banner, 1)
        print("  ✅ Banner substituído")
    else:
        print("  ⚠️  Banner end not found")
else:
    print("  ⚠️  Banner not found")

print()
print("=" * 70)
print("18. HERO BACKGROUND CSS FORCE")
print("=" * 70)

# Add forced hero background CSS with NS Eng image
hero_inject = '''<style id="nseng-hero-force">
.elementor .e-64fd5cb-2150a8c {
  background-image: url('assets-nseng/img/hero-clean-960.webp') !important;
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
}
</style>'''

# Insert before </head>
html = html.replace('</head>', hero_inject + '\n</head>', 1)
print("  ✅ Hero background CSS injetado")

# ═══════════════════════════════════════════════════════════════════════════
# SAVE
# ═══════════════════════════════════════════════════════════════════════════
with open(SRC, "w", encoding="utf-8") as f:
    f.write(html)

print()
print("=" * 70)
print("✅ SALVO: " + SRC)
print("=" * 70)

# Verification
checks = [
    ("Título NS Engenharia", "NS Engenharia" in html),
    ("Parnaíba-PI", "Parnaíba" in html),
    ("Ranieri Freitas", "Ranieri Freitas" in html),
    ("Logo NS Eng", "logo-horizontal" in html),
    ("Escopo projetos", "Escopo de Projetos" in html),
    ("Subestações", "Subestações" in html or "Subesta" in html),
    ("Fotovoltaico", "Fotovoltaico" in html or "fotovoltaico" in html),
    ("Homologações", "Homologação" in html or "concessionárias" in html),
    ("Telefone correto", "9595-5663" in html),
    ("Email correto", "contato@nsengenharia" in html),
    ("Assets nseng", "assets-nseng/" in html),
    ("Hero CSS forçado", "nseng-hero-force" in html),
]

print("\n📋 Verificações finais:")
ok_count = 0
for label, ok in checks:
    status = "✅" if ok else "❌"
    if ok: ok_count += 1
    print(f"  {status} {label}")
print(f"\n{ok_count}/{len(checks)} verificações passaram")
