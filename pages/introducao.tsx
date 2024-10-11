import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/index.css'
import "../src/i18n"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import { Root } from '../src/introducao/Root'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)

export default {}