import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="font-display text-6xl text-text">404</h1>
      <p className="max-w-md text-lg text-muted">
        Esta página no existe. Volvé al inicio para continuar.
      </p>
      <Link
        href="/"
        className="rounded-md bg-accent px-6 py-3 font-medium text-black transition-transform hover:scale-105"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
