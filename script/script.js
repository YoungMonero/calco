const inputValue = document.getElementById('userinput')

document.querySelectorAll('.operation').forEach(function (item) {
  item.addEventListener('click', function (e) {
    let lastValue = inputValue.value.substring(
      inputValue.value.length - 1,
      inputValue.value.length
    )

    if (e.target.innerText == '=') {
      inputValue.value = eval(inputValue.value)
    } else if (e.target.innerText == 'AC') {
      inputValue.value = '0'
    } else if (e.target.innerText == 'DEL') {
      inputValue.value = inputValue.value.substring(
        0,
        inputValue.value.length - 1
      )
      if (inputValue.value.length == 0) {
        inputValue.value = '0'
      }
    } else if (!isNaN(lastValue)) {
      inputValue.value += e.target.innerText
    }
  })
})

document.querySelectorAll('.number').forEach(function (item) {
  item.addEventListener('click', function (e) {
    if (inputValue.value == '0') {
      inputValue.value = ''
    }
    inputValue.value += e.target.innerText.trim()
  })
})
