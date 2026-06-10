export function createSucces(data) {
  return {
    data,
    error: null,
  };
}

export function createError(error) {
  return {
    data: null,
    error,
  };
}
