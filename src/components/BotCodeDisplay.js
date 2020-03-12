import React, { useRef, useEffect } from 'react'
import AceEditor from 'react-ace'
import propTypes from 'prop-types'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-tomorrow'

export const BotCodeEditor = ({ onLoad, onChange, value, ...other }) => (
  <AceEditor
    style={{ width: '100%', borderRadius: '5px', border: '2px solid #dcdcdc', ...other.extraStyle }}
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
    {...other}
  />
)

export const BotCodeViewer = ({ value, ...other }) => {
  const editorRef = useRef(null)

  useEffect(() => {
    const { current: { editor } } = editorRef
    // Hide cursor so users don't think that they can edit
    editor.renderer.$cursorLayer.element.style.display = 'none'
  })

  return (
    <AceEditor
      style={{ width: '100%', borderRadius: '5px', border: '2px solid #dcdcdc' }}
      className={'test'}
      mode='javascript'
      theme='tomorrow'
      name='Bot Code Editor'
      fontSize={14}
      readOnly
      ref={editorRef}
      onLoad={() => {
        if (editorRef.current) {
          editorRef.current.editor.renderer.$cursorLayer.element.style.display = 'none'
        }
      }}
      showPrintMargin={false}
      value={value}
      setOptions={{
        useWorker: false,
        highlightActiveLine: false,
        highlightGutterLine: false
      }}
      {...other}
    />
  )
}

BotCodeViewer.propTypes = {
  value: propTypes.string
}

BotCodeEditor.propTypes = {
  onLoad: propTypes.func,
  onChange: propTypes.func,
  value: propTypes.string
}
