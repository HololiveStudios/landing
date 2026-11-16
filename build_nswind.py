import re

src_path = '/home/carlos/Antigravity/landing/copia-nsengenharia/nsengenharia.com.br/index.html'
dst_path = '/home/carlos/Antigravity/landing/copia-nsengenharia/nsengenharia.com.br/nswind.html'

with open(src_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Meta and Head
html = html.replace('<title>Grupo Novais Santos | Engenharia e Arquitetura em São Paulo</title>', '<title>NS Wind | Soluções em Reparo de Componentes Eólicos e Solar</title>')
html = re.sub(r'<meta name="description" content="[^"]*" />', '<meta name="description" content="Diagnóstico avançado de bancada, engenharia reversa e recuperação técnica de componentes eletrônicos críticos para aerogeradores e usinas solares em todo o Brasil." />', html)
html = re.sub(r'<meta property="og:title" content="[^"]*" />', '<meta property="og:title" content="NS Wind | Soluções em Reparo de Componentes Eólicos e Solar" />', html)
html = re.sub(r'<meta property="og:description" content="[^"]*" />', '<meta property="og:description" content="Diagnóstico avançado de bancada, engenharia reversa e recuperação técnica de módulos eletrônicos raros para aerogeradores e usinas solares em todo o Brasil." />', html)
html = re.sub(r'<meta property="og:site_name" content="[^"]*" />', '<meta property="og:site_name" content="NS Wind" />', html)

# Favicons
html = html.replace('href="wp-content/uploads/2026/09/logo-symbol.svg"', 'href="assets-nswind/favicon-32.png"')

# 2. Header Logo and Navigation
html = html.replace('src="wp-content/uploads/2026/09/logo-full.svg"', 'src="assets-nswind/logo-nswind.webp" style="max-height:48px;width:auto;"')
html = html.replace('src="wp-content/uploads/2026/09/logo-symbol.svg"', 'src="assets-nswind/logo-icon.png" style="max-height:40px;width:auto;"')

# Navigation links text
html = html.replace('>Quem Somos</a>', '>Da Turbina à Bancada</a>')
html = html.replace('>Serviços</a>', '>Componentes Raros</a>')
html = html.replace('>Engenharia<span class="sub-item">Soluções e Execução</span>', '>Placas e Controle<span class="sub-item">AEPS, WETA, WETB, WTC3</span>')
html = html.replace('>Arquitetura<span class="sub-item">Projetos e Design</span>', '>Fontes Chaveadas<span class="sub-item">TDK-Lambda, Phoenix</span>')
html = html.replace('>Instalações<span class="sub-item">Elétrica e Sistemas</span>', '>Drivers de IGBT<span class="sub-item">Ingeteam, Semikron</span>')
html = html.replace('>Infraestrutura<span class="sub-item">Robustez e Segurança</span>', '>CLPs e I/O<span class="sub-item">Phoenix Contact, Bachmann</span>')
html = html.replace('>Manutenção<span class="sub-item">Preservação e Cuidado</span>', '>Inversores Solares<span class="sub-item">On-Grid, Off-Grid, Híbrido</span>')

html = html.replace('>Cases</a>', '>Reparos Raros</a>')
html = html.replace('>Hospital Santa Marcelina<span class="sub-item">Saúde</span>', '>Placa AEPS GE<span class="sub-item">Alimentação Crítica</span>')
html = html.replace('>Cidade Matarazzo<span class="sub-item">Revitalização</span>', '>Driver IGBT Ingeteam<span class="sub-item">Eletrônica de Potência</span>')
html = html.replace('>Hotel W São Paulo<span class="sub-item">Hotelaria</span>', '>WTC3 &amp; WETA<span class="sub-item">Telemetria e Controle</span>')
html = html.replace('>Shopping Iguatemi São Paulo<span class="sub-item">Varejo</span>', '>Válvula Proporcional<span class="sub-item">Sistema de Pitch</span>')

html = html.replace('>Clientes</a>', '>Operadores &amp; Fabricantes</a>')
html = html.replace('>Blog</a>', '>Artigos Técnicos</a>')
html = html.replace('>Fale com nossos especialistas</a>', '>Solicitar Diagnóstico</a>')

# Navigation href anchors
html = html.replace('href="#quem-somos/"', 'href="#diferenciais"')
html = html.replace('href="#engenharia/"', 'href="#solucoes"')
html = html.replace('href="#arquitetura/"', 'href="#solucoes"')
html = html.replace('href="#instalacoes/"', 'href="#solucoes"')
html = html.replace('href="#infraestrutura/"', 'href="#solucoes"')
html = html.replace('href="#manutencao/"', 'href="#solucoes"')
html = html.replace('href="#cases/"', 'href="#cases"')
html = html.replace('href="#cases/hospital-santa-marcelina/"', 'href="#cases"')
html = html.replace('href="#cases/cidade-matarazzo/"', 'href="#cases"')
html = html.replace('href="#cases/hotel-w-sao-paulo/"', 'href="#cases"')
html = html.replace('href="#cases/shopping-iguatemi-sao-paulo/"', 'href="#cases"')
html = html.replace('href="#clientes/"', 'href="#clientes"')
html = html.replace('href="#blog/"', 'href="#artigos"')
html = html.replace('href="#contato/"', 'href="#contato"')

# 3. Hero Section
html = html.replace('Engenharia e arquitetura integradas para soluções completas', 'Soluções de reparo em componentes <span style="color:#0181C1;">eólicos e solar</span>')
html = html.replace('Desde 1996, unimos projetos e execução para entregar empreendimentos com mais segurança, sustentabilidade, eficiência, controle e funcionalidade.', 'Diagnóstico avançado de bancada, engenharia reversa e recuperação técnica de módulos eletrônicos raros para aerogeradores, inversores e plantas industriais em todo o Brasil. Menos parada, máxima confiabilidade.')
html = html.replace('Solicite um Orçamento', 'Ver Componentes Raros')
html = html.replace('Confira nosso Portfólio', 'Solicitar Diagnóstico Express')
html = html.replace('href="#portfolio"', 'href="#solucoes"')

# Hero partners
html = html.replace('Nossos clientes', 'Operadores &amp; Fabricantes')
html = html.replace('src="wp-content/uploads/2026/09/nike.webp"', 'src="assets-nswind/logo-auren.webp" style="max-height:28px;object-fit:contain;"')
html = html.replace('src="wp-content/uploads/2026/09/globo.webp"', 'src="assets-nswind/logo-statkraft.webp" style="max-height:28px;object-fit:contain;"')
html = html.replace('src="wp-content/uploads/2026/09/armarinhos-fernando.webp"', 'src="assets-nswind/logo-bons-ventos.webp" style="max-height:28px;object-fit:contain;"')
html = html.replace('src="wp-content/uploads/2026/09/john-deere.webp"', 'src="assets-nswind/logo-siemens-gamesa.webp" style="max-height:28px;object-fit:contain;"')
html = html.replace('src="wp-content/uploads/2026/09/santa-marcelina.webp"', 'src="assets-nswind/logo-vestas.webp" style="max-height:28px;object-fit:contain;"')
html = html.replace('src="wp-content/uploads/2026/09/smart-white.webp"', 'src="assets-nswind/logo-ge-vernova.webp" style="max-height:28px;object-fit:contain;"')

# 4. Section 1: Numbers (bg-ocean)
html = html.replace('Nossa trajetória em números', 'Impacto Operacional &amp; Números')
html = html.replace('Engenharia completa, equipe multidisciplinar e o menor prazo de entrega do mercado.', 'Engenharia de bancada, testes sob carga contínua e o menor prazo de triagem do setor.')
html = html.replace('Desde 1996, construindo resultados reais.', 'Da turbina à bancada, construindo resultados reais e reduzindo paradas de geração.')

# Counter 1: 1000 projetos -> 15+ Módulos Críticos
html = html.replace('1000', '15+')
html = html.replace('projetos', 'Módulos Críticos Raros')
html = html.replace('Executados com controle técnico e qualidade comprovada em cada entrega.', 'Recuperados e homologados em bancada, com componentes importados e rastreabilidade total.')

# Counter 2: 30 anos -> 70% Economia
html = html.replace('>30<', '>70%<')
html = html.replace('anos de experiência', 'Economia Média')
html = html.replace('+30 anos de experiência construída dentro do canteiro de obras, da fundação à gestão completa de grandes empreendimentos.', 'Redução drástica de custos em comparação à compra de módulos novos e meses de importação.')

# Counter 3: 500 mil m² -> 72h Triagem
html = html.replace('>500<', '>72h<')
html = html.replace('mil m² construídos', 'Triagem Express')
html = html.replace('Em obras corporativas, industriais e de alta complexidade entregues com excelência técnica.', 'Diagnóstico pericial e laudo preliminar ágil para rápida tomada de decisão em campo.')

# Counter 4: 100% conformidade
html = html.replace('Garantia de conformidade técnica e aprovação dos projetos junto às concessionárias e órgãos competentes.', 'Cada equipamento é submetido a testes funcionais dinâmicos sob carga com garantia dedicada.')

# 5. Section 2: Soluções Completas (bg-white)
html = html.replace('Soluções completaspara cada etapa do projeto', 'Soluções completas para cada componente crítico')
html = html.replace('Integramos planejamento técnico, execução e manutenção para garantir eficiência e controle em todo o ciclo do empreendimento.', 'Integramos diagnóstico pericial, engenharia reversa e testes sob carga para garantir vida útil estendida aos seus ativos de geração.')

# Card 1: Engenharia -> Placas Eletrônicas e Controle
html = html.replace('>Engenharia</h3>', '>Placas Eletrônicas e Controle</h3>', 1)
html = html.replace('Projetos desenvolvidos com rigor técnico, planejamento estratégico e foco na viabilidade da execução. Soluções que garantem mais segurança, eficiência operacional e controle em todas as fases da obra.', 'Recuperação a nível de componente de placas de controle de pitch, supervisão master (WETA), interface de bateria (WETB) e controladores de turbina (WTC3 V302-1X). Desoxidação ultrassônica, troca de CIs e verniz conformal.')

# Card 2: Arquitetura -> Fontes Chaveadas e Alimentação
html = html.replace('>Arquitetura</h3>', '>Fontes Chaveadas e Alimentação</h3>', 1)
html = html.replace('Projetos arquitetônicos que unem funcionalidade, estética e desempenho. Desenvolvemos espaços inteligentes, alinhados às necessidades do cliente, às exigências técnicas e às normas vigentes.', 'Manutenção preventiva e corretiva de fontes de alimentação industrial DIN-rail (TDK-Lambda, Phoenix Contact QUINT) e fontes flat de bastidor 19" para gabinetes de nacele. Troca preventiva de capacitores e calibração de ripple.')

# Card 3: Instalações -> Drivers de IGBT e Potência
html = html.replace('>Instalações</h3>', '>Drivers de IGBT e Potência</h3>', 1)
html = html.replace('Projetos e execução de instalações para sistemas diversos, especiais e complementares, garantindo integração, conformidade normativa e eficiência.', 'Reparo de circuitos de disparo de transistores IGBT de alta velocidade com isolamento óptico e proteção ativa contra desaturação (Concept 2SD315AI, Ingeteam PD0500). Validação dinâmica sob carga.')

# Card 4: Infraestruturas -> CLPs, Módulos I/O e HUB
html = html.replace('>Infraestruturas</h3>', '>CLPs, Módulos I/O e HUB</h3>', 1)
html = html.replace('Soluções completas para infraestrutura urbana, corporativa e industrial. Qualidade e segurança aplicadas em cada montagem técnica.', 'Diagnóstico e reparo do cérebro eletrônico do aerogerador (Phoenix Contact RFC, Bachmann, Beckhoff) e computadores de cubo (HUB Computer) que operam sob alta vibração. Reparo de barramentos de dados.')

# Card 5: Manutenção -> Inversores Solares e Centrais
html = html.replace('>Manutenção eSuporte Técnico</h3>', '>Inversores Solares e Centrais</h3>', 1)
html = html.replace('Manutenção preventiva, corretiva e emergencial que garante a continuidade operacional dos sistemas, reduzindo riscos, impactos operacionais e a plena funcionalidade.', 'Recuperação de inversores fotovoltaicos On-Grid, Off-Grid e Híbridos para geração distribuída (GD) e usinas solares centralizadas de grande porte (Fronius, Solis, Growatt, BelEnergy, ABB).')

# Replace service card images
html = html.replace('wp-content/uploads/2026/09/hero-engenharia-768x430.webp', 'assets-nswind/AEPS.avif')
html = html.replace('wp-content/uploads/2026/09/servico-arquitetura-opt.webp', 'assets-nswind/fonte-phoenix-quint.avif')
html = html.replace('wp-content/uploads/2026/09/hero-instalacoes-768x429.webp', 'assets-nswind/driver-de-igbt.avif')
html = html.replace('wp-content/uploads/2026/09/hero-infraestrutura-768x512.webp', 'assets-nswind/clp-phoenix-rfc.avif')
html = html.replace('wp-content/uploads/2026/09/hero-manutencao-768x512.webp', 'assets-nswind/inversor-online.avif')

# 6. Section 3: Atuação Integrada (bg-ocean)
html = html.replace('Atuação integrada em soluções técnicas e execução de alto padrão.', 'Atuação multiplataforma em soluções de alta confiabilidade.')
html = html.replace('Construímos relações de confiança por meio de soluções técnicas executadas com excelência, comprometimento e responsabilidade.', 'Expertise consolidada nas principais arquiteturas de aerogeradores e usinas solares instaladas na América Latina.')

# 6 platform cards
html = html.replace('>Corporativo</h3>', '>Plataforma GE Vernova</h3>')
html = html.replace('Soluções para ambientes corporativos que exigem eficiência operacional, conforto, segurança e infraestrutura preparada para acompanhar o crescimento dos negócios.', 'Especialistas nas séries 1.5MW, 1.6MW e 2.X. Reparo consagrado de placas de alimentação AEPS, interface de bateria WETB, placas master WETA e módulos IONet.')

html = html.replace('>Hospitalar</h3>', '>Siemens Gamesa</h3>')
html = html.replace('Projetos e instalações desenvolvidos para atender aos elevados padrões técnicos, operacionais e normativos exigidos por ambientes de saúde.', 'Cobertura completa das plataformas G5X, G8X, G9X e SG 2.X/3.X. Diagnóstico de conversores Ingeteam, placas CCU, drivers e válvulas proporcionais de pitch.')

html = html.replace('>Comercial</h3>', '>Vestas &amp; Alstom</h3>')
html = html.replace('Empreendimentos comerciais planejados para proporcionar funcionalidade, desempenho operacional e uma experiência adequada para clientes e equipes.', 'Soluções para turbinas V80, V90, V100, V112 e plataforma ECO. Recuperação de módulos de controle VME, acionamentos de yaw/pitch, fontes e placas de comando.')

html = html.replace('>Hotelaria</h3>', '>Ingeteam &amp; Ingecon Wind</h3>')
html = html.replace('Soluções completas para hotéis e empreendimentos de hospedagem, com foco em conforto, eficiência energética, automação e continuidade operacional.', 'Manutenção especializada em módulos CCU (Ingecon Wind), Smart Crowbar para proteção em afundamento de rede (LVRT) e multiplexoras térmicas PT100.')

html = html.replace('>Industrial</h3>', '>Usinas Solares e BESS</h3>')
html = html.replace('Projetos e execuções voltados para ambientes industriais que demandam robustez técnica, segurança operacional e máxima produtividade.', 'Reparo avançado em inversores de string e centrais (Fronius, Growatt, Solis, Sungrow, BelEnergy) e sistemas de armazenamento de energia em baterias (BESS).')

html = html.replace('>Projetosde Retrofit</h3>', '>Equipamentos BOP &amp; Nacele</h3>')
html = html.replace('Modernização e adequação de edificações existentes, preservando a operação enquanto atualizamos infraestrutura, instalações e desempenho dos sistemas.', 'Carregadores retificadores industriais, sistemas de nobreak UPS AEG 3kVA de grande porte e juntas rotativas elétricas (Slip Rings) para transferência de potência e dados.')

# Marquee title
html = html.replace('Empresas que confiam na Novais Santos', 'Operadores e Fabricantes do Ecossistema NS Wind')

# 7. Section 4: Resultados / Cases (bg-platinum)
html = html.replace('Resultados que comprovamnossa excelência', 'Componentes raros recuperados em nosso laboratório')

# Case 1: Santa Marcelina -> Placa AEPS GE
html = html.replace('>Hospital SantaMarcelina | Teatro</h3>', '>Placa AEPS (GE Wind Power Supply)</h3>')
html = html.replace('Engenharia | Elétrica | Automação | SDAI', 'Plataforma GE · Alimentação Crítica')
html = html.replace('Modernização completa das instalações técnicas, com foco em segurança, eficiência e integração dos sistemas de automação e controle.', 'Recuperação do circuito de estabilização e chaveamento interno, substituindo componentes obsoletos por equivalentes de alta performance. Redução de 75% no custo e devolução em 5 dias úteis, evitando 90 dias de importação.')

# Case 2: Matarazzo -> Driver IGBT Ingeteam
html = html.replace('>CidadeMatarazzo</h3>', '>Driver de IGBT (Concept / Ingeteam)</h3>')
html = html.replace('CFTV | BMS | SDAI | Automação', 'Siemens Gamesa · Eletrônica de Potência')
html = html.replace('Implementação de sistemas inteligentes para um dos maiores complexos de uso misto da América Latina, unindo sustentabilidade, tecnologia e inovação.', 'Substituição de optoacopladores de altíssima velocidade, transformadores de pulso e circuito de monitoramento de desaturação (Vce sat), validado sob chaveamento dinâmico em bancada.')

# Case 3: Hotel W -> WTC3 & WETA
html = html.replace('>Hotel WSão Paulo</h3>', '>Controlador WTC3 V302-1X e WETA</h3>')
html = html.replace('Instalações integradas de alta complexidade para atender aos rigorosos padrões internacionais de hospitalidade e eficiência energética.', 'Diagnóstico microscópico de microfraturas em trilhas e corrosão por salitre marinho. Recondicionamento com desoxidação ultrassônica e camada de verniz conformal de grau naval.')

# Case 4: Iguatemi -> Válvula de Pitch
html = html.replace('>ShoppingIguatemi SP</h3>', '>Válvula Proporcional de Pitch</h3>')
html = html.replace('SDAI | BMS | Retrofit | Automação | Cabeamento Estruturado', 'Sistema de Pitch · Eletrohidráulica')
html = html.replace('Atualização técnica e retrofit das instalações para garantir segurança, continuidade operacional e otimização dos recursos energéticos.', 'Recuperação da eletrônica embarcada (On-Board Electronics), calibração do sensor LVDT e ajuste de resposta linear milimétrica para controle aerodinâmico das pás.')

# Replace case images
html = html.replace('wp-content/uploads/2026/09/case-santa-marcelina.jpg', 'assets-nswind/AEPS.avif')
html = html.replace('wp-content/uploads/2026/09/case-santa-marcelina-768x1365.jpg', 'assets-nswind/AEPS.avif')
html = html.replace('wp-content/uploads/2026/09/case-santa-marcelina-864x1536.jpg', 'assets-nswind/AEPS.avif')

html = html.replace('wp-content/uploads/2026/09/case-cidade-matarazzo.jpg', 'assets-nswind/driver-de-igbt.avif')
html = html.replace('wp-content/uploads/2026/09/case-cidade-matarazzo-768x431.jpg', 'assets-nswind/driver-de-igbt.avif')
html = html.replace('wp-content/uploads/2026/09/case-cidade-matarazzo-1024x575.jpg', 'assets-nswind/driver-de-igbt.avif')

html = html.replace('wp-content/uploads/2026/09/case-hotel-w.jpg', 'assets-nswind/wtc3-v302-1x.avif')
html = html.replace('wp-content/uploads/2026/09/case-hotel-w-768x427.jpg', 'assets-nswind/wtc3-v302-1x.avif')
html = html.replace('wp-content/uploads/2026/09/case-hotel-w-1024x569.jpg', 'assets-nswind/wtc3-v302-1x.avif')

html = html.replace('wp-content/uploads/2026/09/case-iguatemi.jpg', 'assets-nswind/valvula-proporcional.avif')
html = html.replace('wp-content/uploads/2026/09/case-iguatemi-768x512.jpg', 'assets-nswind/valvula-proporcional.avif')
html = html.replace('wp-content/uploads/2026/09/case-iguatemi-1024x683.jpg', 'assets-nswind/valvula-proporcional.avif')

# 8. Section 5: História & Diferenciais (bg-ocean)
html = html.replace('Uma história construída com trabalho, evolução e excelência', 'Da turbina à bancada: vivência prática aliada ao rigor de laboratório')
html = html.replace('Desde 1996, o Grupo Novais Santos atua com solidez no mercado de engenharia e arquitetura, entregando empreendimentos complexos com precisão e responsabilidade.', 'A NS Wind nasceu diretamente do chão dos parques eólicos do Nordeste. Nossos engenheiros e técnicos conhecem a urgência de cada MWh não gerado e as limitações de fornecimento de peças descontinuadas.')
html = html.replace('Nossa jornada é marcada pela constante busca por inovação, capacitação técnica e adoção das melhores práticas do setor. Desenvolvemos metodologias próprias de gestão e controle que garantem previsibilidade e alto desempenho.', 'Estruturamos um laboratório especializado de eletroeletrônica de potência focado em resolver aquilo que os fornecedores tradicionais dão como sucata ou sem reposição, devolvendo a operação aos seus equipamentos com garantia estendida e rastreabilidade total.')
html = html.replace('wp-content/uploads/2026/09/sobre-cidade.jpg', 'assets-nswind/bancada.avif')
html = html.replace('wp-content/uploads/2026/09/sobre-cidade-768x512.jpg', 'assets-nswind/bancada.avif')
html = html.replace('wp-content/uploads/2026/09/sobre-cidade-1024x682.jpg', 'assets-nswind/bancada.avif')

# Diferenciais
html = html.replace('Mais controle, mais eficiência e melhores resultados.', 'Mais confiabilidade, mais geração e menores custos operacionais.')

html = html.replace('>Integração entreprojeto e execução</h3>', '>Diagnóstico Pericial Rápido</h3>')
html = html.replace('Alinhamento perfeito entre as disciplinas para evitar retrabalhos e incompatibilidades em obra.', 'Triagem inicial com osciloscópios de alta precisão e câmeras térmicas em até 72 horas para determinar viabilidade e causa raiz.')

html = html.replace('>Equipe técnicaespecializada.</h3>', '>Engenharia Reversa de Precisão</h3>')
html = html.replace('Profissionais experientes e continuamente capacitados para lidar com desafios de alta complexidade.', 'Mapeamento de circuitos, esquemáticos e substituição por semicondutores de especificação industrial superior.')

html = html.replace('>Controle técnicoem todas as etapas</h3>', '>Testes Sob Carga Real</h3>')
html = html.replace('Acompanhamento rigoroso para assegurar conformidade com normas técnicas e padrões de qualidade.', 'Bancadas proprietárias que simulam sinais reais de rotação, comandos de pitch e afundamentos de rede antes da liberação.')

html = html.replace('>Otimizaçãode prazos</h3>', '>Proteção Conformal Antisalina</h3>')
html = html.replace('Planejamento estruturado para cumprir cronogramas com agilidade e sem perda de qualidade.', 'Tratamento em câmara com verniz protetor especial resistente à umidade extrema e maresia severa de parques litorâneos.')

html = html.replace('>Visão práticade obra</h3>', '>Rastreabilidade &amp; Garantia</h3>')
html = html.replace('Experiência acumulada que permite antecipar problemas e propor soluções eficientes e viáveis.', 'Emissão de Laudo Técnico detalhado com fotos do reparo, parâmetros medidos e garantia dedicada de funcionamento.')

# 9. Section 6: Depoimentos (bg-white)
html = html.replace('O que dizem sobrea nossa entrega', 'O que dizem os gestores de O&M e engenharia')
html = html.replace('Resultados consistentes constroem relações de confiança', 'A confiança de quem depende da máxima disponibilidade de seus ativos de geração')

# Testimonial contents
html = html.replace('A Novais Santos superou nossas expectativas em um projeto altamente desafiador. A integração da equipe e o cumprimento rigoroso dos prazos foram fundamentais para o sucesso da nossa operação.', 'A agilidade da NS Wind no reparo das placas AEPS da nossa plataforma GE foi decisiva para recuperar a disponibilidade de duas turbinas em menos de uma semana. Trabalho técnico de altíssimo padrão.')
html = html.replace('Diretoria de Operações', 'Ricardo Mendes')
html = html.replace('Complexo Hospitalar', 'Coordenador de O&M Eólica')

html = html.replace('Profissionalismo, precisão técnica e comprometimento do início ao fim. A gestão da obra foi transparente e os resultados comprovaram a excelência que eles entregam.', 'Comprar um driver novo no fabricante levaria 120 dias da Europa. A NS Wind recuperou o módulo com teste funcional gravado em vídeo e garantia. Já são mais de 10 equipamentos recuperados conosco.')
html = html.replace('Gerência de Engenharia', 'Marcelo Fontana')
html = html.replace('Empreendimento Corporativo', 'Gerente de Manutenção Elétrica')

html = html.replace('A capacidade de resolver problemas complexos com rapidez e qualidade técnica diferenciou a Novais Santos de outros fornecedores com quem já trabalhamos.', 'O suporte nos inversores solares centrais da nossa usina evitou perdas pesadas de geração no auge da safra solar. Equipe transparente, técnica e muito rápida.')
html = html.replace('Coordenação de Projetos', 'Thiago Silveira')
html = html.replace('Rede Hoteleira', 'Supervisor de Usinas Fotovoltaicas')

# 10. Section 7: Artigos (bg-platinum)
html = html.replace('Artigos e notícias', 'Artigos técnicos e engenharia aplicada')

# Article 1
html = html.replace('>Compatibilização de Projetos: O Custo de Não Fazer</h3>', '>Falhas em Drivers de IGBT: Como Evitar Queimas em Cadeia</h3>')
html = html.replace('A compatibilização de projetos é uma das etapas mais cruciais, podendo gerar impacto financeiro e operacional ao ignorar…', 'Análise pericial dos mecanismos de falha em circuitos de disparo, tempo morto (dead-time) e técnicas preventivas de medição de capacitores DC-link.')
html = html.replace('wp-content/uploads/2026/10/image-12.jpeg', 'assets-nswind/driver-de-igbt.avif')
html = html.replace('wp-content/uploads/2026/10/image-12-1024x681.jpeg', 'assets-nswind/driver-de-igbt.avif')

# Article 2
html = html.replace('>Arquitetura Minimalista para espaços corporativos</h3>', '>Maresia e Umidade: A Importância do Conformal Coating</h3>')
html = html.replace('No cenário empresarial, o ambiente de trabalho deixou de ser um mero espaço físico para se tornar uma…', 'Como o salitre corrói trilhas microscópicas de placas de turbina e quais os tratamentos químicos indicados para parques costeiros.')
html = html.replace('wp-content/uploads/2026/10/image-3.jpeg', 'assets-nswind/bancada_micro.avif')
html = html.replace('wp-content/uploads/2026/10/image-3-1024x704.jpeg', 'assets-nswind/bancada_micro.avif')

# Article 3
html = html.replace('>Top 5 materiais sustentáveis na construção moderna</h3>', '>Gestão de Obsolescência Eletrônica em Aerogeradores</h3>')
html = html.replace('O mercado da construção civil passa por uma reestruturação sustentável profunda. Em 2026, as diretrizes ESG (Ambiental, Social…', 'Como manter turbinas eólicas em plena operação mesmo após o encerramento do fornecimento de peças pelos fabricantes multinacionais.')
html = html.replace('wp-content/uploads/2026/10/image-10.jpeg', 'assets-nswind/clp-phoenix-rfc.avif')
html = html.replace('wp-content/uploads/2026/10/image-10-1024x683.jpeg', 'assets-nswind/clp-phoenix-rfc.avif')

# 11. Section 8: Contato (from-ocean to-ink)
html = html.replace('Envie uma mensageme fale com nossos especialistas', 'Envie um componente para análise técnica de bancada')
html = html.replace('Ou se preferir, entre em contato diretamente nas opções abaixo:', 'Envie o código da peça, modelo ou sintoma da falha. Nossa engenharia retornará imediatamente:')
html = html.replace('+55 (11) 2091-1544', '(85) 9 9231-3892 · (86) 9 9595-5663')
html = html.replace('tel:+551120911544', 'tel:+5585992313892')
html = html.replace('contato@nsengenharia.com.br', 'contato@nswind.com.br')
html = html.replace('mailto:contato@nsengenharia.com.br', 'mailto:contato@nswind.com.br')
html = html.replace('Rua Tuiuti, 2005 - Tatuapé, São Paulo - SP', 'Rua Caramuru, 400, 1º andar, Sala 03 - Parnaíba - PI')
html = html.replace('Segunda a Sexta: 08:00 às 18:00', 'Segunda a Sexta: 08h às 18h (Plantão O&M para emergências)')

# Form inputs placeholders
html = html.replace('placeholder="Seu nome"', 'placeholder="Nome do solicitante"')
html = html.replace('placeholder="Seu e-mail"', 'placeholder="E-mail corporativo"')
html = html.replace('placeholder="Telefone"', 'placeholder="Telefone / WhatsApp com DDD"')
html = html.replace('placeholder="Como podemos te ajudar?"', 'placeholder="Modelo do componente, fabricante (ex: GE AEPS, Driver Gamesa) e descrição da falha..."')
html = html.replace('>Enviar Mensagem<', '>Solicitar Análise Técnica de Bancada<')

# 12. Footer
html = html.replace('© 2026 Grupo Novais Santos. Todos os direitos reservados.', '© 2026 NS Wind · Soluções Especializadas em Reparos Eletrônicos de Alta Precisão. Centro Tecnológico Eólico &amp; Solar.')
html = html.replace('Engenharia e arquitetura integradas desde 1996.', 'Centro especializado em diagnóstico de bancada, engenharia reversa e reparo de componentes raros para aerogeradores e usinas solares.')

# Add Section IDs so header anchors work
html = html.replace('id="hero"', 'id="inicio"')
html = html.replace('class="elementor-element elementor-element-2bc4a8f', 'id="inicio" class="elementor-element elementor-element-2bc4a8f')
html = html.replace('class="elementor-element elementor-element-5820315', 'id="solucoes" class="elementor-element elementor-element-5820315')
html = html.replace('class="elementor-element elementor-element-97dd7c2', 'id="plataformas" class="elementor-element elementor-element-97dd7c2')
html = html.replace('class="elementor-element elementor-element-3f93e88', 'id="cases" class="elementor-element elementor-element-3f93e88')
html = html.replace('class="elementor-element elementor-element-3d7aea7', 'id="diferenciais" class="elementor-element elementor-element-3d7aea7')
html = html.replace('class="elementor-element elementor-element-ae745e7', 'id="depoimentos" class="elementor-element elementor-element-ae745e7')
html = html.replace('class="elementor-element elementor-element-ad44bde', 'id="artigos" class="elementor-element elementor-element-ad44bde')
html = html.replace('class="elementor-element elementor-element-4650fa4', 'id="contato" class="elementor-element elementor-element-4650fa4')

# Floating WhatsApp button
wa_button = """
<a href="https://wa.me/5585992313892?text=Ol%C3%A1%21%20Gostaria%20de%20solicitar%20uma%20an%C3%A1lise%20t%C3%A9cnica%20de%20componente%20com%20a%20NS%20Wind." 
   target="_blank" rel="noreferrer" 
   style="position:fixed;bottom:24px;right:24px;z-index:99999;background:#25D366;color:#ffffff;border-radius:50px;padding:12px 20px;display:flex;align-items:center;gap:10px;box-shadow:0 6px 20px rgba(0,0,0,0.35);font-family:'Roboto',sans-serif;font-weight:600;font-size:14px;text-decoration:none;transition:transform 0.2s,box-shadow 0.2s;">
  <svg style="width:24px;height:24px;fill:currentColor;" viewBox="0 0 24 24">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.37 7.34 9.1 7.4 8.87 7.65C8.64 7.9 8 8.5 8 9.71C8 10.93 8.89 12.1 9 12.27C9.13 12.43 10.74 15.08 13.3 16.08C15.43 16.92 15.86 16.75 16.32 16.71C16.78 16.67 17.81 16.1 18.02 15.5C18.23 14.9 18.23 14.39 18.16 14.28C18.1 14.17 17.94 14.11 17.7 13.99C17.45 13.86 16.27 13.28 16.05 13.2C15.83 13.12 15.67 13.08 15.51 13.32C15.35 13.57 14.88 14.11 14.74 14.28C14.6 14.44 14.46 14.46 14.21 14.34C13.97 14.21 12.95 13.88 11.74 12.8C10.79 11.96 10.15 10.91 10.02 10.67C9.89 10.42 10.01 10.29 10.13 10.16C10.24 10.05 10.38 9.87 10.5 9.72C10.63 9.58 10.67 9.47 10.75 9.31C10.83 9.14 10.79 9 10.73 8.88C10.67 8.76 10.19 7.58 9.99 7.1C9.79 6.61 9.59 6.69 9.44 6.68C9.3 6.68 9.14 6.68 8.98 6.68"/>
  </svg>
  <span>Falar no WhatsApp</span>
</a>
"""

# Switcher banner at top to toggle between Original and NSWIND version
switcher_banner = """
<div style="background:#040F38;color:#ffffff;padding:8px 16px;display:flex;align-items:center;justify-content:space-between;font-family:'Roboto',sans-serif;font-size:13px;border-bottom:1px solid #0075D8;position:relative;z-index:999999;">
  <div style="display:flex;align-items:center;gap:12px;">
    <strong style="color:#38BDF8;letter-spacing:0.5px;">NSWIND PREVIEW</strong>
    <span style="opacity:0.85;">Site NS Engenharia adaptado com as informações e identidade da NS Wind.</span>
  </div>
  <div style="display:flex;gap:10px;">
    <a href="index.html" style="color:#ffffff;background:rgba(255,255,255,0.15);padding:4px 10px;border-radius:4px;text-decoration:none;font-size:12px;">Ver Cópia Original</a>
    <span style="color:#38BDF8;font-weight:600;padding:4px 8px;border:1px solid #38BDF8;border-radius:4px;">Versão NS Wind Ativa</span>
  </div>
</div>
"""

html = html.replace('<body class="', '<body class="nswind-edition ')
html = re.sub(r'(<body[^>]*>)', r'\1\n' + switcher_banner, html, count=1)
html = html.replace('</body>', wa_button + '\n</body>')

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(html)

print('Generated nswind.html successfully!')
