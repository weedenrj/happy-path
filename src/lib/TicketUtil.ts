import Papa from "papaparse";

export function mkHeadersFromCsv(csvString = "") {
  const parsedEntries = Papa.parse<string[]>(csvString).data
  return parsedEntries.at(0) || []
}