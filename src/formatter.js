import numeral from "numeral";

const dollarFormatter = (value) => {
  if (!value) {
    return "$0.00";
  }
  return numeral(value).format(" ($0.00a)");
};

const percentFormatter = (value) => {
  let icon = Number(value) > 0 ? "👍" : "👎";
  if (!value) {
    return "% 0";
  }
  return `${Number(value).toFixed(2)}%  ${icon}`;
};

export { dollarFormatter, percentFormatter };
