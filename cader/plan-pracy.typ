#set text(font: "Times New Roman", size: 12pt)
#set page(margin: (x: 2cm, y: 2cm))
#set par(justify: false, leading: 0.3em)
#set block(spacing: 0.3em)

Temat: Dedykowana aplikacja do zarządzania dokumentami w formacie pdf

Plan pracy: \
Wstęp
#set enum(
  numbering: (..nums) => {
    let vals = nums.pos()
    if vals.len() == 1 {
      str(vals.at(0)) + "."
    } else {
      vals.map(str).join(".")
    }
  },
  indent: 0em,
  body-indent: 0.5em,
  spacing: 0.3em
)

+ Wykorzystane technologie
  + Środowisko JavaScript
  + Framework React
  + Biblioteka CSS Bootstrap
  + Baza danych MySQL
  + Pozostałe technologie
+ Projekt aplikacji
  + Koncepcja i założenia planowanej aplikacji
  + Szczegółowy opis wymagań
  + Struktura aplikacji
  + Projekt bazy danych
  + Interfejs użytkownika i komunikacja z bazą danych
  + Bezpieczeństwo i uwierzytelnianie
  + Przypadki użycia
+ Implementacja
  + Architektura systemu
  + Implementacja podstawowego oprogramowania
  + Operacje na bazie danych
  + Testowanie i wyniki
  + Prezentacja aplikacji
  + Wnioski

Podsumowanie \
Bibliografia
