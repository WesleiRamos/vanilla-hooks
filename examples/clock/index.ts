import { hooked, useState } from '../../'

const clock = document.querySelector('#clock')

hooked(() => {
  const [ date, setDate ] = useState(new Date())
  clock!.textContent = date.toLocaleTimeString()
  setTimeout(() => setDate(new Date()), 1000)
})
