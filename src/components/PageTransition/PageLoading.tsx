import styles from './PageLoading.module.scss';

/**
 * 懒加载页面的过渡占位
 * 与农场背景融合的轻量指示，替代生硬的全屏 Spin
 */
const PageLoading = () => (
  <div className={styles.pageLoading} role="status" aria-label="加载中">
    <div className={styles.blocks}>
      <span className={`${styles.block} ${styles.block1}`} />
      <span className={`${styles.block} ${styles.block2}`} />
      <span className={`${styles.block} ${styles.block3}`} />
    </div>
    <span className={styles.text}>加载中...</span>
  </div>
);

export default PageLoading;
