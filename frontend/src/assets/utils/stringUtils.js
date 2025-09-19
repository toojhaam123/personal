export function truncatetext(text, wordLimit = 20) {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length <= wordLimit) {
    return text;
  }
  return words.slice(0, wordLimit).join(" ") + "...";
}
