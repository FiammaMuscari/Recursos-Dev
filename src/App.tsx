import React, { useEffect, useState } from "react";

type TagsMap = { [key: string]: string }; // Ejemplo: { "B2": "react", "C2": "extensión" }
type ProcessedData = {
  name: string;
  tagRefs: string[]; // ["B2", "D2"]
  tags: string[]; // ["react", "ui"]
  description: string;
  url: string;
};

const App: React.FC = () => {
  const [data, setData] = useState<ProcessedData[]>([]);
  const [tagsMap, setTagsMap] = useState<TagsMap>({});

  const csvUrl = import.meta.env.VITE_APP_CSV;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        const rows = csvText
          .split("\n")
          .map((row) => row.split(",").map((cell) => cell.trim()));

        // Obtener los tags de la fila 2 (índice 1)
        const tagsList = rows[1].slice(1); // Ignorar primera columna
        const tagsMapping: TagsMap = {};

        // Crear mapping de referencia a valor del tag
        tagsList.forEach((tag, index) => {
          const colLetter = String.fromCharCode(66 + index); // B, C, D, etc.
          tagsMapping[`${colLetter}2`] = tag; // Ejemplo: "B2": "react"
        });

        setTagsMap(tagsMapping);

        // Procesar datos desde la fila 5
        const processedData = rows.slice(4).map((row) => {
          const [name, tagRefs, description, url] = row;
          // Separar por comas o espacios
          const tagReferences = tagRefs
            ? tagRefs.split(/[, ]+/).map((ref) => ref.trim()) // Separar por comas o espacios
            : [];

          return {
            name,
            tagRefs: tagReferences,
            tags: tagReferences
              .map((ref) => tagsMapping[ref]) // Mapea las referencias a sus valores
              .filter(Boolean), // Filtra valores vacíos
            description,
            url,
          };
        });

        setData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [csvUrl]);

  return (
    <div className="container">
      <h1>Datos desde Google Sheets</h1>
      {/* Debug de tags disponibles */}
      <div className="available-tags">
        <h3>Tags Disponibles:</h3>
        {Object.entries(tagsMap).map(([ref, tag]) => (
          <span key={ref} className="tag">
            {ref}: {tag}
          </span>
        ))}
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tags</th>
            <th>Descripción</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>
                {/* Mostrar los tags como una lista separada por comas */}
                {row.tags.length > 0 ? row.tags.join(", ") : "Sin Tags"}
              </td>
              <td>{row.description}</td>
              <td>
                {row.url && (
                  <a href={row.url} target="_blank" rel="noopener noreferrer">
                    {row.url}
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
