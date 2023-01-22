const paginationGenerator = (page, pageSize, pageElements, totalElements) => {
  const totalPages = Math.ceil(totalElements / pageSize);
  
  let next = undefined;
  if (page < totalPages && page > 0) next = page + 1;
  if (page === totalPages) next = undefined;

  let previous = undefined;
  previous = page > 1 ? page - 1 : undefined;

  return {
    next,
    previous,
    pageElements,
    totalElements,
    totalPages
  }
}

module.exports = {
  paginationGenerator
}