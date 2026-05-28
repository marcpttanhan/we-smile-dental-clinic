// Booking + Contact pages

const MONTH_NAMES_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTH_NAMES_TH = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
const DOW_EN = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const DOW_TH = ['อา','จ','อ','พ','พฤ','ศ','ส'];

// Generates pseudo-random availability per date using a seeded approach
function getSlotsForDate(dateKey) {
  const all = ['09:00','10:00','11:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'];
  // hash of date string for deterministic "taken" slots
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) hash = (hash * 31 + dateKey.charCodeAt(i)) >>> 0;
  return all.map((t, i) => ({ time: t, taken: ((hash >> i) & 1) === 1 && i % 2 === 0 }));
}

function Calendar({ value, onChange, lang }) {
  const [view, setView] = useState(() => {
    const t = new Date();
    return { y: t.getFullYear(), m: t.getMonth() };
  });
  const today = new Date();
  today.setHours(0,0,0,0);

  const isThai = lang === 'th';
  const monthNames = isThai ? MONTH_NAMES_TH : MONTH_NAMES_EN;
  const dowNames = isThai ? DOW_TH : DOW_EN;

  const firstDay = new Date(view.y, view.m, 1);
  const lastDay = new Date(view.y, view.m + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startWeekday = firstDay.getDay();

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prev = () => setView(v => v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 });
  const next = () => setView(v => v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 });

  return (
    <div style={{
      background: '#fff', border: '1px solid var(--ws-line)',
      borderRadius: 20, padding: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ font: '700 18px/1 var(--ws-font-sans)', color: 'var(--ws-fg-1)' }}>
          {monthNames[view.m]} {view.y}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={prev} className="cal-day" style={{ width: 36, height: 36, border: '1px solid var(--ws-line)' }}>
            <i data-lucide="chevron-left" style={{ width: 16, height: 16 }}></i>
          </button>
          <button onClick={next} className="cal-day" style={{ width: 36, height: 36, border: '1px solid var(--ws-line)' }}>
            <i data-lucide="chevron-right" style={{ width: 16, height: 16 }}></i>
          </button>
        </div>
      </div>
      <div className="cal-grid" style={{ marginBottom: 4 }}>
        {dowNames.map(d => <div key={d} className="cal-dow">{d}</div>)}
      </div>
      <div className="cal-grid">
        {cells.map((d, idx) => {
          if (!d) return <div key={idx}></div>;
          const date = new Date(view.y, view.m, d);
          const isPast = date < today;
          const key = `${view.y}-${view.m}-${d}`;
          const isSelected = value && value.y === view.y && value.m === view.m && value.d === d;
          const isToday = date.getTime() === today.getTime();
          const cls = ['cal-day'];
          if (isPast) cls.push('cal-day-disabled');
          if (isSelected) cls.push('cal-day-selected');
          if (isToday) cls.push('cal-day-today');
          return (
            <button key={idx} className={cls.join(' ')} disabled={isPast}
              onClick={() => onChange({ y: view.y, m: view.m, d })}>
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BookingScreen({ onNav, lang }) {
  const isThai = lang === 'th';
  const [step, setStep] = useState(1);
  const [service, setService] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [info, setInfo] = useState({ name: '', phone: '', notes: '' });

  const submit = (e) => {
    e.preventDefault();
    setStep(5);
  };

  const dateKey = date ? `${date.y}-${date.m}-${date.d}` : '';
  const slots = date ? getSlotsForDate(dateKey) : [];
  const dateLabel = date ? `${date.d} ${(isThai ? MONTH_NAMES_TH : MONTH_NAMES_EN)[date.m]} ${date.y}` : '';

  return (
    <div data-screen-label="05 Booking">
      <PageHeader
        eyebrow={isThai ? 'นัดหมาย' : 'Book a visit'}
        title={isThai ? <>เลือก <em className="accent-fg">วัน เวลา</em> ที่สะดวก</> : <>Pick a <em className="accent-fg">time</em> that works for you.</>}
        lead={isThai ? 'เราจะโทรยืนยันภายใน 1 ชั่วโมงทำการ' : 'We\'ll call to confirm within one business hour. Your details stay private.'}
      />

      <section className="ws-section" style={{ paddingTop: 24, paddingBottom: 64 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1.3fr', gap: 32 }} className="grid-2-md-1">
            {/* Sidebar — progress */}
            <div>
              <div style={{
                background: '#fff', border: '1px solid var(--ws-line)',
                borderRadius: 24, padding: 24, position: 'sticky', top: 100,
              }}>
                <div className="ws-eyebrow" style={{ marginBottom: 16 }}>
                  {isThai ? 'ขั้นตอน' : 'Your booking'}
                </div>
                <Step n={1} active={step === 1} done={step > 1}
                  label={isThai ? 'บริการ' : 'Service'}
                  detail={service ? (isThai ? service.titleTh : service.title) : (isThai ? 'ยังไม่ได้เลือก' : 'Not selected')} />
                <Step n={2} active={step === 2} done={step > 2}
                  label={isThai ? 'หมอ' : 'Doctor'}
                  detail={doctor ? (isThai ? doctor.nameTh : doctor.name) : (isThai ? 'ยินดีให้คลินิกเลือก' : 'No preference')} />
                <Step n={3} active={step === 3} done={step > 3}
                  label={isThai ? 'วัน-เวลา' : 'Date & time'}
                  detail={date && time ? `${dateLabel} · ${time}` : (isThai ? 'ยังไม่ได้เลือก' : 'Not selected')} />
                <Step n={4} active={step === 4} done={step > 4}
                  label={isThai ? 'ข้อมูลคุณ' : 'Your details'}
                  detail={info.name || (isThai ? 'ยังไม่ได้กรอก' : 'Not filled')} last />

                <div style={{ marginTop: 24, padding: 18, borderRadius: 16, background: 'var(--ws-orange-50)' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <i data-lucide="phone" style={{ width: 18, height: 18, color: 'var(--ws-primary)', flex: 'none', marginTop: 2 }}></i>
                    <div>
                      <div style={{ font: '600 13px/1.2 var(--ws-font-sans)', color: 'var(--ws-fg-1)' }}>
                        {isThai ? 'นัดทางโทรศัพท์ก็ได้' : 'Or call us directly'}
                      </div>
                      <a href="tel:0638798448" style={{ font: '600 14px/1 var(--ws-font-sans)', color: 'var(--ws-primary)', textDecoration: 'none', marginTop: 6, display: 'inline-block' }}>
                        063-879-8448
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main panel */}
            <div style={{
              background: '#fff', border: '1px solid var(--ws-line)',
              borderRadius: 32, padding: 40, minHeight: 540,
              boxShadow: 'var(--ws-shadow-md)',
            }}>
              {step === 1 && (
                <div className="page-enter">
                  <div className="ws-num" style={{ marginBottom: 14 }}>
                    01 / 04 — {isThai ? 'เลือกบริการ' : 'Choose service'}
                  </div>
                  <h2 style={{ font: '500 28px/1.2 var(--ws-font-display)', margin: 0, color: 'var(--ws-fg-1)' }}>
                    {isThai ? 'มาวันนี้เพื่ออะไร?' : 'What brings you in?'}
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 32 }}>
                    {SERVICES.map(s => (
                      <button key={s.id} onClick={() => { setService(s); setStep(2); }}
                        style={{
                          background: service?.id === s.id ? 'var(--ws-orange-50)' : '#fff',
                          border: service?.id === s.id ? '1.5px solid var(--ws-primary)' : '1.5px solid var(--ws-line)',
                          borderRadius: 16, padding: 20, textAlign: 'left', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: 14,
                          transition: 'all var(--ws-dur-fast) var(--ws-ease)',
                        }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: 12,
                          background: 'var(--ws-orange-100)', color: 'var(--ws-primary)',
                          display: 'grid', placeItems: 'center', flex: 'none',
                        }}>
                          <i data-lucide={s.icon} style={{ width: 20, height: 20 }}></i>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ font: '700 15px/1.2 var(--ws-font-sans)', color: 'var(--ws-fg-1)' }}>
                            {isThai ? s.titleTh : s.title}
                          </div>
                          <div style={{ font: '500 12px/1 var(--ws-font-sans)', color: 'var(--ws-fg-3)', marginTop: 4 }}>
                            {s.priceLabel}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div style={{ marginTop: 24 }}>
                    <button onClick={() => { setService({ id: 'consult', title: 'Free Consultation', titleTh: 'ปรึกษาฟรี', priceLabel: 'Free' }); setStep(2); }}
                      style={{
                        width: '100%', background: 'transparent',
                        border: '1.5px dashed var(--ws-line-strong)', borderRadius: 16,
                        padding: 20, cursor: 'pointer', font: '600 14px/1 var(--ws-font-sans)',
                        color: 'var(--ws-fg-3)',
                      }}>
                      {isThai ? 'ไม่แน่ใจ — ขอปรึกษาฟรี 15 นาที →' : 'Not sure yet — book a free 15-min consultation →'}
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="page-enter">
                  <button onClick={() => setStep(1)} style={{ background: 'transparent', border: 0, color: 'var(--ws-fg-3)', cursor: 'pointer', font: '600 13px/1 var(--ws-font-sans)', padding: 0, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <i data-lucide="arrow-left" style={{ width: 14, height: 14 }}></i>
                    {isThai ? 'ย้อนกลับ' : 'Back'}
                  </button>
                  <div className="ws-num" style={{ marginBottom: 14 }}>
                    02 / 04 — {isThai ? 'เลือกหมอ' : 'Choose doctor'}
                  </div>
                  <h2 style={{ font: '500 28px/1.2 var(--ws-font-display)', margin: 0, color: 'var(--ws-fg-1)' }}>
                    {isThai ? 'ต้องการพบหมอท่านใด?' : 'Any preference for doctor?'}
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 32 }}>
                    <button onClick={() => { setDoctor(null); setStep(3); }}
                      style={{
                        background: !doctor ? 'var(--ws-orange-50)' : '#fff',
                        border: '1.5px solid var(--ws-line)',
                        borderRadius: 16, padding: 20, textAlign: 'left', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 14, gridColumn: 'span 2',
                      }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--ws-navy-50)', color: 'var(--ws-navy-800)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                        <i data-lucide="users" style={{ width: 20, height: 20 }}></i>
                      </div>
                      <div>
                        <div style={{ font: '700 15px/1.2 var(--ws-font-sans)', color: 'var(--ws-fg-1)' }}>
                          {isThai ? 'ให้คลินิกเลือกให้' : 'No preference — assign best fit'}
                        </div>
                        <div style={{ font: '500 12px/1 var(--ws-font-sans)', color: 'var(--ws-fg-3)', marginTop: 4 }}>
                          {isThai ? 'เราจะเลือกหมอที่เหมาะที่สุดให้' : 'We\'ll match you to the right specialist'}
                        </div>
                      </div>
                    </button>
                    {DOCTORS.map((d, i) => (
                      <button key={d.name} onClick={() => { setDoctor(d); setStep(3); }}
                        style={{
                          background: doctor?.name === d.name ? 'var(--ws-orange-50)' : '#fff',
                          border: doctor?.name === d.name ? '1.5px solid var(--ws-primary)' : '1.5px solid var(--ws-line)',
                          borderRadius: 16, padding: 16, textAlign: 'left', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: 12,
                        }}>
                        <div style={{
                          width: 48, height: 48, borderRadius: 12,
                          backgroundImage: 'url(assets/banner.jpg)',
                          backgroundSize: '420% auto',
                          backgroundPosition: `${20 + i * 22}% 35%`,
                          flex: 'none',
                        }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ font: '700 14px/1.2 var(--ws-font-sans)', color: 'var(--ws-fg-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {isThai ? d.nameTh : d.name}
                          </div>
                          <div style={{ font: '500 12px/1 var(--ws-font-sans)', color: 'var(--ws-primary)', marginTop: 4 }}>
                            {isThai ? d.roleTh : d.role}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="page-enter">
                  <button onClick={() => setStep(2)} style={{ background: 'transparent', border: 0, color: 'var(--ws-fg-3)', cursor: 'pointer', font: '600 13px/1 var(--ws-font-sans)', padding: 0, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <i data-lucide="arrow-left" style={{ width: 14, height: 14 }}></i>
                    {isThai ? 'ย้อนกลับ' : 'Back'}
                  </button>
                  <div className="ws-num" style={{ marginBottom: 14 }}>
                    03 / 04 — {isThai ? 'วัน-เวลา' : 'Date & time'}
                  </div>
                  <h2 style={{ font: '500 28px/1.2 var(--ws-font-display)', margin: 0, color: 'var(--ws-fg-1)' }}>
                    {isThai ? 'เลือกช่วงเวลาที่สะดวก' : 'Pick a slot.'}
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }} className="grid-2-md-1">
                    <Calendar value={date} onChange={(d) => { setDate(d); setTime(null); }} lang={lang} />
                    <div style={{ background: 'var(--ws-cloud)', border: '1px solid var(--ws-line)', borderRadius: 20, padding: 24 }}>
                      <div style={{ font: '700 14px/1 var(--ws-font-sans)', color: 'var(--ws-fg-1)', marginBottom: 4 }}>
                        {date ? dateLabel : (isThai ? 'เลือกวันก่อน' : 'Pick a date first')}
                      </div>
                      <div style={{ font: '500 12px/1.4 var(--ws-font-sans)', color: 'var(--ws-fg-3)', marginBottom: 18 }}>
                        {isThai ? 'เปิดทุกวัน 09:00 — 20:00' : 'Open daily, 09:00 — 20:00'}
                      </div>
                      {date && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                          {slots.map(s => (
                            <button key={s.time} disabled={s.taken}
                              onClick={() => setTime(s.time)}
                              className={`slot ${time === s.time ? 'slot-selected' : ''} ${s.taken ? 'slot-taken' : ''}`}>
                              {s.time}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button onClick={() => setStep(4)}
                    disabled={!date || !time}
                    style={{
                      marginTop: 32, width: '100%',
                      background: (!date || !time) ? 'var(--ws-line-strong)' : 'var(--ws-primary)',
                      color: '#fff', border: 0, padding: '18px 24px', borderRadius: 14,
                      font: '700 16px/1 var(--ws-font-sans)',
                      cursor: (!date || !time) ? 'not-allowed' : 'pointer',
                      boxShadow: (!date || !time) ? 'none' : 'var(--ws-shadow-cta)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    }}>
                    {isThai ? 'ขั้นต่อไป' : 'Continue'}
                    <i data-lucide="arrow-right" style={{ width: 18, height: 18 }}></i>
                  </button>
                </div>
              )}

              {step === 4 && (
                <form onSubmit={submit} className="page-enter">
                  <button type="button" onClick={() => setStep(3)} style={{ background: 'transparent', border: 0, color: 'var(--ws-fg-3)', cursor: 'pointer', font: '600 13px/1 var(--ws-font-sans)', padding: 0, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <i data-lucide="arrow-left" style={{ width: 14, height: 14 }}></i>
                    {isThai ? 'ย้อนกลับ' : 'Back'}
                  </button>
                  <div className="ws-num" style={{ marginBottom: 14 }}>
                    04 / 04 — {isThai ? 'ข้อมูลของคุณ' : 'Your details'}
                  </div>
                  <h2 style={{ font: '500 28px/1.2 var(--ws-font-display)', margin: 0, color: 'var(--ws-fg-1)' }}>
                    {isThai ? 'อีกนิดเดียว' : 'Almost done.'}
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 28 }}>
                    <Field label={isThai ? 'ชื่อ-นามสกุล' : 'Full name'}>
                      <input className="input" required value={info.name}
                        onChange={(e) => setInfo({ ...info, name: e.target.value })}
                        placeholder={isThai ? 'ชื่อของคุณ' : 'Your name'} />
                    </Field>
                    <Field label={isThai ? 'เบอร์โทร' : 'Phone'}>
                      <input className="input" required value={info.phone}
                        onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                        placeholder="063-000-0000" />
                    </Field>
                    <Field label={isThai ? 'อยากบอกเราอะไรเพิ่มเติม? (ถ้ามี)' : 'Anything we should know? (optional)'}>
                      <textarea className="input" rows={3}
                        value={info.notes}
                        onChange={(e) => setInfo({ ...info, notes: e.target.value })}
                        placeholder={isThai ? 'อาการเฉพาะ ความกังวล ความต้องการพิเศษ...' : 'Specific concerns, anxieties, special requests...'}
                        style={{ resize: 'vertical', minHeight: 80 }} />
                    </Field>
                  </div>

                  <button type="submit" className="btn btn-primary"
                    style={{ marginTop: 28, width: '100%', padding: '18px 24px', fontSize: 16 }}>
                    <i data-lucide="calendar-check" style={{ width: 18, height: 18 }}></i>
                    {isThai ? 'ยืนยันนัดหมาย' : 'Confirm appointment'}
                  </button>
                  <div style={{ font: '500 12px/1.5 var(--ws-font-sans)', color: 'var(--ws-fg-4)', textAlign: 'center', marginTop: 14 }}>
                    {isThai ? 'เราจะโทรยืนยันภายใน 1 ชั่วโมงทำการ ข้อมูลของคุณเป็นความลับ' : 'We\'ll call to confirm within 1 business hour. Your details stay private.'}
                  </div>
                </form>
              )}

              {step === 5 && (
                <div className="page-enter" style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{
                    width: 88, height: 88, borderRadius: '50%',
                    background: 'var(--ws-orange-100)', color: 'var(--ws-primary)',
                    display: 'grid', placeItems: 'center', margin: '0 auto 24px',
                  }}>
                    <i data-lucide="check" style={{ width: 40, height: 40 }}></i>
                  </div>
                  <h2 style={{ font: '500 36px/1.2 var(--ws-font-display)', margin: 0, color: 'var(--ws-fg-1)', letterSpacing: '-0.02em' }}>
                    {isThai ? `ขอบคุณค่ะ ${info.name}` : `Thank you, ${info.name}.`}
                  </h2>
                  <p style={{ font: '500 16px/1.6 var(--ws-font-sans)', color: 'var(--ws-fg-3)', maxWidth: 480, margin: '18px auto 32px' }}>
                    {isThai
                      ? `เราได้รับการนัดหมายของคุณแล้วสำหรับ ${dateLabel} เวลา ${time} น. — เราจะโทรยืนยันที่ ${info.phone} ภายใน 1 ชั่วโมงทำการ`
                      : `Your booking for ${dateLabel} at ${time} has been received. We'll call ${info.phone} within 1 business hour to confirm.`}
                  </p>
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={() => onNav('home')} className="btn btn-ghost">
                      {isThai ? 'กลับหน้าหลัก' : 'Back to home'}
                    </button>
                    <button onClick={() => { setStep(1); setService(null); setDoctor(null); setDate(null); setTime(null); setInfo({ name:'', phone:'', notes:'' }); }} className="btn btn-primary">
                      {isThai ? 'นัดอีกครั้ง' : 'Book another'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Step({ n, active, done, label, detail, last }) {
  return (
    <div style={{
      display: 'flex', gap: 12, alignItems: 'flex-start',
      paddingBottom: last ? 0 : 16, marginBottom: last ? 0 : 16,
      borderBottom: last ? '0' : '1px solid var(--ws-line)',
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: done ? 'var(--ws-primary)' : (active ? 'var(--ws-primary)' : 'var(--ws-cloud)'),
        color: (done || active) ? '#fff' : 'var(--ws-fg-4)',
        display: 'grid', placeItems: 'center',
        font: '700 12px/1 var(--ws-font-sans)', flex: 'none',
      }}>
        {done ? <i data-lucide="check" style={{ width: 14, height: 14 }}></i> : n}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ font: '600 13px/1 var(--ws-font-sans)', color: active ? 'var(--ws-fg-1)' : 'var(--ws-fg-3)' }}>{label}</div>
        <div style={{ font: '500 12px/1.4 var(--ws-font-sans)', color: 'var(--ws-fg-4)', marginTop: 5, textWrap: 'pretty' }}>{detail}</div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ font: '600 12px/1 var(--ws-font-sans)', color: 'var(--ws-fg-3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</span>
      {children}
    </label>
  );
}

function ContactScreen({ onNav, lang }) {
  const isThai = lang === 'th';
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div data-screen-label="06 Contact">
      <PageHeader
        eyebrow={isThai ? 'ติดต่อเรา' : 'Get in touch'}
        title={isThai ? <>มาเจอเราที่ <em className="accent-fg">ลาดกระบัง</em></> : <>Visit us in <em className="accent-fg">Ladkrabang</em>.</>}
        lead={isThai ? 'เปิดทุกวัน 09:00 — 20:00 มีที่จอดรถฟรี — ใกล้สนามบินสุวรรณภูมิ' : 'Open every day, 09:00 — 20:00. Free parking. A short drive from Suvarnabhumi.'}
      />

      <section className="ws-section" style={{ paddingTop: 32 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} className="grid-2-md-1">
            {/* Contact card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <ContactRow icon="map-pin"
                label={isThai ? 'ที่อยู่' : 'Address'}
                value="222/15 ถนนหลวงแพ่ง แขวงทับยาว เขตลาดกระบัง กรุงเทพฯ 10520"
                action={isThai ? 'ดูแผนที่' : 'Open in Maps'} />
              <ContactRow icon="clock"
                label={isThai ? 'เวลาทำการ' : 'Hours'}
                value={isThai ? 'เปิดทุกวัน · 09:00 — 20:00' : 'Open daily · 09:00 — 20:00'}
                sub={isThai ? 'รวมวันหยุดราชการส่วนใหญ่' : 'Including most public holidays'} />
              <ContactRow icon="phone"
                label={isThai ? 'โทรศัพท์' : 'Phone'}
                value="063-879-8448"
                action={isThai ? 'โทรเลย' : 'Call now'}
                href="tel:0638798448" />
              <ContactRow icon="message-circle"
                label="LINE Official"
                value="@wesmiledc1"
                action={isThai ? 'แชต LINE' : 'Chat on LINE'}
                accent="line" />

              {/* Socials */}
              <div style={{ background: '#fff', border: '1px solid var(--ws-line)', borderRadius: 24, padding: 24 }}>
                <div className="ws-eyebrow" style={{ marginBottom: 16 }}>
                  {isThai ? 'ตามเรา' : 'Follow us'}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <SocialLink platform="facebook" handle="wesmiledental1" color="#1877F2" />
                  <SocialLink platform="instagram" handle="wesmiledentalclinic" color="#E4405F" />
                  <SocialLink platform="music-2" handle="wesmiledent" label="TikTok" color="#000" />
                  <SocialLink platform="message-circle" handle="@wesmiledc1" label="LINE" color="#06C755" />
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <div className="map-frame">
                {/* Faux map markings */}
                <svg viewBox="0 0 600 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid slice">
                  {/* Roads */}
                  <path d="M -50 150 Q 100 130, 250 200 T 650 280" stroke="rgba(33,53,133,0.18)" strokeWidth="14" fill="none" strokeLinecap="round" />
                  <path d="M -50 150 Q 100 130, 250 200 T 650 280" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
                  <path d="M 200 -50 Q 250 100, 320 220 T 400 460" stroke="rgba(33,53,133,0.12)" strokeWidth="10" fill="none" strokeLinecap="round" />
                  <path d="M 200 -50 Q 250 100, 320 220 T 400 460" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <path d="M 400 0 L 380 400" stroke="rgba(33,53,133,0.10)" strokeWidth="8" fill="none" />
                  <path d="M 400 0 L 380 400" stroke="#fff" strokeWidth="3" fill="none" />
                  <path d="M 0 320 L 600 340" stroke="rgba(33,53,133,0.10)" strokeWidth="8" fill="none" />
                  <path d="M 0 320 L 600 340" stroke="#fff" strokeWidth="3" fill="none" />
                  {/* Building blocks */}
                  <rect x="60" y="60" width="80" height="50" rx="6" fill="rgba(33,53,133,0.08)" />
                  <rect x="450" y="80" width="90" height="60" rx="6" fill="rgba(33,53,133,0.08)" />
                  <rect x="80" y="240" width="70" height="40" rx="6" fill="rgba(33,53,133,0.08)" />
                  <rect x="500" y="350" width="80" height="50" rx="6" fill="rgba(33,53,133,0.08)" />
                  {/* Park */}
                  <circle cx="180" cy="320" r="40" fill="rgba(46,168,201,0.10)" />
                </svg>

                {/* Pin */}
                <div style={{
                  position: 'absolute', left: '50%', top: '46%',
                  transform: 'translate(-50%, -100%)',
                }}>
                  <div style={{
                    background: 'var(--ws-primary)', color: '#fff',
                    padding: '14px 18px', borderRadius: 16,
                    boxShadow: 'var(--ws-shadow-lg)',
                    display: 'flex', alignItems: 'center', gap: 10,
                    whiteSpace: 'nowrap',
                  }}>
                    <img src="assets/logo.png" alt="" style={{ width: 24, height: 24, background: '#fff', borderRadius: 6, padding: 2 }} />
                    <div>
                      <div style={{ font: '700 13px/1.2 var(--ws-font-sans)' }}>We Smile Dental</div>
                      <div style={{ font: '500 11px/1 var(--ws-font-sans)', opacity: 0.9, marginTop: 3 }}>Ladkrabang Branch</div>
                    </div>
                  </div>
                  <div style={{
                    width: 14, height: 14, background: 'var(--ws-primary)',
                    transform: 'translate(50%, -8px) rotate(45deg)',
                    margin: '0 auto', borderBottomRightRadius: 3,
                  }} />
                </div>

                {/* Map controls */}
                <div style={{
                  position: 'absolute', right: 14, top: 14,
                  background: '#fff', borderRadius: 10,
                  boxShadow: 'var(--ws-shadow-sm)',
                  display: 'flex', flexDirection: 'column',
                }}>
                  <button style={{ width: 36, height: 36, background: 'transparent', border: 0, borderBottom: '1px solid var(--ws-line)', cursor: 'pointer', color: 'var(--ws-fg-2)' }}>
                    <i data-lucide="plus" style={{ width: 16, height: 16 }}></i>
                  </button>
                  <button style={{ width: 36, height: 36, background: 'transparent', border: 0, cursor: 'pointer', color: 'var(--ws-fg-2)' }}>
                    <i data-lucide="minus" style={{ width: 16, height: 16 }}></i>
                  </button>
                </div>

                <div style={{
                  position: 'absolute', left: 14, bottom: 14,
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 12, padding: '10px 14px',
                  font: '500 11px/1 var(--ws-font-sans)', color: 'var(--ws-fg-3)',
                }}>
                  Lat Krabang · Bangkok
                </div>
              </div>

              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <button className="btn btn-ghost" style={{ padding: '12px 16px', fontSize: 13 }}>
                  <i data-lucide="navigation" style={{ width: 14, height: 14 }}></i>
                  {isThai ? 'นำทาง' : 'Get directions'}
                </button>
                <button onClick={() => onNav('booking')} className="btn btn-primary" style={{ padding: '12px 16px', fontSize: 13 }}>
                  <i data-lucide="calendar-check" style={{ width: 14, height: 14 }}></i>
                  {isThai ? 'นัดหมาย' : 'Book a visit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full FAQ */}
      <section className="ws-section" style={{ background: 'var(--ws-orange-50)' }}>
        <div className="container-narrow">
          <div className="ws-num" style={{ marginBottom: 16 }}>
            {isThai ? 'คำถามที่พบบ่อย' : 'Frequently asked questions'}
          </div>
          <h2 className="ws-h2" style={{ margin: 0, marginBottom: 32 }}>
            {isThai ? 'อะไรที่คนไข้ถามเราบ่อยที่สุด' : 'What patients usually ask us.'}
          </h2>
          <div>
            {FAQS.map((f, i) => (
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
      </section>
    </div>
  );
}

function ContactRow({ icon, label, value, sub, action, href, accent }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid var(--ws-line)',
      borderRadius: 20, padding: 24,
      display: 'flex', alignItems: 'center', gap: 18,
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: accent === 'line' ? 'rgba(6,199,85,0.1)' : 'var(--ws-orange-100)',
        color: accent === 'line' ? '#06C755' : 'var(--ws-primary)',
        display: 'grid', placeItems: 'center', flex: 'none',
      }}>
        <i data-lucide={icon} style={{ width: 24, height: 24 }}></i>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: '500 11px/1 var(--ws-font-sans)', color: 'var(--ws-fg-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
        <div style={{ font: '600 15px/1.4 var(--ws-font-sans)', color: 'var(--ws-fg-1)', textWrap: 'pretty' }}>{value}</div>
        {sub && <div style={{ font: '500 13px/1.4 var(--ws-font-sans)', color: 'var(--ws-fg-3)', marginTop: 4 }}>{sub}</div>}
      </div>
      {action && (
        href ? <a href={href} className="btn btn-ghost" style={{ padding: '10px 16px', fontSize: 13, textDecoration: 'none' }}>{action}</a>
        : <button className="btn btn-ghost" style={{ padding: '10px 16px', fontSize: 13 }}>{action}</button>
      )}
    </div>
  );
}

function SocialLink({ platform, handle, label, color }) {
  return (
    <a style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '12px 14px', borderRadius: 12,
      border: '1px solid var(--ws-line)',
      textDecoration: 'none', color: 'var(--ws-fg-2)',
      cursor: 'pointer',
      transition: 'all var(--ws-dur-fast) var(--ws-ease)',
    }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--ws-line)'; e.currentTarget.style.color = 'var(--ws-fg-2)'; }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: color, color: '#fff', display: 'grid', placeItems: 'center', flex: 'none' }}>
        <i data-lucide={platform} style={{ width: 16, height: 16 }}></i>
      </div>
      <div style={{ minWidth: 0 }}>
        {label && <div style={{ font: '500 11px/1 var(--ws-font-sans)', color: 'var(--ws-fg-4)', marginBottom: 3, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>}
        <div style={{ font: '600 13px/1 var(--ws-font-sans)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{handle}</div>
      </div>
    </a>
  );
}

Object.assign(window, { BookingScreen, ContactScreen });
