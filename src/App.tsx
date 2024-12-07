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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Datos desde Google Sheets
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full first-letter:shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Tags</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-left">URL</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2">
                  {row.tags.length > 0 ? row.tags.join(", ") : "Sin Tags"}
                </td>
                <td className="px-4 py-2">{row.description}</td>
                <td className="px-4 py-2">
                  {row.url && (
                    <a
                      href={row.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {row.url}
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
