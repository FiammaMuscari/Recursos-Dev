export interface ProcessedData {
  name: string;
  tagRefs: string[]; // ["B2", "D2"] example
  tags: string[]; // ["react", "ui"] example
  description: string;
  url: string;
}
