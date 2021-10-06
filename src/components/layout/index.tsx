import React, {FC} from 'react'
import {Helmet} from 'react-helmet'
import Footer from './footer'
import Header from './header'
import ShareImage from '../../assets/share.png'

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
        {/* basic */}
				<meta charSet="utf-8" />
        <title>Steve Yu's Blog - {title}</title>
        <meta name="description" content={description} />
				<link rel="canonical" href={`https://www.steveyuowo.com${canonical}`} />
        {/* open graph */}
        <meta property="og:url" content={`https://www.steveyuowo.com${canonical}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`Steve Yu's Blog - ${title}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ShareImage} />
			</Helmet>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
