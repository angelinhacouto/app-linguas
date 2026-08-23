# Línguas Kids

App de aprendizado de idiomas para crianças a partir de 3 anos, com **web** e **mobile** (iOS/Android) a partir do mesmo código.

## Funcionalidades

- Conteúdo por faixa etária (3–4, 4–5, 5–6 anos)
- Palavras simples com emoji, tradução e áudio
- Gravação de voz da criança
- Feedback amigável de pronúncia (Muito bem! / Quase lá! / Vamos juntos!)
- Instruções faladas em português
- Funciona em **navegador**, **Android** e **iOS**

## Pré-requisitos

1. [Node.js](https://nodejs.org/) (versão 18 ou superior)
2. [Expo Go](https://expo.dev/go) no celular (para testar mobile) **ou** emulador Android/iOS

## Instalação

```bash
cd "APP Linguas"
npm install
```

## Executar

```bash
# Iniciar (escolhe web, Android ou iOS no terminal)
npm start

# Web direto
npm run web

# Android
npm run android

# iOS (Mac)
npm run ios
```

No navegador, acesse o endereço que aparecer no terminal (geralmente `http://localhost:8081`).

> **Microfone na web:** use HTTPS ou `localhost`. O navegador pedirá permissão para gravar.

## Deploy (GitHub + Vercel)

A versão **web** pode ser publicada na Vercel com CI no GitHub.

Guia completo: **[docs/VERCEL-INTEGRACAO.md](docs/VERCEL-INTEGRACAO.md)** (passo a passo para `angelinhacouto`)

```bash
# Resumo rápido
git push -u origin main
# Depois: vercel.com/new → Importar angelinhacouto/app-linguas → Deploy
```

## Estrutura do projeto

```
.github/              # CI, templates de PR e issues
docs/DEPLOY.md        # Guia GitHub + Vercel
vercel.json           # Config de deploy web
app/                  # Telas (Expo Router)
  index.tsx           # Escolha de idade
  lessons/[ageGroup]  # Lista de lições
  play/[lessonId]     # Prática com microfone
components/           # UI infantil (botões grandes, cards)
data/lessons.ts       # Lições e palavras
services/             # Avaliação de pronúncia
hooks/                # Gravação e voz
```

## Lições incluídas (3–4 anos)

| Lição   | Palavras                          |
|---------|-----------------------------------|
| Animais | dog, cat, bird, fish, cow, duck   |
| Cores   | red, blue, green, yellow, pink    |
| Números | one, two, three, four, five       |
| Família | mom, dad, baby, boy, girl         |
| Comida  | apple, milk, bread, egg, cake     |

## Pronúncia em produção

O MVP usa avaliação **simulada** para funcionar sem API paga. Para correção real de pronúncia, integre:

### Azure Speech (recomendado)

- [Pronunciation Assessment](https://learn.microsoft.com/azure/ai-services/speech-service/how-to-pronunciation-assessment)
- Score por palavra e fonema
- Bom suporte para apps educacionais

Substitua `PronunciationService.evaluateFromAudio()` em `services/pronunciation.ts` por uma chamada à API Azure.

### SpeechSuper

- Focado em apps de ensino de idiomas
- Planos para volume educacional

## Privacidade (crianças)

- Não grave áudio permanentemente sem consentimento dos pais
- Consulte COPPA (EUA) e LGPD (Brasil) antes de publicar
- Use modo “responsável” para configurações sensíveis

## Próximos passos sugeridos

- [ ] Integrar Azure Speech para pronúncia real
- [ ] Adicionar mais idiomas (espanhol, francês…)
- [ ] Modo offline com cache de áudio
- [ ] Área dos pais (progresso, tempo de uso)
- [ ] Publicar na App Store / Google Play via EAS Build

## Tecnologias

- [Expo](https://expo.dev/) + React Native
- TypeScript
- expo-av (gravação)
- expo-speech (texto para voz)
