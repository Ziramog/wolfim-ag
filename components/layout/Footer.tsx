import { cn } from "@/lib/utils/cn"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bg border-t border-border pt-20 pb-10">
      <div className="max-w-container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <a href="/" className="inline-block mb-6" data-cursor>
              <img 
                src="/images/desktop/wolfim_logo_header.jpeg" 
                alt="WOLFIM Logo" 
                className="h-[60px] w-auto object-contain brightness(0) invert(1)" 
              />
            </a>
            <p className="text-muted text-sm max-w-sm leading-relaxed">
              Agencia de ingeniería de crecimiento digital. 
              Ayudamos a empresas a escalar sus resultados mediante 
              sistemas de adquisición de alto rendimiento.
            </p>
          </div>

          {/* Niches Col */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-widest text-text mb-6">Enfoque</h4>
            <ul className="space-y-4">
              <li>
                <a href="/clinicas" className="text-sm text-muted hover:text-accent transition-colors">Clínicas</a>
              </li>
              <li>
                <a href="/restaurantes" className="text-sm text-muted hover:text-accent transition-colors">Restaurantes</a>
              </li>
              <li>
                <a href="/Ecommerce" className="text-sm text-muted hover:text-accent transition-colors">E-commerce</a>
              </li>
              <li>
                <a href="/agencias" className="text-sm text-muted hover:text-accent transition-colors">B2B & Agencias</a>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-widest text-text mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://wa.me/5493510000000" 
                  className="text-sm text-muted hover:text-accent transition-colors flex items-center gap-2"
                >
                  WhatsApp
                  <span className="text-[10px] bg-accent/10 px-1.5 py-0.5 rounded text-accent">24/7</span>
                </a>
              </li>
              <li>
                <a href="mailto:hola@wolfim.com" className="text-sm text-muted hover:text-accent transition-colors">hola@wolfim.com</a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted hover:text-accent transition-colors">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-muted font-mono uppercase tracking-wider">
            © {currentYear} WOLFIM AG. Córdoba, Argentina. 
            Estrategia Global, Ejecución Local.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] text-muted hover:text-text transition-colors uppercase tracking-widest">Legal</a>
            <a href="#" className="text-[10px] text-muted hover:text-text transition-colors uppercase tracking-widest">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
