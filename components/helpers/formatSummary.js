export default function formatSummary(string) {
  return string.replace(/<\/?[^>]+(>|$)/g, "")
};