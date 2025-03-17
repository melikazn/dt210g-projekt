# Film Recensionsplattform

Detta projekt är en filmrecensionsplattform som gör det möjligt för användare att logga in, registrera sig, skriva recensioner och läsa recensioner om filmer. Användare kan även uppdatera och radera sina recensioner. Projektet använder sig av React, React Router, Axios, och en backend byggd med Express och MySQL.

## Funktioner

- **Inloggning och Registrering:** Användare kan skapa ett konto och logga in.
- **Filmdetaljer:** Användare kan se detaljer om filmer från OMDb API.
- **Recensioner:** Användare kan skriva, läsa, uppdatera och radera recensioner för filmer.
- **Skyddade sidor:** Endast inloggade användare kan skriva, uppdatera eller radera recensioner.

## Teknologier

- **Frontend:**
  - React
  - TypeScript
  - React Router
  - Axios
  - Bootstrap 
  
- **Backend:**
  - Node.js
  - Express
  - MySQL
  - OMDb API för att hämta filminformation

## Installation

### För frontend:

1. npm install
2. npm run dev

   Webbsidan kommer att vara tillgänglig på http://localhost:3000.
### För backend: 
Registrera: Skapa ett nytt konto genom att fylla i e-post, användarnamn och lösenord på registreringssidan.
Logga in: Använd ditt registrerade konto för att logga in.
Recensioner: Skriv recensioner för filmer. Du kan även uppdatera eller radera dina egna recensioner om du är inloggad.

## Vägledning för utvecklare
Filstrukturen:

src/: Innehåller all frontend-kod.
src/pages/: Sidor som används för navigering i appen.
src/components/: Återanvändbara komponenter, som exempelvis en Layout-komponent.
src/assets/: För bilder och CSS-filer.
PrivateRoute-komponenten: Används för att skydda sidor som kräver inloggning.


