import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {Helmet} from "react-helmet";

function Layout({ children, title, description, keywords, author}) {
  return (
    <>  
    <Helmet>
  <meta charSet="utf-8" />
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="author" content={author} />
    </Helmet>
  

    <Header />
      <main style={{minHeight:'80vh'}}>
      

      <h2> {children} </h2>
      </main>
    <Footer />


        </>
  )

}

export default Layout

