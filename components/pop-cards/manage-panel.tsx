"use client"

import { useState } from "react"
import { Check, CreditCard, Lock, Plus, ShieldCheck, Wallet } from "lucide-react"

const TOP_UP_AMOUNTS = [5, 10, 20, 40]

// Payment Method Option Types
type PaymentMethod = "card" | "apple-pay"

export function ManagePanel() {
  const [balance, setBalance] = useState(12.4)
  const [selected, setSelected] = useState(10)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  
  // Card input states
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8892")
  const [expiry, setExpiry] = useState("08/28")
  const [cvv, setCvv] = useState("•••")
  
  // Interaction states
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastAction, setLastAction] = useState<string | null>(null)

  const handleTopUp = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setLastAction(null)

    // Simulate payment process delay
    setTimeout(() => {
      setBalance((b) => Math.round((b + selected) * 100) / 100)
      setLastAction(`Successfully added £${selected.toFixed(2)} to your Pop card!`)
      setIsProcessing(false)
    }, 1200)
  }

  return (
    <section aria-labelledby="manage-heading" className="w-full">
      <div>
        <h2 id="manage-heading" className="text-2xl font-bold tracking-tight text-foreground">
          Manage your Pop card
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Check your balance and top up instantly. (Interactive conceptual demo — no real money charged).
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Left Column: Pop Card Visual Display */}
        <div className="flex flex-col justify-between rounded-2xl border border-nexus-green/30 bg-gradient-to-br from-primary via-primary/90 to-nexus-ink p-6 text-primary-foreground shadow-md min-h-[220px]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium opacity-90">
              <CreditCard className="size-4 text-nexus-yellow" aria-hidden="true" />
              Pop PAYG •••• 4821
            </span>
            <Wallet className="size-6 opacity-80" aria-hidden="true" />
          </div>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-wider opacity-80 font-medium">Current Balance</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold tabular-nums tracking-tight" aria-live="polite">
                £{balance.toFixed(2)}
              </span>
              <span className="text-xs rounded-full bg-nexus-green/30 px-2 py-0.5 text-nexus-yellow font-medium">
                Active
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-primary-foreground/15 pt-3 text-xs opacity-80">
            <span>Tyne & Wear Metro</span>
            <span>Cardholder: J. Smith</span>
          </div>
        </div>

        {/* Right Column: Top Up & Payment Method Controls */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
          <form onSubmit={handleTopUp} className="space-y-5">
            {/* Amount Selection */}
            <div>
              <label className="text-sm font-semibold text-foreground">
                Select Top-Up Amount
              </label>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {TOP_UP_AMOUNTS.map((amount) => {
                  const isActive = selected === amount
                  return (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setSelected(amount)}
                      aria-pressed={isActive}
                      className={`rounded-xl py-2.5 text-base font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                        isActive
                          ? "border-2 border-primary bg-primary/10 text-primary shadow-xs"
                          : "border border-border bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      £{amount}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Payment Method Selection */}
            <div>
              <span className="text-sm font-semibold text-foreground">
                Select Payment Method
              </span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-medium transition-all ${
                    paymentMethod === "card"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <CreditCard className="size-4" />
                  Credit/Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("apple-pay")}
                  className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-medium transition-all ${
                    paymentMethod === "apple-pay"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <ApplePayIcon className="h-4" />
                  Pay
                </button>
              </div>
            </div>

            {/* Card Inputs (if card method chosen) */}
            {paymentMethod === "card" && (
              <div className="space-y-3 rounded-xl border border-border/80 bg-muted/30 p-3.5">
                {/* Accepted Logos Bar */}
                <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
                  <span className="text-xs font-medium text-muted-foreground">
                    Accepted Cards
                  </span>
                  <div className="flex items-center gap-2">
                    <VisaLogo className="h-3.5" />
                    <MastercardLogo className="h-4" />
                    <MaestroLogo className="h-4" />
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-2.5 pt-1">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9101 1121"
                      required
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-2 focus:outline-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        required
                        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-2 focus:outline-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                        required
                        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-2 focus:outline-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isProcessing}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-base font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.99] disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Plus className="size-4" aria-hidden="true" />
                  Pay & Top Up £{selected.toFixed(2)}
                </>
              )}
            </button>

            {/* Status Feedback */}
            {lastAction && (
              <div
                className="flex items-center gap-2 rounded-xl bg-nexus-green/15 border border-nexus-green/30 px-3.5 py-3 text-sm font-medium text-nexus-green"
                role="status"
              >
                <Check className="size-4 shrink-0" />
                <span>{lastAction}</span>
              </div>
            )}

            {/* Security Footer Note */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-1">
              <Lock className="size-3 text-nexus-green" />
              <ShieldCheck className="size-3 text-nexus-blue" />
              <span>256-bit encrypted secure transaction demo</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   Inline SVG Payment Provider Logos (Visa, Mastercard, Maestro, Apple Pay)
   ========================================================================== */

function VisaLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.882 0.312L9.123 11.602H6.126L3.693 2.502C3.546 1.928 3.412 1.716 2.97 1.48C2.26 1.096 1.056 0.73 0 0.502L0.082 0.312H5.093C5.748 0.312 6.32 0.742 6.46 1.482L7.697 8.082L10.746 0.312H13.882ZM25.962 8.16C25.973 5.048 21.658 4.872 21.685 3.486C21.693 3.064 22.1 2.612 23.013 2.492C23.465 2.43 24.717 2.378 26.037 2.982L26.568 0.506C25.842 0.244 24.912 0 23.77 0C20.865 0 18.805 1.542 18.788 3.738C18.762 5.372 20.244 6.284 21.36 6.83C22.508 7.39 22.894 7.746 22.888 8.246C22.877 9.012 21.966 9.352 21.118 9.366C19.641 9.39 18.783 8.972 18.103 8.658L17.558 11.202C18.358 11.57 19.837 11.88 21.365 11.896C24.453 11.896 26.46-0.37 25.962 8.16ZM33.682 11.602H36.425L34.032 0.312H31.572C30.985 0.312 30.495 0.654 30.28 1.168L25.882 11.602H28.98L29.598 9.892H33.415L33.682 11.602ZM30.45 7.552L32.008 3.284L32.905 7.552H30.45ZM18.332 0.312L15.932 11.602H13.013L15.413 0.312H18.332Z" fill="#1A1F71"/>
    </svg>
  )
}

function MastercardLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7.5" r="7" fill="#EB001B"/>
      <circle cx="17" cy="7.5" r="7" fill="#F79E1B"/>
      <path d="M12 2.138A6.98 6.98 0 009.28 7.5c0 2.227.973 4.223 2.52 5.562A6.98 6.98 0 0014.52 7.5a6.98 6.98 0 00-2.52-5.362z" fill="#FF5F00"/>
    </svg>
  )
}

function MaestroLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7.5" r="7" fill="#0061A8"/>
      <circle cx="17" cy="7.5" r="7" fill="#EB001B"/>
      <path d="M12 2.138A6.98 6.98 0 009.28 7.5c0 2.227.973 4.223 2.52 5.562A6.98 6.98 0 0014.52 7.5a6.98 6.98 0 00-2.52-5.362z" fill="#6C6BBD"/>
    </svg>
  )
}

function ApplePayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.093 5.433c-.22.257-.552.428-.887.428-.046 0-.095-.003-.135-.008.016-.273.138-.564.316-.763.223-.25.56-.407.873-.414.04 0 .083.003.118.008-.01.272-.126.559-.285.749zm1.08 3.513c-.267.382-.533.757-.962.763-.42.008-.556-.243-1.037-.243-.487 0-.638.236-1.038.251-.418.015-.724-.41-.992-.792-.549-.785-.968-2.227-.406-3.193.28-.481.78-.785 1.326-.792.417-.008.81.274 1.038.274.228 0 .736-.339 1.259-.289.218.01.83.087 1.224.655-.032.02-.728.421-.72 1.246.008.99.873 1.32 1.002 1.373-.082.243-.306.84-.716 1.432l.024.016z"/>
    </svg>
  )
}
