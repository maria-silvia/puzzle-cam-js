function distance(cat1, cat2) {
  // using pythagorean theorem
  return Math.sqrt(
    (cat1.x - cat2.x) * (cat1.x - cat2.x) +
      (cat1.y - cat2.y) * (cat1.y - cat2.y)
  );
}
