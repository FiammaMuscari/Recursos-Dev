import React from "react";
import { ProcessedData } from "../types";

type TableRowProps = {
  entry: ProcessedData;
};

const predefinedColors = [
  "#4CAF50",
  "#2196F3",
  "#9C27B0",
  "#E91E63",
  "#FFEB3B",
  "#FF9800",
  "#00BCD4",
  "#673AB7",
  "#FFC107",
  "#FF5722",
];

const tagColors: Record<string, { background: string; border: string }> = {};

const getBackgroundColor = (color: string) => {
  return `${color}33`;
};

const TableRow: React.FC<TableRowProps> = ({ entry }) => {
  return (
    <tr className="z-20 whitespace-nowrap">
      <td className="px-4 py-2 ">{entry.name}</td>
      <td className="px-4 py-2 ">
        {entry.tags.map((tag) => {
          if (!tagColors[tag]) {
            const colorIndex =
              Object.keys(tagColors).length % predefinedColors.length;
            const borderColor = predefinedColors[colorIndex];
            const backgroundColor = getBackgroundColor(borderColor);

            tagColors[tag] = {
              background: backgroundColor,
              border: borderColor,
            };
          }

          const { background, border } = tagColors[tag];

          return (
            <span
              key={tag}
              className="inline-block  mr-2 px-2 py-1 rounded"
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
