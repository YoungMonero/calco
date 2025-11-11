const inputValue = document.getElementById('userinput')

document.querySelectorAll('.operation').forEach(item => {
  item.addEventListener('click', e => {
    const lastValue = inputValue.value.substring(
      inputValue.value.length - 1,
      inputValue.value.length
    )

    if (e.target.innerText === '=') {
      try {
        inputValue.value = safeEvaluate(inputValue.value)
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

function safeEvaluate(expr) {
  expr = expr.replace(/%/g, '/100')
  if (!/^[0-9+\-*/.() ]+$/.test(expr)) throw new Error('Invalid input')
  const tokens = expr.match(/(\d+(\.\d+)?)|[+\-*/()]/g)
  if (!tokens) throw new Error('Invalid input')
  return evaluateTokens(tokens)
}

function evaluateTokens(tokens) {
  const ops = []
  const vals = []

  function applyOp() {
    const b = vals.pop()
    const a = vals.pop()
    const op = ops.pop()
    switch (op) {
      case '+': vals.push(a + b); break
      case '-': vals.push(a - b); break
      case '*': vals.push(a * b); break
      case '/': vals.push(a / b); break
    }
  }

  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 }

  tokens.forEach(token => {
    if (!isNaN(token)) {
      vals.push(parseFloat(token))
    } else if (token === '(') {
      ops.push(token)
    } else if (token === ')') {
      while (ops.length && ops[ops.length - 1] !== '(') applyOp()
      ops.pop()
    } else {
      while (
        ops.length &&
        precedence[ops[ops.length - 1]] >= precedence[token]
      ) {
        applyOp()
      }
      ops.push(token)
    }
  })

  while (ops.length) applyOp()
  return vals[0]
}
