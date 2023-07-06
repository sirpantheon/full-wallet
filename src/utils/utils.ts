export function FormatDate(date: string) {
  const day = new Date(date).getDate() + 1 < 9 ? `0${new Date(date).getDate() + 1}` : new Date(date).getDate() + 1
  const month = new Date(date).getMonth() + 1 < 9 ? `0${new Date(date).getMonth() + 1}` : new Date(date).getMonth() + 1
  const years = new Date(date).getFullYear()
  const FullDate = day + "/" + month + "/" + years

  return FullDate
}

export function MaskPing(Ping: string) {

  return Ping.replace(/(\d{3})(\d{3})(\d{3})/g, '$1.$2.$3')
}
