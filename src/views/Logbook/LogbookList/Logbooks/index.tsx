import React from "react"

import { Logbook } from "~/components"

import LogbookItem from "./Item"
import * as styles from "./styles.module.css"

interface Props {
  logbooks: Logbook[]
}

const Logbooks: React.FC<Props> = ({ logbooks }) => {
  return (
    <ul className={styles.list}>
      {logbooks.map(logbook => (
        <li key={logbook.tokenId}>
          <LogbookItem logbook={logbook} />
        </li>
      ))}
    </ul>
  )
}

export default Logbooks
