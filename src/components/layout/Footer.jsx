import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

function Footer() {
  const { isAuthenticated } = useAuth()
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-about">
          <Link className="brand brand--footer" to="/">
            <span className="brand-mark" aria-hidden="true">ل</span>
            <span className="brand-copy">Learnova<small>تعلّم بلا حدود</small></span>
          </Link>
          <p className="footer-description">
            مساحة تعليمية عربية تساعدك على بناء مهارات عملية والتقدّم بثقة.
          </p>
        </div>

        <div className="footer-nav-group">
          <h2>استكشف</h2>
          <nav className="footer-links" aria-label="روابط الاستكشاف">
            <Link to="/courses">جميع الدورات</Link>
            <Link to="/#categories">المجالات التعليمية</Link>
            <Link to="/#why-learnova">لماذا Learnova؟</Link>
          </nav>
        </div>

        <div className="footer-nav-group">
          <h2>حسابك</h2>
          <nav className="footer-links" aria-label="روابط الحساب">
            <Link to="/my-courses">دوراتي</Link>
            <Link to="/profile">الملف الشخصي</Link>
            {isAuthenticated
              ? <Link to="/courses">اكتشف دورة جديدة</Link>
              : <Link to="/login">تسجيل الدخول</Link>}
          </nav>
        </div>

        <div className="footer-promise">
          <span>محتوى عربي متقن</span>
          <strong>مهارات عملية لمستقبل أكثر اتساعًا.</strong>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Learnova. جميع الحقوق محفوظة.</p>
        <p>صُمّمت لتجعل التعلّم العربي تجربة تستحق وقتك.</p>
      </div>
    </footer>
  )
}

export default Footer
