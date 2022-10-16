import type { FC } from 'react'
import styles from '@/styles/youtube.module.css'

interface YouTubeProps {
  id: string
}

const YouTube: FC<YouTubeProps> = ({ id }) => {
  return (
    <div className={styles.container}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        allow='autoplay; encypted-media'
        title='Embedded Youtube video'
        className={styles.frame}
      />
    </div>
  )
}

export default YouTube
