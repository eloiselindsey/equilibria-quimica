# EQUILIBRA — Química sem Medo

Plataforma web gratuita e responsiva para estudar **Equilíbrio Iônico na Água**. Desenvolvida com HTML5, CSS3 e JavaScript modular, sem PHP, backend, cadastro ou serviços pagos.

## O que está incluído

- **6 módulos teóricos** e **25 aulas**: fundamentos, autoionização da água, indicadores ácido-base, soluções tampão, hidrólise de sais e produto de solubilidade (Kps). Todas as aulas incluem introdução, explicação aprofundada, explicação alternativa, fórmula comentada, dois exemplos e encaminhamento para prática.
- **5 laboratórios interativos**: cálculo de pH e pOH e dependência de Kw com temperatura; cores de indicadores e escolha de amostras; tampão HA/A⁻ com adição de ácido ou base e comparação não tamponada; hidrólise qualitativa e pH aproximado; produto iônico Q/Kps e precipitação com balanço simplificado de concentração.
- **120 exercícios originais**: 20 por módulo, com múltipla escolha, verdadeiro ou falso, cálculos, completar lacunas, interpretação de gráfico, associação e ordenação de etapas, explicação da resposta e dicas.
- **40 flashcards originais**: 8 para cada um dos cinco temas principais, com classificação «Acertei / Tenho dúvidas / Errei», revisão espaçada simples e filtros por tema e pendência.
- **Progresso persistente**: aulas concluídas, tentativas, conquistas, XP, cartões, desafios, simulados e preferência de tema armazenados no navegador.
- **Gamificação**: 12 conquistas com critérios verificáveis, pontuação limitada por ação, níveis.
- **Intensivão**: plano de revisão, mapa de fórmulas, erros frequentes, simulados de 10/20/30 questões e análise dos resultados por assunto.
- **Acessibilidade e usabilidade**: contraste, foco visível, navegação por teclado, labels, responsividade, alternativa a movimento excessivo e modo escuro.

## Iniciar localmente

**Importante:** como o projeto usa ES Modules (`type="module"`), abra-o por um servidor HTTP. Abrir `index.html` diretamente com `file://` pode bloquear importações dos módulos do JavaScript.

Opção 1 — VS Code:

1. Abra a pasta `EQUILIBRA` no VS Code.
2. Instale a extensão **Live Server**, se ainda não tiver.
3. Clique com o botão direito em `index.html` → **Open with Live Server**.
4. Acesse o endereço local exibido no navegador.

Opção 2 — Python (terminal dentro da pasta):

```bash
python -m http.server 8000
```

Depois, entre em `http://localhost:8000`.

## Publicar no GitHub Pages — passo a passo

1. Faça login no GitHub e crie um repositório novo, por exemplo `equilibra-quimica`, do tipo **Public**.
2. Envie para a **raiz do repositório** todos os arquivos e pastas que estão dentro de `EQUILIBRA`: `index.html`, `css/`, `js/`, `data/`, `assets/`, `tests/` e `README.md`. **Não coloque apenas o README e nem uma pasta intermediária que esconda o `index.html`.**
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
5. Selecione **Branch: main** e **Folder: /(root)**. Clique em **Save**.
6. Aguarde o GitHub publicar. Seu endereço terá o formato `https://SEU-USUARIO.github.io/equilibra-quimica/`.
7. Abra o link; se aparecer apenas o README do GitHub, verifique se está acessando o endereço do **Pages**, e não o endereço da página de código do repositório.

Todos os caminhos de importação e links internos são relativos, portanto o projeto funciona em um subdiretório do GitHub Pages.

## Estrutura de arquivos

```text
EQUILIBRA/
├── index.html                 # Shell semântico e navegação
├── css/
│   └── style.css             # Layout, cores, responsividade e temas
├── js/
│   ├── app.js                # Rotas, interface, eventos e interações
│   ├── chemistry.js          # Funções matemáticas dos cinco laboratórios
│   ├── store.js              # LocalStorage, XP e persistência
│   └── achievements.js       # Critérios objetivos para 12 conquistas
├── data/
│   ├── modules.js            # 25 aulas em seis módulos
│   ├── questions.js          # 120 atividades com respostas e comentários
│   └── flashcards.js         # 40 cartões de revisão
├── assets/
│   └── favicon.svg
├── tests/
│   └── chemistry.test.mjs    # Testes automatizados de conteúdo e cálculos
└── README.md
```

## Testes

Com Node.js 18 ou superior, na pasta do projeto:

```bash
node --test tests/chemistry.test.mjs
```

Os testes avaliam a quantidade e a estrutura do conteúdo, pH e pOH, neutralidade em diferentes temperaturas, indicadores, Henderson–Hasselbalch, hidrólise, comparação Q/Kps e balanços simplificados de precipitação. A interface também foi percorrida manualmente em um navegador de testes com as telas principais e interações essenciais.

## Persistência e privacidade

O armazenamento utiliza `localStorage` no **mesmo navegador e dispositivo**. Não há servidor recebendo dados. A limpeza de dados do site ou o uso de outro aparelho pode apagar a sessão de estudo; use **Progresso → Exportar JSON** como backup e **Importar JSON** para restaurar.

## Limitações científicas, descritas na plataforma

Os laboratórios são modelos educacionais, não experimentos medidos. Consideram hipóteses como atividade aproximada por concentração, temperatura definida, reações simples e ausência de efeitos complexos de atividade, cinética, força iônica e complexação. No tampão, o resultado quantitativo deixa de ser apresentado quando um componente é consumido. Precipitados podem se formar com atraso na prática por razões cinéticas. Valores exemplificativos de pH de amostras são aproximações variáveis.

## Como adaptar o conteúdo

- Aulas: `data/modules.js`
- Questões, gabaritos, dificuldades e justificativas: `data/questions.js`
- Flashcards: `data/flashcards.js`
- Cálculos químicos: `js/chemistry.js`
- Regras de XP e conquistas: `js/store.js` e `js/achievements.js`
- Design: variáveis CSS em `css/style.css`

## Fontes bibliográficas

As referências fornecidas para o projeto estão em **Referências e metodologia** dentro do site, incluindo Mundo Educação, Brasil Escola, Professor Carlos Junior, Cola da Web, Khan Academy e artigo da Unicamp/Chemkeys. Os textos das aulas e exercícios são originais.

---

EQUILIBRA — material didático livre para estudo. Não é uma ferramenta de análise química laboratorial profissional.
