import { useState } from "react";

export const SearchBar = ({ onCitySearch, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onCitySearch(searchTerm.trim());
      setSearchTerm(""); // Limpa o campo após buscar
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="search-input-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite o nome da cidade..."
            disabled={isLoading}
            className="search-input"
          />
          <button
            type="submit"
            disabled={isLoading || !searchTerm.trim()}
            className="search-button"
          >
            {isLoading ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </form>
    </div>
  );
};
