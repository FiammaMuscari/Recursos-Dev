import React from "react";
import { ProcessedData } from "../types";

type TableRowProps = {
  entry: ProcessedData;
};

const predefinedColors = [
  "#39FF14", // Neon Green
  "#FF6EC7", // Neon Pink
  "#00FFFF", // Neon Cyan
  "#FFFF33", // Neon Yellow
  "#FFB300", // Neon Bright Orange
  "#FF1493", // Neon Deep Pink
  "#7FFF00", // Neon Chartreuse
  "#32CD32", // Neon Lime Green
  "#00FA9A", // Neon Medium Spring Green
  "#FFD700", // Neon Gold
  "#FF69B4", // Neon Hot Pink
  "#BA55D3", // Neon Medium Orchid
  "#00BFFF", // Neon Bright Blue
  "#FF00FF", // Neon Magenta
  "#FF6347", // Neon Tomato Red
];

const tagColors: Record<string, { background: string; border: string }> = {};

const TableRow: React.FC<TableRowProps> = ({ entry }) => {
  return (
    <tr className="z-20 whitespace-nowrap">
      <td className="px-4 py-2">{entry.name}</td>
      <td className="px-4 py-2">
        {entry.tags.map((tag) => {
          if (!tagColors[tag]) {
            const colorIndex =
              Object.keys(tagColors).length % predefinedColors.length;
            const borderColor = predefinedColors[colorIndex];

            tagColors[tag] = {
              background: "rgba(50, 50, 50, .50)",
              border: borderColor,
            };
          }

          const { background, border } = tagColors[tag];

          return (
            <span
              key={tag}
              className="inline-block mr-2 px-3 py-1 rounded-lg shadow hover:shadow-md transition-shadow duration-200 ease-in-out"
              style={{
                backgroundColor: background,
                borderColor: border,
                borderWidth: "1px",
                borderStyle: "solid",
                color: border,
              }}
            >
              {tag}
            </span>
          );
        })}
      </td>
      <td className="px-4 py-2">{entry.description}</td>
      <td className="px-4 py-2">
        {entry.url && (
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ff74e1] hover:underline"
          >
            Click here
          </a>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
