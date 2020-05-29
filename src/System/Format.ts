function comma(num: number): string {
  const f = String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  return f;
}