// ServiceDetail.jsx — Category page + Sub-service detail page + Before/After gallery

function ServiceCategoryScreen({ onNav, lang, photoFilter, serviceId }) {
  const isThai = lang === 'th';
  const s = getService(serviceId);
  if (!s) return null;
  const doctors = getDoctorsForSpecialty(serviceId);

  return (
    <div data-screen-label={`02 Services / ${s.title}`}>
      {/* Editorial header */}
      <section style={{ padding: '48px 32px 24px' }}>
        <div className="container">
          <Breadcrumb lang={lang} items={[
            { label: isThai ? 'หน้าแรก' : 'Home', onClick: () => onNav('home') },
            { label: isThai ? 'บริการ' : 'Services', onClick: () => onNav('services') },
            { label: isThai ? s.titleTh : s.title },
          ]} />
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 56, marginTop: 28, alignItems: 'end' }} className="grid-2-md-1">
            <div>
              <div className="ws-num" style={{ marginBottom: 22 }}>
                {isThai ? 'หมวดบริการ' : 'Service category'}
              </div>
              <h1 className="ws-h1" style={{ margin: 0, fontSize: 'clamp(40px, 5.4vw, 76px)' }}>
                {isThai ? s.titleTh : s.title}
              </h1>
              <p className="ws-lead" style={{ marginTop: 22, maxWidth: 600 }}>
                {isThai ? s.longTh : s.long}
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
                <span className="chip">
                  <i data-lucide="tag" style={{ width: 12, height: 12 }}></i>
                  {s.priceLabel}
                </span>
                <span className="chip chip-navy">
                  <i data-lucide="clock" style={{ width: 12, height: 12 }}></i>
                  {s.duration}
                </span>
                <span className="chip chip-navy">
                  <i data-lucide="layers" style={{ width: 12, height: 12 }}></i>
                  {s.subServices?.length || 0} {isThai ? 'ทางเลือก' : 'options'}
                </span>
              </div>
            </div>
            <div className={photoFilter} style={{
              borderRadius: 28, overflow: 'hidden', aspectRatio: '4/3',
              boxShadow: 'var(--ws-shadow-xl)',
              backgroundImage: 'url(assets/hero.webp)',
              backgroundSize: 'cover', backgroundPosition: 'center',
            }} />
          </div>
        </div>
      </section>

      {/* Sub-services grid */}
      <section className="ws-section" style={{ paddingTop: 64 }}>
        <div className="container">
          <SectionHead num={1} eyebrow={isThai ? 'ทางเลือกการรักษา' : 'Treatment options'}
            title={isThai ? `ทุกทางเลือกของ${s.titleTh}` : `Every ${s.title.toLowerCase()} option, explained.`}
            lead={isThai ? 'เลือกทางที่เหมาะกับเป้าหมาย เวลา และงบประมาณของคุณ' : 'Pick the option that matches your goals, timeline, and budget.'}
            total={6}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }} className="grid-2-md-1">
            {s.subServices?.map((sub, i) => (
              <SubServiceCard
                key={sub.id}
                sub={sub}
                cat={s}
                lang={lang}
                index={i + 1}
                onClick={() => onNav(`service:${s.id}/${sub.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Doctors who specialize */}
      {doctors.length > 0 && (
        <section className="ws-section" style={{ background: 'var(--ws-navy-50)' }}>
          <div className="container">
            <SectionHead num={2} eyebrow={isThai ? 'ทีมหมอเฉพาะทาง' : 'Specialists in this field'}
              title={isThai ? `หมอที่ดูแล${s.titleTh}` : `Doctors who lead our ${s.title.toLowerCase()} cases.`}
              total={6}
            />
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(4, doctors.length)}, 1fr)`, gap: 20 }} className="grid-4-md-2">
              {doctors.map((d, i) => (
                <DoctorMiniCard key={d.id} d={d} i={i} lang={lang} photoFilter={photoFilter}
                  onClick={() => onNav(`doctor:${d.id}`)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Patient stories preview */}
      <SuccessStoriesSection lang={lang} stories={SUCCESS_STORIES.slice(0, 5)} compact />

      <CTABand onNav={onNav} lang={lang} />
    </div>
  );
}

function SubServiceCard({ sub, cat, lang, index, onClick }) {
  const isThai = lang === 'th';
  return (
    <div onClick={onClick} className="card-hover" style={{
      background: '#fff', borderRadius: 24, padding: 32,
      border: '1px solid var(--ws-line)', boxShadow: 'var(--ws-shadow-sm)',
      cursor: 'pointer',
      display: 'flex', flexDirection: 'column', gap: 16,
      minHeight: 240,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div className="ws-num" style={{ marginTop: 4 }}>
          {String(index).padStart(2, '0')} — {isThai ? 'ทางเลือก' : 'Option'}
        </div>
        <i data-lucide="arrow-up-right" style={{ width: 20, height: 20, color: 'var(--ws-fg-4)' }}></i>
      </div>
      <h3 style={{ margin: 0, font: '500 26px/1.2 var(--ws-font-display)', color: 'var(--ws-fg-1)', letterSpacing: '-0.01em' }}>
        {isThai ? sub.titleTh : sub.title}
      </h3>
      <p style={{ margin: 0, font: '500 14px/1.6 var(--ws-font-sans)', color: 'var(--ws-fg-3)', flex: 1, textWrap: 'pretty' }}>
        {isThai ? sub.blurbTh : sub.blurb}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px dashed var(--ws-line)' }}>
        <div>
          <div style={{ font: '500 11px/1 var(--ws-font-sans)', color: 'var(--ws-fg-4)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
            {isThai ? 'เริ่มต้น' : 'From'}
          </div>
          <div style={{ font: '600 17px/1 var(--ws-font-sans)', color: 'var(--ws-primary)' }}>
            {sub.priceLabel}
          </div>
        </div>
        <span className="chip chip-navy">
          <i data-lucide="clock" style={{ width: 11, height: 11 }}></i>
          {sub.duration}
        </span>
      </div>
    </div>
  );
}

function DoctorMiniCard({ d, i, lang, photoFilter, onClick }) {
  const isThai = lang === 'th';
  return (
    <div onClick={onClick} className="card-hover" style={{
      background: '#fff', borderRadius: 24, padding: 16,
      border: '1px solid var(--ws-line)', boxShadow: 'var(--ws-shadow-sm)',
      cursor: 'pointer',
    }}>
      <div className={`doctor-photo ${photoFilter}`} style={{
        backgroundImage: d.photo ? `url(${d.photo})` : undefined,
        backgroundSize: d.photo ? 'cover' : '420% auto',
        backgroundPosition: d.photo ? 'center top' : `${20 + i * 22}% 35%`,
        marginBottom: 14,
      }} />
      <div style={{ font: '500 11px/1 var(--ws-font-sans)', color: 'var(--ws-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
        {isThai ? d.roleTh : d.role}
      </div>
      <div style={{ font: '700 16px/1.3 var(--ws-font-sans)', color: 'var(--ws-fg-1)' }}>
        {isThai ? d.nameTh : d.name}
      </div>
      <div style={{ font: '500 12px/1 var(--ws-font-sans)', color: 'var(--ws-fg-3)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
        {isThai ? 'ดูประวัติ' : 'View profile'} <i data-lucide="arrow-right" style={{ width: 12, height: 12 }}></i>
      </div>
    </div>
  );
}

// ============================================================
// Sub-service detail screen
// ============================================================
function SubServiceScreen({ onNav, lang, photoFilter, categoryId, subId }) {
  const isThai = lang === 'th';
  const cat = getService(categoryId);
  const sub = getSubService(categoryId, subId);
  if (!sub || !cat) return null;
  const doctors = getDoctorsForSpecialty(categoryId);
  const stories = getStoriesForSubService(subId);

  return (
    <div data-screen-label={`02 Services / ${cat.title} / ${sub.title}`}>
      {/* Header */}
      <section style={{ padding: '48px 32px 24px' }}>
        <div className="container">
          <Breadcrumb lang={lang} items={[
            { label: isThai ? 'หน้าแรก' : 'Home', onClick: () => onNav('home') },
            { label: isThai ? 'บริการ' : 'Services', onClick: () => onNav('services') },
            { label: isThai ? cat.titleTh : cat.title, onClick: () => onNav(`service:${cat.id}`) },
            { label: isThai ? sub.titleTh : sub.title },
          ]} />

          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 56, marginTop: 28, alignItems: 'center' }} className="grid-2-md-1">
            <div>
              <div className="ws-num" style={{ marginBottom: 22 }}>
                {(isThai ? cat.titleTh : cat.title)} · {isThai ? 'รายละเอียดบริการ' : 'Treatment detail'}
              </div>
              <h1 className="ws-h1" style={{ margin: 0, fontSize: 'clamp(36px, 4.6vw, 64px)' }}>
                {isThai ? sub.titleTh : sub.title}
              </h1>
              <p className="ws-lead" style={{ marginTop: 20, maxWidth: 600 }}>
                {isThai ? sub.blurbTh : sub.blurb}
              </p>

              {/* Quick spec table */}
              <div style={{
                marginTop: 32, padding: 24, borderRadius: 20,
                background: 'var(--ws-orange-50)',
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
              }}>
                <SpecCell label={isThai ? 'ราคาเริ่มต้น' : 'Starting price'} value={sub.priceLabel} accent />
                <SpecCell label={isThai ? 'ระยะเวลา' : 'Duration'} value={sub.duration} />
                <SpecCell label={isThai ? 'การรับประกัน' : 'Aftercare'} value={isThai ? '1 ปี' : '1 yr included'} />
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
                <button onClick={() => onNav('booking')} className="btn btn-primary" style={{ padding: '16px 24px' }}>
                  <i data-lucide="calendar-check" style={{ width: 16, height: 16 }}></i>
                  {isThai ? 'นัดปรึกษา' : 'Book consultation'}
                </button>
                <button onClick={() => onNav('contact')} className="btn btn-ghost" style={{ padding: '15px 22px' }}>
                  <i data-lucide="message-circle" style={{ width: 16, height: 16 }}></i>
                  {isThai ? 'สอบถามทาง LINE' : 'Ask on LINE'}
                </button>
              </div>
            </div>

            <div className={photoFilter} style={{
              borderRadius: 28, overflow: 'hidden', aspectRatio: '4/5',
              boxShadow: 'var(--ws-shadow-xl)',
              backgroundImage: 'url(assets/hero.webp)',
              backgroundSize: 'cover', backgroundPosition: 'center',
            }} />
          </div>
        </div>
      </section>

      {/* Before/After patient review gallery */}
      <SuccessStoriesSection
        lang={lang}
        stories={stories}
        title={isThai ? <>ผลลัพธ์จริงจาก <em className="accent-fg">คนไข้ของเรา</em></> : <>Real results from <em className="accent-fg">our patients</em>.</>}
        eyebrow={isThai ? 'ผลงานคนไข้' : 'Patient review gallery'}
        num={2}
      />

      {/* What to expect — process steps */}
      <section className="ws-section" style={{ background: 'var(--ws-navy-50)' }}>
        <div className="container">
          <SectionHead num={3} eyebrow={isThai ? 'ขั้นตอนการรักษา' : 'What to expect'}
            title={isThai ? 'จากปรึกษาฟรี ถึงรอยยิ้มใหม่' : 'From free consult to a new smile.'}
            total={6}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="grid-4-md-2">
            {[
              { n: 1, t: isThai ? 'ปรึกษาฟรี 15 นาที' : 'Free 15-min consult', d: isThai ? 'พูดคุยกับหมอ ฟังเป้าหมายของคุณ ไม่มีข้อผูกมัด' : 'Talk to a doctor about your goals — no commitment.' },
              { n: 2, t: isThai ? 'วางแผนและสแกน' : 'Plan & scan', d: isThai ? 'CT 3 มิติ สแกนช่องปากดิจิทัล และวางแผนล่วงหน้า' : '3D cone-beam CT, digital scanning, and a full treatment plan.' },
              { n: 3, t: isThai ? 'เริ่มการรักษา' : 'Begin treatment', d: isThai ? 'ทุกขั้นตอนอธิบายล่วงหน้า ไม่มีค่าใช้จ่ายเซอร์ไพรส์' : 'Every step is explained beforehand — no surprise costs.' },
              { n: 4, t: isThai ? 'ติดตามผล 1 ปี' : 'Aftercare for a year', d: isThai ? 'นัดติดตามรายไตรมาส ฟรีเป็นเวลา 12 เดือน' : 'Quarterly follow-up visits included for 12 months.' },
            ].map(step => (
              <div key={step.n} style={{
                background: '#fff', borderRadius: 24, padding: 28,
                border: '1px solid var(--ws-line)',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'var(--ws-primary)', color: '#fff',
                  display: 'grid', placeItems: 'center',
                  font: '500 18px/1 var(--ws-font-display)',
                  marginBottom: 18,
                }}>{step.n}</div>
                <h4 style={{ margin: 0, font: '700 17px/1.3 var(--ws-font-sans)', color: 'var(--ws-fg-1)', marginBottom: 10 }}>{step.t}</h4>
                <p style={{ margin: 0, font: '500 14px/1.6 var(--ws-font-sans)', color: 'var(--ws-fg-3)' }}>{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors who do this */}
      {doctors.length > 0 && (
        <section className="ws-section">
          <div className="container">
            <SectionHead num={4} eyebrow={isThai ? 'ทีมเฉพาะทาง' : 'Specialists for this treatment'}
              title={isThai ? 'หมอที่ทำ' + (sub.titleTh) : `Who'll handle your case.`}
              total={6}
            />
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(4, doctors.length)}, 1fr)`, gap: 20 }} className="grid-4-md-2">
              {doctors.map((d, i) => (
                <DoctorMiniCard key={d.id} d={d} i={i} lang={lang} photoFilter={photoFilter}
                  onClick={() => onNav(`doctor:${d.id}`)} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand onNav={onNav} lang={lang} />
    </div>
  );
}

function SpecCell({ label, value, accent }) {
  return (
    <div>
      <div style={{ font: '500 11px/1 var(--ws-font-sans)', color: 'var(--ws-fg-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
        {label}
      </div>
      <div style={{
        font: '500 22px/1.1 var(--ws-font-display)',
        color: accent ? 'var(--ws-primary)' : 'var(--ws-fg-1)',
        letterSpacing: '-0.01em',
      }}>{value}</div>
    </div>
  );
}

function Breadcrumb({ lang, items }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {it.onClick ? (
            <button onClick={it.onClick} style={{
              background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
              font: '500 13px/1 var(--ws-font-sans)', color: 'var(--ws-fg-3)',
              textDecoration: 'none',
            }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ws-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ws-fg-3)'}
            >{it.label}</button>
          ) : (
            <span style={{ font: '600 13px/1 var(--ws-font-sans)', color: 'var(--ws-fg-1)' }}>{it.label}</span>
          )}
          {i < items.length - 1 && (
            <i data-lucide="chevron-right" style={{ width: 12, height: 12, color: 'var(--ws-fg-4)' }}></i>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ============================================================
// Patient Success Stories — horizontal slider w/ before/after
// ============================================================
function SuccessStoriesSection({ lang, stories, title, eyebrow, num, compact }) {
  const isThai = lang === 'th';
  const [active, setActive] = useState(0);
  const total = stories.length;
  const next = () => setActive(a => (a + 1) % total);
  const prev = () => setActive(a => (a - 1 + total) % total);

  return (
    <section className="ws-section" style={{ background: compact ? 'transparent' : 'var(--ws-bone)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, gap: 32, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 720 }}>
            {num != null ? (
              <div className="ws-num" style={{ marginBottom: 16 }}>
                {String(num).padStart(2, '0')} / 06 — {eyebrow || (isThai ? 'ผลงานคนไข้' : 'Patient stories')}
              </div>
            ) : (
              <div className="ws-eyebrow" style={{ marginBottom: 16 }}>
                {eyebrow || (isThai ? 'ผลงานคนไข้' : 'Patient stories')}
              </div>
            )}
            <h2 className="ws-h2" style={{ margin: 0 }}>
              {title || (isThai ? <>เรื่องราวความสำเร็จ <em className="accent-fg">จากคนไข้จริง</em></> : <>Real stories from <em className="accent-fg">real patients</em>.</>)}
            </h2>
          </div>
          {/* Controls */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ font: '600 13px/1 var(--ws-font-sans)', color: 'var(--ws-fg-3)', marginRight: 12 }}>
              {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button onClick={prev} className="btn btn-ghost" style={{ padding: 12, width: 44, height: 44 }}>
              <i data-lucide="arrow-left" style={{ width: 16, height: 16 }}></i>
            </button>
            <button onClick={next} className="btn btn-ghost" style={{ padding: 12, width: 44, height: 44 }}>
              <i data-lucide="arrow-right" style={{ width: 16, height: 16 }}></i>
            </button>
          </div>
        </div>

        {/* Active story */}
        <StoryCard story={stories[active]} lang={lang} />

        {/* Thumbnails strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: `repeat(${total}, 1fr)`, gap: 12,
          marginTop: 24,
        }}>
          {stories.map((s, i) => (
            <button key={s.id} onClick={() => setActive(i)} style={{
              background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
              borderRadius: 12, overflow: 'hidden',
              opacity: i === active ? 1 : 0.5,
              transition: 'opacity var(--ws-dur-base) var(--ws-ease)',
              position: 'relative',
              aspectRatio: '3/2',
            }}>
              <img src={s.after} alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {i === active && (
                <div style={{
                  position: 'absolute', inset: 0,
                  border: '2.5px solid var(--ws-primary)',
                  borderRadius: 12,
                }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryCard({ story, lang }) {
  const isThai = lang === 'th';
  return (
    <div style={{
      background: '#fff', borderRadius: 32, overflow: 'hidden',
      border: '1px solid var(--ws-line)', boxShadow: 'var(--ws-shadow-lg)',
      display: 'grid', gridTemplateColumns: '2fr 1fr',
    }} className="grid-2-md-1">
      {/* Before/After image pair */}
      <div style={{ position: 'relative', minHeight: 480 }}>
        <BeforeAfter before={story.before} after={story.after} lang={lang} />
      </div>

      {/* Meta sidebar */}
      <div style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="ws-eyebrow" style={{ color: 'var(--ws-fg-4)' }}>
          {isThai ? story.patientTh : story.patient}
        </div>
        <h3 style={{ margin: 0, font: '500 32px/1.15 var(--ws-font-display)', color: 'var(--ws-fg-1)', letterSpacing: '-0.02em' }}>
          {isThai ? story.treatmentTh : story.treatment}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 14, borderBottom: '1px solid var(--ws-line)' }}>
            <span style={{ font: '500 12px/1 var(--ws-font-sans)', color: 'var(--ws-fg-4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {isThai ? 'ระยะเวลา' : 'Duration'}
            </span>
            <span style={{ font: '600 14px/1 var(--ws-font-sans)', color: 'var(--ws-fg-1)' }}>
              {isThai ? story.durationTh : story.duration}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 14, borderBottom: '1px solid var(--ws-line)' }}>
            <span style={{ font: '500 12px/1 var(--ws-font-sans)', color: 'var(--ws-fg-4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {isThai ? 'ทันตแพทย์' : 'Doctor'}
            </span>
            <span style={{ font: '600 14px/1 var(--ws-font-sans)', color: 'var(--ws-fg-1)' }}>
              {story.doctor}
            </span>
          </div>
        </div>
        <p style={{
          margin: '8px 0 0',
          font: '500 15px/1.6 var(--ws-font-sans)',
          color: 'var(--ws-fg-3)', textWrap: 'pretty', flex: 1,
        }}>
          {isThai ? story.noteTh : story.note}
        </p>
      </div>
    </div>
  );
}

// Before/after with optional drag-to-reveal slider
function BeforeAfter({ before, after, lang }) {
  const [pct, setPct] = useState(50);
  const ref = useRef(null);
  const draggingRef = useRef(false);
  const isThai = lang === 'th';

  const move = (clientX) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
    setPct(p);
  };
  const start = (e) => {
    draggingRef.current = true;
    move(e.clientX || e.touches?.[0]?.clientX);
  };
  const onMove = (e) => {
    if (!draggingRef.current) return;
    move(e.clientX || e.touches?.[0]?.clientX);
  };
  const stop = () => { draggingRef.current = false; };

  useEffect(() => {
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', stop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', stop);
    };
  }, []);

  return (
    <div ref={ref}
      onMouseDown={start} onTouchStart={start}
      style={{
        position: 'absolute', inset: 0,
        cursor: 'ew-resize', userSelect: 'none',
        background: '#000',
      }}>
      {/* After (full bleed below) */}
      <img src={after} alt={isThai ? 'หลังการรักษา' : 'After'} draggable="false"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {/* Before (clipped on top) */}
      <div style={{ position: 'absolute', inset: 0, width: `${pct}%`, overflow: 'hidden' }}>
        <img src={before} alt={isThai ? 'ก่อนการรักษา' : 'Before'} draggable="false"
          style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: ref.current?.offsetWidth || '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Labels */}
      <div style={{
        position: 'absolute', left: 18, top: 18,
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
        color: '#fff', padding: '6px 12px', borderRadius: 999,
        font: '700 11px/1 var(--ws-font-sans)', letterSpacing: '0.12em', textTransform: 'uppercase',
      }}>
        {isThai ? 'ก่อน' : 'Before'}
      </div>
      <div style={{
        position: 'absolute', right: 18, top: 18,
        background: 'var(--ws-primary)',
        color: '#fff', padding: '6px 12px', borderRadius: 999,
        font: '700 11px/1 var(--ws-font-sans)', letterSpacing: '0.12em', textTransform: 'uppercase',
      }}>
        {isThai ? 'หลัง' : 'After'}
      </div>

      {/* Divider line + handle */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: `${pct}%`,
        width: 2, background: '#fff', boxShadow: '0 0 0 1px rgba(0,0,0,0.15)',
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 44, height: 44, borderRadius: '50%',
          background: '#fff', boxShadow: 'var(--ws-shadow-lg)',
          display: 'grid', placeItems: 'center',
          color: 'var(--ws-primary)',
        }}>
          <i data-lucide="chevrons-left-right" style={{ width: 20, height: 20 }}></i>
        </div>
      </div>

      {/* Hint */}
      <div style={{
        position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
        padding: '8px 14px', borderRadius: 999,
        font: '500 11px/1 var(--ws-font-sans)', color: 'var(--ws-fg-3)',
        letterSpacing: '0.04em',
      }}>
        {isThai ? 'ลากเพื่อเปรียบเทียบ' : 'Drag to compare'}
      </div>
    </div>
  );
}

Object.assign(window, {
  ServiceCategoryScreen, SubServiceScreen,
  SuccessStoriesSection, StoryCard, BeforeAfter,
  Breadcrumb,
});
