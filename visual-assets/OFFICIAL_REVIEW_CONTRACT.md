# Kogia Official Visual Asset Review Contract

`visual-assets/gallery/` is the official visual source of truth for KogiaGroup products. Claude, Codex and human developers must review the relevant product lane here before integrating or replacing any visual element.

## Product and review relationship

| Product lane | Official review | Coverage |
|---|---|---:|
| KogiaGroup | KogiaGroup V1 | 18 product categories |
| Faz3a | Faz3a V1 | 18 product categories |
| Kharbga | Kharbga V3.2 | 21 product categories |
| Coreon EDU | Shared V2 candidate, Coreon colour lane | 7 shared categories |
| Kogia Job | Shared V2 candidate, Job colour lane | 7 shared categories |
| EduPlus Connect | Shared V2 candidate, EduPlus colour lane | 7 shared categories |
| Kogia Coffee | Shared V2 candidate, Coffee colour lane | 7 shared categories |
| Kogia Platform and Suite products | Shared V2 candidate, selected product colour lane | 7 shared categories each |

Selecting a product in the gallery automatically opens its dedicated review when one exists. Other products open the complete Shared V2 category system with their own colour tokens. Selecting a dedicated review also selects and locks the correct product lane for that review.

## Required integration workflow

1. Select the target product in the official gallery.
2. Read every category in its active review, including system states and responsive behavior.
3. Reuse the approved mark from `brand/`; never redraw or fork the whale geometry.
4. Reuse canonical assets from the review package. Do not integrate direction boards, prompt outputs, archives or duplicate candidates.
5. Apply the selected product colour through tokens. Do not recolour raster artwork destructively.
6. Preserve the semantic meaning of state colours, reactions, icons and loaders.
7. Implement empty, loading, error, success and reduced-motion behavior where the review specifies them.
8. Run the target product tests and the official gallery smoke tests before handoff.
9. If the product needs an element that the review does not cover, improve the official review first, obtain review, then integrate it into the product.

## Quality gate

An asset is not implementation-ready unless it:

- appears in the correct product/version review;
- has one canonical path and semantic name;
- works on light, dark or product surfaces specified by that review;
- remains legible at its real implementation size;
- has accessible text or an accessible label;
- has phone and desktop behavior where applicable;
- does not introduce horizontal overflow;
- respects reduced motion;
- passes the official gallery smoke suite.

The product repository may improve implementation details, but it must not silently create a competing icon, avatar, reaction, loader, mark or visual language. Improvements that change the system belong here first.
