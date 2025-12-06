import { useLanguage } from "../hooks/useLanguage";

// Przykładowy komponent pokazujący, jak używać globalnego języka
export default function ExampleModule() {
  const { lang } = useLanguage();

  const content = {
    pl: {
      title: "Przykładowy Moduł",
      description: "To jest przykład jak tworzyć nowe moduły z obsługą języka."
    },
    en: {
      title: "Example Module",
      description: "This is an example of how to create new modules with language support."
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{content[lang]?.title || "Example Module"}</h1>
      <p>{content[lang]?.description || "Description..."}</p>
    </div>
  );
}

// Aby dodać ten moduł:
// 1. Dodaj ścieżkę w App.jsx:
//    {
//      path: "example",
//      element: <ExampleModule />
//    }
//
// 2. Dodaj link w Home.jsx:
//    <Link to="/example" style={linkStyle}>
//      <div style={cardStyle}>
//        <h2>📝 Example</h2>
//        <p>Przykładowy moduł</p>
//      </div>
//    </Link>
