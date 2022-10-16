import { getPostFromSlug, getSlugs, PostMeta } from '@/lib/posts'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'
import YouTube from '@/components/youtube'
import Image from 'next/image'
import rehypeSlug from 'rehype-slug'
import rehypeAutoLinkHeadings from 'rehype-autolink-headings'
import rehypeHighLight from 'rehype-highlight'

interface PostPageProps {
  post: {
    source: MDXRemoteProps
    meta: PostMeta
  }
}

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  return (
    <>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css'
        ></link>
        <title>{post.meta.title}</title>
      </Head>

      <h1>{post.meta.title}</h1>

      <MDXRemote {...post.source} components={{ YouTube, Image }} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const { meta, content } = getPostFromSlug(slug)
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutoLinkHeadings, { behavior: 'wrap' }],
        rehypeHighLight
      ]
    }
  })

  return {
    props: {
      post: {
        source: mdxSource,
        meta
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getSlugs().map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false
  }
}

export default PostPage
