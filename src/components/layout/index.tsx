import React, {FC} from 'react'
import {Helmet} from 'react-helmet'
import Footer from './footer'
import Header from './header'

interface ILayout {
  children: any,
  title: string,
  description: string,
  canonical: string,
}

const Layout: FC<ILayout> = ({children, title, description, canonical}) => {
  return (
    <>
      <Helmet 
        htmlAttributes={{
          lang: 'zh-Hans',
        }}>
				<meta charSet="utf-8" />
        <title>Steve Yu's Blog - {title}</title>
        <meta name="description" content={description} />
				<link rel="canonical" href={`https://www.steveyuowo.com${canonical}`} />
			</Helmet>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
