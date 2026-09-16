# The Party Drop — sitio web

Sitio estático (HTML + CSS + JS, sin framework ni build) para **The Party Drop**: comida hermosa, burbujas, flores y globos entregados a villas, Airbnbs y hoteles en Puerto Vallarta y Bahía de Banderas.

> Beautiful food first. Celebration around it. Delivered to your vacation.

## Estructura

```
index.html          Home (hero, Drops, cómo funciona, tienda, ocasiones, reseñas, zonas, FAQ)
product.html        Ficha de producto: The Grazing Board (tamaños, add-ons, total en vivo)
build.html          Build Your Drop — wizard de 4 pasos + resumen
checkout.html       Checkout (fecha, ventana, zona, acceso, sorpresa, pago)
confirmation.html   Confirmación del pedido
assets/css/style.css
assets/js/app.js    Catálogo, carrito (localStorage), wizard, checkout
assets/img/         Fotografías optimizadas para web (≤1600 px)
```

## Cómo verlo

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8080
# http://localhost:8080
```

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `the-party-drop`).
2. Sube este proyecto:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/the-party-drop.git
   git push -u origin main
   ```
3. En el repositorio: **Settings → Pages → Source: Deploy from a branch → Branch: main / (root)**.
4. El sitio queda en `https://TU-USUARIO.github.io/the-party-drop/`.

## Flujo de compra

`index` → `product` (Add to Drop) o `build.html?drop=birthday|brunch|girls|romantic|welcome` (Drop pre-armado) → `build.html` (4 pasos) → `checkout` → `confirmation`.

El carrito vive en `localStorage` (`tpd_cart_v1`) y se comparte entre páginas. Los Drops pre-armados son carritos con selecciones por defecto que el cliente puede editar.

## Placeholders pendientes

- **Precios y tarifas** en `assets/js/app.js` (`CATALOG`, `ZONES`) son ilustrativos. Sustituir con el modelo de costos real.
- **Pago**: los botones de Apple Pay / Google Pay / tarjeta son visuales. Para cobrar de verdad, migrar el checkout a Shopify (recomendado) o integrar Stripe Checkout.
- **Reseñas**, identidad legal (RFC, razón social), correo y número de WhatsApp en `index.html`, `product.html`, `confirmation.html`.
- **Fotos de producto reales** (boards, Mimosa Kit, balloon sets, caja de marca) cuando exista la sesión de fotos.
- Fecha máxima / capacidad por slot: hoy el slot "5–7 pm" está marcado como lleno solo como ejemplo.

## Paleta

| Uso | Color |
|---|---|
| Chocolate (texto, botones) | `#2B1D16` |
| Warm white (fondo) | `#FFF9F3` |
| Champagne (superficies) | `#F7E7CE` |
| Terracota (acento) | `#C47A63` |
| Gold (detalles) | `#D7B26A` |
| Leaf (acento secundario) | `#5B6E4F` |

Tipografías: Fraunces (display) + Instrument Sans (texto), vía Google Fonts.
