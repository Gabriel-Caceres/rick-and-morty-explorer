import { useEffect, useState } from 'react';
import { ArrowRight, Orbit } from 'lucide-react';

// Aparece cada vez que se abre o recarga la página.
// No depende del resultado de la API: el catálogo carga en paralelo.
export default function PortalIntro() {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!visible) return;

    // Respeta la preferencia de accesibilidad del sistema.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const fadeTimer = window.setTimeout(() => setClosing(true), 2100);
    const removeTimer = window.setTimeout(() => setVisible(false), 2700);
    const handleEscape = (event) => {
      if (event.key === 'Escape') setVisible(false);
    };
    document.addEventListener('keydown', handleEscape);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`portal-intro${closing ? ' portal-intro--closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Animación de entrada al multiverso"
    >
      <div className="intro-starfield" aria-hidden="true" />
      <div className="intro-beam intro-beam--one" aria-hidden="true" />
      <div className="intro-beam intro-beam--two" aria-hidden="true" />

      <div className="intro-content">
        <div className="intro-vortex" aria-hidden="true">
          <span className="intro-ring intro-ring--outer" />
          <span className="intro-ring intro-ring--inner" />
          <img src="/art/portal-duo.webp" alt="" className="intro-portal-image" />
          <span className="intro-spark intro-spark--a" />
          <span className="intro-spark intro-spark--b" />
          <span className="intro-spark intro-spark--c" />
        </div>

        <div className="intro-copy">
          <div className="intro-overline"><Orbit size={15} /> INICIANDO VIAJE INTERDIMENSIONAL</div>
          <h2>PORTAL<span>VERSE</span></h2>
          <p>Abriendo el portal hacia el multiverso...</p>
          <div className="intro-progress" aria-hidden="true"><span /></div>
        </div>
      </div>

      <button className="intro-skip" type="button" onClick={() => setVisible(false)}>
        Omitir animación <ArrowRight size={16} />
      </button>
    </div>
  );
}
