import Head from "next/head"
import Layout from "../../styles/components/Layout"
import { getAllPostsIds, getPostsData } from "../../lib/posts"
import Date from "../../styles/components/Date"
import utilStyles from '../..//styles/components/utils.module.css'

export async function getStaticProps({params}){
    const postData = await getPostsData(params.id)
    return {
        props:{
            postData
        }
    }
}
export async function getStaticPaths(){
    const paths = getAllPostsIds() 
    return{
        paths,
        fallback:false
    }
}
export default function Post({postData}){
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
            <h1 className={utilStyles.headingX1}>{postData.title}</h1>
           
            <div className= {utilStyles.lightText}>
                <Date dateString = {postData.date}/>
            </div>
            
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
            </article>
        </Layout>
    )
}