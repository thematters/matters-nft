import React from "react"

import { SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"

type PageProps = {
  id: string
  originalPath: string
}

const LogbookDetail: React.FC<PageProps> = ({ id, originalPath }) => (
  <>
    <SEO />

    <Header originalPath={originalPath} />
    <main style={{ margin: "10rem auto", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>Logbook {id}</h1>
      {/* <pre>{JSON.stringify(params)}</pre> */}
    </main>

    <Footer />
  </>
)

export default LogbookDetail
