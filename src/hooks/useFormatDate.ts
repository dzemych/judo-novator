import {useMemo} from "react";


const months = [
   'Січня',
   'Лютого',
   'Березня',
   'Квітня',
   'Травня',
   'Червня',
   'Липня',
   'Серпня',
   'Вересня',
   'Жовтня',
   'Листопада',
   'Грудня'
]

const useFormatDate = (date: Date) => {
   return useMemo(() => {
      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()

      return `${day} ${months[month]} ${year}`
   }, [date])
}

export default useFormatDate