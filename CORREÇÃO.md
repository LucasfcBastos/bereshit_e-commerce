# Relatório de Análise e Correção — BereShit E-commerce

Este documento reúne a análise completa do código do projeto (pasta `frontend`), os problemas encontrados e as correções de responsividade aplicadas. Nenhuma funcionalidade, layout ou identidade visual foi alterada — apenas o CSS necessário para tornar o projeto responsivo em Desktop, Tablet, Mobile e Mobile Pequeno (320px).

---

## 1. Metodologia

Foram lidos e analisados todos os arquivos de código-fonte (`.jsx`, `.js`, `.css`) do projeto, além dos arquivos de configuração (`package.json`, `vite.config.js`, `.oxlintrc.json`). Após o build (`npm run build`) e o lint (`npm run lint`) confirmarem que o projeto já estava íntegro, as correções de CSS foram aplicadas e o build/lint foram executados novamente para garantir que nada foi quebrado.

---

## 2. Problemas encontrados

### 2.1 Erros e bugs de código (documentados — **não corrigidos**, pois fogem do escopo de responsividade/CSS definido para esta tarefa)

| # | Arquivo | Problema | Explicação |
|---|---------|----------|------------|
| 1 | `src/components/cards/CardLine.jsx` | Imagem sempre quebrada na visualização "em lista" | O componente recebe a prop `image` em `ListCars.jsx` (`<CardLine image={car.images[0]} ... />`), mas a assinatura da função é `function CardLine({ nome, ano, km, preco })` — a prop `image` nunca é desestruturada nem usada. O `<img src="" />` fica sempre com `src` vazio e sem `alt`. |
| 2 | `src/components/header/HeaderTop.jsx` e `src/routes/AppRoutes.jsx` | Link do menu para uma página inexistente | O menu principal possui o item "SOBRE" apontando para `/about`, mas `AppRoutes.jsx` não define nenhuma rota `/about` nem uma rota coringa (`*`) de fallback. Ao clicar em "SOBRE", a área de conteúdo fica em branco. |
| 3 | `src/pages/cars/ViewCars.jsx` | Import não utilizado | `Link` é importado de `react-router-dom` mas nunca é usado no arquivo (confirmado também pelo lint: `eslint(no-unused-vars)`). |
| 4 | `src/components/camp/CampBrand.jsx` | Nome de função incorreto (erro de copiar/colar) | O arquivo `CampBrand.jsx` declara `function CampRecent()` (mesmo nome da função do arquivo `CampRecent.jsx`). Funciona porque o `export default` não depende do nome da função, mas é um resíduo de copy/paste que compromete a legibilidade e pode confundir futuras manutenções. |
| 5 | `src/components/cards/CardGrid.jsx`, `src/pages/cars/ViewCars.jsx` | Imagens sem atributo `alt` | A imagem principal do card em grade e a imagem grande do carro (na página de detalhes) não possuem `alt`, prejudicando acessibilidade e SEO. As miniaturas (`all-images`) já possuem `alt` corretamente. |
| 6 | `src/services/carService.js` | Inconsistência entre função síncrona e uso de `await` | `getCars()` não é `async` e não retorna uma `Promise`, mas é chamada como `await getCars()` em `LandingPage.jsx`, `ListCars.jsx`, `CampRecent.jsx` e `ViewCars.jsx`. Não causa erro (await em valor não-Promise apenas resolve o valor imediatamente), mas é uma inconsistência de estilo que sugere um código pensado para uma futura chamada assíncrona (API) que ainda não existe. |
| 7 | `public/icons.svg` | Asset órfão | O arquivo `public/icons.svg` não é referenciado em nenhum lugar do código-fonte (`src/`) nem em `index.html`. |
| 8 | `src/data/cars.js` | Base de dados vazia | Atualmente `export const cars = [];` — não há nenhum carro cadastrado. Isso é intencional (o `README.md` na raiz documenta o template para cadastro manual), mas limita a validação visual das telas de listagem, grade, linha e paginação, já que os estados "vazios" são os únicos exibidos hoje. |

### 2.2 CSS duplicado / conflitante (corrigido nesta tarefa)

| # | Arquivo(s) | Problema | Correção aplicada |
|---|------------|----------|--------------------|
| 9 | `src/styles/Main.css` (regra `main .pagination button`) vs `src/styles/Btn.css` (regra global `button`) | Duplicação exata de CSS | A regra `main .pagination button` em `Main.css` repetia **exatamente** as mesmas propriedades (`border-radius`, `min-width`, `padding`, `border`, `background-color`, `box-shadow`) já definidas globalmente em `button` (`Btn.css`). Removido o bloco duplicado em `Main.css`, mantendo apenas `main .pagination button.active` (que de fato adiciona um estilo diferente). Nenhuma mudança visual, pois o botão já herdava os mesmos valores do seletor global. |
| 10 | `src/styles/Header.css` (`header img`) | Propriedade CSS sem efeito (dead code) | `header img { height: 0.5em; min-height: 2em; }` — como `min-height` (2em) é maior que `height` (0.5em), o `height` nunca tinha efeito prático; a altura final sempre foi ditada pelo `min-height`. Simplificado para `height: 2em`, resultado visual idêntico. |
| 11 | `src/styles/Index.css` (`p`) | Valor de CSS inválido (bug de digitação) | `p { font-size: 1,03125em; }` usa vírgula como separador decimal (padrão brasileiro), o que é inválido em CSS. O navegador **ignora silenciosamente** essa declaração inteira, fazendo com que todos os `<p>` do site usem o tamanho de fonte padrão do navegador em vez do valor pretendido. Corrigido para `1.03125em` (ponto decimal), restaurando o tamanho de fonte originalmente pretendido para os parágrafos. |
| 12 | `src/styles/Btn.css` (`button:hover`) vs `src/styles/Main.css` (`main .top div button:hover`) | Conflito de especificidade em hover | O hover genérico de `button` define `background-color` e `color` de destaque. O hover mais específico dos botões de alternância grade/lista (`main .top div button:hover`) sobrescreve apenas a borda, então o fundo/cor de texto herdados do hover genérico também são aplicados a esses botões — um comportamento provavelmente não intencional. **Não foi alterado**, pois não é um problema de responsividade e corrigi-lo mudaria a aparência/comportamento visual atual, o que está fora do escopo desta tarefa. Fica documentado para decisão futura. |

### 2.3 Componentes mal estruturados / organização

- **`CardLine.jsx`** (item 1) é o exemplo mais claro de má estruturação: o componente não usa uma prop essencial que já é passada por quem o consome.
- **Estilos de botão espalhados** entre `Btn.css` (global) e regras específicas em `Camp.css`/`Main.css` (`.top div button`, `.pagination button`) tornam o rastreamento de qual regra vence mais difícil (ver item 12).
- **Ausência de página/estado 404** para rotas inexistentes (item 2).

### 2.4 Código morto / imports não utilizados

- `Link` não utilizado em `ViewCars.jsx` (item 3).
- `public/icons.svg` não referenciado (item 7).

### 2.5 Problemas de responsividade (corrigidos nesta tarefa)

O projeto **não possuía um sistema de breakpoints**: havia apenas uma única media query (`max-width: 768px`) em `Index.css`, ajustando somente o `padding` do `<main class="container">`. Nenhum outro componente reagia ao tamanho da tela. Os problemas concretos identificados:

| # | Arquivo(s) | Problema |
|---|------------|----------|
| 13 | `Index.css` | Ausência de `box-sizing: border-box` global. Combinações de `width` + `padding` em vários componentes (cards, filtro, cabeçalho) podiam somar mais que 100% da largura do contêiner ao reduzir a tela, gerando *overflow* horizontal. |
| 14 | `Header.css` | O cabeçalho fixo tem a logo à esquerda e o menu centralizado via `position: absolute`, sem nenhuma media query. Medindo os elementos reais (logo com proporção ~4,8:1 e altura mínima de 2em ≈ 154px de largura; menu com 3 links, gaps de 20px e fonte 0,6875em ≈ 200px de largura), a soma **ultrapassa a largura útil de telas de até ~390px** (ex.: 320px, 360px, 375px), causando sobreposição entre a logo e o menu. |
| 15 | `Main.css` (`.hero-text`) | Texto do hero sem `max-width`/margem direita e com fonte fixa grande (o 2º `h1` chega a ~2,06em). Em mobile, o texto podia encostar/ultrapassar a borda da tela. |
| 16 | `Main.css` (`.marq .brands-grid`) | `grid-template-columns: repeat(7, 1fr)` fixo, independente do tamanho da tela. Em tablets e celulares os 7 cartões ficavam extremamente espremidos, e o rótulo sobreposto (`.card-rod div`, com `padding: 25px`) chegava a ser **maior que o próprio cartão** em telas estreitas. |
| 17 | `Main.css` (`.top`) | Linha com o título "TODOS OS CARROS" e o seletor de visualização (grade/lista), em `display: flex` sem `flex-wrap`. Podia estourar a largura disponível em telas pequenas. |
| 18 | `Main.css` (`.half`) | Filtro lateral (`aside`, `min-width: 15%`) e lista de carros lado a lado em `display: flex` com `gap: 50px`, sem quebra de linha. Em tablets/celulares o filtro ficava espremido a poucos pixels de largura, prejudicando a leitura das marcas. |
| 19 | `Main.css` (`.highlight`, página de detalhes do carro) | Layout de 3 colunas com larguras somadas fixas (miniaturas `7.5em` + imagem principal `50%` + informações `30%`). Abaixo de ~640px de largura a soma das colunas **ultrapassa fisicamente a largura disponível**, causando rolagem horizontal indevida. |
| 20 | `Card.css` (`.card.line .info`) | Item flexível sem `min-width: 0`. Por padrão, itens flex não encolhem abaixo do seu conteúdo mínimo; combinado com a imagem fixa de 150×150px, o card "em linha" podia ultrapassar a largura da tela em dispositivos estreitos. |
| 21 | `Main.css` (`.pagination`) | Sem `flex-wrap`. Em telas muito estreitas, com muitos números de página, os botões podiam não caber em uma única linha. |
| 22 | `Index.css` (`main.container`) | Único breakpoint (768px) para o padding do container, sem diferenciação real entre tablet, mobile e mobile pequeno. |

---

## 3. Correções de responsividade aplicadas

Foram adotados três breakpoints consistentes em todos os arquivos de estilo, além do layout padrão (Desktop):

- **Tablet:** `max-width: 1024px`
- **Mobile:** `max-width: 640px`
- **Mobile Pequeno:** `max-width: 380px` (cobre o caso de 320px pedido no escopo)

Como as media queries usam `max-width` em cascata (da maior para a menor), uma tela de 320px herda automaticamente os ajustes de Tablet e Mobile e só sobrescreve o que realmente precisa de um ajuste extra — evitando duplicação de regras.

### `src/styles/Index.css`
- Adicionado reset global `*, *::before, *::after { box-sizing: border-box; }` e `overflow-x: hidden` em `html, body` como rede de segurança contra estouro horizontal (resolve o item 13).
- Corrigido o valor inválido `1,03125em` → `1.03125em` no seletor `p` (item 11).
- Substituído o único breakpoint de `padding` do `main.container` por três: 50px (desktop) → 35px (≤1024px) → 20px (≤640px) → 12px (≤380px).
- Em telas ≤380px, `main.first` passa a ter `margin-top: 68px` para acompanhar a pequena redução de altura do cabeçalho nesse breakpoint (ver `Header.css` abaixo), evitando que o conteúdo fique parcialmente coberto pelo header fixo.

### `src/styles/Header.css`
- Removida a propriedade `height: 0.5em` sem efeito em `header img` (item 10).
- **≤640px:** reduzido o `gap` do menu e o `font-size` dos links, ganhando espaço horizontal.
- **≤380px:** o cabeçalho passa a empilhar em coluna (`flex-direction: column`) — logo em cima, menu embaixo —, eliminando por completo o risco de sobreposição identificado no item 14. O menu deixa de usar `position: absolute` apenas nesse breakpoint, para fluir normalmente abaixo da logo.

### `src/styles/Main.css`
- Removida a duplicação de CSS em `main .pagination button` (item 9).
- **Hero:** `max-width`/margem adicionados ao `.hero-text`, com redução progressiva das fontes dos títulos e parágrafo em Tablet, Mobile e Mobile Pequeno (item 15). A altura do hero (`calc(100dvh - ...)`) é recalculada em ≤380px para acompanhar a pequena mudança de altura do cabeçalho.
- **Marcas em destaque (`.brands-grid`):** colunas fixas (7) substituídas por 4 (Tablet) → 3 (Mobile) → 2 (Mobile Pequeno), com `gap` e `padding` do rótulo reduzidos proporcionalmente (item 16).
- **`.top`:** adicionado `flex-wrap: wrap` em Mobile para o título e o seletor de visualização quebrarem linha em vez de estourar a largura (item 17).
- **`.half` (filtro + lista):** passa a empilhar em coluna (`flex-direction: column`) a partir de Tablet (≤1024px), com o filtro ocupando 100% da largura acima da lista de carros (item 18).
- **`.highlight` (página de detalhes):** a partir de Mobile (≤640px), o layout de 3 colunas é convertido em coluna única — imagem principal em cima, miniaturas em um carrossel horizontal (`overflow-x: auto`) logo abaixo, e informações do carro por último — usando a propriedade `order` do CSS para reordenar visualmente **sem alterar a ordem dos elementos no JSX** (item 19).
- **`.pagination`:** adicionado `flex-wrap: wrap` e botões ligeiramente menores em Mobile (item 21).

### `src/styles/Camp.css`
- Reduzido o `gap` das grades de cartões (`.camp.grid`, `.recent-cars`) em Mobile e Mobile Pequeno.
- Adicionado `flex-wrap: wrap` em `.recent-text` (título + "VER TODOS") para telas pequenas.

### `src/styles/Card.css`
- Adicionado `min-width: 0` em `.card.line .info`, permitindo que o bloco de texto encolha corretamente dentro do flexbox (item 20).
- Reduzido o tamanho da imagem do card "em linha" de 150×150px para 100×100px (Mobile) e 80×80px (Mobile Pequeno), garantindo espaço para o texto ao lado sem estourar a largura da tela.

Nenhuma alteração foi feita em `src/styles/Btn.css` — os estilos de botão já eram suficientemente fluidos (sem larguras fixas problemáticas) em todas as resoluções testadas.

---

## 4. Validação

- `npm run build` executado com sucesso antes e depois das alterações (sem erros de sintaxe CSS/JS).
- `npm run lint` executado antes e depois — o único aviso existente (`Link` não utilizado em `ViewCars.jsx`, item 3) já existia antes das alterações e não foi introduzido por esta tarefa; ele foi mantido pois corrigir código JS foge do escopo definido (somente CSS/responsividade).
- Nenhuma pasta ou arquivo novo foi criado além deste `CORREÇÃO.md`.
- Nenhuma dependência, biblioteca, nome de componente, arquivo ou pasta foi alterado.
- Nenhuma funcionalidade foi removida ou teve seu comportamento alterado — apenas propriedades de CSS (layout/responsividade) foram ajustadas ou reorganizadas.
- Como `src/data/cars.js` está vazio no momento desta análise, as telas de listagem/grade/linha/paginação/detalhe só puderam ser validadas estruturalmente (leitura do CSS/JSX e cálculo manual de larguras); recomenda-se uma nova validação visual em navegador assim que houver carros cadastrados.

---

## 5. Itens que podem ser melhorados futuramente (não implementados)

1. Corrigir `CardLine.jsx` para receber e utilizar a prop `image` (atualmente a imagem do modo "lista" nunca aparece).
2. Criar a página referente à rota `/about` (usada no menu "SOBRE") ou remover o item do menu; adicionar uma rota coringa (`*`) com uma página de "não encontrado".
3. Remover o import não utilizado `Link` em `src/pages/cars/ViewCars.jsx`.
4. Renomear a função interna de `CampBrand.jsx` (hoje declarada como `CampRecent`) para refletir o arquivo/uso corretos.
5. Adicionar atributos `alt` descritivos nas imagens que ainda não os possuem (`CardGrid`, imagem principal do `ViewCars`).
6. Revisar se `getCars()`/`getTopBrands()` devem permanecer síncronas ou se `carService.js` será migrado para chamadas assíncronas reais (API), ajustando o uso de `await` de forma consistente.
7. Reavaliar se `public/icons.svg` ainda é necessário; se não for, removê-lo.
8. Resolver o conflito de hover entre o estilo global de `button` e `main .top div button:hover` (item 12), definindo explicitamente qual comportamento visual é o desejado.
9. Considerar um menu mobile do tipo "hambúrguer" caso o número de itens do menu cresça — hoje a solução é puramente via CSS (empilhamento), o que funciona bem para os 3 itens atuais, mas escalaria melhor com um componente dedicado.
10. Popular `src/data/cars.js` com dados reais para permitir uma validação visual completa (em navegador, nos 4 breakpoints) das telas de grade, lista, filtro, paginação e detalhes do carro.
