import React from "react";
import { ProcessedData } from "../types";

type TableRowProps = {
  entry: ProcessedData;
};

const TableRow: React.FC<TableRowProps> = ({ entry }) => {
  return (
    <tr className="border-t">
      <td className="px-4 py-2">{entry.name}</td>
      <td className="px-4 py-2">{entry.tags.join(", ")}</td>
      <td className="px-4 py-2">{entry.description}</td>
      <td className="px-4 py-2">
        {entry.url && (
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {entry.url}
          </a>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
