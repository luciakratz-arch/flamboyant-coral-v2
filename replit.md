# Coral Flamboyant

App de gestão coral para o Coral Flamboyant — gerencia integrantes, repertório de músicas, agenda de eventos e avisos.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/coral-flamboyant run dev` — run the frontend (port 21705)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, shadcn/ui, wouter, TanStack Query
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for all contracts)
- `lib/api-zod/src/generated/api.ts` — generated Zod schemas (server-side)
- `lib/api-client-react/src/generated/api.ts` — generated React Query hooks (client-side)
- `lib/db/src/schema/` — Drizzle table definitions (members, songs, events, announcements)
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/coral-flamboyant/src/` — React frontend

## Architecture decisions

- Contract-first API: OpenAPI spec generates both Zod validators (server) and React Query hooks (client) via Orval. Run codegen after any spec change.
- `lib/api-zod/src/index.ts` exports only from `./generated/api` (not `./generated/types`) to avoid duplicate export conflicts.
- Auth: two roles — `admin` (password 1234) and `corista` (select name from members). State in localStorage key `coral_auth_v2`. `AdminProvider` / `useAuth()` hook. Unauthenticated users are redirected to `/login`.
- Corista area at `/corista/*` uses `CoristLayout` — read-only access to músicas, agenda, avisos, sala de estudos, declaração. Name remembered in localStorage.
- Express body limit set to 10mb (`express.json({ limit: "10mb" })`) to allow logo/signature base64 uploads.
- All dates stored as PostgreSQL `date` columns (ISO string `YYYY-MM-DD`), timestamps as `timestamptz`.
- Birthday tracking uses a separate `birthday` column on members (not start_date).
- Theme colors: `useThemeColors` hook (in `use-theme-colors.ts`) fetches settings on load and writes hex→HSL to CSS vars (`--primary`, `--secondary`, etc.) on `document.documentElement`. Called inside `RouterWithGuards` in App.tsx.
- Brazilian holidays computed client-side in `events.tsx` via `getBrazilianHolidays(year, month)` — fixed + Easter-based (Carnaval, Sexta-feira Santa, Corpus Christi). No API needed.

## Product

- **Dashboard** — overview of active members, upcoming events, recent announcements, songs by category; aniversariantes do mês shown with names and dates
- **Members** — manage coristas with voice part, contact info, start/end dates, active/inactive status
- **Songs** — repertoire with 9 material links per song (partitura PDF + vocal geral + playback + 6 naipes); internal viewer (iframe/audio) for Google Drive files without leaving the app
- **Events** — monthly agenda with type/status badges, arrival/presentation times, outfit notes; Brazilian national holidays shown automatically (blue rows)
- **Event Setlist** — admin can build setlists for presentations by selecting from the repertoire
- **Announcements** — notice board with normal/high priority flags
- **Login page** — three-profile login: Gestor/ADM (senha 1234), Corista (select name, remembered), Sou do RH (senha configurável, padrão rh1234)
- **Área do Corista** — `/corista/*` — Músicas (embedded player), Agenda, Avisos, Sala de Estudos, Minha Declaração; corista home shows event setlist filtered to their naipe (on demand); attendance confirm/decline per event; Galeria do Coral (blog posts)
- **Mesa de Som** — `/mesa` (public, no login) — dark UI for the sound engineer on show day; auto-selects next presentation event, loads setlist with playback player and drag-reorder; accessible via shareable link from the Apresentação admin page
- **Relatórios** — editable qualitative sections (Sobre o Projeto, Currículo do Maestro, Equipe); recharts bar + pie charts for events by type/status; member count KPI; all content included in PDF export
- **Configurações** — logo/assinatura digital upload; nome do coral, maestro, produtora editáveis; cores primária/secundária do app personalizáveis (hex, aplicadas via CSS vars dinamicamente); configurações de RH (nome da empresa + senha)
- **Área de RH** — `/rh/*` — Painel RH (KPIs: ativos/inativos/eventos/posts, distribuição por naipe, próximos eventos, últimos posts); Integrantes (lista read-only filtrada por status/naipe); Galeria & Blog (CRUD de posts com foto, texto, evento vinculado); Declarações (gera e imprime declaração de participação por integrante)

## User preferences

- App in Brazilian Portuguese context (choir management)
- Brand colors: vermelho #B41020 + verde #1B5E20
- Maestro: Paulo Sergio Motta | Produtora: Lucia Kratz
- Admin password: 1234

## Gotchas

- After any OpenAPI spec change, run codegen AND fix `lib/api-zod/src/index.ts` to only export from `./generated/api` (codegen rewrites it with both exports, causing TS conflicts)
- `pnpm --filter @workspace/api-spec run codegen` runs typecheck after orval — it will fail if index.ts has duplicate exports
- Workaround: run `npx orval --config ./orval.config.ts` from `lib/api-spec/` directly, then fix index.ts manually

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
