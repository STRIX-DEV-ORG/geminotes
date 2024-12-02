const Fontello = `

    @font-face {
        font-family: 'fontello';
        src: url('/assets/fonts/fontello/fontello.eot?8335217');
        src: url('/assets/fonts/fontello/fontello.eot?8335217#iefix') format('embedded-opentype'),
            url('/assets/fonts/fontello/fontello.woff2?8335217') format('woff2'),
            url('/assets/fonts/fontello/fontello.woff?8335217') format('woff'),
            url('/assets/fonts/fontello/fontello.ttf?8335217') format('truetype'),
            url('/assets/fonts/fontello/fontello.svg?8335217#fontello') format('svg');
        font-weight: normal;
        font-style: normal;
    }

    [class^='icon-']:before,
    [class*=' icon-']:before {
        font-family: 'fontello';
        font-style: normal;
        font-weight: normal;
        speak: never;

        display: inline-block;
        text-decoration: inherit;
        width: 1em;
        margin-right: 0.2em;
        text-align: center;

        font-variant: normal;
        text-transform: none;
        line-height: 1em;
        margin-left: 0.2em;

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        transition: color var(--animation-normal-timing) var(--animation-timing-function);
    }

    .icon-search:before {
        content: '\\e800';
    }
    .icon-info:before {
        content: '\\e801';
    }
    .icon-cancel:before {
        content: '\\e802';
    }
    .icon-add:before {
        content: '\\e803';
    }
    .icon-save:before {
        content: '\\e804';
    }
    .icon-back:before {
        content: '\\e805';
    }
    .icon-menu:before {
        content: '\\f0c9';
    }
    .icon-options:before {
        content: '\\f141';
    }
    .icon-trash:before {
        content: '\\f1f8';
    }

`;

export default Fontello;
