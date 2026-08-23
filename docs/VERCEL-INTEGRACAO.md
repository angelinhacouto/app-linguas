# Integração Vercel — Línguas Kids

Guia rápido para publicar o app na **Vercel** com sua conta GitHub `angelinhacouto`.

## Passo 1 — Criar repositório no GitHub

1. Abra: **https://github.com/new**
2. **Repository name:** `app-linguas`
3. Deixe **Public**
4. **Não** marque "Add a README"
5. Clique **Create repository**

## Passo 2 — Enviar o código

No terminal (PowerShell), na pasta do projeto:

```powershell
cd "C:\Users\angel\OneDrive\Desktop\APPS\APP Linguas"
git push -u origin main
```

Se pedir login, use sua conta GitHub (`angelinhacouto@gmail.com`).

## Passo 3 — Conectar na Vercel

1. Abra: **https://vercel.com/new**
2. Faça login com **Continue with GitHub**
3. Autorize a Vercel a acessar seus repositórios
4. Clique **Import** em `angelinhacouto/app-linguas`
5. Confirme as configurações (já vêm do `vercel.json`):

| Campo | Valor |
|-------|-------|
| Project Name | `linguas-kids` |
| Framework | Other |
| Build Command | `npm run build:web` |
| Output Directory | `dist` |
| Root Directory | `./` |

6. Clique **Deploy**

Aguarde ~2–3 minutos. Sua URL será algo como:

**https://linguas-kids.vercel.app**

## O que acontece depois

- Cada `git push` na branch `main` → **deploy automático** na Vercel
- Cada Pull Request → **link de preview** para testar antes de publicar
- Região do servidor: **São Paulo (gru1)** — mais rápido no Brasil
- **HTTPS** incluso — microfone funciona no navegador

## Painel Vercel

Depois do deploy, acesse:

**https://vercel.com/dashboard**

Lá você vê:
- Logs de build
- Domínio do app
- Variáveis de ambiente (futuro: Azure Speech)

## Problemas comuns

| Problema | Solução |
|----------|---------|
| Repositório não aparece na Vercel | GitHub → Settings → Applications → Vercel → Configure → dê acesso ao repo |
| Build falhou | Vercel → Deployments → clique no deploy → View Logs |
| `git push` pede senha | Use [Personal Access Token](https://github.com/settings/tokens) como senha |
| Página em branco | Aguarde o build terminar; confira se Output Directory é `dist` |

## Conta Vercel

Use o mesmo e-mail se quiser: **angelinhacouto@gmail.com**

Login recomendado: **GitHub** (integração automática).
