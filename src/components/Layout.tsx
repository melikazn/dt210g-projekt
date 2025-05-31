import React from "react";
import Header from "./Header"; 

// Layout-komponent som fungerar som en wrapper för hela applikationen
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
      <div className="d-flex flex-column min-vh-100">
      <Header /> {/* Inkluderar Header-komponenten högst upp på sidan */}
      
      {/* Main-del där innehållet (children) från de andra komponenterna kommer att visas */}
      <main className="container my-5 main flex-grow-1">{children}</main>

      {/* Footer som visas längst ner på sidan */}
      <footer className="text-center p-3 text-bg-dark text-white mt-auto">
        <p>© 2025 Min Filmapp</p> {/* Copyrighttext */}
      </footer>
    </div>
  );
};

export default Layout; // Exporterar Layout-komponenten för att kunna använda den på andra ställen i applikationen
