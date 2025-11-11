const inputValue = document.getElementById('userinput')

document.querySelectorAll('.operation').forEach(item => {
  item.addEventListener('click', e => {
    const lastValue = inputValue.value.substring(
      inputValue.value.length - 1,
      inputValue.value.length
    )

    if (e.target.innerText === '=') {
      try {
        inputValue.value = calculate(inputValue.value)
      } catch {
        inputValue.value = 'Error'
      }
    } else if (e.target.innerText === 'AC') {
      inputValue.value = '0'
    } else if (e.target.innerText === 'DEL') {
      inputValue.value = inputValue.value.substring(0, inputValue.value.length - 1)
      if (inputValue.value.length === 0) inputValue.value = '0'
    } else if (!isNaN(lastValue)) {
      inputValue.value += e.target.innerText
    }
  })
})

document.querySelectorAll('.number').forEach(item => {
  item.addEventListener('click', e => {
    if (inputValue.value === '0') inputValue.value = ''
    inputValue.value += e.target.innerText.trim()
  })
})

function calculate(expr) {
  if (!/^[0-9+\-*/.%() ]+$/.test(expr)) throw new Error('Invalid input')
  expr = expr.replace(/%/g, '/100')
  return new Function('return ' + expr)()
}
