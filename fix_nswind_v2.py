#!/usr/bin/env python3
"""
fix_nswind_v2.py — Corrige nswind.html com assets NS Wind corretos:
  - Hero background → faixa-parque-eolico.webp
  - Hero ícone → logo-nswind.webp
  - Footer logo → logo-nswind.webp
  - Marquee logos → logos de parceiros NS Wind (src + srcset + data-lazy-src + data-lazy-srcset)
  - Preload <link> → imagens NS Wind
  - Inline wpr-lazyload-bg style → hero NS Wind
"""

import re, shutil, os

BASE = "/home/carlos/Antigravity/landing/copia-nsengenharia/nsengenharia.com.br"
SRC  = os.path.join(BASE, "nswind.html")
DST  = SRC  # sobrescreve in-place

with open(SRC, "r", encoding="utf-8") as f:
    html = f.read()

# ─────────────────────────────────────────────────────────────────────────────
# 1. HERO BACKGROUND — substitui hero-bg.webp por faixa-parque-eolico.webp
#    (preload link + inline wpr-lazyload-bg style + wpr-bg inline style)
# ─────────────────────────────────────────────────────────────────────────────
html = html.replace(
    "wp-content/uploads/2026/09/hero-bg.webp",
    "assets-nswind/faixa-parque-eolico.webp"
)
# Também o data-lazy-bg inline script JSON (escaped)
html = html.replace(
    r"wp-content\/uploads\/2026\/09\/hero-bg.webp",
    r"assets-nswind\/faixa-parque-eolico.webp"
)

# ─────────────────────────────────────────────────────────────────────────────
# 2. HERO ÍCONE (png/svg decorativo no hero) → logo NS Wind
# ─────────────────────────────────────────────────────────────────────────────
html = html.replace(
    "wp-content/uploads/2026/09/hero-icone.svg",
    "assets-nswind/logo-nswind.webp"
)
html = html.replace(
    r"wp-content\/uploads\/2026\/09\/hero-icone.svg",
    r"assets-nswind\/logo-nswind.webp"
)

# ─────────────────────────────────────────────────────────────────────────────
# 3. FOOTER LOGO — logo-full.svg → logo-nswind.webp
# ─────────────────────────────────────────────────────────────────────────────
html = html.replace(
    "wp-content/uploads/2026/09/logo-full.svg",
    "assets-nswind/logo-nswind.webp"
)
html = html.replace(
    r"wp-content\/uploads\/2026\/09\/logo-full.svg",
    r"assets-nswind\/logo-nswind.webp"
)

# ─────────────────────────────────────────────────────────────────────────────
# 4. MARQUEE / PARCEIROS LOGOS — troca os srcset antigos pelos NS Wind
#    Mapeamento: imagem original → nova imagem NS Wind
# ─────────────────────────────────────────────────────────────────────────────
partner_map = {
    # NS Engenharia → NS Wind parceiro
    "wp-content/uploads/2026/09/nike.webp":                    "assets-nswind/logo-ge-vernova.webp",
    "wp-content/uploads/2026/09/nike-300x206.webp":            "assets-nswind/logo-ge-vernova.webp",
    "wp-content/uploads/2026/10/nike-white.webp":              "assets-nswind/logo-ge-vernova.webp",
    "wp-content/uploads/2026/10/nike-white-300x173.webp":      "assets-nswind/logo-ge-vernova.webp",
    "wp-content/uploads/2026/09/globo.webp":                   "assets-nswind/logo-acciona.webp",
    "wp-content/uploads/2026/09/globo-300x206.webp":           "assets-nswind/logo-acciona.webp",
    "wp-content/uploads/2026/09/armarinhos-fernando.webp":     "assets-nswind/logo-bons-ventos.webp",
    "wp-content/uploads/2026/09/armarinhos-fernando-300x188.webp": "assets-nswind/logo-bons-ventos.webp",
    "wp-content/uploads/2026/09/armarinhos-fernando-768x480.webp": "assets-nswind/logo-bons-ventos.webp",
    "wp-content/uploads/2026/09/john-deere.webp":              "assets-nswind/logo-siemens-gamesa.webp",
    "wp-content/uploads/2026/09/john-deere-300x206.webp":      "assets-nswind/logo-siemens-gamesa.webp",
    "wp-content/uploads/2026/09/santa-marcelina.webp":         "assets-nswind/logo-vestas.webp",
    "wp-content/uploads/2026/09/santa-marcelina-300x91.webp":  "assets-nswind/logo-vestas.webp",
    "wp-content/uploads/2026/09/smart-white.webp":             "assets-nswind/logo-ingeteam.webp",
    "wp-content/uploads/2026/09/smart-white-300x206.webp":     "assets-nswind/logo-ingeteam.webp",
    "wp-content/uploads/2026/09/smart-white-150x150.webp":     "assets-nswind/logo-ingeteam.webp",
}

for old, new in partner_map.items():
    html = html.replace(old, new)
    # também versão com escaped slashes nos inline scripts
    html = html.replace(old.replace("/", "\\/"), new.replace("/", "\\/"))

# ─────────────────────────────────────────────────────────────────────────────
# 5. PRELOAD <link> — substitui preloads dos logos antigos pelos NS Wind
# ─────────────────────────────────────────────────────────────────────────────
preload_map = {
    '<link rel="preload" as="image" href="wp-content/uploads/2026/09/globo.webp" fetchpriority="high">':
        '<link rel="preload" as="image" href="assets-nswind/logo-acciona.webp" fetchpriority="high">',
    '<link rel="preload" as="image" href="wp-content/uploads/2026/09/santa-marcelina.webp" fetchpriority="high">':
        '<link rel="preload" as="image" href="assets-nswind/logo-vestas.webp" fetchpriority="high">',
    '<link rel="preload" as="image" href="wp-content/uploads/2026/09/nike.webp" fetchpriority="high">':
        '<link rel="preload" as="image" href="assets-nswind/logo-ge-vernova.webp" fetchpriority="high">',
    '<link rel="preload" as="image" href="wp-content/uploads/2026/09/armarinhos-fernando.webp" fetchpriority="high">':
        '<link rel="preload" as="image" href="assets-nswind/logo-bons-ventos.webp" fetchpriority="high">',
    '<link rel="preload" as="image" href="wp-content/uploads/2026/09/john-deere.webp" fetchpriority="high">':
        '<link rel="preload" as="image" href="assets-nswind/logo-siemens-gamesa.webp" fetchpriority="high">',
}
for old, new in preload_map.items():
    html = html.replace(old, new)

# ─────────────────────────────────────────────────────────────────────────────
# 6. INLINE wpr-lazyload-bg-exclusion style — faz hero BG carregar imediatamente
# ─────────────────────────────────────────────────────────────────────────────
# Já substituído acima via replace do caminho hero-bg.webp

# ─────────────────────────────────────────────────────────────────────────────
# 7. rocket_pairs inline script — troca hero-bg nos pares de lazy-bg
# ─────────────────────────────────────────────────────────────────────────────
# Já coberto pela substituição geral acima.

# ─────────────────────────────────────────────────────────────────────────────
# 8. Corrige srcset dos logos parceiros na marquee duplicada (segunda rolagem)
#    Onde src já foi trocado mas srcset ainda aponta para logos antigos.
#    Varre todos os <img> com src=assets-nswind/logo-X e corrige o srcset.
# ─────────────────────────────────────────────────────────────────────────────
def fix_img_srcset(html_text):
    """
    Para cada <img> cujo src aponta para assets-nswind/logo-*.webp,
    substitui o srcset para usar o mesmo arquivo (sem responsive variants).
    """
    def replacer(m):
        tag = m.group(0)
        src_match = re.search(r'\bsrc=["\']([^"\']+)["\']', tag)
        if not src_match:
            return tag
        src_val = src_match.group(1)
        if not src_val.startswith("assets-nswind/logo-"):
            return tag
        # Remove srcset antigo e data-lazy-srcset antigo
        tag = re.sub(r'\s*srcset=["\'][^"\']*["\']', f' srcset="{src_val}"', tag)
        tag = re.sub(r'\s*data-lazy-srcset=["\'][^"\']*["\']', f' data-lazy-srcset="{src_val}"', tag)
        tag = re.sub(r'\s*data-lazy-src=["\'][^"\']*["\']', f' data-lazy-src="{src_val}"', tag)
        return tag

    return re.sub(r'<img\b[^>]+>', replacer, html_text, flags=re.DOTALL)

html = fix_img_srcset(html)

# ─────────────────────────────────────────────────────────────────────────────
# 9. Corrige o hero ícone img: width/height para logo NS Wind
# ─────────────────────────────────────────────────────────────────────────────
# O logo-nswind.webp tem dimensões diferentes do svg original (401x714)
html = html.replace(
    'src="assets-nswind/logo-nswind.webp" width="401" height="714"',
    'src="assets-nswind/logo-nswind.webp" width="300" height="100" style="max-width:200px;object-fit:contain;"'
)

# ─────────────────────────────────────────────────────────────────────────────
# 10. Inline JSON-LD schema — atualiza menções à NS Engenharia no schema
# ─────────────────────────────────────────────────────────────────────────────
html = html.replace(
    '"name":"Grupo Novais Santos | Engenharia e Arquitetura em São Paulo"',
    '"name":"NS Wind | Manutenção e Diagnóstico de Aerogeradores"'
)
html = html.replace(
    '"name":"Grupo Novais Santos"',
    '"name":"NS Wind"'
)
html = html.replace(
    '"description":"Centro especializado em diagnóstico de bancada, engenharia reversa e reparo de componentes raros para aerogeradores e usinas solares. Mais de 1.000 Módulos Críticos Raros executados para hospitais, hotéis e shoppings em São Paulo. Solicite um orçamento."',
    '"description":"Especialistas em diagnóstico de bancada, engenharia reversa e reparo de componentes críticos de aerogeradores. Atendemos os maiores parques eólicos do Brasil. Solicite um orçamento."'
)

# ─────────────────────────────────────────────────────────────────────────────
# Salva
# ─────────────────────────────────────────────────────────────────────────────
with open(DST, "w", encoding="utf-8") as f:
    f.write(html)

print("✅ nswind.html atualizado com sucesso!")

# Relatório de verificação
checks = [
    ("hero background parque eólico",  "faixa-parque-eolico.webp" in html),
    ("hero ícone NS Wind logo",         'src="assets-nswind/logo-nswind.webp"' in html),
    ("logos parceiros ge-vernova",      "logo-ge-vernova.webp" in html),
    ("logos parceiros acciona",         "logo-acciona.webp" in html),
    ("logos parceiros vestas",          "logo-vestas.webp" in html),
    ("sem referências nike.webp",       "nike.webp" not in html),
    ("sem referências globo.webp",      "globo.webp" not in html and "globo-" not in html),
    ("sem referências john-deere.webp", "john-deere.webp" not in html),
    ("sem referências santa-marcelina", "santa-marcelina.webp" not in html),
    ("sem referências hero-bg.webp",    "hero-bg.webp" not in html),
    ("sem referências hero-icone.svg",  "hero-icone.svg" not in html),
]

print("\n📋 Verificações:")
all_ok = True
for label, ok in checks:
    status = "✅" if ok else "❌"
    print(f"  {status} {label}")
    if not ok:
        all_ok = False

print("\n" + ("🎉 Tudo ok!" if all_ok else "⚠️  Alguns itens precisam de atenção"))
