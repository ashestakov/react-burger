import styles from './not-found-page.module.css';

export function NotFoundPage() {
  return (
    <div className={styles.pageContainer + ' mt-30'}>
      <p className={'text text_type_digits-large'}>
        404
      </p>
      <p className={'text text_type_main-medium'}>
        Страница не найдена
      </p>
    </div>
  )
}