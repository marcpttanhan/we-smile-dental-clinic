// Branches.jsx — 4-location overview with styled map UI

function BranchesScreen({ onNav, lang, photoFilter }) {
  const isThai = lang === 'th';
  const [activeBranch, setActiveBranch] = useState(BRANCHES[0].id);

  return (
    <div data-screen-label="04 Branches">
      <PageHeader
        eyebrow={isThai ? 'สี่สาขาทั่วกรุงเทพฯ' : 'Four locations across Bangkok'}
        title={isThai
          ? <span style={{ fontSize: 'clamp(26px, 5vw, 72px)', display: 'block', lineHeight: 1.1 }}>
              4 สาขา <em className="accent-fg" style={{ fontStyle: 'normal' }}>มาตรฐาน เดียว</em>
            </span>
          : <>A clinic that's <em className="accent-fg">always close</em>.</>}
        lead={isThai ? 'เลือกสาขาที่สะดวกที่สุดสำหรับคุณ — ทุกสาขาให้บริการมาตรฐานเดียวกัน' : 'Pick the branch that\'s easiest to reach. Every We Smile clinic delivers the same standard of care.'}
      />

      {/* Map + branch selector — Dermapride-inspired split */}
      <section className="ws-section" style={{ paddingTop: 32 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, alignItems: 'stretch' }} className="grid-2-md-1">
            {/* Big shared map — moves below branch list on mobile via CSS order */}
            <div className="map-frame map-order-mobile" style={{ aspectRatio: '4/3', minHeight: 480 }}>
              <BranchesMap branches={BRANCHES} activeId={activeBranch} onPick={setActiveBranch} />
            </div>

            {/* Branch list — comes first on mobile */}
            <div className="list-order-mobile" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {BRANCHES.map((b, i) => (
                <BranchListItem
                  key={b.id}
                  b={b}
                  active={activeBranch === b.id}
                  onClick={() => setActiveBranch(b.id)}
                  onBook={() => onNav('booking')}
                  lang={lang}
                  index={i + 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed cards — one per branch */}
      <section className="ws-section" style={{ background: 'var(--ws-orange-50)', paddingTop: 96, paddingBottom: 96 }}>
        <div className="container">
          <SectionHead num={2} eyebrow={isThai ? 'รายละเอียดสาขา' : 'Branch details'}
            title={isThai ? 'ทุกสาขา ออกแบบให้สบายและคุ้นเคย' : 'Every branch, designed to feel like home.'}
            total={6}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }} className="grid-2-md-1">
            {BRANCHES.map((b) => (
              <BranchCard key={b.id} b={b} lang={lang} photoFilter={photoFilter} onBook={() => onNav('booking')} />
            ))}
          </div>
        </div>
      </section>

      <CTABand onNav={onNav} lang={lang} />
    </div>
  );
}

function BranchListItem({ b, active, onClick, onBook, lang, index }) {
  const isThai = lang === 'th';
  return (
    <div onClick={onClick} style={{
      background: '#fff',
      border: active ? '1.5px solid var(--ws-primary)' : '1px solid var(--ws-line)',
      borderRadius: 20, padding: 22,
      cursor: 'pointer',
      boxShadow: active ? 'var(--ws-shadow-md)' : 'var(--ws-shadow-sm)',
      display: 'flex', gap: 16, alignItems: 'flex-start',
      transition: 'all var(--ws-dur-fast) var(--ws-ease)',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 14,
        background: active ? 'var(--ws-primary)' : 'var(--ws-orange-100)',
        color: active ? '#fff' : 'var(--ws-primary)',
        display: 'grid', placeItems: 'center', flex: 'none',
        font: '700 14px/1 var(--ws-font-display)',
      }}>
        {String(index).padStart(2, '0')}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ font: '500 22px/1.1 var(--ws-font-display)', color: 'var(--ws-fg-1)', letterSpacing: '-0.01em' }}>
            {isThai ? b.nameTh : b.name}
          </div>
          <div style={{ font: '500 11px/1 var(--ws-font-sans)', color: 'var(--ws-fg-4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {isThai ? b.labelTh : b.label}
          </div>
        </div>
        <div style={{ font: '500 13px/1.5 var(--ws-font-sans)', color: 'var(--ws-fg-3)', marginTop: 8, textWrap: 'pretty' }}>
          {isThai ? b.address : b.addressEn}
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <a href={`tel:${b.phone.replace(/-/g, '')}`}
            onClick={(e) => e.stopPropagation()}
            style={{ display: 'flex', alignItems: 'center', gap: 6, font: '600 13px/1 var(--ws-font-sans)', color: 'var(--ws-primary)', textDecoration: 'none' }}>
            <i data-lucide="phone" style={{ width: 13, height: 13 }}></i>
            {b.phone}
          </a>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, font: '500 13px/1 var(--ws-font-sans)', color: 'var(--ws-fg-3)' }}>
            <i data-lucide="clock" style={{ width: 13, height: 13 }}></i>
            {b.hours}
          </span>
        </div>
      </div>
    </div>
  );
}

// Bigger detail card for each branch — Dermapride-style
function BranchCard({ b, lang, photoFilter, onBook }) {
  const isThai = lang === 'th';
  return (
    <div style={{
      background: '#fff', borderRadius: 32, overflow: 'hidden',
      border: '1px solid var(--ws-line)', boxShadow: 'var(--ws-shadow-md)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Top: faux map for this branch */}
      <div style={{ position: 'relative', height: 200, background: 'var(--ws-cloud)' }}>
        <SingleBranchMap b={b} />
        <div style={{
          position: 'absolute', left: 18, top: 18,
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
          borderRadius: 999, padding: '6px 14px',
          font: '600 11px/1 var(--ws-font-sans)', color: 'var(--ws-primary)',
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>{isThai ? b.labelTh : b.label}</div>
      </div>

      {/* Body */}
      <div style={{ padding: 28, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ margin: 0, font: '500 28px/1.1 var(--ws-font-display)', color: 'var(--ws-fg-1)', letterSpacing: '-0.02em' }}>
          We Smile · {isThai ? b.nameTh : b.name}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20, marginBottom: 20 }}>
          <BranchRow icon="map-pin">{isThai ? b.address : b.addressEn}</BranchRow>
          <BranchRow icon="phone"><a href={`tel:${b.phone.replace(/-/g, '')}`} style={{ color: 'var(--ws-fg-1)', textDecoration: 'none', fontWeight: 600 }}>{b.phone}</a></BranchRow>
          <BranchRow icon="clock">{isThai ? b.hoursTh : `Open daily · ${b.hours}`}</BranchRow>
        </div>

        {/* Landmarks chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {(isThai ? b.landmarksTh : b.landmarks).map(l => (
            <span key={l} className="chip chip-navy">{l}</span>
          ))}
        </div>

        {/* Footer actions */}
        <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid var(--ws-line)', display: 'flex', gap: 8 }}>
          <button onClick={onBook} className="btn btn-primary" style={{ flex: 1, padding: '14px 20px', fontSize: 14 }}>
            <i data-lucide="calendar-check" style={{ width: 16, height: 16 }}></i>
            {isThai ? `นัดที่สาขา${b.nameTh}` : `Book at ${b.name}`}
          </button>
          <button className="btn btn-ghost" style={{ padding: '14px 16px', fontSize: 14 }} aria-label="Directions">
            <i data-lucide="navigation" style={{ width: 16, height: 16 }}></i>
          </button>
        </div>
      </div>
    </div>
  );
}

function BranchRow({ icon, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--ws-orange-50)', color: 'var(--ws-primary)', display: 'grid', placeItems: 'center', flex: 'none', marginTop: 1 }}>
        <i data-lucide={icon} style={{ width: 14, height: 14 }}></i>
      </div>
      <div style={{ font: '500 14px/1.5 var(--ws-font-sans)', color: 'var(--ws-fg-2)', textWrap: 'pretty', flex: 1 }}>{children}</div>
    </div>
  );
}

// Single-branch mini-map (used in branch cards)
function SingleBranchMap({ b }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 600 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid slice">
        {/* Soft map base */}
        <defs>
          <linearGradient id={`mapBg-${b.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EFF2F7" />
            <stop offset="100%" stopColor="#E4E8EF" />
          </linearGradient>
        </defs>
        <rect width="600" height="400" fill={`url(#mapBg-${b.id})`} />
        {/* Roads */}
        <path d="M -20 180 Q 150 160, 300 200 T 620 250" stroke="rgba(33,53,133,0.15)" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M -20 180 Q 150 160, 300 200 T 620 250" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M 250 -50 Q 280 100, 320 220 T 380 460" stroke="rgba(33,53,133,0.10)" strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M 250 -50 Q 280 100, 320 220 T 380 460" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Blocks */}
        <rect x="50" y="40" width="80" height="40" rx="6" fill="rgba(33,53,133,0.08)" />
        <rect x="430" y="60" width="120" height="50" rx="6" fill="rgba(33,53,133,0.08)" />
        <rect x="80" y="280" width="90" height="60" rx="6" fill="rgba(33,53,133,0.08)" />
        <rect x="450" y="320" width="100" height="50" rx="6" fill="rgba(33,53,133,0.08)" />
        <circle cx="200" cy="350" r="35" fill="rgba(46,168,201,0.10)" />
      </svg>
      <BranchPin x={b.pin.x} y={b.pin.y} active />
    </div>
  );
}

// All-branches map for the top section
function BranchesMap({ branches, activeId, onPick }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 600 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="mapBgAll" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F2F4FB" />
            <stop offset="100%" stopColor="#E4E8EF" />
          </linearGradient>
        </defs>
        <rect width="600" height="400" fill="url(#mapBgAll)" />
        {/* Bangkok-ish road grid */}
        <path d="M -50 220 Q 100 200, 250 230 T 650 270" stroke="rgba(33,53,133,0.15)" strokeWidth="16" fill="none" strokeLinecap="round" />
        <path d="M -50 220 Q 100 200, 250 230 T 650 270" stroke="#fff" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M 50 -30 Q 100 100, 180 180 T 250 460" stroke="rgba(33,53,133,0.12)" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M 50 -30 Q 100 100, 180 180 T 250 460" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 350 -30 Q 380 100, 420 220 T 460 460" stroke="rgba(33,53,133,0.12)" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M 350 -30 Q 380 100, 420 220 T 460 460" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 0 80 L 600 100" stroke="rgba(33,53,133,0.08)" strokeWidth="6" fill="none" />
        <path d="M 0 80 L 600 100" stroke="#fff" strokeWidth="3" fill="none" />
        <path d="M 0 340 L 600 320" stroke="rgba(33,53,133,0.08)" strokeWidth="6" fill="none" />
        <path d="M 0 340 L 600 320" stroke="#fff" strokeWidth="3" fill="none" />
        {/* Buildings */}
        <rect x="40" y="40" width="60" height="40" rx="6" fill="rgba(33,53,133,0.07)" />
        <rect x="500" y="50" width="80" height="40" rx="6" fill="rgba(33,53,133,0.07)" />
        <rect x="450" y="350" width="120" height="40" rx="6" fill="rgba(33,53,133,0.07)" />
        <rect x="20" y="350" width="80" height="40" rx="6" fill="rgba(33,53,133,0.07)" />
        {/* Park */}
        <circle cx="120" cy="120" r="32" fill="rgba(46,168,201,0.10)" />
        <circle cx="480" cy="280" r="40" fill="rgba(46,168,201,0.10)" />
      </svg>

      {branches.map(b => (
        <BranchPin
          key={b.id}
          x={b.pin.x} y={b.pin.y}
          active={activeId === b.id}
          label={b.name}
          onClick={() => onPick(b.id)}
        />
      ))}

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
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
        borderRadius: 12, padding: '10px 14px',
        font: '500 11px/1 var(--ws-font-sans)', color: 'var(--ws-fg-3)',
      }}>
        Bangkok · {branches.length} clinics
      </div>
    </div>
  );
}

function BranchPin({ x, y, active, label, onClick }) {
  return (
    <button onClick={onClick} style={{
      position: 'absolute',
      left: `${x * 100}%`, top: `${y * 100}%`,
      transform: 'translate(-50%, -100%)',
      background: 'transparent', border: 0, padding: 0,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'transform var(--ws-dur-base) var(--ws-ease)',
      zIndex: active ? 5 : 1,
    }}>
      <div style={{
        background: active ? 'var(--ws-primary)' : '#fff',
        color: active ? '#fff' : 'var(--ws-primary)',
        padding: active ? '10px 14px' : '8px 12px',
        borderRadius: 14,
        boxShadow: active ? 'var(--ws-shadow-lg)' : 'var(--ws-shadow-md)',
        border: active ? 'none' : '1.5px solid var(--ws-primary)',
        display: 'flex', alignItems: 'center', gap: 8,
        whiteSpace: 'nowrap',
        transform: active ? 'scale(1.05)' : 'scale(1)',
        transition: 'all var(--ws-dur-base) var(--ws-ease)',
      }}>
        <i data-lucide="map-pin" style={{ width: active ? 16 : 14, height: active ? 16 : 14 }}></i>
        {label && (
          <span style={{ font: `${active ? 700 : 600} ${active ? 13 : 12}px/1 var(--ws-font-sans)` }}>
            {label}
          </span>
        )}
      </div>
      <div style={{
        width: 10, height: 10,
        background: active ? 'var(--ws-primary)' : '#fff',
        border: active ? 'none' : '1.5px solid var(--ws-primary)',
        borderTop: 'none', borderLeft: 'none',
        transform: 'translate(50%, -5px) rotate(45deg)',
        margin: '0 auto', borderBottomRightRadius: 2,
      }} />
    </button>
  );
}

Object.assign(window, { BranchesScreen, BranchCard, BranchesMap });
