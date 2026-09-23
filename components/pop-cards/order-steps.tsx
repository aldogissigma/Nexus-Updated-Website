const STEPS = [
  {
    title: "Pick your card",
    description: "Choose the Pop card that matches your age and travel needs.",
  },
  {
    title: "Add your details",
    description: "Enter your name, address and a photo for age-based cards.",
  },
  {
    title: "Top up (optional)",
    description: "Add a starting balance or a season pass, or do it later.",
  },
  {
    title: "Start travelling",
    description: "Your card arrives within 5 working days — just tap and go.",
  },
]

export function OrderSteps() {
  return (
    <section aria-labelledby="order-steps-heading">
      <h2 id="order-steps-heading" className="text-2xl font-bold tracking-tight">
        Ordering takes about 3 minutes
      </h2>
      <p className="mt-2 text-muted-foreground">
        A clear, four-step process with no jargon.
      </p>

      <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className="relative rounded-2xl border border-border bg-card p-5"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
              {index + 1}
            </span>
            <h3 className="mt-4 font-semibold">{step.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
