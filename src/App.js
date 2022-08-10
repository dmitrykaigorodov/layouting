import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const shortTextLength = 10

const singleLineFontSize = (length) => {
  if (length <= 5) {
    return 150
  }
  if (length <= 10) {
    return 130
  }
  if (length < 15) {
    return 90
  }
  return 1300 / length
}

const longestLineLengthAttempt = (text, lineNum, attempt = 0) => {
  if (!text) {
    console.warn('longestLineLengthAttempt', text)
    return ''
  }
  // console.log('longestLineLengthAttempt', { text, lineNum, attempt })
  const length = text.length
  const words = text.split(' ')
  let currLineLength = 0;
  const idealLineLength = length / lineNum + ((attempt + 1))
  let maxLineLength = 0
  let actualLineNum = 1

  // console.log('longestLineLengthAttempt', { idealLineLength, maxLineLength })

  for (const word of words) {
    if (!word) {
      continue;
    }
    const wordLength = word.length
    const wordAndSpaceLength = currLineLength === 0 ? wordLength : wordLength + 1
    const withNextWord = currLineLength + wordAndSpaceLength
    if (withNextWord <= idealLineLength) {
      currLineLength += wordAndSpaceLength
      if (maxLineLength < currLineLength) {
        maxLineLength = currLineLength
      }
    } else {
      actualLineNum++
      currLineLength = wordLength
    }
    // console.log({ currLineLength, withNextWord, maxLineLength, actualLineNum })
  }
  return {
    actualLineNum,
    maxLineLength
  }
}

export const longestLineLength = (text, lineNum) => {
  for (let attempt = 0; attempt < 10; attempt++) {
    const { actualLineNum,
      maxLineLength
    } = longestLineLengthAttempt(text, lineNum, attempt)
    if (lineNum >= actualLineNum) {
      return maxLineLength
    }
  }
  throw new Error("Could not: " + JSON.stringify({ text, lineNum }))
}


const calcFontSize = (text) => {
  const length = text.length;
  if (length < shortTextLength) {
    return {
      fontSize: singleLineFontSize(length),
      restrictingFactor: 'singleLine'
    }
  }

  const longestWordLength = findLongestWordLength(text)
  if (longestWordLength * 3 > length) {
    return {
      fontSize: singleLineFontSize(length),
      restrictingFactor: 'longWord'
    }
  }

  if (length < 25) {
    const longest = longestLineLength(text, 2)
    return {
      fontSize: singleLineFontSize(longest),
      restrictingFactor: 'twoLine'
    }
  }

  if (length < 40) {
    const longest = longestLineLength(text, 3)
    return {
      fontSize: singleLineFontSize(longest),
      restrictingFactor: 'threeLines'
    }
  }

  if (length < 55) {
    const longest = longestLineLength(text, 4)
    return {
      fontSize: singleLineFontSize(longest),
      restrictingFactor: 'fourLines'
    }
  }

  return {
    fontSize: 1000 / (Math.round(text.length / 14) + 20),
    restrictingFactor: 'longText'
  }
}

export const findLongestWordLength = (slidePlainText) => {
  let longestWordLength = 0;
  let currentWordLength = 0;
  slidePlainText += ' '
  for (let i = 0; i < slidePlainText.length; i++) {
    let ch = slidePlainText[i]
    if (/\s/.test(ch)) {
      //is whitespace
      if (longestWordLength < currentWordLength) {
        longestWordLength = currentWordLength
      }
      currentWordLength = 0
    } else {
      currentWordLength++
    }
  }
  return longestWordLength
}


function App() {
  const [text, setText] = useState(`Type this teThe issue was caused by a copy of toolbar. The original toolbar was hidden, but the copy stayed open. Also, at some point where was multiple toolbar. It appear like heavy-shadow toolbar.`)

  const { fontSize, restrictingFactor } = calcFontSize(text)

  return (
    <div className="App">
      <textarea value={text} onChange={(event) => setText(event.target.value)}
        style={{
          fontSize: 40,

        }}
      ></textarea>
      <p>
        {restrictingFactor ? restrictingFactor : 'Please input text'}
      </p>
      <div style={{
        backgroundColor: '#9b59b6',
        paddingLeft: 70,
        paddingRight: 70,
        display: 'inline-block'
      }}>
        <div id="content" style={{
          fontSize: fontSize,
          backgroundColor: '#8e44ad',
          margin: 20,
          textAlign: 'center',
          verticalAlign: 'middle',
          display: 'table-cell',
          color: 'white',

          width: 800,
          height: 500
        }}>
          {text}
        </div>
      </div>
    </div>
  );
}

export default App;
