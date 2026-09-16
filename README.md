# Portfólio Profissional - Anderson Bernardo

Portfólio profissional de Anderson Bernardo, com foco em desenvolvimento front-end, sites institucionais, landing pages e sistemas web.

## 🎯 Sobre o Projeto

Portfólio profissional para Anderson Bernardo da Silva, Desenvolvedor Front-end e Freelancer, especializado em criar sites, landing pages e sistemas web personalizados.

## ✨ Características

### Design & Experiência
- **Design Moderno**: Interface escura, limpa e profissional
- **Tema consistente**: Contraste forte e hierarquia visual clara
- **Responsivo**: Adaptado para desktop, tablet e celular
- **Navegação suave**: Experiência simples e objetiva

### Funcionalidades Técnicas
- **Interação leve**: Botões e navegação com foco em usabilidade
- **Navegação Suave**: Smooth scroll entre seções
- **Menu Responsivo**: Hambúrguer funcional para mobile
- **Conteúdo verificável**: Sem métricas falsas ou dados inventados

### Performance & SEO
- **SEO básico e sólido**: Title, description, Open Graph e estrutura semântica
- **Performance**: HTML, CSS e JavaScript vanilla, sem bibliotecas extras
- **Acessibilidade**: Navegação por teclado, links claros e contraste adequado
- **Lazy Loading**: Carregamento otimizado de imagens

## 🛠️ Tecnologias Utilizadas

- ### Frontend
- **HTML**: Estrutura semântica e acessível
- **CSS**: Variáveis, Flexbox, Grid e responsividade
- **JavaScript**: Vanilla JS para interações leves
- ### Design
- **Layout responsivo**: Cards e seções adaptáveis
- **Hierarquia visual**: Títulos, espaçamentos e contraste
- **Tipografia**: Inter font do Google Fonts
- **Tipografia**: Inter font do Google Fonts

## 📱 Seções

1. **Hero**: Apresentação principal com nome, cargo e CTAs
2. **Sobre**: Biografia profissional e formação
3. **Diferencial**: Desenvolvimento + infraestrutura + negócio
4. **Tecnologias**: Ferramentas utilizadas
5. **Projetos**: Portfólio de projetos em destaque
6. **Contato**: Informações de contato e links sociais
7. **Footer**: Identificação simples

## 🚀 Projetos em Destaque

### ControlISP
Sistema web para gerenciamento de pequenos provedores de internet.

**Tech Stack**: HTML, CSS, JavaScript, Firebase

### Nature Force
Landing page comercial para energia solar por assinatura.

**Tech Stack**: HTML, CSS, JavaScript

### Boteco Taberna
Landing page em evolução para restaurante e bar.

**Tech Stack**: HTML, CSS, JavaScript

## 💼 Serviços Oferecidos

- Landing pages de alta conversão
- Sites institucionais
- Sistemas web personalizados
- Correções e manutenção front-end
- Responsividade e adaptação mobile

## 🎨 Decisões de Design

### Cores
- **Background Principal**: #0a0a0b (preto suave)
- **Background Secundário**: #111113 (cinza escuro)
- **Accent Primary**: azul
- **Accent Secondary**: ciano
- **Accent Tertiary**: verde

### Tipografia
- **Fonte Principal**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700, 800

### Efeitos
- Gradientes discretos para profundidade
- Sombras suaves para hierarquia visual
- Transições curtas para fluidez

## 📂 Estrutura do Projeto

```
portfolio/
├── index.html                        # Arquivo HTML principal
├── README.md                         # Documentação do projeto
├── files/
│   ├── curriculo.pdf                 # Currículo para download
│   └── certificados/                 # PDFs originais dos certificados
├── img/
│   ├── foto.png                      # Foto de perfil
│   ├── projeto-*.png                 # Imagens dos projetos
│   └── certificados/                 # Prévias (thumbnails) dos certificados
├── styles/
│   └── main.css                      # Estilos globais
└── scripts/
    ├── main.js                       # Navegação, scroll e animações
    ├── certificates-data.js          # Dados das certificações (fonte única)
    └── certificates-carousel.js      # Renderização e navegação do carrossel
```

## 🎓 Certificações (carrossel)

A seção `#certificates` exibe os certificados em um carrossel sem bibliotecas
externas: navegação por botões, indicadores, setas do teclado e swipe no mobile.

### Como adicionar um novo certificado

1. **PDF original** → `files/certificados/nome-do-certificado.pdf`
2. **Prévia (imagem da primeira página)** → `img/certificados/nome-do-certificado.webp`
3. **Dados** → adicione um objeto em `scripts/certificates-data.js`
   (nome, instituição, categoria, ano, descrição, prévia, alt e PDF).

O carrossel se ajusta sozinho: novos itens criam automaticamente novos cards,
indicadores e estados dos botões.

### Especificação das prévias (thumbnails)

| Item | Recomendação |
| --- | --- |
| Formato | **WebP** (qualidade ~85). Alternativa: JPEG (qualidade 82) |
| Dimensões | **1200 × 900 px** (proporção 4:3, igual ao card) |
| Peso | Até ~150 KB por imagem |
| Conteúdo | Primeira página do certificado, inteira, centralizada e sem cortes |
| Nome do arquivo | Mesmo nome do PDF, apenas com extensão `.webp` |

As prévias deste repositório foram geradas a partir dos PDFs originais em
1200×900, com a página centralizada e sombra suave (40–85 KB cada), usando
`object-fit: contain` no card — ou seja, nada é esticado ou cortado.

> **Conversão de PDF → imagem:** renderize a primeira página em 2x ou 3x
> (ex.: 2526×1785 px) e reduza para 1200×900 no final. Isso mantém o texto
> legível em telas retina. Nenhuma biblioteca é necessária no site: os PDFs
> completos só são carregados quando o usuário clica em **Ver certificado**.


### Validação e publicação

Verificação local em Chrome headless: larguras 1440, 820, 390 e 320 px sem
scroll horizontal; anterior/próximo, foco por teclado, swipe nos dois sentidos,
menu mobile (incluindo Escape), scroll com movimento reduzido e três PDFs
retornando HTTP 200. Sintaxe dos três scripts verificada com `node --check`.
Não há etapa de build: o projeto continua estático e sem dependências de runtime.
Emulação não substitui testes em aparelhos físicos/Safari.

Os botões existentes compartilham feedback de hover, active e foco visível;
controles desabilitados usam `disabled` nativo. CTAs e controles têm áreas de
toque maiores, ícones discretos e respeito a `prefers-reduced-motion`.
O menu mantém os mesmos cinco destinos existentes.

**Privacidade:** o número do CPF foi ocultado diretamente nos pixels da prévia
WebP do certificado Programe.py, a pedido do titular. O PDF original não foi
alterado e continua contendo o CPF, acessível ao abrir o certificado, conforme
autorizado pelo titular. Tudo em `files/` e `img/` será público. Ao gerar novamente
a prévia a partir do PDF, reaplique a ocultação antes de publicar.

**Pendências anteriores preservadas:** duas seções usam `id="about"`;
o navegador solicita um favicon inexistente (404). Não foram reorganizadas
seções nem adicionados assets de identidade fora do escopo.

## 🔧 Instalação e Uso

1. Clone o repositório:
```bash
git clone https://github.com/AndersonBernardo/portfolio.git
```

2. Abra o arquivo `index.html` em seu navegador ou use um servidor local:
```bash
# Com Python
python -m http.server 8080

# Com Node.js
npx serve .

# Com VS Code Live Server
# Clique com botão direito em index.html > "Open with Live Server"
```

## 📊 Performance

O objetivo é manter carregamento leve, boa legibilidade e interação estável em desktop e mobile.

## 🎯 Objetivo

Transmitir profissionalismo, qualidade visual, atenção aos detalhes e capacidade técnica para:
- Recrutadores de empresas de tecnologia
- Clientes potenciais de trabalhos freelancers
- Parceiros de projetos colaborativos

## 📝 Autor

- **Anderson Bernardo da Silva**
- GitHub: [@1986andersonbernardo-creator](https://github.com/1986andersonbernardo-creator)
- LinkedIn: [anderson-bernardo-da-silva](https://www.linkedin.com/in/anderson-bernardo-da-silva-838510334/)
- WhatsApp: (81) 98500-8954

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar como referência para seu próprio portfólio.

## 🙏 Agradecimentos

Agradeço por visitar meu portfólio. Estou sempre aberto a novas oportunidades e colaborações!

---

⭐ Se este projeto te inspirou, considere dar uma estrela!

Desenvolvido com dedicação por Anderson Bernardo da Silva.
