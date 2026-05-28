// App-print.jsx — renders all screens stacked for PDF export

const TWEAK_DEFAULTS = {
  lang: "en",
  emphasis: "orange",
  density: "default",
  photoTreatment: "warm",
};

function PrintApp() {
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  const onNav = () => {};
  const photoFilter = `photo-${TWEAK_DEFAULTS.photoTreatment}`;
  const densityClass = `density-${TWEAK_DEFAULTS.density}`;
  const props = { onNav, lang: TWEAK_DEFAULTS.lang, photoFilter };

  const pages = [
    { id: 'home',     label: '01 Home',     C: HomeScreen },
    { id: 'services', label: '02 Services', C: ServicesScreen },
    { id: 'doctors',  label: '03 Doctors',  C: DoctorsScreen },
    { id: 'about',    label: '04 About',    C: AboutScreen },
    { id: 'booking',  label: '05 Booking',  C: BookingScreen },
    { id: 'contact',  label: '06 Contact',  C: ContactScreen },
  ];

  return (
    <div data-emphasis={TWEAK_DEFAULTS.emphasis} className={densityClass}>
      {pages.map((p, i) => (
        <div key={p.id} className="print-page" data-screen-label={p.label}>
          <Navbar active={p.id} onNav={onNav} lang={TWEAK_DEFAULTS.lang} />
          <p.C {...props} />
          <Footer onNav={onNav} lang={TWEAK_DEFAULTS.lang} />
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PrintApp />);

// Auto-print: wait for fonts + a beat for images/JSX
(async () => {
  if (window.__skipAutoPrint) return;
  try { await document.fonts.ready; } catch {}
  // Wait for images
  const imgs = [...document.images];
  await Promise.all(imgs.map(img => img.complete ? null : new Promise(r => {
    img.addEventListener('load', r, { once: true });
    img.addEventListener('error', r, { once: true });
  })));
  setTimeout(() => window.print(), 800);
})();
