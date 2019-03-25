import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styles from './styles.css'

function ConfirmModal(props) {
  const { header, desc, ok, cancel, onOk, onCancel } = props
  return (
    <article className={styles.mask}>
      <article className={styles.container}>
        <section className={styles.content}>
          <header className={styles.header} dangerouslySetInnerHTML={{ __html: header }} />
          {desc && <p className={styles.desc} dangerouslySetInnerHTML={{ __html: desc }} />}
        </section>
        {(onOk || onCancel) && <footer className={`${styles.footer} border-t-1px`}>
          {onCancel &&
            <a
              className={styles.btn}
              onClick={onCancel}
            >{cancel || '取消'}</a>
          }
          {onOk &&
            <a
              className={`${styles.btn} ${styles.ok}`}
              onClick={onOk}
            >{ok || '确定'}</a>
          }
        </footer>}
      </article>
    </article>
  )
}

ConfirmModal.propTypes = {
  header: PropTypes.string, // 弹窗上的文字
  desc: PropTypes.string, // 弹窗上补充性的小字
  ok: PropTypes.string, // ok 按钮上的文字
  cancel: PropTypes.string, // cancel 按钮上的文字
  onCancel: PropTypes.func, // ok 回调方法
  onOk: PropTypes.func, // cancel 回调方法
}

ConfirmModal.defaultProps = {
  header: '',
  desc: '',
  ok: '',
  cancel: '',
  onCancel: null,
  onOk: null,
}

const container = document.createElement('div')

const Modal = {
  show: (options) => {
    if (!document.body.contains(container)) {
      document.body.appendChild(container)
    }

    ReactDOM.render(<ConfirmModal {...options} />, container)
  },
  hide: () => {
    ReactDOM.unmountComponentAtNode(container)
    document.body.removeChild(container)
  },
}

export default Modal
