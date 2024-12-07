import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ProcessedData } from "../types";
import TableRow from "./TableRow";

type AccordionTableProps = {
  groupedTags: Record<string, ProcessedData[]>;
};

const AccordionTable: React.FC<AccordionTableProps> = ({ groupedTags }) => {
  return (
    <Accordion type="single" collapsible>
      {Object.entries(groupedTags).map(([tag, entries]) => (
        <AccordionItem key={tag} value={tag}>
          <AccordionTrigger>{tag}</AccordionTrigger>
          <AccordionContent>
            <div className="overflow-x-auto">
              <table className="min-w-full shadow-md rounded-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Tags</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-left">URL</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => (
                    <TableRow key={index} entry={entry} />
                  ))}
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionTable;
