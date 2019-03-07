function generateRandomColor() {
  const colors = [
    '#cb356b, #bd3f32',
    '#f2994a, #f2c94c',
    '#e44d26, #f16529',
    '#f12711, #f5af19',
    '#ff416c, #ff4b2b',
    '#ed213a, #93291e',
    '#fc4a1a, #f7b733',
    '#642b73, #c6426e',
    '#ee0979, #ff6a00',
    '#f85032, #e73827',
    '#f00000, #dc281e',
    '#e53935, #e35d5b',
    '#7b4397, #dc2430',
    '#833ab4, #fd1d1d, #fcb045',
    '#d38312, #a83279',
    '#fe8c00, #f83600',
    '#f2709c, #ff9472',
    '#dc2424, #4a569d',
    '#eb3349, #f45c43',
  ];
  const length = colors.length;
  const random = Math.floor(Math.random() * length);
  return colors[random];
}

export default generateRandomColor;