# Event Scheduler – Design System

## Designrichtung: Festival Editorial

Warm, kulturell und hochwertig – wie ein modernes Stadtmagazin mit Event-Fokus.

| Bereich | Festlegung |
| --- | --- |
| Grundstil | Editorial, sonnig, kreativ, leicht verspielt |
| Hintergrund | Warmes Creme statt reinem Weiß |
| Akzent | Terrakotta/Orange für Aktionen |
| Kontrast | Dunkle Tinte für Überschriften |
| Karten | Große Bilder, weiche Radien, dezente Schatten |

## Farbpalette

| Zweck | Farbe |
| --- | --- |
| Seitenhintergrund | `#FFF8EE` |
| Kartenfläche | `#FFFFFF` |
| Alternative Fläche | `#FFF0DF` |
| Primärfarbe / CTA | `#E8531A` |
| Primärfarbe Hover | `#C94010` |
| Warmer Akzent | `#F6A24C` |
| Blauer Gegenakzent | `#2446B6` |
| Haupttext | `#1B1714` |
| Sekundärtext | `#766B61` |
| Rahmen | `#EBDCC9` |
| Erfolg / Status | `#4C9F70` |

## Typografie

- Überschriften: **Playfair Display**, Gewicht `700`
- Fließtext, Buttons und Navigation: **DM Sans**, Gewicht `400–600`

| Element | Desktop | Mobil |
| --- | ---: | ---: |
| Hero-Headline | 64 px | 42 px |
| Seitentitel | 40 px | 32 px |
| Karten-Titel | 24 px | 20 px |
| Navigation | 15 px | 14 px |
| Fließtext | 16 px | 16 px |
| Meta-Informationen | 14 px | 14 px |

## Layout-Regeln

- Maximale Inhaltsbreite: `1280px`
- Seitenabstand: `24px` mobil, `48px` Desktop
- Header-Höhe: `72px`
- Großer vertikaler Abschnittsabstand: `80px`
- Kartenabstand: `24px`
- Kartenradius: `20px`
- Buttons und Filter-Chips: `999px`

## Home-Aufbau

1. Minimaler Header: Home links, Wortmarke mittig, Login/Register oder Create Event/Logout rechts.
2. Hero: große Headline links, Event-Bildcollage rechts.
3. Filter-Chips: Heute, Wochenende, Musik, Food, Kunst.
4. Featured Event: großes Bild links, orangefarbener Informationsblock rechts.
5. Eventliste: zweispaltige, kompakte Karten mit Bild, Titel, Ort und Datum.
6. Abschluss: warme CTA-Fläche, zum Beispiel „Keine Events mehr verpassen“.

## Karten

- Bildformat: `3:2`
- Bild oben oder links
- Kategorie-Chip über dem Bild
- Titel prominent, danach Ort und Datum
- Hover: Karte hebt sich leicht an, Schatten wird stärker
- Solange die API keine Bilder liefert: kuratierte Platzhalterbilder je Kategorie verwenden

## Sprachregel

Die Oberfläche soll durchgehend eine Sprache verwenden. Der Entwurf ist englisch; das aktuelle Projekt ist gemischt. Vor der Umsetzung entscheidet das Team zwischen vollständig Deutsch oder vollständig Englisch.
