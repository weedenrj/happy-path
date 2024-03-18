export function trimFormString(value: FormDataEntryValue) {
  return typeof value === "string" ? value.trim() : undefined
}