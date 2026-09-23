"use client"

import { useState } from "react"
import { CreditCard, Plus, Wallet } from "lucide-react"

const TOP_UP_AMOUNTS = [5, 10, 20, 40]

export function ManagePanel() {
  const [balance, setBalance] = useState(12.4)
  const [selected, setSelected] = useState(10)
  const [lastAction, setLastAction] = useState<string | null>(null)

  const topUp = () => {
    setBalance((b) => Math.round((b + selected) * 100) / 100)
    setLastAction(`Added £${selected.toFixed(2)} to your Pop card.`)
  }

  return (
    <section aria-labelledby="manage-heading">
      <h2 id="manage-heading" className="text-2xl font-bold tracking-tight">
        Manage your card
      </h2>
      <p className="mt-2 text-muted-foreground">
        Check your balance and top up in seconds. This is a conceptual demo — no real
        payment is taken.
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        {/* Balance card */}
        <div className="flex flex-col justify-between rounded-2xl bg-primary p-6 text-primary-foreground">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium opacity-90">
              <CreditCard className="size-4" aria-hidden="true" />
              Standard Pop •••• 4821
            </span>
            <Wallet className="size-5 opacity-90" aria-hidden="true" />
          </div>
          <div className="mt-8">
            <p className="text-sm opacity-90">Current balance</p>
            <p className="text-4xl font-bold tabular-nums" aria-live="polite">
              £{balance.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Top up controls */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold">Top up balance</h3>
          <fieldset className="mt-4">
            <legend className="sr-only">Choose a top-up amount</legend>
            <div className="grid grid-cols-4 gap-2">
              {TOP_UP_AMOUNTS.map((amount) => {
                const isActive = selected === amount
                return (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setSelected(amount)}
                    aria-pressed={isActive}
                    className={
                      isActive
                        ? "rounded-lg border-2 border-primary bg-secondary py-3 text-base font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        : "rounded-lg border border-border bg-background py-3 text-base font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    }
                  >
                    £{amount}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={topUp}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Plus className="size-4" aria-hidden="true" />
            Add £{selected.toFixed(2)}
          </button>

          {lastAction && (
            <p
              className="mt-3 rounded-lg bg-secondary px-3 py-2 text-sm text-foreground"
              role="status"
            >
              {lastAction}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
