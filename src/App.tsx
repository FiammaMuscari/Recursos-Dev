// src/App.tsx
import React, { useEffect, useState } from "react";
import AccordionTable from "./components/AccordionTable";
import { ProcessedData } from "./types";

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

        const tagsList = rows[1].slice(1);
        const tagsMapping: Record<string, string> = {};

        tagsList.forEach((tag, index) => {
          const colLetter = String.fromCharCode(66 + index);
          tagsMapping[`${colLetter}2`] = tag;
        });

        const processedData = rows.slice(4).map((row) => {
          const [name, tagRefs, description, url] = row;

          const tagReferences = tagRefs
            ? tagRefs.split(/[, ]+/).map((ref) => ref.trim())
            : [];

          return {
            name,
            tagRefs: tagReferences,
            tags: tagReferences.map((ref) => tagsMapping[ref]).filter(Boolean),
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

  const groupedTags = data.reduce((acc, row) => {
    row.tags.forEach((tag) => {
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(row);
    });
    return acc;
  }, {} as Record<string, ProcessedData[]>);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Recursos</h1>
      <AccordionTable groupedTags={groupedTags} />
    </div>
  );
};

export default App;