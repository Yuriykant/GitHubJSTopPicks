export const repeat = <T>(elementMapper: (index: number) => T, count: number) => {
  const result = [];
  for (let index = 0; index < count; index++) {
    result.push(elementMapper(index));
  }
  return result;
};
