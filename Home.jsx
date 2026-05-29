// Home page — hero + service preview + doctors preview + testimonials + FAQ + CTA

function Hero({ onNav, lang, photoFilter }) {
  const isThai = lang === 'th';
  const isMobile = useIsMobile();      // true when viewport ≤ 640 px
  const isTablet = useIsMobile(900);   // true when viewport ≤ 900 px

  return (
    <section style={{
      padding: isMobile ? '20px 16px 40px' : '32px 32px 64px',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isTablet ? '1fr' : '1.05fr 1fr',
        gap: isMobile ? 24 : 64,
        alignItems: 'center',
      }}>
        <div className="page-enter">
          <div className="ws-eyebrow rise rise-1" style={{ marginBottom: 22 }}>
            {isThai ? 'คลินิกทันตกรรมครบวงจร · สาขาลาดกระบัง' : 'Premium Dental Care · Ladkrabang Branch'}
          </div>
          <h1 className="ws-h1 rise rise-2" style={{ margin: '0 0 24px', fontSize: isMobile ? 'clamp(34px, 9vw, 46px)' : 'clamp(40px, 5.4vw, 76px)' }}>
            {isThai ? (
              <>รอยยิ้มของคุณ<br/>คือ<span className="accent-fg" style={{ fontStyle: 'italic' }}> ความสุข</span> ของเรา</>
            ) : (
              <>Your smile, <span className="accent-fg" style={{ fontStyle: 'italic' }}>beautifully</span><br/>cared for.</>
            )}
          </h1>
          <p className="ws-lead rise rise-3" style={{ margin: '0 0 28px', maxWidth: 520, fontSize: isMobile ? 15 : undefined }}>
            {isThai
              ? 'ทันตกรรมครบวงจรในที่เดียว — จัดฟัน จัดฟันแบบใส รากฟันเทียม วีเนียร์ ดูแลโดยทีมหมอเฉพาะทาง'
              : 'Comprehensive dental care under one roof — orthodontics, clear aligners, implants, and veneers. Calm, modern, and led by specialists.'}
          </p>
          <div className="rise rise-4" style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => onNav('booking')} className="btn btn-primary" style={{ padding: isMobile ? '14px 20px' : '18px 28px', fontSize: isMobile ? 14 : 16 }}>
              <i data-lucide="calendar-check" style={{ width: 16, height: 16 }}></i>
              {isThai ? 'นัดหมายตรวจฟัน' : 'Book Appointment'}
            </button>
            <a href="tel:0638798448" className="btn btn-ghost" style={{ padding: isMobile ? '13px 18px' : '17px 26px', fontSize: isMobile ? 14 : 16, textDecoration: 'none' }}>
              <i data-lucide="phone" style={{ width: 16, height: 16 }}></i>
              063-879-8448
            </a>
          </div>
          <div className="rise rise-4" style={{ display: 'flex', gap: isMobile ? 24 : 56, marginTop: isMobile ? 32 : 64, paddingTop: isMobile ? 20 : 32, borderTop: '1px solid var(--ws-line)' }}>
            <Stat n="12+" label={isThai ? 'ปีที่ดูแล' : 'Years caring'} />
            <Stat n="8,400" label={isThai ? 'รอยยิ้ม' : 'Smiles given'} />
            <Stat n="4.9★" label={isThai ? 'คะแนนกูเกิล' : 'Google rating'} />
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div className={photoFilter} style={{
            borderRadius: isMobile ? 20 : 32,
            overflow: 'hidden',
            boxShadow: 'var(--ws-shadow-xl)',
            aspectRatio: isMobile ? '4/3' : '4/5',
            maxHeight: isMobile ? 280 : 'none',
            backgroundImage: 'url(assets/hero.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
          {!isMobile && (
            <>
              <FloatingBadge top={32} right={-24} icon="shield-check"
                title={isThai ? 'ทันตแพทย์เฉพาะทาง' : 'Specialists'}
                sub={isThai ? 'รับรองโดยสมาคม' : 'Board-certified'} />
              <FloatingBadge bottom={56} left={-32} icon="message-circle"
                title="LINE @wesmiledc1"
                sub={isThai ? 'ตอบภายใน 1 ชม.' : 'Reply within 1h'} />
              <FloatingBadge bottom={-12} right={36} icon="sparkles"
                title="From ฿ 35,000"
                sub={isThai ? 'จัดฟันแบบใส' : 'Clear aligners'} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function FloatingBadge({ top, bottom, left, right, icon, title, sub, className }) {
  return (
    <div className={className || ''} style={{
      position: 'absolute',
      top: top ?? 'auto', bottom: bottom ?? 'auto',
      left: left ?? 'auto', right: right ?? 'auto',
      background: '#fff', padding: '14px 18px', borderRadius: 18,
      boxShadow: 'var(--ws-shadow-lg)',
      display: 'flex', alignItems: 'center', gap: 12, minWidth: 200,
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 12,
        background: 'var(--ws-orange-100)', color: 'var(--ws-primary)',
        display: 'grid', placeItems: 'center', flex: 'none',
      }}>
        <i data-lucide={icon} style={{ width: 20, height: 20 }}></i>
      </div>
      <div>
        <div style={{ font: '700 14px/1.2 var(--ws-font-sans)', color: 'var(--ws-fg-1)' }}>{title}</div>
        <div style={{ font: '500 12px/1.2 var(--ws-font-sans)', color: 'var(--ws-fg-3)', marginTop: 3 }}>{sub}</div>
      </div>
    </div>
  );
}

function ServicesPreview({ onNav, lang }) {
  const isThai = lang === 'th';
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(900);
  const features = SERVICES.filter(s => s.feature);
  const others = SERVICES.filter(s => !s.feature);
  const cols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)';
  return (
    <section className="ws-section" style={{ background: 'transparent' }}>
      <div className="container">
        <SectionHead num={1} align="stacked"
          eyebrow={isThai ? WHAT_WE_DO.eyebrowTh : WHAT_WE_DO.eyebrow}
          title={isThai ? WHAT_WE_DO.titleTh : WHAT_WE_DO.title} />
        <p style={{
          font: `500 ${isMobile ? '17px' : 'clamp(16px, 2.2vw, 22px)'}/1.65 var(--ws-font-display)`,
          color: 'var(--ws-fg-2)',
          letterSpacing: '-0.01em',
          margin: isMobile ? '0 0 32px' : '-24px 0 48px',
          maxWidth: 680,
          borderLeft: '3px solid var(--ws-primary)',
          paddingLeft: isMobile ? 14 : 20,
        }}>
          {isThai
            ? 'บริการของเรา ปลอดภัย สะอาด ถูกหลัก โดยทันตแพทย์เฉพาะทาง'
            : WHAT_WE_DO.lead}
        </p>

        {/* Feature row: 3 large tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: isMobile ? 14 : 20, marginBottom: isMobile ? 14 : 20 }}>
          {features.map((s) => (
            <ServiceCard key={s.id} s={s} lang={lang} large onClick={() => onNav(`service:${s.id}`)} />
          ))}
        </div>
        {/* Three smaller tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: isMobile ? 14 : 20 }}>
          {others.map((s) => (
            <ServiceCard key={s.id} s={s} lang={lang} onClick={() => onNav(`service:${s.id}`)} />
          ))}
        </div>

        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => onNav('services')} className="btn btn-ghost">
            {isThai ? 'ดูบริการทั้งหมด' : 'View all services'}
            <i data-lucide="arrow-right" style={{ width: 16, height: 16 }}></i>
          </button>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s, lang, large, onClick }) {
  const isThai = lang === 'th';
  return (
    <div className="service-tile" onClick={onClick} style={{ padding: large ? 36 : 28, minHeight: large ? 280 : 220 }}>
      <div className="service-icon" style={{ width: large ? 64 : 52, height: large ? 64 : 52 }}>
        <i data-lucide={s.icon} style={{ width: large ? 28 : 24, height: large ? 28 : 24 }}></i>
      </div>
      <div>
        <div style={{ font: '700 19px/1.2 var(--ws-font-sans)', color: 'var(--ws-fg-1)' }}>
          {isThai ? s.titleTh : s.title}
        </div>
        <div style={{ font: '500 13px/1 var(--ws-font-sans)', color: 'var(--ws-fg-4)', marginTop: 6 }}>
          {isThai ? s.title : s.titleTh}
        </div>
      </div>
      <div style={{ font: '500 14px/1.6 var(--ws-font-sans)', color: 'var(--ws-fg-3)', flex: 1 }}>
        {isThai ? s.blurbTh : s.blurb}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 14, borderTop: '1px dashed var(--ws-line)' }}>
        <span style={{ font: '600 14px/1 var(--ws-font-sans)', color: 'var(--ws-primary)' }}>{s.priceLabel}</span>
        <span className="service-arrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <i data-lucide="arrow-right" style={{ width: 16, height: 16 }}></i>
        </span>
      </div>
    </div>
  );
}

function DoctorsPreview({ onNav, lang, photoFilter }) {
  const isThai = lang === 'th';
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(900);
  const cols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)';
  return (
    <section className="ws-section accent-bg" style={{ background: 'var(--ws-navy-50)' }}>
      <div className="container">
        <SectionHead num={2} eyebrow={isThai ? 'ทีมแพทย์' : 'Meet the team'}
          title={isThai ? 'หมอเฉพาะทาง ที่คุณจะจำได้ชื่อ' : 'Specialists you\'ll see by name.'}
          lead={isThai ? 'ทีมหมอทุกคนได้รับการรับรอง และอบรมเฉพาะทาง คุณจะพบหมอคนเดิมในทุกครั้งที่มา' : 'Every doctor at We Smile is board-certified and specialty-trained. You\'ll see the same face at every visit.'} />

        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: isMobile ? 14 : 20 }}>
          {DOCTORS.map((d, i) => (
            <DoctorCardSmall key={d.name} d={d} i={i} lang={lang} photoFilter={photoFilter}
              onClick={() => onNav(`doctor:${d.id}`)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DoctorCardSmall({ d, i, lang, photoFilter, onClick }) {
  const isThai = lang === 'th';
  return (
    <div onClick={onClick} className="card-hover" style={{
      background: '#fff', borderRadius: 24, padding: 18,
      border: '1px solid var(--ws-line)', boxShadow: 'var(--ws-shadow-sm)',
      cursor: 'pointer',
    }}>
      <div className={`doctor-photo ${photoFilter}`} style={{
        backgroundImage: d.photo ? `url(${d.photo})` : undefined,
        backgroundSize: d.photo ? 'cover' : undefined,
        backgroundPosition: d.photo ? 'center top' : `${20 + i * 22}% 35%`,
        marginBottom: 16,
      }} />
      <div style={{ font: '500 12px/1 var(--ws-font-sans)', color: 'var(--ws-primary)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 8 }}>
        {isThai ? d.roleTh : d.role}
      </div>
      <div style={{ font: '700 17px/1.3 var(--ws-font-sans)', color: 'var(--ws-fg-1)' }}>
        {isThai ? d.nameTh : d.name}
      </div>
      <div style={{ font: '500 13px/1.4 var(--ws-font-sans)', color: 'var(--ws-fg-3)', marginTop: 4 }}>
        {isThai ? d.name : d.nameTh}
      </div>
      <div style={{ font: '500 12px/1.4 var(--ws-font-sans)', color: 'var(--ws-fg-4)', marginTop: 10, paddingTop: 12, borderTop: '1px dashed var(--ws-line)' }}>
        {d.cred}
      </div>
    </div>
  );
}

function Testimonials({ lang }) {
  const isThai = lang === 'th';
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(900);
  const cols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)';
  return (
    <section className="ws-section dot-grid-bg">
      <div className="container">
        <SectionHead num={3} align="stacked" eyebrow={isThai ? 'เสียงจากคนไข้' : 'Patient stories'}
          title={isThai ? 'สิ่งที่คนไข้ของเราพูดถึงเรา' : 'What our patients are saying.'} />
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: isMobile ? 14 : 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`card-hover testimonial-card${i === 1 ? ' testimonial-card-accent' : ''}`} style={{
              background: '#fff', borderRadius: 20,
              padding: isMobile ? '22px 18px' : 28,
              border: '1px solid var(--ws-line)', boxShadow: 'var(--ws-shadow-sm)',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <div style={{ display: 'flex', gap: 3, color: 'var(--ws-primary)' }}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <i key={j} data-lucide="star" style={{ width: 16, height: 16, fill: 'currentColor' }}></i>
                ))}
              </div>
              <p style={{
                margin: 0,
                font: `500 ${isMobile ? '15px' : '16px'}/1.7 var(--ws-font-display)`,
                color: i === 1 ? 'rgba(255,255,255,0.9)' : 'var(--ws-fg-2)',
                textWrap: 'pretty', flex: 1,
                fontStyle: 'italic',
              }}>"{isThai ? t.qTh ?? t.q : t.q}"</p>
              <div style={{
                font: '600 12px/1 var(--ws-font-sans)',
                color: i === 1 ? 'rgba(255,255,255,0.7)' : 'var(--ws-fg-1)',
                paddingTop: 12, borderTop: `1px solid ${i === 1 ? 'rgba(255,255,255,0.15)' : 'var(--ws-line)'}`,
              }}>{t.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQPreview({ onNav, lang }) {
  const [openIdx, setOpenIdx] = useState(0);
  const isThai = lang === 'th';
  const items = FAQS.slice(0, 4);
  return (
    <section className="ws-section" style={{ background: 'var(--ws-orange-50)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1fr', gap: 64 }} className="grid-2-md-1">
          <div>
            <div className="ws-num" style={{ marginBottom: 16 }}>
              04 / 06 — {isThai ? 'คำถามที่พบบ่อย' : 'FAQs'}
            </div>
            <h2 className="ws-h2" style={{ margin: 0 }}>
              {isThai ? 'คำถามที่ได้รับบ่อย' : 'Frequently asked questions.'}
            </h2>
            <p className="ws-lead" style={{ marginTop: 18, maxWidth: 360 }}>
              {isThai ? 'อะไรที่คนไข้อยากรู้ก่อนนัดหมาย — เราตอบให้ตรงไปตรงมา' : 'The things patients ask before they book — answered straight, no fluff.'}
            </p>
            <button onClick={() => onNav('contact')} className="btn btn-ghost" style={{ marginTop: 32 }}>
              {isThai ? 'ถามเพิ่มเติม' : 'Ask another question'}
              <i data-lucide="arrow-right" style={{ width: 16, height: 16 }}></i>
            </button>
          </div>
          <div>
            {items.map((f, i) => (
              <div key={i} className={`faq-item ${openIdx === i ? 'open' : ''}`}>
                <button className="faq-q" onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
                  <span>{isThai ? f.qTh : f.q}</span>
                  <span className="faq-icon">
                    <i data-lucide="plus" style={{ width: 16, height: 16 }}></i>
                  </span>
                </button>
                {openIdx === i && (
                  <div className="faq-a">{isThai ? f.aTh : f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTABand({ onNav, lang }) {
  const isThai = lang === 'th';
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? '0 16px 64px' : '0 32px 96px' }}>
      <div className="container">
        <div style={{
          borderRadius: isMobile ? 24 : 40,
          background: 'linear-gradient(135deg, var(--ws-navy-900), var(--ws-navy-800))',
          color: '#fff',
          padding: isMobile ? '40px 24px' : '80px 64px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr',
          alignItems: 'center',
          gap: isMobile ? 28 : 56,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Glowing blob */}
          <div style={{
            position: 'absolute', right: -100, top: -100,
            width: 380, height: 380, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(242,107,31,0.30), transparent 70%)',
            filter: 'blur(20px)',
          }} />
          {/* Soft tooth motif */}
          <div style={{
            position: 'absolute', left: -40, bottom: -60,
            width: 200, height: 200, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }} />

          <div style={{ position: 'relative' }}>
            <div className="ws-eyebrow" style={{ color: 'var(--ws-orange-300)', marginBottom: 14 }}>
              {isThai ? 'เริ่มเมื่อไหร่ก็ได้' : 'Ready when you are'}
            </div>
            <h2 style={{
              font: `500 ${isMobile ? 'clamp(26px, 7vw, 36px)' : 'clamp(32px, 4.4vw, 56px)'}/1.05 var(--ws-font-display)`,
              margin: 0, letterSpacing: '-.02em',
            }}>
              {isThai ? <>ปรึกษาฟรี 15 นาที<br/>ไม่มีข้อผูกมัด</> : <>Free 15-minute consult.<br/><em>No obligation.</em></>}
            </h2>
            <p style={{ font: `500 ${isMobile ? '14px' : '17px'}/1.7 var(--ws-font-sans)`, color: 'rgba(255,255,255,.75)', margin: `${isMobile ? 16 : 24}px 0 0`, maxWidth: 480 }}>
              {isThai ? 'บอกเป้าหมายรอยยิ้มของคุณ — เราจะอธิบายตัวเลือกทุกแบบ พร้อมราคา' : 'Tell us about your smile goals. We\'ll walk through every option, costs included.'}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
            <button onClick={() => onNav('booking')} className="btn btn-primary" style={{ padding: `${isMobile ? 14 : 18}px 24px`, fontSize: isMobile ? 14 : 15 }}>
              <i data-lucide="calendar-check" style={{ width: 17, height: 17 }}></i>
              {isThai ? 'นัดหมายเลย' : 'Book Appointment'}
            </button>
            <button className="btn btn-line" style={{ padding: `${isMobile ? 13 : 17}px 24px`, fontSize: isMobile ? 14 : 15, borderRadius: 14 }}>
              <i data-lucide="message-circle" style={{ width: 17, height: 17 }}></i>
              {isThai ? 'แชต LINE @wesmiledc1' : 'Chat on LINE @wesmiledc1'}
            </button>
            <a href="tel:0638798448" className="btn" style={{
              padding: `${isMobile ? 13 : 17}px 24px`, fontSize: isMobile ? 14 : 15, borderRadius: 14,
              background: 'rgba(255,255,255,.08)', color: '#fff',
              border: '1px solid rgba(255,255,255,.2)', textDecoration: 'none',
            }}>
              <i data-lucide="phone" style={{ width: 17, height: 17 }}></i>
              063-879-8448
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeScreen({ onNav, lang, photoFilter }) {
  return (
    <div data-screen-label="01 Home">
      <Hero onNav={onNav} lang={lang} photoFilter={photoFilter} />
      <ServicesPreview onNav={onNav} lang={lang} />
      <DoctorsPreview onNav={onNav} lang={lang} photoFilter={photoFilter} />
      <SuccessStoriesSection
        lang={lang}
        stories={SUCCESS_STORIES}
        eyebrow={lang === 'th' ? 'เรื่องราวคนไข้' : 'Patient success stories'}
        num={4}
        title={lang === 'th'
          ? <>ผลงานที่ <em className="accent-fg">พูดแทนเรา</em></>
          : <>Results that <em className="accent-fg">speak for themselves</em>.</>}
      />
      <Testimonials lang={lang} />
      <FAQPreview onNav={onNav} lang={lang} />
      <CTABand onNav={onNav} lang={lang} />
    </div>
  );
}

Object.assign(window, { HomeScreen, Hero, ServiceCard, FloatingBadge });
