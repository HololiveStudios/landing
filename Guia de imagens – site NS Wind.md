# Guia de imagens – site NS Wind

Documento para a equipe: quais fotos produzir, onde cada uma aparece no site e como preparar os arquivos. O estilo é o mesmo do site da NS Engenharia: **design guiado por imagem**, com foto grande no topo e equipamentos recortados, soltos, sem card.

## 1. O que mudou no site

- **Hero:** uma eólica grande ao fundo, no canto direito, com o texto sobre o céu limpo à esquerda. Se `hero-eolica.jpg` ainda não existir, o site usa a foto `aerogerador-campo.jpg` que já está na pasta.
- **Faixa "Da turbina à bancada":** foto panorâmica de largura total entre o Impacto Operacional e os Equipamentos Raros.
- **Equipamentos raros:** os 4 cards viraram linhas com o equipamento recortado e solto de um lado e o texto do outro, alternando os lados. O texto, o selo "Reparo Raro" e as etiquetas (TDK-Lambda, Alimentação Crítica, Economia até 70% etc.) foram mantidos.
- **Laboratório:** a foto da bancada ficou sem borda, esmaecendo na direção do texto, e os 3 pontos viraram texto simples. A caixa de garantia virou uma linha com ícone, sem caixa.
- **O que reparamos:** 4 equipamentos aparecem recortados e soltos (Placas eletrônicas, UPS e controladoras, Válvula proporcional, WETA/WETB/TDI). Os outros 4 (Fontes chaveadas, Drivers de IGBT, CLP e módulos I/O, HUB Computer) viraram texto simples logo abaixo, porque já têm imagem na seção de equipamentos raros.
- **Processo:** uma foto de inspeção microscópica abaixo do título, que fica fixa enquanto as 4 etapas rolam.
- **Tirei o que não era imagem:** a foto de fundo fixa em toda a página, as faixas azuis diagonais com pontinhos e as bordas e fundos dos cards (métricas, clientes, fabricantes, contato). O site ficou com fundo claro liso e as fotos assumem a identidade.
- Se alguma imagem ainda não existir, o espaço dela fica vazio, sem ícone quebrado.

## 2. Mapa: arquivo → onde aparece

Todos os arquivos vão na pasta `assets/img/`, ao lado do `index.html`, com exatamente estes nomes.

| Arquivo | Onde aparece | Formato |
| --- | --- | --- |
| `hero-eolica.jpg` | Fundo do topo, grande, no canto direito | Foto horizontal 1920×1080 |
| `faixa-parque-eolico.jpg` | Faixa "Da turbina à bancada" | Foto panorâmica 2000×900 |
| `processo-microscopio.jpg` | Seção Processo, abaixo do título | Foto horizontal 1200×700 |
| `fonte-lambda-recorte.png` | Equipamentos raros, linha 1 | PNG sem fundo |
| `clp-modulos-io-recorte.png` | Equipamentos raros, linha 2 | PNG sem fundo |
| `driver-igbt-recorte.png` | Equipamentos raros, linha 3 | PNG sem fundo |
| `hub-computer-recorte.png` | Equipamentos raros, linha 4 | PNG sem fundo |
| `placa-eletronica.png` | O que reparamos | PNG sem fundo |
| `ups-controladora.png` | O que reparamos | PNG sem fundo |
| `valvula-proporcional.png` | O que reparamos | PNG sem fundo |
| `weta-tdi.png` | O que reparamos | PNG sem fundo |

A foto do laboratório continua sendo `laboratorio-bancada.jpg`, que já existe. O cliente pediu uma foto real do laboratório e da equipe, então o ideal é trocar por uma foto verdadeira, com o mesmo nome.

## 3. Foto real ou imagem de IA?

Para os **equipamentos** (fonte Lambda, CLP, driver de IGBT, HUB Computer, WETA/TDI), **fotografe a peça real no laboratório**. O público é de técnicos de parques eólicos e percebe na hora uma peça inventada. A IA costuma criar conectores e logos que não existem. Os prompts abaixo são reserva para peças que a equipe não tiver à mão e para as fotos de ambiente.

Como fotografar com o celular: peça sobre folha branca ou mesa limpa, perto de uma janela (sem flash), de frente e levemente de lado, ocupando quase toda a foto. Tire 3 ou 4 e escolha a mais nítida.

## 4. Prompts

Use em qualquer gerador (ChatGPT, Gemini, Midjourney, Leonardo, Flux). Estão em inglês porque os geradores entendem melhor.

### 4.1 Fotos de ambiente

**`hero-eolica.jpg`**

> Photorealistic wide landscape photo of a very large modern wind turbine in an open field in northeast Brazil, shot from a low angle, the turbine on the right third of the frame and partially cropped by the right edge, soft blue sky with a few light clouds, the left two thirds mostly clear sky with empty space for text, warm golden morning light, ultra sharp, 16:9, no people, no text, no logo

**`faixa-parque-eolico.jpg`** (o cliente comentou que o público gosta de ver aerogerador e placa eletrônica juntos)

> Panoramic photo of a wind farm at sunrise in a flat landscape, with a green industrial electronic circuit board resting in the sharp foreground at the bottom of the frame and the wind turbines softly out of focus in the background, cool blue sky with warm light on the horizon, photorealistic, ultra wide 21:9, no people, no text, no logo

**`processo-microscopio.jpg`**

> Close-up photo of a stereo microscope inspecting an industrial power electronics circuit board with SMD and BGA components, a technician's gloved hands holding fine tweezers, clean laboratory workbench, shallow depth of field, cool white lighting, face not visible, no text, 16:9

### 4.2 Recortes de equipamentos

Todos usam esta base, e você só troca a parte entre colchetes:

> Studio product photo of \[DESCRIÇÃO\], isolated on a plain pure white background, soft diffused studio lighting, slight three-quarter angle, sharp focus, realistic industrial electronics, centered, high resolution, no text, no logos, no brand names, no hands

Descrições para trocar em cada arquivo:

- **`fonte-lambda-recorte.png`**: an industrial DIN-rail switching power supply, metal body, green screw terminals, front adjustment potentiometer and a status LED
- **`clp-modulos-io-recorte.png`**: an industrial PLC controller with two I/O modules side by side on a DIN rail, light grey housings, green terminal blocks and communication connectors
- **`driver-igbt-recorte.png`**: an IGBT gate driver board with pulse transformers and SMD components, placed next to a large IGBT power module
- **`hub-computer-recorte.png`**: a rugged wind turbine rotor hub computer, compact aluminum enclosure with several multi-pin connectors and a circuit board partly visible
- **`placa-eletronica.png`**: a green industrial power and control electronic board with capacitors, a heat sink, relays and a terminal connector
- **`ups-controladora.png`**: an industrial UPS unit with a small LCD display, next to a compact pitch controller module with connectors
- **`valvula-proporcional.png`**: a hydraulic proportional valve, cylindrical solenoid on a steel valve body with ports, black and zinc finish, with its electrical connector
- **`weta-tdi.png`**: a small rotation monitoring electronic module, compact enclosure with a circuit board and a multi-pin connector

## 5. Como preparar as imagens

1. **Remover o fundo (só os recortes `.png`):** use remove.bg, Photoroom ou o Canva ("Remover plano de fundo"). Baixe como **PNG**. O fundo deve ficar transparente (aparece um xadrez cinza e branco).
2. **Reduzir o peso:** abra squoosh.app, arraste a imagem e baixe menor. Hero e faixa: largura de 1920 px, no máximo 400 KB. Processo e laboratório: 1200 a 1600 px, no máximo 300 KB. Recortes: 900 px, no máximo 200 KB.
3. **Conferir o hero:** a eólica precisa ficar do lado direito e o céu limpo do lado esquerdo. Se ela saiu no meio, corte a imagem no Canva ou no celular.
4. **Salvar com o nome certo:** tudo minúsculo, sem acento, na pasta `assets/img/`.
5. **Testar:** abra o `index.html` no navegador, no computador e no celular, e confira se cada imagem apareceu no lugar certo.

## 6. Checklist final

- [ ] Hero, faixa e processo prontos (3 fotos de ambiente)
- [ ] 4 recortes dos equipamentos raros
- [ ] 4 recortes da seção O que reparamos
- [ ] Foto real do laboratório e da equipe no lugar de `laboratorio-bancada.jpg`
- [ ] Todos os arquivos com o nome exato e dentro de `assets/img/`
- [ ] Peso de cada arquivo dentro dos limites
- [ ] Site conferido no celular e no computador
