# XYZ-Manager
A simple yet effective way to manage your 3D Printing materials and Products

## Estrutura
- `index.html` — marcação das telas
- `css/style.css` — estilos
- `js/main.js` — lógica do app (calculadora, produtos, estoque, dashboard, equipe)
- `js/i18n.js` — tradução PT-BR/EN
- `js/firebase.js` — inicialização do Firebase (Auth e Firestore)
- `service-worker.js`, `manifest.json` — PWA (a pasta `icons/` com `icon-192.png` e `icon-512.png` precisa existir)

## Dados no Firestore
Produtos ficam em `<base>/products/<id>`. Estoque e gastos ficam na mesma coleção, um documento por item:
`_inv_<id>` e `_exp_<id>`. Os documentos antigos `_estoque` e `_gastos` são migrados sozinhos no primeiro acesso.
