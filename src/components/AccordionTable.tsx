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
          <AccordionTrigger className="bg-[#0000008f] my-1 rounded-md p-4 text-white hover:bg-[#000000b3] transition-colors duration-200">
            {tag}
          </AccordionTrigger>
          <AccordionContent>
            <div className="overflow-x-auto z-20">
              <table className="min-w-full shadow-md rounded-lg">
                <thead>
                  <tr className="bg-[#00000034] rounded-t-md">
                    <th className="px-4 py-2 text-left text-white">Name</th>
                    <th className="px-4 py-2 text-left text-white">Tags</th>
                    <th className="px-4 py-2 text-left text-white">
                      Description
                    </th>
                    <th className="px-4 py-2 text-left text-white">URL</th>
                  </tr>
                </thead>
                <tbody className="bg-[#00000034]">
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
