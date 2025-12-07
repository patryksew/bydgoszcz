export const trails = [
  {
    id: 1,
    title: { pl: "Mistrz Twardowski i jego tajemnice", en: "Master Twardowski and his secrets" },
    description: { 
      pl: "Trasa wzdłuż rzeki Brdy z pięknymi widokami", 
      en: "Route along the Brda river with scenic views" 
    },
    time: "60 min",
    distance: "3 km",
    image: "/images/brda.jpg",
      "questions": [
          {
              "id": 1,
              "question": "Kiedy Mistrz Twardowski gościł w Bydgoszczy w “Gospodzie Pod Zgorzelcem”?",
              "question_en": "When did Master Twardowski visit Bydgoszcz and stay at the “Gospoda Pod Zgorzelcem” inn?",
              "image": "image1.png",
              "lat": 53.122062,
              "long": 18.001188,  
              "answers": [
                  {"text": "1523 r.", "text_en": "1523", "isCorrect": false},
                  {"text": "1560 r.", "text_en": "1560", "isCorrect": true},
                  {"text": "1588 r.", "text_en": "1588", "isCorrect": false},
                  {"text": "1610 r.", "text_en": "1610", "isCorrect": false}
              ]
          },
          {
              "id": 2,
              "question": "Z jakiego materiału wykonano rzeźbę „Dzieci bawiące się z gęsią”?",
              "question_en": "What material was used to make the sculpture „Children Playing with a Goose”?",
              "image": "image1.png",
              "lat": 53.121562,
              "long": 18.000563,
              "answers": [
                  {"text": "Z piaskowca", "text_en": "Sandstone", "isCorrect": false},
                  {"text": "Z mosiądzu", "text_en": "Brass", "isCorrect": false},
                  {"text": "Z granitu", "text_en": "Granite", "isCorrect": false},
                  {"text": "Z brązu", "text_en": "Bronze", "isCorrect": true}
              ]
          },
          {
              "id": 3,
              "question": "Kim jest Irena Santor, której podpis widnieje w Alei Autografów?",
              "question_en": "Who is Irena Santor, whose signature appears in the Autograph Alley?",
              "image": "image1.png",
              "lat": 53.120911,
              "long": 18.000331,
              "answers": [
                  {"text": "Aktorką teatralną", "text_en": "Theatre actress", "isCorrect": false},
                  {"text": "Malarką", "text_en": "Painter", "isCorrect": false},
                  {"text": "Piosenkarką", "text_en": "Singer", "isCorrect": true},
                  {"text": "Reżyserką filmową", "text_en": "Film director", "isCorrect": false}
              ]
          },
          {
              "id": 4,
              "question": "Jak nazywała się brama miejska, która kiedyś stała w tym miejscu?",
              "question_en": "What was the name of the city gate that once stood here?",
              "image": "image1.png",
              "lat": 53.121437,
              "long": 17.996812,
              "answers": [
                  {"text": "Brama Poznańska ", "text_en": "Poznańska Gate", "isCorrect": true},
                  {"text": "Brama Toruńska", "text_en": "Toruńska Gate", "isCorrect": false},
                  {"text": "Brama Zamkowa", "text_en": "Zamkowa Gate", "isCorrect": false},
                  {"text": "Brama Młyńska", "text_en": "Młyńska Gate", "isCorrect": false}
              ]
          },
          {
              "id": 5,
              "question": "Z ilu stopni składają się „Magiczne Schodki”?",
              "question_en": "How many steps are there in the „Magic Stairs”?",
              "image": "image1.png",
              "lat": 53.121363,
              "long": 17.996328,
              "answers": [
                  {"text": "13", "text_en": "13", "isCorrect": true},
                  {"text": "9", "text_en": "9", "isCorrect": false},
                  {"text": "21", "text_en": "21", "isCorrect": false},
                  {"text": "7", "text_en": "7", "isCorrect": false}
              ]
          },
          {
              "id": 6,
              "question": "Co, według fabuły filmu “Magiczne drzewo, czerwone krzesło”, dzieje się, gdy usiądziesz na Czerwonym Krześle?",
              "question_en": "According to the plot of the film “The Magic Tree, the Red Chair”, what happens when you sit on the Red Chair?",
              "image": "image1.png",
              "lat": 53.121813,
              "long": 17.995812,
              "answers": [
                  {"text": "Słyszysz dawną muzykę młynarzy", "text_en": "You hear the old millers' music.", "isCorrect": false},
                  {"text": "Spełnia się jedno drobne życzenie", "text_en": "One small wish comes true", "isCorrect": true},
                  {"text": "Krzesło zaczyna się poruszać", "text_en": "The chair begins to move", "isCorrect": false},
                  {"text": "Zmienia kolor na złoty", "text_en": "It turns golden", "isCorrect": false}
              ]
          },
          {
              "id": 7,
              "question": "Jaką funkcję pełnił Biały Spichlerz na początku swojego istnienia?",
              "question_en": "What function did the White Granary serve at the beginning of its existence?",
              "image": "image1.png",
              "lat": 53.123188,
              "long": 17.997813,
              "answers": [
                  {"text": "Warsztat mincerzy", "text_en": "Miners' workshop", "isCorrect": false},
                  {"text": "Zbrojownię", "text_en": "Armoury", "isCorrect": false},
                  {"text": "Magazyn zboża", "text_en": "Grain store", "isCorrect": true},
                  {"text": "Dom mieszkalny", "text_en": "Residential house", "isCorrect": false}
              ]
          },
          {
              "id": 8,
              "question": "Dlaczego dawniej nazywano go „Mostem Miłości”?",
              "question_en": "Why was it once called the „Bridge of Love”?",
              "image": "image1.png",
              "lat": 53.123812,
              "long": 17.998312,
              "answers": [
                  {"text": "Z powodu legendy o ślubach udzielanych na moście", "text_en": "Because of the legend about weddings taking place on the bridge", "isCorrect": false},
                  {"text": "Bo zakochani przypinali tu kłódki z imionami", "text_en": "Because lovers used to attach padlocks with their names on them here", "isCorrect": true},
                  {"text": "Bo widok z niego symbolizował jedność", "text_en": "Because the view from it symbolised unity", "isCorrect": false},
                  {"text": "Bo często odbywały się tu zaręczyny", "text_en": "Because engagements often took place here", "isCorrect": false}
              ]
          },
          {
              "id": 9,
              "question": "Jaką magiczną cechę najczęściej przypisywano czarnym kotom w dawnych legendach?",
              "question_en": "What magical trait was most often attributed to black cats in ancient legends?",
              "image": "image1.png",
              "lat": 53.123812,
              "long": 17.999563,
              "answers": [
                  {"text": "Mogą zamieniać deszcz w złoto", "text_en": "They can turn rain into gold", "isCorrect": false},
                  {"text": "Mają dziewięć żyć i dziewięć talentów alchemicznych jednocześnie", "text_en": "They have nine lives and nine alchemical talents at the same time", "isCorrect": false},
                  {"text": "Otwierają przejścia do innych światów stuknięciem ogona", "text_en": "They open passages to other worlds with a flick of their tails", "isCorrect": false},
                  {"text": "Potrafią dostrzegać istoty nadprzyrodzone", "text_en": "They can see supernatural beings", "isCorrect": true}
              ]
          },
          {
              "id": 10,
              "question": "Co mężczyzna „Przechodzący przez rzekę” ma przerzucone przez ramię?",
              "question_en": "What is the man „Crossing the river” carrying over his shoulder?",
              "image": "image1.png",
              "lat": 53.123312,
              "long": 18.001688,
              "answers": [
                  {"text": "Torbę z mapami", "text_en": "A bag with maps", "isCorrect": false},
                  {"text": "Ręcznik", "text_en": "A towel", "isCorrect": false},
                  {"text": "Parę sandałów", "text_en": "A pair of sandals", "isCorrect": true},
                  {"text": "Sieć rybacką", "text_en": "A fishing net", "isCorrect": false}
              ]
          },
          {
              "id": 11,
              "question": "Jaki kształt ma wiatrowskaz na szczycie katedry?",
              "question_en": "What shape is the weather vane on top of the cathedral?",
              "image": "image1.png",
              "lat": 53.122937,
              "long": 17.999187,
              "answers": [
                  {"text": "Gwiazdy", "text_en": "Stars", "isCorrect": false},
                  {"text": "Smoka", "text_en": "Dragon", "isCorrect": false},
                  {"text": "Krzyża", "text_en": "Cross", "isCorrect": false},
                  {"text": "Anioła grającego na trąbce", "text_en": "Angel playing the trumpet", "isCorrect": true}
              ]
          },
          {
              "id": 12,
              "question": "Komu poświęcona jest tablica pamiątkowa na ratuszu?",
              "question_en": "Who is the commemorative plaque at the town hall dedicated to?",
              "image": "image1.png",
              "lat": 53.122312,
              "long": 17.999063,
              "answers": [
                  {"text": "Władysławowi Łokietkowi", "text_en": "Władysław Łokietek", "isCorrect": false},
                  {"text": "Zygmuntowi Staremu", "text_en": "Sigismund the Old", "isCorrect": false},
                  {"text": "Janowi III Sobieskiemu", "text_en": "John III Sobieski", "isCorrect": false},
                  {"text": "Kazimierzowi Wielkiemu", "text_en": "Casimir the Great", "isCorrect": true}
              ]
          },
          {
              "id": 13,
              "question": "Komu poświęcony jest Pomnik Walki i Męczeństwa?",
              "question_en": "To whom is the Monument of Fight and Martyrdom dedicated?",
              "image": "image1.png",
              "lat": 53.122187,
              "long": 17.999938,
              "answers": [
                  {"text": "Żołnierzom napoleońskim", "text_en": "Napoleon's soldiers", "isCorrect": false},
                  {"text": "Powstańcom styczniowym", "text_en": "January insurgents", "isCorrect": false},
                  {"text": "Ofiarom hitlerowskich zbrodni w Bydgoszczy", "text_en": "Victims of Nazi crimes in Bydgoszcz", "isCorrect": true},
                  {"text": "Ofiarom potopu szwedzkiego", "text_en": "Victims of the Swedish Deluge", "isCorrect": false}
              ]
          },
      ]
  },
  {
    id: 2,
    title: { pl: "Stare Miasto", en: "Old Town Route" },
    description: { 
      pl: "Zwiedzanie najważniejszych zabytków centrum", 
      en: "Explore the city's most iconic historical spots" 
    },
    time: "1 h",
    distance: "2 km",
    image: "/images/oldtown.jpg",
      "questions": [
          {
              "id": 1,
              "question": "Jaka rzeka przepływa przez Bydgoszcz?",
              "question_en": "What river goes through Bydgoszcz?",
              "image": "image1.png",
              "lat": 53.1238,
              "long": 18.0050,
              "answers": [
                  {"text": "Wisła", "text_en": "Wispula", "isCorrect": false},
                  {"text": "Brda", "text_en": "Wispula", "isCorrect": true},
                  {"text": "Odra", "text_en": "Wispula", "isCorrect": false},
                  {"text": "Warta", "text_en": "Wispula", "isCorrect": false}
              ]
          },
          {
              "id": 2,
              "question": "Jaka rzeka przepływa przez Bydgoszcz?",
              "question_en": "What river goes through Bydgoszcz?",
              "image": "image1.png",
              "lat": 53.1235,
              "long": 18.0084,
              "answers": [
                  {"text": "Wisła", "text_en": "Wispula", "isCorrect": false},
                  {"text": "Brda", "text_en": "Wispula", "isCorrect": true},
                  {"text": "Odra", "text_en": "Wispula", "isCorrect": false},
                  {"text": "Warta", "text_en": "Wispula", "isCorrect": false}
              ]
          }
      ]
  }
];