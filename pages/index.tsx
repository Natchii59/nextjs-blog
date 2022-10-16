import Articles from '@/components/articles'
import { getAllPosts, PostMeta } from '@/lib/posts'
import type { GetStaticProps, NextPage } from 'next'

interface HomeProps {
  posts: PostMeta[]
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <>
      <h1>Articles</h1>

      <Articles posts={posts} />
    </>
  )
}

export const getStaticProps: GetStaticProps = () => {
  const posts = getAllPosts().map((post) => post.meta)

  return {
    props: { posts }
  }
}

export default Home
