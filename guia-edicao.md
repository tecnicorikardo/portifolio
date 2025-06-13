# Guia de Edição do Site de Portfólio

Este documento contém instruções para editar facilmente o site de portfólio criado com HTML e CSS puro.

## Estrutura de Arquivos

O site consiste em apenas dois arquivos principais:
- `index.html` - Contém toda a estrutura e conteúdo do site
- `styles.css` - Contém todos os estilos e configurações visuais

## Como Editar o Conteúdo

Para modificar o conteúdo do site, abra o arquivo `index.html` em qualquer editor de texto (Bloco de Notas, VS Code, Sublime Text, etc.) e localize a seção que deseja alterar.

### Seções Principais do Site:

1. **Cabeçalho (Header)** - Contém o logo e menu de navegação
2. **Início (Hero)** - Seção inicial com seu nome e título profissional
3. **Sobre** - Informações pessoais e resumo profissional
4. **Experiência Profissional** - Histórico de trabalho
5. **Formação** - Formação acadêmica e cursos
6. **Serviços** - Serviços oferecidos
7. **Contato** - Informações de contato e formulário
8. **Rodapé (Footer)** - Links e informações de copyright

### Exemplos de Edição:

#### Para alterar seu nome:
Localize a linha:
```html
<h1 class="hero-title">Ricardo Martin Santos</h1>
```
E substitua "Ricardo Martin Santos" pelo seu nome.

#### Para alterar informações de contato:
Localize a seção de contato e modifique os valores:
```html
<span class="info-value">(21) 97090-2074</span>
```

#### Para adicionar uma nova experiência profissional:
Copie um bloco existente de experiência e cole-o dentro da div `experience-list`, modificando os detalhes:
```html
<div class="card">
    <div class="experience-header">
        <h3 class="experience-title">Título do Cargo</h3>
        <div class="experience-badge">
            <span class="badge">Status</span>
            <span class="experience-duration">Período</span>
        </div>
    </div>
    <h4 class="experience-company">Nome da Empresa</h4>
    <p class="card-text">
        Descrição das atividades...
    </p>
</div>
```

## Como Editar o Visual

Para modificar cores, fontes e outros aspectos visuais, abra o arquivo `styles.css`.

### Alterando as Cores:

No início do arquivo, você encontrará variáveis CSS que controlam todas as cores do site:

```css
:root {
    /* Cores principais */
    --primary-color: #2563eb;       /* Azul principal */
    --primary-dark:rgb(18, 57, 167);        /* Azul escuro para hover */
    --secondary-color: #0f172a;     /* Azul muito escuro quase preto */
    
    /* Outras cores... */
}
```

Para alterar uma cor, simplesmente modifique o valor hexadecimal (ex: #2563eb).

### Alterando Fontes:

Para alterar as fontes, modifique as variáveis:

```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-heading: 'Poppins', var(--font-sans);
```

## Publicando o Site

Para publicar o site:

1. Faça upload dos arquivos `index.html` e `styles.css` para seu serviço de hospedagem
2. Mantenha ambos os arquivos na mesma pasta
3. Se quiser adicionar imagens, crie uma pasta "images" e referencie-as no HTML

## Dicas Adicionais

- O site é totalmente responsivo e se adapta a dispositivos móveis e desktop
- Para adicionar imagens, use a tag `<img src="caminho/para/imagem.jpg" alt="Descrição da imagem">`
- Para adicionar links, use `<a href="https://seulink.com">Texto do link</a>`
- Evite remover classes CSS, pois elas controlam o estilo e a responsividade
