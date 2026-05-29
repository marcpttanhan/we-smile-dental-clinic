// Chrome — Navbar, Footer, Section, shared primitives
const { useState, useEffect, useRef } = React;

const NAV_LINKS = [
  { id: 'home', label: 'Home', th: 'หน้าแรก' },
  { id: 'services', label: 'Services', th: 'บริการ' },
  { id: 'doctors', label: 'Doctors', th: 'ทีมแพทย์' },
  { id: 'branches', label: 'Branches', th: 'สาขา' },
  { id: 'about', label: 'About', th: 'เกี่ยวกับเรา' },
  { id: 'booking', label: 'Booking', th: 'นัดหมาย' },
  { id: 'contact', label: 'Contact', th: 'ติดต่อ' },
];

function Navbar({ active, onNav, lang }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 50,
      padding: '14px 24px',
      background: scrolled ? 'rgba(251,250,247,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--ws-line)' : '1px solid transparent',
      transition: 'all var(--ws-dur-base) var(--ws-ease)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', height: 64,
        display: 'flex', alignItems: 'center', gap: 24,
      }}>
        {/* Logo */}
        <button onClick={() => onNav('home')} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: 'transparent', border: 0, cursor: 'pointer', padding: 0,
        }}>
          <img src="assets/logo.png" alt="" style={{ width: 44, height: 44, objectFit: 'contain' }} />
          <div style={{ textAlign: 'left', lineHeight: 1 }}>
            <div style={{ font: '800 16px/1 var(--ws-font-sans)', color: 'var(--ws-navy-800)', letterSpacing: '-0.01em' }}>
              We Smile
            </div>
            <div style={{ font: '500 11px/1 var(--ws-font-sans)', color: 'var(--ws-fg-3)', marginTop: 4, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Dental · Ladkrabang
            </div>
          </div>
        </button>

        {/* Links */}
        <div className="hide-md" style={{ display: 'flex', gap: 2, marginLeft: 24 }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => onNav(l.id)}
              style={{
                background: active === l.id ? 'var(--ws-orange-50)' : 'transparent',
                color: active === l.id ? 'var(--ws-orange-700)' : 'var(--ws-fg-2)',
                border: 0, padding: '10px 12px', borderRadius: 999,
                font: '600 13.5px/1 var(--ws-font-sans)', cursor: 'pointer',
                transition: 'all var(--ws-dur-fast) var(--ws-ease)',
                whiteSpace: 'nowrap',
              }}>
              {lang === 'th' ? l.th : l.label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Phone */}
        <a href="tel:0638798448" className="hide-md hide-lg" style={{
          font: '600 13.5px/1 var(--ws-font-sans)', color: 'var(--ws-fg-1)',
          textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
          whiteSpace: 'nowrap',
        }}>
          <i data-lucide="phone" style={{ width: 16, height: 16, color: 'var(--ws-primary)' }}></i>
          063-879-8448
        </a>

        {/* CTA */}
        <button onClick={() => onNav('booking')} className="btn btn-pill">
          <i data-lucide="calendar-check" style={{ width: 14, height: 14 }}></i>
          {lang === 'th' ? 'นัดหมาย' : 'Book Visit'}
        </button>
      </div>
    </div>
  );
}

function Footer({ onNav, lang }) {
  return (
    <footer style={{
      background: 'var(--ws-navy-900)', color: '#fff',
      padding: '80px 32px 32px', marginTop: 0,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 56,
        }} className="grid-4-md-2">
          {/* Brand col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
              <div style={{ background: '#fff', borderRadius: 14, padding: 6 }}>
                <img src="assets/logo.png" style={{ width: 44, height: 44, objectFit: 'contain' }} alt="" />
              </div>
              <div>
                <div style={{ font: '800 18px/1 var(--ws-font-sans)' }}>We Smile Dental</div>
                <div style={{ font: '500 12px/1 var(--ws-font-sans)', color: 'rgba(255,255,255,.55)', marginTop: 5, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Ladkrabang Branch</div>
              </div>
            </div>
            <p style={{ font: '500 14px/1.7 var(--ws-font-sans)', color: 'rgba(255,255,255,.7)', maxWidth: 320, margin: '0 0 24px' }}>
              {lang === 'th'
                ? 'คลินิกทันตกรรมครบวงจร ใจกลางลาดกระบัง — จัดฟัน รากฟันเทียม วีเนียร์ ภายใต้ทีมหมอเฉพาะทาง'
                : 'Comprehensive dental care in Ladkrabang — orthodontics, implants, veneers, and routine care under one roof.'}
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { k: 'line', h: '#06C755', svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg> },
                { k: 'facebook', h: '#1877F2', svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073"/></svg> },
                { k: 'instagram', h: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
                { k: 'tiktok', h: '#000', svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/></svg> },
              ].map(s => (
                <button key={s.k} aria-label={s.k} style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.14)',
                  color: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer',
                  transition: 'all var(--ws-dur-fast) var(--ws-ease)',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = s.h; e.currentTarget.style.borderColor = 'transparent'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.14)'; }}>
                  {s.svg}
                </button>
              ))}
            </div>
          </div>

          <FooterCol title={lang === 'th' ? 'บริการ' : 'Services'} items={[
            'Orthodontics · จัดฟัน',
            'Clear Aligners · จัดฟันแบบใส',
            'Veneers · วีเนียร์',
            'Implants · รากฟันเทียม',
            'Whitening · ฟอกสีฟัน',
            'Check-ups · ตรวจฟัน',
          ]} onClick={() => onNav('services')} />

          <FooterCol title={lang === 'th' ? 'เยี่ยมเรา' : 'Visit'} items={[
            'Ladkrabang, Bangkok',
            '09:00 — 20:00 daily',
            '063-879-8448',
            'LINE: @wesmiledc1',
          ]} />

          <FooterCol title={lang === 'th' ? 'ลิงก์' : 'Quick Links'} items={[
            { label: lang === 'th' ? 'เกี่ยวกับเรา' : 'About', click: () => onNav('about') },
            { label: lang === 'th' ? 'ทีมแพทย์' : 'Doctors', click: () => onNav('doctors') },
            { label: lang === 'th' ? 'สาขา' : 'Branches', click: () => onNav('branches') },
            { label: lang === 'th' ? 'นัดหมาย' : 'Booking', click: () => onNav('booking') },
            { label: lang === 'th' ? 'ติดต่อ' : 'Contact', click: () => onNav('contact') },
          ]} />
        </div>

        {/* Big wordmark */}
        <div style={{
          marginTop: 80, paddingTop: 48,
          borderTop: '1px solid rgba(255,255,255,.1)',
          font: '500 clamp(48px, 12vw, 180px)/0.9 var(--ws-font-display)',
          letterSpacing: '-0.04em',
          color: '#fff',
          opacity: 0.95,
        }}>
          We&nbsp;Smile.
        </div>

        <div style={{
          marginTop: 32, paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,.1)',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
          font: '500 12px/1.4 var(--ws-font-sans)', color: 'rgba(255,255,255,.5)',
        }}>
          <span>© 2026 We Smile Dental Clinic. All rights reserved.</span>
          <span>Privacy · Terms · Cookies</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items, onClick }) {
  return (
    <div>
      <div style={{ font: '700 12px/1 var(--ws-font-sans)', color: '#fff', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 22 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((i, idx) => {
          const label = typeof i === 'string' ? i : i.label;
          const click = typeof i === 'string' ? onClick : i.click;
          return (
            <a key={idx} onClick={click} style={{
              font: '500 14px/1 var(--ws-font-sans)', color: 'rgba(255,255,255,.7)',
              textDecoration: 'none', cursor: click ? 'pointer' : 'default',
              transition: 'color var(--ws-dur-fast) var(--ws-ease)',
            }}
              onMouseEnter={(e) => { if (click) e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,.7)'; }}
            >{label}</a>
          );
        })}
      </div>
    </div>
  );
}

function SectionHead({ num, eyebrow, title, lead, total = 6, align = 'split' }) {
  if (align === 'stacked') {
    return (
      <div className="section-head-stacked">
        {(num != null) && (
          <div className="ws-num" style={{ marginBottom: 16 }}>
            {String(num).padStart(2, '0')} / {String(total).padStart(2, '0')} — {eyebrow}
          </div>
        )}
        {!num && eyebrow && <div className="ws-eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</div>}
        <h2 className="ws-h2" style={{ margin: 0, maxWidth: 880 }}>{title}</h2>
        {lead && <p className="ws-lead" style={{ marginTop: 18, maxWidth: 720 }}>{lead}</p>}
      </div>
    );
  }
  return (
    <div className="section-head">
      <div>
        {(num != null) && (
          <div className="ws-num">
            {String(num).padStart(2, '0')} / {String(total).padStart(2, '0')} — {eyebrow}
          </div>
        )}
        {!num && eyebrow && <div className="ws-eyebrow">{eyebrow}</div>}
      </div>
      <div>
        <h2 className="ws-h2" style={{ margin: 0 }}>{title}</h2>
        {lead && <p className="ws-lead" style={{ marginTop: 18, maxWidth: 720 }}>{lead}</p>}
      </div>
    </div>
  );
}

function Stat({ n, label }) {
  return (
    <div>
      <div className="stat-num">{n}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function LineBubble() {
  return (
    <a href="#contact" className="line-bubble" title="Chat on LINE" aria-label="Chat on LINE">
      <i data-lucide="message-circle" style={{ width: 24, height: 24 }}></i>
    </a>
  );
}

// Reactive hook — returns true whenever viewport width ≤ bp (default 640px).
// Works across all JSX files because it's exported to window.
function useIsMobile(bp = 640) {
  const [is, setIs] = useState(() => window.innerWidth <= bp);
  useEffect(() => {
    const h = () => setIs(window.innerWidth <= bp);
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, [bp]);
  return is;
}

Object.assign(window, { Navbar, Footer, SectionHead, Stat, LineBubble, NAV_LINKS, useIsMobile });
