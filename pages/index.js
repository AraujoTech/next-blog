import Head from 'next/head'
import Layout, { siteTitle } from '../styles/components/Layout'
import utilStyles from '../styles/components/utils.module.css'
import Link from 'next/link'
import Date from '../styles/components/Date'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps(){
  const allPostData = getSortedPostsData()
  return {
    props: {
      allPostData
    }
  }
}
export default function Home({allPostData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <Link href='posts/first-post'><a> Página Post</a></Link>.)
        </p>
      </section>

      <section className = {`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostData.map(({id,date,title})=>(
          <li className={utilStyles.listitem} key={id}>
            <Link href ={`/posts/${id}`}><a>{title} </a></Link>
            <br/>
            <small className={utilStyles.lightText}>
              <Date dateString={date}/>
            </small>
          </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}