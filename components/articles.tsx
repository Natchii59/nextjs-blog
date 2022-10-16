import { PostMeta } from '@/lib/posts'
import Link from 'next/link'
import type { FC } from 'react'
import styles from '@/styles/articles.module.css'

interface ArticlesProps {
  posts: PostMeta[]
}

const Articles: FC<ArticlesProps> = ({ posts }) => {
  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <li key={post.slug}>
          <div className={styles.title}>
            <Link href={`/posts/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </div>

          <p>{post.description}</p>

          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`}>
                <a>{tag}</a>
              </Link>
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Articles
