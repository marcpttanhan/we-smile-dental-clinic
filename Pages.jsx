// Services, Doctors, About pages

function ServicesScreen({ onNav, lang }) {
  const isThai = lang === 'th';

  return (
    <div data-screen-label="02 Services">
      <PageHeader
        eyebrow={isThai ? 'บริการของเรา' : 'Our services'}
        title={isThai ? <>ทุกบริการ <em className="accent-fg">ราคาโปร่งใส</em></> : <>Every service, <em className="accent-fg">transparent</em> pricing.</>}
        lead={isThai ? 'หกสาขาความเชี่ยวชาญ ครอบคลุมทุกขั้นตอนของรอยยิ้มคุณ — ใช้ประกันได้ทั้งบริษัทประกันชั้นนำของไทยส่วนใหญ่' : 'Six core specialties. Flat-rate consultations. Detailed treatment plans. Insurance accepted at most major Thai providers.'}
      />

      <section className="ws-section" style={{ paddingTop: 32 }}>
        <div className="container">
          {/* Service category grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="grid-3-md-1">
            {SERVICES.map((s, i) => (
              <CategoryGridCard key={s.id} s={s} i={i} lang={lang}
                onClick={() => onNav(`service:${s.id}`)} />
            ))}
          </div>

          {/* Pricing transparency CTA */}
          <div style={{
            marginTop: 64, padding: 40, borderRadius: 32,
            background: 'var(--ws-orange-50)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap',
          }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <div className="ws-eyebrow" style={{ marginBottom: 10 }}>
                {isThai ? 'ไม่แน่ใจว่าจะเริ่มจากไหน?' : 'Not sure where to start?'}
              </div>
              <h3 className="ws-h3" style={{ margin: 0 }}>
                {isThai ? 'ปรึกษาฟรี 15 นาที — เราจะอธิบายทุกตัวเลือกให้ฟัง' : 'Book a free 15-minute consult. We\'ll map out your options together.'}
              </h3>
            </div>
            <button onClick={() => onNav('booking')} className="btn btn-primary" style={{ padding: '18px 28px', fontSize: 16 }}>
              <i data-lucide="calendar-check" style={{ width: 18, height: 18 }}></i>
              {isThai ? 'นัดปรึกษาฟรี' : 'Book Free Consult'}
            </button>
          </div>
        </div>
      </section>

      <CTABand onNav={onNav} lang={lang} />
    </div>
  );
}

function CategoryGridCard({ s, i, lang, onClick }) {
  const isThai = lang === 'th';
  return (
    <div onClick={onClick} className="card-hover" style={{
      background: '#fff', borderRadius: 24, padding: 32,
      border: '1px solid var(--ws-line)', boxShadow: 'var(--ws-shadow-sm)',
      cursor: 'pointer',
      display: 'flex', flexDirection: 'column', gap: 16,
      minHeight: 320,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="service-icon">
          <i data-lucide={s.icon} style={{ width: 26, height: 26 }}></i>
        </div>
        <div className="ws-num" style={{ marginTop: 4 }}>
          {String(i + 1).padStart(2, '0')}
        </div>
      </div>
      <div>
        <div style={{ font: '500 26px/1.15 var(--ws-font-display)', color: 'var(--ws-fg-1)', letterSpacing: '-0.02em' }}>
          {isThai ? s.titleTh : s.title}
        </div>
        <div style={{ font: '500 12px/1 var(--ws-font-sans)', color: 'var(--ws-fg-4)', marginTop: 6, letterSpacing: '0.04em' }}>
          {isThai ? s.title : s.titleTh}
        </div>
      </div>
      <div style={{ font: '500 14px/1.6 var(--ws-font-sans)', color: 'var(--ws-fg-3)', flex: 1 }}>
        {isThai ? s.blurbTh : s.blurb}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px dashed var(--ws-line)' }}>
        <div>
          <div style={{ font: '600 14px/1 var(--ws-font-sans)', color: 'var(--ws-primary)' }}>
            {s.priceLabel}
          </div>
          <div style={{ font: '500 11px/1 var(--ws-font-sans)', color: 'var(--ws-fg-4)', marginTop: 5, letterSpacing: '0.04em' }}>
            {s.subServices?.length || 0} {isThai ? 'ทางเลือก' : 'options'}
          </div>
        </div>
        <span className="service-arrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--ws-fg-3)' }}>
          <span style={{ font: '600 13px/1 var(--ws-font-sans)' }}>{isThai ? 'ดูรายละเอียด' : 'Explore'}</span>
          <i data-lucide="arrow-right" style={{ width: 16, height: 16 }}></i>
        </span>
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: '10px 18px', borderRadius: 999,
      border: active ? '1.5px solid var(--ws-primary)' : '1.5px solid var(--ws-line-strong)',
      background: active ? 'var(--ws-primary)' : '#fff',
      color: active ? '#fff' : 'var(--ws-fg-2)',
      font: '600 13px/1 var(--ws-font-sans)', cursor: 'pointer',
      transition: 'all var(--ws-dur-fast) var(--ws-ease)',
    }}>{children}</button>
  );
}

function ServiceDetailRow({ s, idx, lang, onBook }) {
  const isThai = lang === 'th';
  return (
    <div style={{
      background: '#fff', border: '1px solid var(--ws-line)',
      borderRadius: 28, padding: 40,
      display: 'grid', gridTemplateColumns: '0.4fr 1.4fr 0.6fr', gap: 40, alignItems: 'center',
    }} className="grid-3-md-1">
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{
          width: 72, height: 72, borderRadius: 20,
          background: 'var(--ws-orange-100)', color: 'var(--ws-primary)',
          display: 'grid', placeItems: 'center', flex: 'none',
        }}>
          <i data-lucide={s.icon} style={{ width: 32, height: 32 }}></i>
        </div>
        <div>
          <div style={{ font: '500 12px/1 var(--ws-font-sans)', color: 'var(--ws-fg-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
            {String(idx + 1).padStart(2, '0')}
          </div>
          <div style={{ font: '700 22px/1.2 var(--ws-font-sans)', color: 'var(--ws-fg-1)' }}>
            {isThai ? s.titleTh : s.title}
          </div>
          <div style={{ font: '500 13px/1 var(--ws-font-sans)', color: 'var(--ws-fg-3)', marginTop: 4 }}>
            {isThai ? s.title : s.titleTh}
          </div>
        </div>
      </div>

      <div>
        <p style={{ margin: 0, font: '500 16px/1.6 var(--ws-font-sans)', color: 'var(--ws-fg-2)' }}>
          {isThai ? s.blurbTh : s.blurb}
        </p>
        <div style={{ display: 'flex', gap: 18, marginTop: 16 }}>
          <span className="chip chip-navy">
            <i data-lucide="clock" style={{ width: 12, height: 12 }}></i>
            {s.duration}
          </span>
          {s.feature && (
            <span className="chip">
              <i data-lucide="star" style={{ width: 12, height: 12 }}></i>
              {isThai ? 'แนะนำ' : 'Most requested'}
            </span>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ font: '500 11px/1 var(--ws-font-sans)', color: 'var(--ws-fg-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
            {isThai ? 'เริ่มต้น' : 'Starting from'}
          </div>
          <div style={{ font: '500 32px/1 var(--ws-font-display)', color: 'var(--ws-primary)', letterSpacing: '-0.02em' }}>
            {s.priceLabel.replace('From ', '').replace('From ', '')}
          </div>
        </div>
        <button onClick={onBook} className="btn btn-ghost" style={{ padding: '12px 18px', fontSize: 13 }}>
          {isThai ? 'นัดหมาย' : 'Book this'}
          <i data-lucide="arrow-right" style={{ width: 14, height: 14 }}></i>
        </button>
      </div>
    </div>
  );
}

function PageHeader({ eyebrow, title, lead }) {
  return (
    <section style={{ padding: '48px 32px 32px', position: 'relative' }}>
      <div className="container">
        <div className="ws-eyebrow rise rise-1" style={{ marginBottom: 22 }}>{eyebrow}</div>
        <h1 className="ws-h1 rise rise-2" style={{ margin: 0, fontSize: 'clamp(40px, 5.4vw, 76px)', maxWidth: 1000 }}>
          {title}
        </h1>
        {lead && <p className="ws-lead rise rise-3" style={{ marginTop: 24, maxWidth: 720 }}>{lead}</p>}
      </div>
    </section>
  );
}

function DoctorsScreen({ onNav, lang, photoFilter }) {
  const isThai = lang === 'th';
  return (
    <div data-screen-label="03 Doctors">
      <PageHeader
        eyebrow={isThai ? 'ทีมแพทย์' : 'Our team'}
        title={isThai ? <>หมอที่จะ <em className="accent-fg">จำชื่อคุณได้</em></> : <>Specialists who'll <em className="accent-fg">know you</em> by name.</>}
        lead={isThai ? 'หมอทุกคนได้รับการรับรองและอบรมเฉพาะทาง — มุ่งมั่นในการดูแลคนไข้ระยะยาว' : 'Every doctor at We Smile is board-certified, specialty-trained, and committed to long-term patient relationships.'}
      />

      <section className="ws-section" style={{ paddingTop: 32 }}>
        <div className="container">
          {/* Big doctor cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {DOCTORS.map((d, i) => (
              <DoctorBigCard key={d.name} d={d} i={i} lang={lang} photoFilter={photoFilter}
                onBook={() => onNav('booking')}
                onView={() => onNav(`doctor:${d.id}`)} />
            ))}
          </div>

          {/* Stats */}
          <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="grid-4-md-2">
            {[
              { n: '12+', l: isThai ? 'ปีที่เปิดทำการ' : 'Years in practice' },
              { n: '8,400', l: isThai ? 'คนไข้ที่ดูแล' : 'Patients cared for' },
              { n: '4.9★', l: isThai ? 'คะแนนเฉลี่ย' : 'Average rating' },
              { n: '7', l: isThai ? 'วันต่อสัปดาห์' : 'Days open / week' },
            ].map(s => (
              <div key={s.l} style={{ background: '#fff', border: '1px solid var(--ws-line)', borderRadius: 24, padding: 28 }}>
                <div className="stat-num">{s.n}</div>
                <div className="stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand onNav={onNav} lang={lang} />
    </div>
  );
}

function DoctorBigCard({ d, i, lang, photoFilter, onBook, onView }) {
  const isThai = lang === 'th';
  const reverse = i % 2 === 1;
  return (
    <div style={{
      background: '#fff', border: '1px solid var(--ws-line)',
      borderRadius: 32, overflow: 'hidden',
      display: 'grid', gridTemplateColumns: reverse ? '1.4fr 0.8fr' : '0.8fr 1.4fr', gap: 0,
    }} className="grid-2-md-1">
      {!reverse && (
        <div className={photoFilter} style={{
          minHeight: 380,
          backgroundImage: d.photo ? `url(${d.photo})` : 'url(assets/banner.jpg)',
          backgroundSize: d.photo ? 'cover' : '420% auto',
          backgroundPosition: d.photo ? 'center' : `${20 + i * 22}% 35%`,
        }} />
      )}
      <div style={{ padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <span className="chip">
            <i data-lucide="badge-check" style={{ width: 12, height: 12 }}></i>
            {isThai ? d.roleTh : d.role}
          </span>
          <span className="chip chip-navy">
            <i data-lucide="calendar" style={{ width: 12, height: 12 }}></i>
            {d.years} {isThai ? 'ปี' : 'years'}
          </span>
        </div>
        <h3 className="ws-h3" style={{ margin: 0, fontFamily: 'var(--ws-font-display)', fontWeight: 500, fontSize: 'clamp(28px, 3vw, 40px)' }}>
          {isThai ? d.nameTh : d.name}
        </h3>
        <div style={{ font: '500 15px/1 var(--ws-font-sans)', color: 'var(--ws-fg-3)', marginTop: 8 }}>
          {isThai ? d.name : d.nameTh}
        </div>
        <div style={{ font: '500 13px/1.4 var(--ws-font-sans)', color: 'var(--ws-fg-4)', marginTop: 16, paddingTop: 16, borderTop: '1px dashed var(--ws-line)', letterSpacing: '0.04em' }}>
          {d.cred}
        </div>
        <p style={{ margin: '24px 0 0', font: '500 16px/1.7 var(--ws-font-sans)', color: 'var(--ws-fg-2)', maxWidth: 620 }}>
          {isThai ? d.bioTh : d.bio}
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <button onClick={onView} className="btn btn-primary" style={{ padding: '14px 22px', fontSize: 14 }}>
            <i data-lucide="user" style={{ width: 16, height: 16 }}></i>
            {isThai ? `ดูประวัติหมอ` : `View profile`}
          </button>
          <button onClick={onBook} className="btn btn-ghost" style={{ padding: '13px 20px', fontSize: 14 }}>
            <i data-lucide="calendar-check" style={{ width: 16, height: 16 }}></i>
            {isThai ? `นัดกับ ${d.nameTh.split(' ')[1] || d.nameShort}` : `Book with Dr. ${d.nameShort}`}
          </button>
        </div>
      </div>
      {reverse && (
        <div className={photoFilter} style={{
          minHeight: 380,
          backgroundImage: d.photo ? `url(${d.photo})` : 'url(assets/banner.jpg)',
          backgroundSize: d.photo ? 'cover' : '420% auto',
          backgroundPosition: d.photo ? 'center' : `${20 + i * 22}% 35%`,
        }} />
      )}
    </div>
  );
}

function AboutScreen({ onNav, lang, photoFilter }) {
  const isThai = lang === 'th';
  const values = [
    {
      icon: 'heart-handshake',
      title: isThai ? 'อธิบายให้เข้าใจ' : 'Plain-language care',
      body: isThai ? 'อธิบายทุกขั้นตอนเป็นภาษาที่คุณเข้าใจ ไม่ใช้ศัพท์หมอที่งงเปล่าๆ' : 'Every step explained in language you understand. No jargon, no surprises.',
    },
    {
      icon: 'shield-check',
      title: isThai ? 'ทีมเฉพาะทาง' : 'Specialist-led',
      body: isThai ? 'หมอทุกคนได้รับการรับรองและอบรมเฉพาะทางในสาขาที่ดูแล' : 'Every doctor is board-certified and specialty-trained in the area they treat.',
    },
    {
      icon: 'scan-line',
      title: isThai ? 'เทคโนโลยีทันสมัย' : 'Modern technology',
      body: isThai ? 'CT 3D, สแกนช่องปากดิจิทัล และซอฟต์แวร์วางแผนรอยยิ้ม' : 'Cone-beam CT, digital intra-oral scanning, and smile-design software.',
    },
    {
      icon: 'sparkles',
      title: isThai ? 'พรีเมี่ยมแต่อบอุ่น' : 'Premium, but warm',
      body: isThai ? 'คลินิกที่สะอาด เงียบ และอบอุ่น เหมือนสปา ไม่ใช่โรงพยาบาล' : 'Clean, quiet, hospitable space — spa-feel, not hospital-cold.',
    },
  ];

  return (
    <div data-screen-label="04 About">
      <PageHeader
        eyebrow={isThai ? 'เกี่ยวกับเรา' : 'About we smile'}
        title={isThai ? <>คลินิกของย่าน <em className="accent-fg">ลาดกระบัง</em></> : <>The neighborhood clinic of <em className="accent-fg">Ladkrabang</em>.</>}
      />

      {/* Story + photo */}
      <section className="ws-section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="grid-2-md-1">
            <div>
              <div className="ws-num" style={{ marginBottom: 24 }}>
                {isThai ? 'เรื่องราวของเรา' : 'Our story'}
              </div>
              <p style={{ font: '500 19px/1.7 var(--ws-font-sans)', color: 'var(--ws-fg-2)', margin: 0 }}>
                {isThai
                  ? 'We Smile เปิดคลินิกที่ลาดกระบังเมื่อปี 2014 ด้วยความตั้งใจง่ายๆ — สร้างที่ที่คนในย่านนี้รู้สึกได้รับการดูแลอย่างจริงใจ ไม่ใช่แค่ขายบริการทันตกรรม'
                  : 'We Smile opened in Ladkrabang in 2014 with a simple intention — to build a place where the neighborhood feels genuinely cared for, not just sold dental services.'}
              </p>
              <p style={{ font: '500 17px/1.7 var(--ws-font-sans)', color: 'var(--ws-fg-3)', margin: '20px 0 0' }}>
                {isThai
                  ? 'หลังจากเก้าสิบสองปี เราดูแลคนไข้กว่า 8,400 ราย ตั้งแต่เด็กในชุมชนไปจนถึงผู้ใหญ่ที่กลับมาใส่รากฟันเทียม — ครอบครัวเดียวกันที่กลับมาหาเราซ้ำๆ'
                  : 'A dozen years later, we\'ve cared for over 8,400 patients — from kids on their first check-up to adults coming back for full-mouth implant rehabilitation. The same families, returning.'}
              </p>
              <div style={{ display: 'flex', gap: 48, marginTop: 40, paddingTop: 40, borderTop: '1px solid var(--ws-line)' }}>
                <Stat n="2014" label={isThai ? 'เปิดทำการ' : 'Established'} />
                <Stat n="12+" label={isThai ? 'ปี' : 'Years caring'} />
                <Stat n="8,400" label={isThai ? 'คนไข้' : 'Patients'} />
              </div>
            </div>
            <div className={photoFilter} style={{
              borderRadius: 32, overflow: 'hidden', boxShadow: 'var(--ws-shadow-xl)',
              aspectRatio: '4/5', backgroundImage: 'url(assets/banner.jpg)',
              backgroundSize: 'cover', backgroundPosition: 'center',
            }} />
          </div>
        </div>
      </section>

      {/* Values grid */}
      <section className="ws-section" style={{ background: 'var(--ws-orange-50)' }}>
        <div className="container">
          <SectionHead num={2} eyebrow={isThai ? 'หลักการของเรา' : 'How we work'}
            title={isThai ? 'สี่หลักการ ที่กำหนดทุกอย่างที่เราทำ' : 'Four principles, shaping every visit.'}
            total={6} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="grid-4-md-2">
            {values.map(v => (
              <div key={v.title} style={{
                background: '#fff', borderRadius: 24, padding: 32,
                border: '1px solid var(--ws-line)',
              }}>
                <div className="service-icon" style={{ marginBottom: 16 }}>
                  <i data-lucide={v.icon} style={{ width: 26, height: 26 }}></i>
                </div>
                <div style={{ font: '700 18px/1.3 var(--ws-font-sans)', color: 'var(--ws-fg-1)', marginBottom: 10 }}>
                  {v.title}
                </div>
                <div style={{ font: '500 14px/1.6 var(--ws-font-sans)', color: 'var(--ws-fg-3)' }}>
                  {v.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards / certifications strip */}
      <section className="ws-section">
        <div className="container">
          <div className="ws-num" style={{ marginBottom: 40 }}>
            {isThai ? 'พันธมิตรและการรับรอง' : 'Partners & accreditations'}
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 32,
            alignItems: 'center', padding: '32px 0',
            borderTop: '1px solid var(--ws-line)', borderBottom: '1px solid var(--ws-line)',
          }} className="grid-4-md-2">
            {['Invisalign', 'Straumann', 'Astra Tech', 'Zoom Whitening', 'Mahidol DDS'].map(p => (
              <div key={p} style={{
                font: '500 16px/1 var(--ws-font-display)', color: 'var(--ws-fg-3)',
                letterSpacing: '0.04em', textAlign: 'center',
              }}>{p}</div>
            ))}
          </div>
        </div>
      </section>

      <CTABand onNav={onNav} lang={lang} />
    </div>
  );
}

Object.assign(window, { ServicesScreen, DoctorsScreen, AboutScreen, PageHeader });
