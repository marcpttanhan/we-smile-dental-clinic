// DoctorProfile.jsx — individual doctor page with branch schedule matrix

function DoctorProfileScreen({ onNav, lang, photoFilter, doctorId }) {
  const isThai = lang === 'th';
  const d = getDoctor(doctorId);
  if (!d) return null;
  const specialties = d.specialties.map(id => getService(id)).filter(Boolean);

  return (
    <div data-screen-label={`05 Doctors / ${d.name}`}>
      {/* Header */}
      <section style={{ padding: '48px 32px 24px' }}>
        <div className="container">
          <Breadcrumb lang={lang} items={[
            { label: isThai ? 'หน้าแรก' : 'Home', onClick: () => onNav('home') },
            { label: isThai ? 'ทีมแพทย์' : 'Doctors', onClick: () => onNav('doctors') },
            { label: isThai ? d.nameTh : d.name },
          ]} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56, marginTop: 32, alignItems: 'center' }} className="grid-2-md-1">
            {/* Photo */}
            <div className={photoFilter} style={{
              borderRadius: 32, overflow: 'hidden', aspectRatio: '4/5',
              boxShadow: 'var(--ws-shadow-xl)',
              backgroundImage: d.photo ? `url(${d.photo})` : 'url(assets/hero.webp)',
              backgroundSize: 'cover', backgroundPosition: 'center',
              position: 'relative',
            }}>
              {/* Floating role badge */}
              <div style={{
                position: 'absolute', left: 24, bottom: 24,
                background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
                padding: '10px 16px', borderRadius: 999,
                font: '600 12px/1 var(--ws-font-sans)', color: 'var(--ws-primary)',
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>
                {isThai ? d.roleTh : d.role}
              </div>
            </div>

            {/* Bio */}
            <div>
              <div className="ws-num" style={{ marginBottom: 22 }}>
                {isThai ? 'ทีมแพทย์' : 'Doctor profile'}
              </div>
              <h1 className="ws-h1" style={{ margin: 0, fontSize: 'clamp(36px, 4.6vw, 64px)' }}>
                {isThai ? d.nameTh : d.name}
              </h1>
              <div style={{ font: '500 16px/1 var(--ws-font-sans)', color: 'var(--ws-fg-3)', marginTop: 8 }}>
                {isThai ? d.name : d.nameTh}
              </div>

              {/* Quick stats */}
              <div style={{ display: 'flex', gap: 32, marginTop: 28, paddingTop: 28, borderTop: '1px solid var(--ws-line)' }}>
                <Stat n={`${d.years}+`} label={isThai ? 'ปีประสบการณ์' : 'Years experience'} />
                <Stat n={d.certifications.length} label={isThai ? 'การรับรอง' : 'Certifications'} />
                <Stat n={d.schedule.length} label={isThai ? 'วันออกตรวจ' : 'Clinic days'} />
              </div>

              <p style={{ margin: '32px 0 0', font: '500 17px/1.7 var(--ws-font-sans)', color: 'var(--ws-fg-2)', textWrap: 'pretty' }}>
                {isThai ? d.bioTh : d.bio}
              </p>

              {/* Languages chips */}
              <div style={{ display: 'flex', gap: 8, marginTop: 24, flexWrap: 'wrap' }}>
                <span style={{ font: '500 11px/1 var(--ws-font-sans)', color: 'var(--ws-fg-4)', letterSpacing: '0.08em', textTransform: 'uppercase', alignSelf: 'center', marginRight: 4 }}>
                  {isThai ? 'ภาษา' : 'Speaks'}
                </span>
                {d.languages.map(l => (
                  <span key={l} className="chip chip-navy">{l}</span>
                ))}
              </div>

              <button onClick={() => onNav('booking')} className="btn btn-primary" style={{ padding: '18px 28px', fontSize: 15, marginTop: 32 }}>
                <i data-lucide="calendar-check" style={{ width: 16, height: 16 }}></i>
                {isThai ? `นัดหมายกับ${d.nameTh.split(' ')[1] || d.nameShort}` : `Book with Dr. ${d.nameShort}`}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Schedule Matrix */}
      <section className="ws-section" style={{ background: 'var(--ws-orange-50)' }}>
        <div className="container">
          <SectionHead num={1} eyebrow={isThai ? 'ตารางออกตรวจ' : 'Where to find me'}
            title={isThai ? <>ตารางออกตรวจ <em className="accent-fg">รายเดือน</em></> : <>Monthly <em className="accent-fg">schedule matrix</em>.</>}
            lead={isThai ? 'หมอจะออกตรวจที่สาขาและวันเหล่านี้ในแต่ละสัปดาห์ของเดือน' : 'Dr. ' + d.nameShort + ' visits these branches on these days throughout the month.'}
            total={6}
          />

          <ScheduleMatrix doctor={d} lang={lang} />
        </div>
      </section>

      {/* Specialties */}
      {specialties.length > 0 && (
        <section className="ws-section">
          <div className="container">
            <SectionHead num={2} eyebrow={isThai ? 'ความเชี่ยวชาญ' : 'Specialties'}
              title={isThai ? `บริการที่ ${d.nameShort} ดูแล` : `Treatments led by Dr. ${d.nameShort}.`}
              total={6}
            />
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(3, specialties.length)}, 1fr)`, gap: 20 }} className="grid-3-md-1">
              {specialties.map(s => (
                <div key={s.id} onClick={() => onNav(`service:${s.id}`)} className="service-tile">
                  <div className="service-icon">
                    <i data-lucide={s.icon} style={{ width: 26, height: 26 }}></i>
                  </div>
                  <div style={{ font: '700 19px/1.2 var(--ws-font-sans)', color: 'var(--ws-fg-1)' }}>
                    {isThai ? s.titleTh : s.title}
                  </div>
                  <div style={{ font: '500 14px/1.6 var(--ws-font-sans)', color: 'var(--ws-fg-3)', flex: 1 }}>
                    {isThai ? s.blurbTh : s.blurb}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px dashed var(--ws-line)' }}>
                    <span style={{ font: '600 14px/1 var(--ws-font-sans)', color: 'var(--ws-primary)' }}>{s.priceLabel}</span>
                    <span className="service-arrow">
                      <i data-lucide="arrow-right" style={{ width: 16, height: 16 }}></i>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications timeline */}
      <section className="ws-section" style={{ background: 'var(--ws-navy-50)' }}>
        <div className="container">
          <SectionHead num={3} eyebrow={isThai ? 'การศึกษาและการรับรอง' : 'Education & certifications'}
            title={isThai ? 'ประวัติการศึกษาและการอบรม' : 'Training, certifications, and memberships.'}
            total={6}
          />
          <div style={{ background: '#fff', borderRadius: 32, padding: 40, border: '1px solid var(--ws-line)', boxShadow: 'var(--ws-shadow-sm)' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {d.certifications.map((c, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '100px 1fr',
                  gap: 32, alignItems: 'center',
                  padding: '20px 0',
                  borderBottom: i < d.certifications.length - 1 ? '1px solid var(--ws-line)' : 'none',
                }}>
                  <div style={{ font: '500 28px/1 var(--ws-font-display)', color: 'var(--ws-primary)', letterSpacing: '-0.02em' }}>
                    {c.year}
                  </div>
                  <div style={{ font: '500 16px/1.5 var(--ws-font-sans)', color: 'var(--ws-fg-1)' }}>
                    {c.item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand onNav={onNav} lang={lang} />
    </div>
  );
}

// ============================================================
// Schedule Matrix — calendar grid for current month
// ============================================================
function ScheduleMatrix({ doctor, lang }) {
  const isThai = lang === 'th';
  const today = new Date(); today.setHours(0,0,0,0);
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });

  const monthName = isThai
    ? ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'][view.m]
    : ['January','February','March','April','May','June','July','August','September','October','November','December'][view.m];
  const dows = isThai ? ['อา','จ','อ','พ','พฤ','ศ','ส'] : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const dayKeys = ['sun','mon','tue','wed','thu','fri','sat'];

  const prev = () => setView(v => v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 });
  const next = () => setView(v => v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 });

  // For each date in this month, find if doctor works there and at which branch
  const firstDay = new Date(view.y, view.m, 1);
  const lastDay = new Date(view.y, view.m + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startWeekday = firstDay.getDay();

  // Map dayIndex (1..n) → {branch, day, weekOfMonth} or null
  function dateMatches(dayNum) {
    const date = new Date(view.y, view.m, dayNum);
    const dayKey = dayKeys[date.getDay()];
    // Week of month: 1..5 based on which occurrence of this weekday it is
    const weekOfMonth = Math.ceil(dayNum / 7);
    const matches = doctor.schedule.filter(s => s.day === dayKey && s.weeks.includes(weekOfMonth));
    return matches;
  }

  // Build cells
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  // Branch color map
  const branchPalette = {
    ladkrabang: { bg: 'var(--ws-orange-100)', fg: 'var(--ws-orange-700)', dot: 'var(--ws-primary)' },
    suvarnabhumi: { bg: 'var(--ws-navy-100)', fg: 'var(--ws-navy-800)', dot: 'var(--ws-navy-700)' },
    romklao: { bg: '#E8F4F0', fg: '#1F6B53', dot: '#2A8D6E' },
    onnut: { bg: '#F4E8E8', fg: '#8B2A2A', dot: '#B83E3E' },
  };

  return (
    <div style={{ background: '#fff', borderRadius: 32, overflow: 'hidden', boxShadow: 'var(--ws-shadow-md)', border: '1px solid var(--ws-line)' }}>
      {/* Header bar with month + legend */}
      <div style={{
        padding: '24px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 24, flexWrap: 'wrap',
        borderBottom: '1px solid var(--ws-line)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={prev} className="btn btn-ghost" style={{ padding: 10, width: 38, height: 38 }} aria-label="Previous month">
            <i data-lucide="chevron-left" style={{ width: 16, height: 16 }}></i>
          </button>
          <div style={{ font: '500 26px/1 var(--ws-font-display)', color: 'var(--ws-fg-1)', letterSpacing: '-0.02em', minWidth: 220, textAlign: 'center' }}>
            {monthName} {view.y}
          </div>
          <button onClick={next} className="btn btn-ghost" style={{ padding: 10, width: 38, height: 38 }} aria-label="Next month">
            <i data-lucide="chevron-right" style={{ width: 16, height: 16 }}></i>
          </button>
        </div>

        {/* Branch legend */}
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          {[...new Set(doctor.schedule.map(s => s.branch))].map(branchId => {
            const b = getBranch(branchId);
            const p = branchPalette[branchId] || branchPalette.ladkrabang;
            return (
              <div key={branchId} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 12, height: 12, borderRadius: 4, background: p.dot, display: 'inline-block' }}></span>
                <span style={{ font: '600 13px/1 var(--ws-font-sans)', color: 'var(--ws-fg-2)' }}>
                  {isThai ? b.nameTh : b.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calendar grid */}
      <div style={{ padding: '24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 8 }}>
          {dows.map(d => (
            <div key={d} style={{ textAlign: 'center', font: '700 11px/1 var(--ws-font-sans)', color: 'var(--ws-fg-4)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 0' }}>
              {d}
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
          {cells.map((d, idx) => {
            if (!d) return <div key={idx} />;
            const date = new Date(view.y, view.m, d);
            const isPast = date < today;
            const matches = dateMatches(d);
            const isToday = date.getTime() === today.getTime();

            if (matches.length === 0) {
              return (
                <div key={idx} style={{
                  aspectRatio: '1',
                  borderRadius: 12,
                  background: 'var(--ws-cloud)',
                  display: 'flex', flexDirection: 'column',
                  padding: '8px 10px',
                  opacity: isPast ? 0.4 : 0.8,
                  border: isToday ? '1.5px solid var(--ws-line-strong)' : 'none',
                }}>
                  <span style={{ font: '600 13px/1 var(--ws-font-sans)', color: 'var(--ws-fg-4)' }}>{d}</span>
                </div>
              );
            }

            const p = branchPalette[matches[0].branch] || branchPalette.ladkrabang;
            const b = getBranch(matches[0].branch);
            return (
              <div key={idx} style={{
                aspectRatio: '1',
                borderRadius: 12,
                background: p.bg,
                padding: '8px 10px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                opacity: isPast ? 0.55 : 1,
                border: isToday ? `1.5px solid ${p.dot}` : 'none',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <span style={{ font: '700 14px/1 var(--ws-font-sans)', color: p.fg }}>{d}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ font: '600 10px/1 var(--ws-font-sans)', color: p.fg, textTransform: 'uppercase', letterSpacing: '0.06em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {isThai ? b.nameTh : b.name}
                  </div>
                  {matches.length > 1 && (
                    <div style={{ font: '500 9px/1 var(--ws-font-sans)', color: p.fg, opacity: 0.8 }}>
                      +{matches.length - 1} more
                    </div>
                  )}
                </div>
                <span style={{ position: 'absolute', right: 6, top: 6, width: 6, height: 6, borderRadius: '50%', background: p.dot }}></span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary list — recurring schedule */}
      <div style={{ borderTop: '1px solid var(--ws-line)', padding: '24px 32px', background: 'var(--ws-cloud)' }}>
        <div className="ws-eyebrow" style={{ marginBottom: 18 }}>
          {isThai ? 'ตารางประจำ' : 'Recurring schedule'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {[...new Set(doctor.schedule.map(s => s.branch))].map(branchId => {
            const b = getBranch(branchId);
            const slots = doctor.schedule.filter(s => s.branch === branchId);
            const p = branchPalette[branchId] || branchPalette.ladkrabang;
            return (
              <div key={branchId} style={{
                background: '#fff', borderRadius: 16, padding: 18,
                borderLeft: `4px solid ${p.dot}`,
              }}>
                <div style={{ font: '700 15px/1.2 var(--ws-font-sans)', color: 'var(--ws-fg-1)', marginBottom: 12 }}>
                  {isThai ? b.nameTh : b.name}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {slots.map((s, i) => (
                    <ScheduleSummaryRow key={i} slot={s} lang={lang} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ScheduleSummaryRow({ slot, lang }) {
  const isThai = lang === 'th';
  const dayName = isThai
    ? { mon: 'จันทร์', tue: 'อังคาร', wed: 'พุธ', thu: 'พฤหัสบดี', fri: 'ศุกร์', sat: 'เสาร์', sun: 'อาทิตย์' }[slot.day]
    : { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' }[slot.day];
  const allWeeks = slot.weeks.length >= 4;
  const weekLabel = allWeeks
    ? (isThai ? 'ทุกสัปดาห์' : 'Every week')
    : (isThai ? `สัปดาห์ที่ ${slot.weeks.join(', ')}` : `Week ${slot.weeks.join(', ')}`);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, font: '500 13px/1.4 var(--ws-font-sans)' }}>
      <span style={{ color: 'var(--ws-fg-1)', fontWeight: 600 }}>{dayName}</span>
      <span style={{ color: 'var(--ws-fg-3)' }}>{weekLabel}</span>
    </div>
  );
}

Object.assign(window, { DoctorProfileScreen, ScheduleMatrix });
