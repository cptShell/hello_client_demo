type PlaceholderPageProps = {
  description: string
  title: string
}

export function PlaceholderPage({
  description,
  title,
}: PlaceholderPageProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="space-y-3">
        <p className="text-xs/4 font-medium uppercase tracking-wider text-text-active">
          Demo destination
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base/7 text-text-secondary">
          {description}
        </p>
      </header>
    </div>
  )
}
