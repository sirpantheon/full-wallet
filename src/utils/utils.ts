export function FormatDate(date: string) {
  const time = new Date(date).toLocaleDateString("pt-BR", { day: 'numeric', month: 'long', year: 'numeric' })
  
  return time
}

export function MaskPing(Ping: string) {

  return Ping.replace(/(\d{3})(\d{3})(\d{3})/g, '$1.$2.$3')
}
