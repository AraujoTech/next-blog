import fs from 'fs' 
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData(){
    //captura arquivos da pasta posts

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostData = fileNames.map(filename=> {

        //remove .md of filename to get id

        const id = filename.replace(/\.md/,'')

        // read markdown file as string

        const fullpath = path.join(postsDirectory,filename)
        const fileContents =  fs.readFileSync(fullpath,'utf-8')

        //grey-matter to parse the post metadata section

        const matterResult = matter(fileContents)

        //combine the data with the id

        return {
            id,
            ...matterResult.data
        }
    })

    //sort posts by date

    return allPostData.sort(({date:a}, {date:b})=> {
        if (a<b){
            return 1
        } else if(a>b){
            return -1
        } else{
            return 0
        }

        
    })
}

export function getAllPostsIds(){
    const fileNames = fs.readdirSync(postsDirectory)
    // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

    return fileNames.map(fileName=>{
        return {
            params: {
                id: fileName.replace(/\.md$/,'')

            }
        }
    })
}

export async function getPostsData(id){
    const fullpath  = path.join(postsDirectory,`${id}.md`)
    const fileContents = fs.readFileSync(fullpath,'utf8')
    const matterResult = matter(fileContents)
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)


    const contentHtml = processedContent.toString()




    return {
        id,
        contentHtml,
        ... matterResult.data
    }
     
}

