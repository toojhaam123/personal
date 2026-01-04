export function truncatetext(text, charLimit) {
  if (!text) return "";

  // nếu độ dài của chuỗi nhỏ hơn giới hạn, trả về nguyên bản
  if (text.length <= charLimit) {
    return text;
  }
  return text.substring(0, charLimit).trim() + "...";
}
