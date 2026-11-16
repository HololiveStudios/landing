const fs = require('fs');
const path = require('path');

const cssContent = fs.readFileSync('ns-engenharia/css/compiled.min.css', 'utf8');
const navJs = fs.readFileSync('ns-engenharia/js/nav.js', 'utf8');
const mainJs = fs.readFileSync('ns-engenharia/js/main.js', 'utf8');

// Minify JS cleanly
function miniJs(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([\{\}\(\)\:;,=\+\-\*\/><&\|\!])\s*/g, '$1')
    .trim();
}

const minifiedJs = miniJs(navJs + '\n' + mainJs);

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NS Engenharia</title>
  <meta name="description" content="Soluções completas em projetos elétricos de baixa e média tensão, subestações abrigadas e aéreas, redes e iluminação, fotovoltaico até 5 MW e energia crítica. Sede em Parnaíba-PI.">
  <meta name="author" content="Ranieri Freitas — Engenheiro Eletricista">
  
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="NS Engenharia">
  <meta property="og:description" content="Projetos elétricos sob medida de baixa e média tensão, subestações, fotovoltaico e O&M de energia crítica.">
  <meta property="og:image" content="assets/img/hero-clean-960.webp">
  <meta property="og:url" content="https://nsengenharia.web.app">

  <!-- Favicons Oficiais da NS Engenharia -->
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="favicon-16.png">
  <link rel="icon" type="image/png" href="favicon.png">
  <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">

  <!-- Preload da Imagem Crítica do Hero (LCP) -->
  <link rel="preload" as="image" href="assets/img/hero-clean-480.webp" media="(max-width: 767px)" fetchpriority="high">
  <link rel="preload" as="image" href="assets/img/hero-clean-960.webp" media="(min-width: 768px)" fetchpriority="high">

  <!-- CSS Inlined: 100% livre de bloqueio de renderização -->
  <style>
${cssContent}
  </style>

  <!-- Dados Estruturados Schema.org -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "NS Engenharia & Energia",
    "legalName": "NS Engenharia e Energia Renovável",
    "description": "Soluções completas para projetos de engenharia elétrica de baixa e média tensão, subestações, fotovoltaico e O&M de energia crítica.",
    "telephone": "+55-86-99595-5663",
    "email": "contato@nsengenharia.com.br",
    "url": "https://nsengenharia.web.app",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Caramuru, nº 400, 1º andar, Sala 03",
      "addressLocality": "Parnaíba",
      "addressRegion": "PI",
      "addressCountry": "BR"
    },
    "founder": {
      "@type": "Person",
      "name": "Ranieri Freitas",
      "jobTitle": "Engenheiro Eletricista e Responsável Técnico"
    },
    "sameAs": [
      "https://www.instagram.com/nsengenhariaeenergia/"
    ]
  }
  </script>
</head>
<body>

  <!-- ==========================================================================
       Header Institucional
       ========================================================================== -->
  <header class="site-header" role="banner">
    <div class="container header-container">
      <a href="#inicio" class="brand-link" aria-label="NS Engenharia & Energia - Início">
        <img src="assets/img/logo-horizontal-white-180.webp"
             srcset="assets/img/logo-horizontal-white-180.webp 180w, assets/img/logo-horizontal-white.webp 320w"
             sizes="(max-width: 480px) 140px, 180px"
             alt="NS Engenharia & Energia"
             class="brand-logo-img"
             width="180" height="38"
             fetchpriority="high">
      </a>

      <!-- Navegação Principal -->
      <nav class="primary-nav" id="primary-nav" role="navigation" aria-label="Navegação Principal">
        <a href="#quem-somos" class="nav-link">Quem Somos</a>
        <a href="#equipe" class="nav-link">Equipe</a>
        <a href="#diferenciais" class="nav-link">Diferenciais</a>
        <a href="#escopo" class="nav-link">Escopo</a>
        <a href="#homologacoes" class="nav-link">Homologações</a>
        <a href="#outros-servicos" class="nav-link">Outros Serviços</a>
        <a href="#contato" class="nav-link nav-cta">Fale Conosco</a>
      </nav>

      <!-- Toggle Mobile -->
      <button type="button" class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Abrir menu de navegação">
        <svg class="icon-hamburger" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </header>

  <div class="nav-backdrop" id="nav-backdrop" aria-hidden="true"></div>

  <main id="main-content">

    <!-- ==========================================================================
         Seção 1 — Hero Institucional (PDF Pág. 1)
         ========================================================================== -->
    <section class="hero-section" id="inicio" aria-labelledby="hero-heading">
      <div class="hero-grid">
        <div class="hero-media-box">
          <picture>
            <source media="(max-width: 767px)" srcset="assets/img/hero-clean-480.webp" type="image/webp" width="480" height="268">
            <source media="(min-width: 768px)" srcset="assets/img/hero-clean-960.webp" type="image/webp" width="960" height="536">
            <img src="assets/img/hero-clean-960.webp" alt="Mão de engenheiro com instrumento de teste elétrico de precisão em bancada tecnológica" width="960" height="536" fetchpriority="high">
          </picture>
          <div class="diagonal-line" aria-hidden="true"></div>
        </div>

        <div class="hero-content">
          <span class="hero-badge">Portfólio de Atuação</span>
          <h1 id="hero-heading" class="hero-title">
            Soluções em Projetos de <span>Engenharia Elétrica</span>
          </h1>
          <p class="hero-subtitle">Alta Confiabilidade Técnica e Eficiência Energética</p>
          <div class="hero-actions">
            <a href="#escopo" class="btn-primary">Conhecer Escopo de Projetos</a>
            <a href="#contato" class="btn-secondary">Fale Conosco</a>
          </div>
        </div>
      </div>

      <div class="hero-corner-stripes" aria-hidden="true">
        <div class="left-orange-stripe"></div>
        <div class="right-dual-stripe">
          <div class="green-bar"></div>
          <div class="blue-bar"></div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         Seção 2 — Quem Somos (PDF Pág. 2)
         ========================================================================== -->
    <section class="about-section" id="quem-somos" aria-labelledby="about-heading">
      <div class="container">
        <div class="about-grid">
          <div class="about-text-col">
            <span class="section-label">Apresentação</span>
            <h2 id="about-heading" class="about-title">Quem Somos</h2>
            <p class="about-text">
              A <strong>NS Engenharia &amp; Energia</strong> atua de forma estratégica na elaboração e execução de projetos elétricos sob medida, atendendo aos mais rigorosos padrões técnicos e regulatórios do setor.
            </p>
            <p class="about-text">
              Com sede em <strong>Parnaíba - Piauí</strong>, nosso compromisso é aliar <strong>eficiência energética</strong>, <strong>segurança operacional</strong> e <strong>viabilidade econômica</strong> a cada solução desenvolvida, garantindo aos nossos clientes instalações modernas, seguras e em total conformidade com as normas vigentes.
            </p>
            <div class="about-badge-since">
              <span>★ Desde 2019 — Referência em Engenharia &amp; Energia</span>
            </div>
          </div>

          <div class="media-natural-frame media-frame-right">
            <picture>
              <source media="(max-width: 767px)" srcset="assets/img/quem-somos-clean-480.webp" type="image/webp" width="480" height="643">
              <source media="(min-width: 768px)" srcset="assets/img/quem-somos-clean-960.webp" type="image/webp" width="896" height="1200">
              <img src="assets/img/quem-somos-clean-960.webp" alt="Dois engenheiros da NS Engenharia com capacete e EPI em inspeção técnica de parque eólico" width="896" height="1200" loading="lazy" decoding="async">
            </picture>
            <div class="frame-accent-stripe" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         Seção 3 — Nosso Time Técnico (PDF Pág. 3)
         ========================================================================== -->
    <section class="team-section" id="equipe" aria-labelledby="team-heading">
      <div class="container">
        <div class="team-grid">
          <div class="media-natural-frame media-frame-left">
            <picture>
              <source media="(max-width: 767px)" srcset="assets/img/time-tecnico-clean-480.webp" type="image/webp" width="480" height="643">
              <source media="(min-width: 768px)" srcset="assets/img/time-tecnico-clean-960.webp" type="image/webp" width="896" height="1200">
              <img src="assets/img/time-tecnico-clean-960.webp" alt="Engenheiro eletrotécnico projetista desenvolvendo diagrama elétrico em estação técnica" width="896" height="1200" loading="lazy" decoding="async">
            </picture>
            <div class="frame-accent-stripe" aria-hidden="true"></div>
          </div>

          <div class="team-text-col">
            <span class="section-label">Corpo Técnico Qualificado</span>
            <h2 id="team-heading">Nosso Time Técnico</h2>
            <p style="margin-top: 1rem; color: var(--color-text-body);">
              Nosso time técnico é formado por profissionais altamente capacitados e experientes, dedicados a transformar desafios de engenharia em soluções viáveis e inovadoras.
            </p>

            <div class="team-metrics-list">
              <div class="metric-item">
                <span class="metric-number">01</span>
                <span class="metric-role">Engenheiro Eletricista</span>
              </div>
              <div class="metric-item">
                <span class="metric-number">01</span>
                <span class="metric-role">Engenheiro Civil</span>
              </div>
              <div class="metric-item">
                <span class="metric-number">02</span>
                <span class="metric-role">Técnicos Projetistas</span>
              </div>
            </div>

            <div class="team-specialties">
              <p>
                Atuação especializada em projetos elétricos de <strong>baixa e média tensão</strong>, <strong>subestações</strong>, dimensionamento fotovoltaico, sistemas de aterramento e <span class="spda-term" tabindex="0">SPDA</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         Seção 4 — Diferenciais Competitivos (PDF Pág. 4)
         ========================================================================== -->
    <section class="diff-section" id="diferenciais" aria-labelledby="diff-heading">
      <div class="container">
        <div class="diff-grid">
          <div>
            <span class="section-label">Excelência em Cada Detalhe</span>
            <h2 id="diff-heading">Diferenciais Competitivos</h2>

            <div class="diff-list">
              <div class="diff-card">
                <div class="diff-num">01</div>
                <div>
                  <h3>Conformidade e Aprovação Rápida</h3>
                  <p>Elaboração de projetos em estrita conformidade com as normas da ABNT e os padrões técnicos das concessionárias (Equatorial, ENEL, CPFL), minimizando exigências e prazos de aprovação.</p>
                </div>
              </div>

              <div class="diff-card">
                <div class="diff-num">02</div>
                <div>
                  <h3>Segurança Operacional e Eficiência Energética</h3>
                  <p>Dimensionamento criterioso focado na redução de perdas, segurança dos usuários e máxima eficiência das instalações.</p>
                </div>
              </div>

              <div class="diff-card">
                <div class="diff-num">03</div>
                <div>
                  <h3>Atendimento Personalizado e Regional</h3>
                  <p>Presença ativa e conhecimento da realidade técnica e regulatória local, com agilidade e proximidade com o cliente.</p>
                  
                  <div class="map-callout">
                    <iframe
                      title="Localização da sede da NS Engenharia em Parnaíba - PI"
                      src="https://maps.google.com/maps?q=Rua+Caramuru+400+Sao+Francisco+Parnaiba+PI&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                      width="100%"
                      height="100%"
                      style="border:0; border-radius: 4px;"
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="media-natural-frame media-frame-right">
            <picture>
              <source media="(max-width: 767px)" srcset="assets/img/painel-multimetro-clean-480.webp" type="image/webp" width="480" height="643">
              <source media="(min-width: 768px)" srcset="assets/img/painel-multimetro-clean-960.webp" type="image/webp" width="896" height="1200">
              <img src="assets/img/painel-multimetro-clean-960.webp" alt="Painel elétrico industrial com medição de precisão por multímetro digital" width="896" height="1200" loading="lazy" decoding="async">
            </picture>
            <div class="frame-accent-stripe" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         Seção 5 — Escopo de Projetos em Engenharia Elétrica (PDF Págs. 5, 6 e 7)
         ========================================================================== -->
    <section class="scope-section" id="escopo" aria-labelledby="scope-heading">
      <div class="container">
        <div style="text-align: center; max-width: 820px; margin: 0 auto 3.5rem;">
          <span class="section-label" style="justify-content: center;">Portfólio de Atuação</span>
          <h2 id="scope-heading" style="margin-bottom: 1rem;">Escopo de Projetos em Engenharia Elétrica</h2>
          <p style="margin: 0 auto; color: var(--color-text-body);">
            Desenvolvemos projetos executivos completos para empreendimentos residenciais, comerciais, industriais e de infraestrutura energética, integrando rigor normativo e tecnologia de ponta.
          </p>
        </div>

        <div class="scope-stream-container">

          <!-- Item 1: Projetos Elétricos de Baixa e Média Tensão -->
          <article class="scope-natural-card" id="escopo-bt-mt">
            <div class="scope-info-col">
              <span class="scope-index-badge">Escopo 01</span>
              <h3 class="scope-card-title">Projetos Elétricos de Baixa e Média Tensão</h3>
              <p class="scope-card-desc">
                Projetos completos para instalações elétricas prediais, comerciais e industriais com foco em segurança, eficiência e facilidade de manutenção.
              </p>
              <ul class="scope-card-list">
                <li>Instalações elétricas residenciais, comerciais e industriais</li>
                <li>Sistemas de Proteção contra Descargas Atmosféricas (SPDA) e aterramento</li>
                <li>Projetos de iluminação interna, externa e luminotécnica</li>
              </ul>
              <span class="scope-capacity-tag">Residencial · Comercial · Industrial</span>
            </div>
            <div class="scope-media-col">
              <div class="scope-prancha-container" data-full-src="assets/img/s5-cad-eletrico-1600.webp">
                <picture>
                  <source media="(max-width: 767px)" srcset="assets/img/s5-cad-eletrico-480.webp" type="image/webp" width="480" height="300">
                  <source media="(min-width: 768px)" srcset="assets/img/s5-cad-eletrico.webp" type="image/webp" width="1200" height="750">
                  <img src="assets/img/s5-cad-eletrico.webp" alt="Desenho Técnico CAD — Projetos Elétricos de Baixa e Média Tensão" width="1200" height="750" loading="lazy" decoding="async">
                </picture>
                <span class="scope-prancha-tag">🔍 Clique para ampliar prancha executiva</span>
              </div>
            </div>
          </article>

          <!-- Item 2: Subestações Transformadoras Abrigadas -->
          <article class="scope-natural-card" id="escopo-subestacoes-abrigadas">
            <div class="scope-info-col">
              <span class="scope-index-badge">Escopo 02</span>
              <h3 class="scope-card-title">Subestações Transformadoras Abrigadas</h3>
              <p class="scope-card-desc">
                Soluções completas para atendimento a demandas industriais e comerciais de grande porte com cabines blindadas e alvenaria dedicada.
              </p>
              <ul class="scope-card-list">
                <li>Subestações em alvenaria e cabines blindadas (abrigadas)</li>
                <li>Dimensionamento de transformadores a óleo e a seco</li>
                <li>Quadros de transferência automática (QTA) e grupos geradores</li>
              </ul>
              <span class="scope-capacity-tag">Projetos de 300 kVA a 2.500 kVA</span>
            </div>
            <div class="scope-media-col">
              <div class="scope-prancha-container" data-full-src="assets/img/s5-cad-abrigada-1600.webp">
                <picture>
                  <source media="(max-width: 767px)" srcset="assets/img/s5-cad-abrigada-480.webp" type="image/webp" width="480" height="300">
                  <source media="(min-width: 768px)" srcset="assets/img/s5-cad-abrigada.webp" type="image/webp" width="1200" height="750">
                  <img src="assets/img/s5-cad-abrigada.webp" alt="Desenho Técnico CAD — Subestação Abrigada com Transformador e Cabine" width="1200" height="750" loading="lazy" decoding="async">
                </picture>
                <span class="scope-prancha-tag">🔍 Clique para ampliar prancha executiva</span>
              </div>
            </div>
          </article>

          <!-- Item 3: Redes de Distribuição e Iluminação Pública -->
          <article class="scope-natural-card" id="escopo-redes-iluminacao">
            <div class="scope-info-col">
              <span class="scope-index-badge">Escopo 03</span>
              <h3 class="scope-card-title">Redes de Distribuição e Iluminação Pública</h3>
              <p class="scope-card-desc">
                Infraestrutura elétrica para loteamentos, condomínios horizontais, distritos industriais e vias urbanas.
              </p>
              <ul class="scope-card-list">
                <li>Redes aéreas e subterrâneas em média e baixa tensão</li>
                <li>Projetos de eletrificação para novos loteamentos</li>
                <li>Iluminação pública em LED com alta eficiência</li>
              </ul>
              <span class="scope-capacity-tag">Distribuição Aérea &amp; Subterrânea</span>
            </div>
            <div class="scope-media-col">
              <div class="scope-prancha-container" data-full-src="assets/img/s5-cad-redes-1600.webp">
                <picture>
                  <source media="(max-width: 767px)" srcset="assets/img/s5-cad-redes-480.webp" type="image/webp" width="480" height="300">
                  <source media="(min-width: 768px)" srcset="assets/img/s5-cad-redes.webp" type="image/webp" width="1200" height="750">
                  <img src="assets/img/s5-cad-redes.webp" alt="Desenho Técnico CAD — Rede de Distribuição e Loteamento Urbano" width="1200" height="750" loading="lazy" decoding="async">
                </picture>
                <span class="scope-prancha-tag">🔍 Clique para ampliar prancha executiva</span>
              </div>
            </div>
          </article>

          <!-- Item 4: Subestação Aérea e EMUC -->
          <article class="scope-natural-card" id="escopo-subestacao-aerea-emuc">
            <div class="scope-info-col">
              <span class="scope-index-badge">Escopo 04</span>
              <h3 class="scope-card-title">Subestação Aérea e EMUC</h3>
              <p class="scope-card-desc">
                Soluções compactas em poste singelo ou duplo para empreendimentos comerciais e medição agrupada padrão concessionária.
              </p>
              <ul class="scope-card-list">
                <li>Subestações aéreas em poste simplificado</li>
                <li>Entradas de medição coletiva (EMUC) para centros comerciais</li>
                <li>Compatibilização completa com normas da concessionária local</li>
              </ul>
              <span class="scope-capacity-tag">Projetos de 35 kVA a 300 kVA</span>
            </div>
            <div class="scope-media-col">
              <div class="scope-prancha-container" data-full-src="assets/img/s5-cad-emuc-1600.webp">
                <picture>
                  <source media="(max-width: 767px)" srcset="assets/img/s5-cad-emuc-480.webp" type="image/webp" width="480" height="300">
                  <source media="(min-width: 768px)" srcset="assets/img/s5-cad-emuc.webp" type="image/webp" width="1200" height="750">
                  <img src="assets/img/s5-cad-emuc.webp" alt="Desenho Técnico CAD — Subestação Aérea e Painel EMUC" width="1200" height="750" loading="lazy" decoding="async">
                </picture>
                <span class="scope-prancha-tag">🔍 Clique para ampliar prancha executiva</span>
              </div>
            </div>
          </article>

          <!-- Item 5: Usinas e Sistemas Solares Fotovoltaicos -->
          <article class="scope-natural-card" id="escopo-solar-fotovoltaico">
            <div class="scope-info-col">
              <span class="scope-index-badge">Escopo 05</span>
              <h3 class="scope-card-title">Usinas e Sistemas Solares Fotovoltaicos</h3>
              <p class="scope-card-desc">
                Engenharia completa para geração solar distribuída e usinas centralizadas em solo ou telhado.
              </p>
              <ul class="scope-card-list">
                <li>Usinas solares de minigeração distribuída e solo</li>
                <li>Sistemas fotovoltaicos conectados à rede (on-grid)</li>
                <li>Estudos de sombreamento, conexão à rede e dimensionamento</li>
              </ul>
              <span class="scope-capacity-tag">Capacidade até 5 MW</span>
            </div>
            <div class="scope-media-col">
              <div class="scope-prancha-container" data-full-src="assets/img/s5-cad-solar-1600.webp">
                <picture>
                  <source media="(max-width: 767px)" srcset="assets/img/s5-cad-solar-480.webp" type="image/webp" width="480" height="300">
                  <source media="(min-width: 768px)" srcset="assets/img/s5-cad-solar.webp" type="image/webp" width="1200" height="750">
                  <img src="assets/img/s5-cad-solar.webp" alt="Desenho Técnico CAD — Usina Solar Fotovoltaica e Arranjo Geral" width="1200" height="750" loading="lazy" decoding="async">
                </picture>
                <span class="scope-prancha-tag">🔍 Clique para ampliar prancha executiva</span>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>

    <!-- ==========================================================================
         Seção 6 — Homologação de Projetos Junto a Concessionárias (PDF Pág. 8)
         ========================================================================== -->
    <section class="homolog-section" id="homologacoes" aria-labelledby="homolog-heading">
      <div class="container">
        <div class="homolog-grid">
          <div>
            <span class="section-label">Aprovação Concessionárias</span>
            <h2 id="homolog-heading">Homologação de Projetos</h2>
            <p style="margin-top: 1rem; color: var(--color-text-body); font-size: 1.05rem;">
              Cuidamos de todo o processo de aprovação do seu projeto junto às distribuidoras de energia, desde o protocolo inicial até a vistoria final e liberação de carga.
            </p>

            <div class="homolog-logos-grid">
              <div class="concessionaria-box" title="Equatorial Energia">
                <img src="assets/img/logo-real-equatorial.webp" alt="Equatorial Energia" width="160" height="44" loading="lazy" decoding="async">
              </div>

              <div class="concessionaria-box" title="CPFL Energia">
                <img src="assets/img/logo-real-cpfl.webp" alt="CPFL Energia" width="120" height="44" loading="lazy" decoding="async">
              </div>

              <div class="concessionaria-box" title="Enel">
                <img src="assets/img/logo-real-enel.webp" alt="Enel" width="110" height="44" loading="lazy" decoding="async">
              </div>

              <div class="concessionaria-box" title="Neoenergia">
                <img src="assets/img/logo-real-neoenergia.webp" alt="Neoenergia" width="150" height="44" loading="lazy" decoding="async">
              </div>
            </div>
          </div>

          <div class="media-natural-frame media-frame-right">
            <picture>
              <source media="(max-width: 767px)" srcset="assets/img/rede-tech-clean-480.webp" type="image/webp" width="480" height="643">
              <source media="(min-width: 768px)" srcset="assets/img/rede-tech-clean-960.webp" type="image/webp" width="896" height="1200">
              <img src="assets/img/rede-tech-clean-960.webp" alt="Rede inteligente de distribuição de energia elétrica de alta confiabilidade" width="896" height="1200" loading="lazy" decoding="async">
            </picture>
            <div class="frame-accent-stripe" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         Seção 7 — Outros Serviços & Energia Crítica (PDF Pág. 9)
         ========================================================================== -->
    <section class="services-section" id="outros-servicos" aria-labelledby="services-heading">
      <div class="container">
        <div class="services-grid">
          <div>
            <span class="section-label">Soluções Complementares</span>
            <h2 id="services-heading">Outros Serviços</h2>
            <p style="margin-top: 0.75rem; color: var(--color-text-body);">
              Além de projetos, oferecemos serviços especializados para garantir o ciclo de vida completo e a máxima confiabilidade das instalações elétricas:
            </p>

            <div class="services-list">
              <div class="service-card">
                <div class="service-icon-bullet">✓</div>
                <div>
                  <h3>Operação e Manutenção (O&amp;M) de Usinas Solares</h3>
                </div>
              </div>

              <div class="service-card">
                <div class="service-icon-bullet">✓</div>
                <div>
                  <h3>Sistemas de Energia Crítica: Nobreaks e Geradores</h3>
                </div>
              </div>

              <div class="service-card">
                <div class="service-icon-bullet">✓</div>
                <div>
                  <h3>Laudos Técnicos e Estudos de Proteção / Seletividade</h3>
                </div>
              </div>

              <div class="service-card">
                <div class="service-icon-bullet">✓</div>
                <div>
                  <h3>Consultoria em Eficiência Energética e Mercado Livre</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="media-natural-frame media-frame-right">
            <picture>
              <source media="(max-width: 767px)" srcset="assets/img/painel-multimetro-clean-480.webp" type="image/webp" width="480" height="643">
              <source media="(min-width: 768px)" srcset="assets/img/painel-multimetro-clean-960.webp" type="image/webp" width="896" height="1200">
              <img src="assets/img/painel-multimetro-clean-960.webp" alt="Manutenção e comissionamento de painéis de energia crítica" width="896" height="1200" loading="lazy" decoding="async">
            </picture>
            <div class="frame-accent-stripe" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         Seção 8 — Contato Institucional (PDF Pág. 10)
         ========================================================================== -->
    <section class="contact-section" id="contato" aria-labelledby="contact-heading">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-card-box">
            <span class="section-label">Fale Conosco</span>
            <h2 id="contact-heading" style="margin-bottom: 0.5rem;">Vamos Conversar Sobre o Seu Projeto?</h2>
            <p style="color: var(--color-text-body); margin-bottom: 2rem;">
              Entre em contato conosco e receba uma avaliação técnica personalizada para as necessidades do seu empreendimento.
            </p>

            <div class="contact-rt-badge">Responsável Técnico</div>
            <div class="contact-rt-name">Ranieri Freitas</div>
            <div class="contact-rt-sub">Engenheiro Eletricista</div>

            <div class="contact-links-list">
              <a href="https://wa.me/5586995955663?text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento%20para%20projeto%20el%C3%A9trico." class="contact-item-row" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>(86) 9 9595-5663 (WhatsApp)</span>
              </a>

              <a href="mailto:contato@nsengenharia.com.br" class="contact-item-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>contato@nsengenharia.com.br</span>
              </a>

              <a href="mailto:ns.engenhariaeenergia@gmail.com" class="contact-item-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>ns.engenhariaeenergia@gmail.com</span>
              </a>

              <a href="https://www.instagram.com/nsengenhariaeenergia/" class="contact-item-row" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                <span>@nsengenhariaeenergia</span>
              </a>
            </div>

            <div class="contact-address-box">
              <strong>Endereço da Sede</strong>
              <p>Rua Caramuru, nº 400, 1º andar, Sala 03<br>Bairro São Francisco — Parnaíba - Piauí</p>
              <div style="margin-top: 0.85rem;">
                <a href="https://maps.google.com/?q=Rua+Caramuru+400+Sao+Francisco+Parnaiba+PI" class="btn-primary" target="_blank" rel="noopener noreferrer" style="font-size: 0.8rem; padding: 0.55rem 1rem; min-height: 38px;">
                  Abrir no Google Maps
                </a>
              </div>
            </div>
          </div>

          <div class="media-natural-frame media-frame-right">
            <picture>
              <source media="(max-width: 767px)" srcset="assets/img/hero-clean-480.webp" type="image/webp" width="480" height="268">
              <source media="(min-width: 768px)" srcset="assets/img/hero-clean-960.webp" type="image/webp" width="960" height="536">
              <img src="assets/img/hero-clean-960.webp" alt="Ponteira de teste de precisão técnica em bancada de engenharia elétrica" width="960" height="536" loading="lazy" decoding="async">
            </picture>
            <div class="frame-accent-stripe" aria-hidden="true"></div>
          </div>
        </div>

        <footer class="site-footer" role="contentinfo">
          <div class="footer-brand">
            <img src="assets/img/logo-horizontal-180.webp"
                 srcset="assets/img/logo-horizontal-180.webp 180w, assets/img/logo-horizontal.webp 320w"
                 sizes="(max-width: 480px) 140px, 180px"
                 alt="NS Engenharia & Energia"
                 width="180" height="45"
                 loading="lazy" decoding="async">
          </div>

          <div class="footer-copy">
            <p>© 2026 NS Engenharia e Energia Renovável. Todos os direitos reservados.</p>
            <p>Parnaíba — Piauí · Responsável Técnico: Ranieri Freitas (Engenheiro Eletricista)</p>
          </div>
        </footer>
      </div>
    </section>

  </main>

  <!-- Modal Lightbox de Alta Resolução para Pranchas CAD -->
  <div class="cad-lightbox-overlay" id="cad-lightbox" role="dialog" aria-modal="true" aria-label="Visualização em Alta Resolução">
    <div class="cad-lightbox-content">
      <button type="button" class="cad-lightbox-close" id="lightbox-cad-close" aria-label="Fechar visualização">✕ Fechar</button>
      <img src="" alt="Prancha Técnica em Alta Resolução" id="lightbox-cad-img">
      <div class="cad-lightbox-caption" id="lightbox-cad-caption"></div>
    </div>
  </div>

  <!-- JavaScript Inlined: Zero requisições de rede externas adicionais -->
  <script>
${minifiedJs}
  </script>
</body>
</html>
`;

fs.writeFileSync('ns-engenharia/index.html', html, 'utf8');
console.log('Built final ns-engenharia/index.html with inlined CSS, inlined JS, and responsive images');
