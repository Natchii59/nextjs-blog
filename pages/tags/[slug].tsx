import Articles from '@/components/articles'
import { getAllPosts, PostMeta } from '@/lib/posts'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

interface TagPageProps {
  slug: string
  posts: PostMeta[]
}

const TagPage: NextPage<TagPageProps> = ({ slug, posts }) => {
  return (
    <>
      <Head>
        <title>Tag: {slug}</title>
      </Head>

      <h1>Tag: {slug}</h1>

      <Articles posts={posts} />
    </>
  )
}

export const getStaticProps: GetStaticProps = ({ params }) => {
  const { slug } = params as { slug: string }
  const posts = getAllPosts().filter((post) => post.meta.tags.includes(slug))

  return {
    props: {
      slug,
      posts: posts.map((post) => post.meta)
    }
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getAllPosts()
  const paths = Array.from(
    new Set(posts.map((post) => post.meta.tags).flat())
  ).map((tag) => ({ params: { slug: tag } }))

  return {
    paths,
    fallback: false
  }
}

export default TagPage
