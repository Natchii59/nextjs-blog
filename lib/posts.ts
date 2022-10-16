import { join } from 'path'
import { sync } from 'glob'
import { readFileSync } from 'fs'
import matter from 'gray-matter'

const POSTS_PATH = join(process.cwd(), 'posts')

interface Post {
  content: string
  meta: PostMeta
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  description: string
}

export const getSlugs = (): string[] => {
  const paths = sync(`${POSTS_PATH}/*.mdx`)

  return paths.map((path) => {
    const parts = path.split('/')
    const file = parts[parts.length - 1]
    const [slug, _ext] = file.split('.')
    return slug
  })
}

export const getPostFromSlug = (slug: string): Post => {
  const path = join(POSTS_PATH, `${slug}.mdx`)
  const source = readFileSync(path)
  const { data, content } = matter(source)

  return {
    content,
    meta: {
      slug,
      title: data.title ?? slug,
      date: (data.date ?? new Date()).toString(),
      tags: (data.tags ?? []).sort(),
      description: data.description ?? ''
    }
  }
}

export const getAllPosts = (): Post[] => {
  return getSlugs()
    .map((slug) => getPostFromSlug(slug))
    .sort((a, b) => {
      if (a.meta.date > b.meta.date) return -1
      else return 1
    })
}
