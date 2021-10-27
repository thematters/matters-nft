import classNames from "classnames"
import React from "react"

import { useResponsive } from "~/hooks"

import * as styles from "./infobox.module.css"

interface InfoboxProps {
  active: boolean
  title: React.ReactNode
  content: React.ReactNode
  time: React.ReactNode
  button: React.ReactNode
}

const Infobox = ({ active, title, content, time, button }: InfoboxProps) => {
  const isMediumUp = useResponsive("md-up")

  const containerClasses = classNames({
    infobox: true,
    [styles.container]: true,
    [styles.containerMdUp]: isMediumUp,
    [styles.active]: active,
  })

  const titleClasses = classNames({
    [styles.title]: true,
    [styles.titleMdUp]: isMediumUp,
  })

  const timeDetailsClasses = classNames({
    [styles.timeDetails]: true,
    [styles.timeDetailsMdUp]: isMediumUp,
  })

  const timezoneClasses = classNames({
    [styles.timezone]: true,
    [styles.timezoneMdUp]: isMediumUp,
  })

  const timeClasses = classNames({
    [styles.time]: true,
    [styles.timeMdUp]: isMediumUp,
  })

  const buttonClasses = classNames({
    [styles.button]: true,
    [styles.buttonMdUp]: isMediumUp,
  })

  return (
    <section className={containerClasses}>
      <section className={styles.info}>
        <section className={titleClasses}>{title}</section>
        <section className={styles.content}>{content}</section>
      </section>

      <section className={timeDetailsClasses}>
        <p className={timezoneClasses}>香港/台灣時區</p>
        <section className={timeClasses}>{time}</section>
        <section className={buttonClasses}>{button}</section>
      </section>
    </section>
  )
}

export default Infobox
