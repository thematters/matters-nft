import classNames from "classnames"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useContext } from "react"

import { Avatar, IconChevonLeft, Section } from "~/components"
import { Container, LogbookContext, LogbookEditor, LogbookProvider, SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"
import { Lang } from "~/enums"
import { useResponsive } from "~/hooks"
import { toEtherscanUrl } from "~/utils"

import * as styles from "./LogbookDetail.module.css"

type PageProps = {
  id: string
  originalPath: string
}

type TokenIdProps = {
  tokenId: string
}

type Log = {
  sender: string 
  message: string
  createdAt: Date
}

type LogListProps = {
  logs: Log[]
}

const LogListItem: React.FC<Log> = ({sender, message, createdAt}) => {
  // const { locale } = useLocalization()
  return (
    <li>
      {message} <br/>
      <a href={toEtherscanUrl(sender).url}>来自{sender.slice(0, 13)}...的宇宙訊號</a><br/>
      {createdAt.toISOString().slice(0, 10)}
    </li>
  );
}

const LogList: React.FC<LogListProps> = ({logs}) => {
  const listItems = logs.map((props) => {
    return <LogListItem {...props} key={props?.sender}/>
  })
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const LogbookDetailContent: React.FC<TokenIdProps> = ({tokenId}) => {

  const isMediumUp  = useResponsive("md-up")
  const { locale } = useLocalization()
  const iconSize = isMediumUp ? "xxl": "xl"
  const { logbooks } = useContext(LogbookContext)
  const logbook = logbooks[tokenId]
  const logs = logbook?.logs

  return (
    <>
      <section className={styles.toolbarHeader}>
        <div>
          <div
            className={classNames({
              [styles.side]: !isMediumUp,
              [styles.boxShadow]: isMediumUp,
            })}
          >
            <IconChevonLeft size={iconSize} />
          </div>
          <div className={styles.boxShadow}>
            <h1>{locale === Lang.en ? `Transition:${logs?.length}` : `Transaction:${logs?.length}`}</h1>
          </div>
          <div
            className={classNames({
              [styles.side]: !isMediumUp,
              [styles.boxShadow]: isMediumUp,
            })}
          >
            <a href={logbook?.tokenOpenSeaURL}><Avatar src={logbook?.tokenImageURL} size={iconSize} /></a>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <section className={styles.text}>
          <Section.Content>
            {logs && <LogList logs={logs} />}
          </Section.Content>
        </section>

      </section>
    </>
  )
}

const LogbookDetail: React.FC<PageProps> = ({ id, originalPath }) => {
  const isMediumUp  = useResponsive("md-up")

  return (
    <LogbookProvider>
      <SEO />

      {isMediumUp && <Header originalPath={originalPath} />}
      
      <main className={styles.main}>
        <section className={styles.header}></section>
        <section className={styles.left}></section>
        <section className={styles.right}></section>
        <LogbookDetailContent tokenId={id} />
        <section className={styles.footer}></section>
      </main>

      <Container>
        <LogbookEditor tokenId={id} />
      </Container>
      {isMediumUp && <Footer />}
    </LogbookProvider>
  )
}

export default LogbookDetail
