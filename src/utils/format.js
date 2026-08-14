export function formatCurrency(value, opts = {}) {
  const { maxDecimals = 2, minDecimals = 2 } = opts;
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: minDecimals,
  });
}

export function formatCompact(value) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value, decimals = 3) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  });
}
