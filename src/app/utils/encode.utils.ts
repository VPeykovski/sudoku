const encodeBoard = (board: number[][]) =>
  board.reduce(
    (result, row, i) =>
      result +
      `%5B${encodeURIComponent(row.toString())}%5D${i === board.length - 1 ? '' : '%2C'}`,
    '',
  );

export const encodeParams = (params: { board: number[][] }) =>
  Object.keys(params)
    .map(
      (key) =>
        key + '=' + `%5B${encodeBoard(params[key as keyof typeof params])}%5D`,
    )
    .join('&');

interface UpdateBoardParams {
  board: number[][];
  row: number;
  col: number;
  value: number;
}

export const updateBoard = ({
  board,
  row,
  col,
  value,
}: UpdateBoardParams): number[][] =>
  board.map((r, rIndex) =>
    rIndex === row ? r.map((c, cIndex) => (cIndex === col ? value : c)) : r,
  );
