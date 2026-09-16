/* ============================================================
   Certificações — fonte única de dados
   ------------------------------------------------------------
   Este é o único lugar onde os dados dos certificados são definidos.
   O carrossel (scripts/certificates-carousel.js) monta os cards a
   partir desta lista.

   COMO ADICIONAR UM NOVO CERTIFICADO
   1. Salve o PDF original em:  files/certificados/nome-do-certificado.pdf
   2. Salve a prévia (imagem 1200x900) em: img/certificados/nome-do-certificado.webp
   3. Copie um dos objetos abaixo, ajuste os campos e salve o arquivo.
      Os indicadores e os botões do carrossel se ajustam automaticamente.

   CAMPOS
   - id:          identificador único (sem espaços)
   - name:        nome do certificado
   - institution: instituição / plataforma emissora
   - category:    categoria exibida acima do nome
   - year:        ano de conclusão (opcional — deixe "" para não exibir)
   - description: resumo em uma linha (opcional)
   - preview:     caminho da imagem de prévia (primeira página do PDF)
   - alt:         texto alternativo da prévia (acessibilidade)
   - pdf:         caminho do PDF original
   ============================================================ */

const CERTIFICATES_DATA = [
  {
    id: "analise-de-dados-e-inteligencia-de-negocios",
    name: "Análise de Dados e Inteligência de Negócios",
    institution: "GRAN Faculdade",
    category: "Dados & Business Intelligence",
    year: "2025",
    description:
      "Curso concluído em 15 de dezembro de 2025, com carga horária de 30 horas.",
    preview:
      "img/certificados/analise-de-dados-e-inteligencia-de-negocios.webp",
    alt: "Prévia do certificado de Análise de Dados e Inteligência de Negócios da GRAN Faculdade",
    pdf: "files/certificados/analise-de-dados-e-inteligencia-de-negocios.pdf",
  },
  {
    id: "programe-py-pet-informatica-ufpe",
    name: "Programe.py",
    institution: "PET Informática — UFPE",
    category: "Programação em Python",
    year: "2025",
    description:
      "Atividade de extensão do Centro de Informática da UFPE, concluída em 17 de dezembro de 2025, com carga horária total de 60 horas.",
    preview: "img/certificados/programe-py-pet-informatica-ufpe.webp",
    alt: "Prévia do certificado da atividade Programe.py do PET Informática da UFPE",
    pdf: "files/certificados/programe-py-pet-informatica-ufpe.pdf",
  },
  {
    id: "imersao-start-hacker-ti-academy",
    name: "Imersão Start Hacker",
    institution: "TI Academy",
    category: "Segurança Cibernética",
    year: "2026",
    description:
      "Imersão em Ethical Hacking e Segurança Cibernética realizada de 07/09 a 13/09 de 2026, com 12 horas de aulas.",
    preview: "img/certificados/imersao-start-hacker-ti-academy.webp",
    alt: "Prévia do certificado da Imersão Start Hacker da TI Academy",
    pdf: "files/certificados/imersao-start-hacker-ti-academy.pdf",
  },
];
