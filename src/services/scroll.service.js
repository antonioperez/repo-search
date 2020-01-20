export const scrollService = {
  isBottomScreen
};

function isBottomScreen() {
  return (
    Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    ) +
      window.innerHeight ===
    document.documentElement.offsetHeight
  );
}
