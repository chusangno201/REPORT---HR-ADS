export const money = (value) => new Intl.NumberFormat('vi-VN', {
  style: 'currency', currency: 'VND', maximumFractionDigits: 0,
}).format(value)

export const shortMoney = (value) => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)} tỷ`
  if (value >= 1_000_000) return `${Math.round(value / 1_000_000)} tr`
  return money(value)
}

export const pctDiff = (current, previous) => previous ? ((current - previous) / previous) * 100 : 0
