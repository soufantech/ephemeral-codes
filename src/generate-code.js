/**
 * Generates aphanumeric uppercase codes like '1AQ9D8'.
 */
function generateCode(size = 6) {
  return (
    [...Array(size)]
      // eslint-disable-next-line no-bitwise
      .map(() => (~~(Math.random() * 36)).toString(36))
      .join('')
      .toUpperCase()
  );
}

module.exports = generateCode;
