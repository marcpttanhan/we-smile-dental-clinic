// Home page — hero + service preview + doctors preview + testimonials + FAQ + CTA

function Hero({ onNav, lang, photoFilter }) {
  const isThai = lang === 'th';
  return (
    <section style={{ padding: '32px 32px 64px', position: 'relative' }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 64, alignItems: 'center',
      }} className="grid-2-md-1">
        <div className="page-enter">
          <div className="ws-eyebrow rise rise-1" style={{ marginBottom: 22 }}>
            {isThai ? 'คลินิกทันตกรรมครบวงจร · สาขาลาดกระบัง' : 'Premium Dental Care · Ladkrabang Branch'}
          </div>
          <h1 className="ws-h1 rise rise-2" style={{ margin: '0 0 24px', fontSize: 'clamp(40px, 5.4vw, 76px)' }}>
            {isThai ? (
              <>รอยยิ้มของคุณ<br/>คือ<span className="accent-fg" style={{ fontStyle: 'italic' }}> ความสุข</span> ของเรา</>
            ) : (
              <>Your smile, <span className="accent-fg" style={{ fontStyle: 'italic' }}>beautifully</span><br/>cared for.</>
            )}
          </h1>
          <p className="ws-lead rise rise-3" style={{ margin: '0 0 36px', maxWidth: 520 }}>
            {isThai
              ? 'ทันตกรรมครบวงจรในที่เดียว — จัดฟัน จัดฟันแบบใส รากฟันเทียม วีเนียร์ ดูแลโดยทีมหมอเฉพาะทาง'
              : 'Comprehensive dental care under one roof — orthodontics, clear aligners, implants, and veneers. Calm, modern, and led by specialists.'}
          </p>
          <div className="rise rise-4" style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => onNav('booking')} className="btn btn-primary" style={{ padding: '18px 28px', fontSize: 16 }}>
              <i data-lucide="calendar-check" style={{ width: 18, height: 18 }}></i>
              {isThai ? 'นัดหมายตรวจฟัน' : 'Book Appointment'}
            </button>
            <a href="tel:0638798448" className="btn btn-ghost" style={{ padding: '17px 26px', fontSize: 16, textDecoration: 'none' }}>
              <i data-lucide="phone" style={{ width: 18, height: 18 }}></i>
              063-879-8448
            </a>
          </div>
          <div className="rise rise-4" style={{ display: 'flex', gap: 56, marginTop: 64, paddingTop: 32, borderTop: '1px solid var(--ws-line)' }}>
            <Stat n="12+" label={isThai ? 'ปีที่ดูแล' : 'Years caring'} />
            <Stat n="8,400" label={isThai ? 'รอยยิ้ม' : 'Smiles given'} />
            <Stat n="4.9★" label={isThai ? 'คะแนนกูเกิล' : 'Google rating'} />
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div className={photoFilter} style={{
            borderRadius: 32, overflow: 'hidden', boxShadow: 'var(--ws-shadow-xl)',
            aspectRatio: '4/5', backgroundImage: 'url(assets/hero.webp)',
            backgroundSize: 'cover', backgroundPosition: 'center',
          }} />
          <FloatingBadge top={32} right={-24} icon="shield-check"
            title={isThai ? 'ทันตแพทย์เฉพาะทาง' : 'Specialists'}
            sub={isThai ? 'รับรองโดยสมาคม' : 'Board-certified'} />
          <FloatingBadge bottom={56} left={-32} icon="message-circle"
            title="LINE @wesmiledc1"
            sub={isThai ? 'ตอบภายใน 1 ชม.' : 'Reply within 1h'} />
          <FloatingBadge bottom={-12} right={36} icon="sparkles"
            title="From ฿ 35,000"
            sub={isThai ? 'จัดฟันแบบใส' : 'Clear aligners'} />
        </div>
      </div>
    </section>
  );
}

function FloatingBadge({ top, bottom, left, right, icon, title, sub }) {
  return (
    <div style={{
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
  const features = SERVICES.filter(s => s.feature);
  const others = SERVICES.filter(s => !s.feature);
  return (
    <section className="ws-section" style={{ background: 'transparent' }}>
      <div className="container">
        <SectionHead num={1}
          eyebrow={isThai ? WHAT_WE_DO.eyebrowTh : WHAT_WE_DO.eyebrow}
          title={isThai ? WHAT_WE_DO.titleTh : WHAT_WE_DO.title}
          lead={isThai ? WHAT_WE_DO.leadTh : WHAT_WE_DO.lead} />

        {/* Feature row: 3 large tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 20 }} className="grid-3-md-1">
          {features.map((s) => (
            <ServiceCard key={s.id} s={s} lang={lang} large onClick={() => onNav(`service:${s.id}`)} />
          ))}
        </div>
        {/* Three smaller tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="grid-3-md-1">
          {others.map((s) => (
            <ServiceCard key={s.id} s={s} lang={lang} onClick={() => onNav(`service:${s.id}`)} />
          ))}
        </div>

        <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center' }}>
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
  return (
    <section className="ws-section accent-bg" style={{ background: 'var(--ws-navy-50)' }}>
      <div className="container">
        <SectionHead num={2} eyebrow={isThai ? 'ทีมแพทย์' : 'Meet the team'}
          title={isThai ? 'หมอเฉพาะทาง ที่คุณจะจำได้ชื่อ' : 'Specialists you\'ll see by name.'}
          lead={isThai ? 'ทีมหมอทุกคนได้รับการรับรอง และอบรมเฉพาะทาง คุณจะพบหมอคนเดิมในทุกครั้งที่มา' : 'Every doctor at We Smile is board-certified and specialty-trained. You\'ll see the same face at every visit.'} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="grid-4-md-2">
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
  return (
    <section className="ws-section">
      <div className="container">
        <SectionHead num={3} eyebrow={isThai ? 'เสียงจากคนไข้' : 'Patient stories'}
          title={isThai ? 'สิ่งที่คนไข้ของเราพูดถึงเรา' : 'What our patients are saying.'} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="grid-3-md-1">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="card-hover" style={{
              background: '#fff', borderRadius: 24, padding: 32,
              border: '1px solid var(--ws-line)', boxShadow: 'var(--ws-shadow-sm)',
              display: 'flex', flexDirection: 'column', gap: 18,
            }}>
              <div style={{ display: 'flex', gap: 3, color: 'var(--ws-primary)' }}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <i key={j} data-lucide="star" style={{ width: 18, height: 18, fill: 'currentColor' }}></i>
                ))}
              </div>
              <p style={{
                margin: 0,
                font: `500 ${i === 1 ? '17px' : '17px'}/1.6 var(--ws-font-display)`,
                color: 'var(--ws-fg-2)', textWrap: 'pretty', flex: 1,
                fontStyle: 'italic',
              }}>"{t.q}"</p>
              <div style={{ font: '600 13px/1 var(--ws-font-sans)', color: 'var(--ws-fg-1)' }}>{t.a}</div>
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
  return (
    <section style={{ padding: '0 32px 96px' }}>
      <div className="container">
        <div style={{
          borderRadius: 40,
          background: 'linear-gradient(135deg, var(--ws-navy-900), var(--ws-navy-800))',
          color: '#fff', padding: '80px 64px',
          display: 'grid', gridTemplateColumns: '1.3fr 1fr', alignItems: 'center', gap: 56,
          position: 'relative', overflow: 'hidden',
        }} className="grid-2-md-1">
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
            <div className="ws-eyebrow" style={{ color: 'var(--ws-orange-300)', marginBottom: 16 }}>
              {isThai ? 'เริ่มเมื่อไหร่ก็ได้' : 'Ready when you are'}
            </div>
            <h2 style={{
              font: '500 clamp(32px, 4.4vw, 56px)/1.05 var(--ws-font-display)',
              margin: 0, letterSpacing: '-.02em',
            }}>
              {isThai ? <>ปรึกษาฟรี 15 นาที<br/>ไม่มีข้อผูกมัด</> : <>Free 15-minute consult.<br/><em>No obligation.</em></>}
            </h2>
            <p style={{ font: '500 17px/1.7 var(--ws-font-sans)', color: 'rgba(255,255,255,.75)', margin: '24px 0 0', maxWidth: 480 }}>
              {isThai ? 'บอกเป้าหมายรอยยิ้มของคุณ — เราจะอธิบายตัวเลือกทุกแบบ พร้อมราคา' : 'Tell us about your smile goals. We\'ll walk through every option, costs included.'}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}>
            <button onClick={() => onNav('booking')} className="btn btn-primary" style={{ padding: '20px 28px', fontSize: 16 }}>
              <i data-lucide="calendar-check" style={{ width: 18, height: 18 }}></i>
              {isThai ? 'นัดหมายเลย' : 'Book Appointment'}
            </button>
            <button className="btn btn-line" style={{ padding: '19px 28px', fontSize: 16, borderRadius: 14 }}>
              <i data-lucide="message-circle" style={{ width: 18, height: 18 }}></i>
              {isThai ? 'แชต LINE @wesmiledc1' : 'Chat on LINE @wesmiledc1'}
            </button>
            <a href="tel:0638798448" className="btn" style={{
              padding: '19px 28px', fontSize: 16, borderRadius: 14,
              background: 'rgba(255,255,255,.08)', color: '#fff',
              border: '1px solid rgba(255,255,255,.2)', textDecoration: 'none',
            }}>
              <i data-lucide="phone" style={{ width: 18, height: 18 }}></i>
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
