-- Le corps stocké dans articles.body est du HTML déjà converti (voir
-- src/lib/markdown-lite.ts). Sans la source brute, éditer un brouillon
-- obligerait à repartir du HTML rendu, avec perte. On garde la source à côté.
alter table articles add column source_text text;
