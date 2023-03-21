const useGenres = (selectedGenres) => {
  if (selectedGenres.length < 1) return "";

  const GenreIDS = selectedGenres.map((g) => g.id);
  return GenreIDS.reduce((acc, curr) => acc + "," + curr);
};

export default useGenres;
