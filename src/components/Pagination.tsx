import React from "react";

// Gränssnitt för vilka props komponenten tar emot
interface PaginationProps {
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void; // Funktion som anropas när sidan byts
}

// Själva komponenten
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Om det bara finns en sida eller inga, visa ingen pagination alls
  if (totalPages <= 1) return null;

  return (
    <nav className="d-flex justify-content-center mt-4">
      <ul className="pagination">
        {/* Skapar en lista med sidnummer från 1 till totalPages */}
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1; // Sidnumret (börjar på 1)
          return (
            <li
              key={page}
              // Markerar aktuell sida 
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(page)} // Anropar funktionen med vald sida
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
