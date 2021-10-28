import "./styles.css"

import { DialogContent, DialogOverlay } from "@reach/dialog"
import classNames from "classnames"
import _get from "lodash/get"
import React from "react"
import { useEffect, useRef, useState } from "react"
import { animated, useSpring } from "react-spring"

import { KEYCODES } from "~/enums"
import { useResponsive } from "~/hooks"
import { dom } from "~/utils"

import Overlay from "./Overlay"
import * as styles from "./styles.module.css"

export interface DialogOverlayProps {
  isOpen: boolean | undefined
  onDismiss: () => void
  onRest?: () => void
}

export type DialogProps = {
  size?: "sm" | "lg"
  fixedHeight?: boolean
  slideIn?: boolean
} & DialogOverlayProps

const Container: React.FC<
  {
    style?: React.CSSProperties
    setDragGoal: (val: any) => void
  } & DialogProps
> = ({ size = "lg", fixedHeight, onDismiss, children, style, setDragGoal }) => {
  const node: React.RefObject<any> | null = useRef(null)

  const containerClasses = classNames({
    [styles.container]: true,
    [styles.fixedHeight]: !!fixedHeight,
    [styles[size]]: true,
  })

  const closeTopDialog = () => {
    const dialogs = Array.prototype.slice.call(
      dom.$$("[data-reach-dialog-overlay]")
    ) as Element[]
    const topDialog = dialogs[dialogs.length - 1]
    const isTopDialog =
      topDialog && node.current && topDialog.contains(node.current)

    if (!isTopDialog) {
      return
    }

    onDismiss()
  }

  // useOutsideClick(node, closeTopDialog)

  return (
    <div className="l-row">
      <div
        ref={node}
        className={containerClasses}
        style={style}
        onKeyDown={event => {
          if (event.keyCode === KEYCODES.escape) {
            closeTopDialog()
          }
        }}
      >
        {children}
      </div>
    </div>
  )
}

const Dialog: React.FC<DialogProps> = props => {
  const { isOpen, onRest, slideIn } = props
  const [mounted, setMounted] = useState(isOpen)
  const isSmallUp = useResponsive("sm-up")

  // Drag
  const [{ top }, setDragGoal] = useSpring(() => ({ top: 0 }))

  // Fade In/ Fade Out
  const [{ opacity, transform }, setFade] = useSpring<{
    opacity: number
    transform: string
  }>(() => ({
    opacity: 0,
    transform: "translateY(100%)",
    config: { tension: 270, friction: isSmallUp ? undefined : 30 },
    onRest: (val: any) => {
      const isFadedOut = _get(val, "value.opacity") <= 0

      if (isFadedOut) {
        setMounted(false)
        setDragGoal({ top: 0 })
      }

      if (onRest) {
        onRest()
      }
    },
  }))

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      setFade({ opacity: 1, transform: "translateY(0%)" })
    } else {
      setFade({ opacity: 0, transform: "translateY(100%)" })
    }
  })

  const AnimatedDialogOverlay = animated(DialogOverlay)
  const AnimatedContainer = animated(Container)
  const AnimatedOverlay = animated(Overlay)

  if (!mounted) {
    return null
  }

  return (
    <AnimatedDialogOverlay>
      <AnimatedOverlay style={{ opacity: opacity as any }} />

      <DialogContent
        className="l-container full"
        aria-labelledby="dialog-title"
      >
        <AnimatedContainer
          style={{
            transform: !isSmallUp && slideIn ? transform : undefined,
            opacity: isSmallUp || !slideIn ? (opacity as any) : undefined,
            top: !isSmallUp ? top : undefined,
          }}
          setDragGoal={setDragGoal}
          {...props}
        />
      </DialogContent>
    </AnimatedDialogOverlay>
  )
}

export default Dialog
