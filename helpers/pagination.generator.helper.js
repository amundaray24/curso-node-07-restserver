
const requestPaginatorGenerator = (page = 1, pageSize = 10) => {

  let pageNumber = Math.floor(Number(page));
  pageNumber = pageNumber <= 1 ? 1 : pageNumber;

  let pageSizeNumber = Math.floor(Number(pageSize));
  pageSizeNumber = pageSizeNumber <= 1 ? 1 : pageSizeNumber;

  return {
    skip : (pageNumber-1)*pageSizeNumber,
    limit: pageSizeNumber,
    page: pageNumber,
    pageSize: pageSizeNumber
  }
}

const responsePaginationGenerator = (requestPagination, pageElements, totalElements) => {

  const { page, pageSize} = requestPagination;

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
  requestPaginatorGenerator,
  responsePaginationGenerator
}