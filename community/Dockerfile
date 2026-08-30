# syntax=docker/dockerfile:1
#
# kogiagroup.com — image de production.
#
# Multi-étages : la compilation a besoin des devDependencies et de tout
# l'arbre source, ce qui tourne en production n'a besoin d'aucun des deux.
# Seuls .next/standalone et les fichiers publics passent dans l'étage final.

# ---------------------------------------------------------------------------
# 1. deps — installées une fois, en cache tant que package-lock.json ne bouge pas
# ---------------------------------------------------------------------------
FROM node:22-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

# ---------------------------------------------------------------------------
# 2. build
# ---------------------------------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next inline les NEXT_PUBLIC_* au moment de la compilation : ils doivent donc
# être présents ICI, pas seulement à l'exécution. Aucun n'est un secret — la
# clé anon Supabase est publique par conception, c'est la RLS qui protège les
# données, pas le fait de cacher cette clé.
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_GOOGLE_AUTH_ENABLED
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
    NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=$NEXT_PUBLIC_GOOGLE_AUTH_ENABLED \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

RUN npm run build

# ---------------------------------------------------------------------------
# 3. runtime
# ---------------------------------------------------------------------------
FROM node:22-alpine AS runtime
WORKDIR /app
RUN apk add --no-cache libc6-compat tini

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Utilisateur non privilégié : si le site est un jour exploité, il ne doit pas
# être root dans son conteneur.
RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

# Sans tini, node est PID 1 : il ne récolte pas les zombies et traite SIGTERM
# autrement qu'attendu. tini fait de `docker stop` un arrêt propre.
ENTRYPOINT ["/sbin/tini", "--"]

HEALTHCHECK --interval=30s --timeout=5s --start-period=25s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
