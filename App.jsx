// App.jsx — root, routing, tweaks
// Routes supported (via setScreen string):
//   'home', 'services', 'doctors', 'branches', 'about', 'booking', 'contact'
//   'service:<id>'             — service category drill-down
//   'service:<id>/<subId>'     — sub-service detail
//   'doctor:<id>'              — doctor profile

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "en",
  "emphasis": "orange",
  "density": "default",
  "photoTreatment": "warm"
}/*EDITMODE-END*/;

function parseRoute(screen) {
  if (!screen) return { kind: 'home' };
  if (screen.startsWith('service:')) {
    const rest = screen.slice('service:'.length);
    const [cat, sub] = rest.split('/');
    if (sub) return { kind: 'subservice', categoryId: cat, subId: sub };
    return { kind: 'servicecat', categoryId: cat };
  }
  if (screen.startsWith('doctor:')) {
    return { kind: 'doctor', doctorId: screen.slice('doctor:'.length) };
  }
  return { kind: screen };
}

function navActiveId(screen) {
  if (!screen) return 'home';
  if (screen.startsWith('service')) return 'services';
  if (screen.startsWith('doctor')) return 'doctors';
  return screen;
}

function App() {
  const [screen, setScreen] = useState('home');
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [screen]);

  const onNav = (s) => setScreen(s);
  const photoFilter = `photo-${tweaks.photoTreatment}`;
  const densityClass = `density-${tweaks.density}`;
  const props = { onNav, lang: tweaks.lang, photoFilter };

  const route = parseRoute(screen);
  const navActive = navActiveId(screen);

  return (
    <div data-emphasis={tweaks.emphasis} className={densityClass}>
      <Navbar active={navActive} onNav={onNav} lang={tweaks.lang} />

      {route.kind === 'home'      && <HomeScreen {...props} />}
      {route.kind === 'services'  && <ServicesScreen {...props} />}
      {route.kind === 'doctors'   && <DoctorsScreen {...props} />}
      {route.kind === 'branches'  && <BranchesScreen {...props} />}
      {route.kind === 'about'     && <AboutScreen {...props} />}
      {route.kind === 'booking'   && <BookingScreen {...props} />}
      {route.kind === 'contact'   && <ContactScreen {...props} />}
      {route.kind === 'servicecat' && <ServiceCategoryScreen {...props} serviceId={route.categoryId} />}
      {route.kind === 'subservice' && <SubServiceScreen {...props} categoryId={route.categoryId} subId={route.subId} />}
      {route.kind === 'doctor'    && <DoctorProfileScreen {...props} doctorId={route.doctorId} />}

      <Footer onNav={onNav} lang={tweaks.lang} />
      <LineBubble />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Language">
          <TweakRadio value={tweaks.lang} onChange={(v) => setTweak('lang', v)}
            options={[{ value: 'en', label: 'English' }, { value: 'th', label: 'ไทย' }]} />
        </TweakSection>
        <TweakSection title="Color emphasis">
          <TweakRadio value={tweaks.emphasis} onChange={(v) => setTweak('emphasis', v)}
            options={[{ value: 'orange', label: 'Orange' }, { value: 'navy', label: 'Navy' }]} />
        </TweakSection>
        <TweakSection title="Density">
          <TweakRadio value={tweaks.density} onChange={(v) => setTweak('density', v)}
            options={[
              { value: 'compact', label: 'Compact' },
              { value: 'default', label: 'Default' },
              { value: 'airy', label: 'Airy' },
            ]} />
        </TweakSection>
        <TweakSection title="Photo treatment">
          <TweakRadio value={tweaks.photoTreatment} onChange={(v) => setTweak('photoTreatment', v)}
            options={[{ value: 'warm', label: 'Warm grade' }, { value: 'neutral', label: 'Neutral' }]} />
        </TweakSection>

        <TweakSection title="Quick navigation">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {NAV_LINKS.map(l => (
              <TweakButton key={l.id} onClick={() => onNav(l.id)}>{l.label}</TweakButton>
            ))}
          </div>
        </TweakSection>

        <TweakSection title="Deep-link demos">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <TweakButton onClick={() => onNav('service:orthodontics')}>Service: Orthodontics</TweakButton>
            <TweakButton onClick={() => onNav('service:orthodontics/invisalign')}>Sub: Invisalign</TweakButton>
            <TweakButton onClick={() => onNav('service:implants/all-on-4')}>Sub: All-on-4</TweakButton>
            <TweakButton onClick={() => onNav('doctor:pichaya')}>Doctor: Pichaya</TweakButton>
            <TweakButton onClick={() => onNav('doctor:anusorn')}>Doctor: Anusorn</TweakButton>
          </div>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
