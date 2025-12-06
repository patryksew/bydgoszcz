# Bydgoszcz - Projekt

Aplikacja React z modułową strukturą, routingiem i globalnym zarządzaniem językiem.

## Funkcje

- ✅ **Routing** - React Router dla nawigacji między modułami
- ✅ **Globalny język** - Context API + localStorage (język zachowuje się po odświeżeniu)
- ✅ **Modułowa struktura** - Łatwe dodawanie nowych modułów

## Routing

Projekt wykorzystuje React Router do zarządzania nawigacją między modułami:

- **`/`** - Strona główna z nawigacją do poszczególnych modułów
- **`/trails`** - Moduł tras turystycznych
- **`/questions`** - Moduł quizu o Bydgoszczy

## Zarządzanie językiem

Język jest **globalny dla całej aplikacji**:
- Przechowywany w React Context (`LanguageContext`)
- Zapisywany w `localStorage` (zachowuje się po odświeżeniu strony)
- Dostępny w każdym komponencie przez hook `useLanguage()`
- Można zmienić w górnym pasku nawigacji (gdy język jest wybrany)

### Użycie w komponencie:

```jsx
import { useLanguage } from "../hooks/useLanguage";

function MyComponent() {
  const { lang, setLang } = useLanguage();
  return <div>{lang}</div>;
}
```

## Struktura projektu

```
src/
├── components/        # Komponenty współdzielone
│   ├── Layout.jsx    # Layout z nawigacją i przełącznikiem języka
│   ├── LanguageSelector.jsx
│   └── TrailCard.jsx
├── pages/            # Komponenty stron/modułów
│   ├── Home.jsx      # Strona główna
│   ├── Trails.jsx    # Moduł tras
│   ├── TrailsWrapper.jsx
│   └── ExampleModule.jsx  # Przykład nowego modułu
├── context/          # React Context
│   └── LanguageContext.jsx  # Provider kontekstu języka
├── hooks/            # Custom hooks
│   └── useLanguage.js  # Hook do dostępu do języka
├── data/             # Dane aplikacji
└── App.jsx           # Konfiguracja routingu
```

## Dodawanie nowych modułów

1. Utwórz nowy komponent w folderze `src/pages/`
2. Dodaj ścieżkę w `src/App.jsx` w konfiguracji routera
3. Dodaj link na stronie głównej w `src/pages/Home.jsx`
4. Użyj hooka `useLanguage()` do dostępu do języka

## Uruchamianie

```bash
npm install
npm run dev
```

---

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

