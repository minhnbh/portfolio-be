export function getPaginationData<T>(data: T[], page: number, limit: number) {
  const totalPage = Math.ceil(data.length / limit);
  return {
    data: data.slice((page - 1) * limit, page * limit),
    metaData: {
      page,
      total: totalPage,
      previousPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPage ? page + 1 : null,
    },
  };
}
