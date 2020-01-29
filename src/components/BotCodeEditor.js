import React from 'react'
import AceEditor from 'react-ace'
import propTypes from 'prop-types'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-tomorrow'

const BotCodeEditor = ({ onLoad, onChange, value, ...props }) => (
  <AceEditor
    style={{ width: '100%', borderRadius: '5px', border: '2px solid #dcdcdc' }}
    mode='javascript'
    theme='tomorrow'
    name='Bot Code Editor'
    onLoad={onLoad}
    onChange={onChange}
    fontSize={14}
    showPrintMargin={false}
    value={value}
    setOptions={{
      useWorker: false
    }}
    {...props}
  />
)

BotCodeEditor.propTypes = {
  onLoad: propTypes.func,
  onChange: propTypes.func,
  value: propTypes.string
}

export default BotCodeEditor
