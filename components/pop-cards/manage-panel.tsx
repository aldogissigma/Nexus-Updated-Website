"use client"

import { useState } from "react"
import { Check, CreditCard, Lock, Plus, ShieldCheck, Wallet } from "lucide-react"

const TOP_UP_AMOUNTS = [5, 10, 20, 40]

type PaymentMethod = "apple-pay" | "card"

/**
 * Synthesizes the Apple Pay success double-chime using Web Audio API
 */
function playApplePaySuccessSound() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()

    // Tone 1: 1046.5 Hz (C6)
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.type = "sine"
    osc1.frequency.setValueAtTime(1046.5, ctx.currentTime)
    gain1.gain.setValueAtTime(0.15, ctx.currentTime)
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
    osc1.connect(gain1)
    gain1.connect(ctx.destination)

    // Tone 2: 1567.98 Hz (G6) - slightly delayed for the classic chime
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = "sine"
    osc2.frequency.setValueAtTime(1567.98, ctx.currentTime + 0.1)
    gain2.gain.setValueAtTime(0.2, ctx.currentTime + 0.1)
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45)
    osc2.connect(gain2)
    gain2.connect(ctx.destination)

    osc1.start(ctx.currentTime)
    osc1.stop(ctx.currentTime + 0.15)
    osc2.start(ctx.currentTime + 0.1)
    osc2.stop(ctx.currentTime + 0.45)
  } catch (err) {
    console.error("Audio playback error", err)
  }
}

export function ManagePanel() {
  const [balance, setBalance] = useState(12.4)
  const [selected, setSelected] = useState(10)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("apple-pay")

  // Card Inputs
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8892")
  const [expiry, setExpiry] = useState("08/28")
  const [cvv, setCvv] = useState("•••")

  // States
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastAction, setLastAction] = useState<string | null>(null)

  const handleTopUp = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setLastAction(null)

    setTimeout(() => {
      setBalance((b) => Math.round((b + selected) * 100) / 100)
      setLastAction(`Added £${selected.toFixed(2)} to your Pop card.`)
      setIsProcessing(false)
      playApplePaySuccessSound()
    }, 1000)
  }

  return (
    <section aria-labelledby="manage-heading" className="mx-auto w-full max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <h2 id="manage-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Pop Card & Balance
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Check your travel balance and top up instantly with Apple Pay or Debit Card.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Apple Wallet Card Visual */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e2c26] via-[#12705f] to-[#0c3a33] p-7 text-white shadow-xl border border-white/10 transition-all duration-300 hover:scale-[1.01]">
            {/* Soft Ambient Light Glow */}
            <div className="pointer-events-none absolute -right-12 -top-12 size-56 rounded-full bg-nexus-blue/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-12 -bottom-12 size-56 rounded-full bg-nexus-green/20 blur-3xl" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                  <Wallet className="size-4 text-white" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/90">
                  Nexus Pop
                </span>
              </div>
              <span className="rounded-full bg-nexus-green/30 px-3 py-1 text-xs font-semibold text-nexus-yellow backdrop-blur-md">
                Active
              </span>
            </div>

            <div className="relative z-10 my-8">
              <span className="text-xs font-medium uppercase tracking-wider text-white/70">
                Available Balance
              </span>
              <div className="mt-1 text-5xl font-extrabold tracking-tight tabular-nums">
                £{balance.toFixed(2)}
              </div>
            </div>

            <div className="relative z-10 flex items-end justify-between text-xs text-white/80 border-t border-white/15 pt-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Cardholder</p>
                <p className="text-sm font-medium text-white mt-0.5">J. Smith</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Network</p>
                <p className="font-mono text-sm tracking-wider text-white/90">•••• 4821</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 rounded-2xl border border-border/50 bg-card/50 p-3 text-xs text-muted-foreground shadow-2xs">
            <ShieldCheck className="size-4 text-nexus-green" />
            <span>Express Transit enabled for Tyne & Wear Metro</span>
          </div>
        </div>

        {/* Right Column: Apple-styled Payment Panel */}
        <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-6 shadow-md md:p-8">
          <form onSubmit={handleTopUp} className="space-y-6">
            
            {/* Top-up Amount Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                1. Select Top-Up Amount
              </label>
              <div className="grid grid-cols-4 gap-3">
                {TOP_UP_AMOUNTS.map((amount) => {
                  const isActive = selected === amount
                  return (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setSelected(amount)}
                      aria-pressed={isActive}
                      className={`rounded-2xl py-3 text-base font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary ${
                        isActive
                          ? "bg-foreground text-background shadow-md scale-[1.02]"
                          : "border border-border bg-muted/30 text-foreground hover:bg-muted"
                      }`}
                    >
                      £{amount}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Segmented Payment Method Switcher */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                2. Select Payment Method
              </label>
              <div className="grid grid-cols-2 gap-2 rounded-2xl bg-muted/60 p-1.5 border border-border/60">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("apple-pay")}
                  className={`flex items-center justify-center gap-2 rounded-xl py-3 text-base font-semibold transition-all ${
                    paymentMethod === "apple-pay"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ApplePayLogo className="h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
                    paymentMethod === "card"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <CreditCard className="size-4" />
                  <span>Debit / Credit Card</span>
                </button>
              </div>
            </div>

            {/* Credit Card Inputs Form */}
            {paymentMethod === "card" && (
              <div className="space-y-4 pt-2 animate-in fade-in-50 duration-200">
                <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                  <span>Card Information</span>
                  <div className="flex items-center gap-2">
                    <VisaLogo className="h-3.5" />
                    <MastercardLogo className="h-4" />
                    <MaestroLogo className="h-4" />
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card Number"
                    required
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM / YY"
                    required
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-all"
                  />
                  <input
                    type="password"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="CVV"
                    required
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-all"
                  />
                </div>
              </div>
            )}

            {/* Primary Action Button */}
            {paymentMethod === "apple-pay" ? (
              <button
                type="submit"
                disabled={isProcessing}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-foreground text-background font-semibold transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50 shadow-lg"
              >
                {isProcessing ? (
                  <span className="size-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
                ) : (
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-lg font-medium">Pay with</span>
                    <ApplePayLogo className="h-7 text-background" />
                  </div>
                )}
              </button>
            ) : (
              <button
                type="submit"
                disabled={isProcessing}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-primary-foreground font-semibold text-base transition-all hover:bg-primary/90 active:scale-[0.99] disabled:opacity-50 shadow-md"
              >
                {isProcessing ? (
                  <span className="size-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                ) : (
                  <>
                    <Plus className="size-5" />
                    <span>Pay & Top Up £{selected.toFixed(2)}</span>
                  </>
                )}
              </button>
            )}

            {/* Success Status Message */}
            {lastAction && (
              <div
                className="flex items-center gap-3 rounded-2xl bg-nexus-green/15 border border-nexus-green/30 px-4 py-3.5 text-sm font-semibold text-nexus-green animate-in fade-in-50"
                role="status"
              >
                <Check className="size-5 shrink-0" />
                <span>{lastAction}</span>
              </div>
            )}

            {/* Footer Encrypted Label */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
              <Lock className="size-3.5 text-nexus-green" />
              <span>256-Bit Encrypted Apple Pay Transit Transaction</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   Payment Provider Logos
   ========================================================================== */

function ApplePayLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 165 65" fill="currentColor">
      <path d="M28.02 24.18c-1.39 1.66-3.66 2.92-5.97 2.82-.31-2.48 1.08-5.01 2.39-6.52 1.48-1.74 3.92-2.93 6.01-2.9 0.28 2.53-1.04 4.94-2.43 6.6m2.37 3.39c-3.32-0.12-6.12 1.95-7.68 1.95-1.6 0-4.01-1.83-6.68-1.78-3.46 0.06-6.66 2.01-8.43 5.12-3.61 6.27-0.94 15.53 2.57 20.61 1.72 2.49 3.77 5.27 6.47 5.17 2.59-0.1 3.58-1.68 6.71-1.68 3.13 0 4.02 1.68 6.73 1.62 2.76-0.05 4.51-2.52 6.21-5.01 1.98-2.88 2.79-5.67 2.84-5.82-0.06-0.03-5.46-2.1-5.52-8.33-0.05-5.21 4.25-7.7 4.45-7.83-2.43-3.57-6.22-3.97-7.55-4.02" />
      <path d="M68.08 17.5v39.12h-7.85V46.85H47.16v9.77h-7.85V17.5h7.85v19.88h13.07V17.5h7.85zm-20.92 22.1v-14.8h-0.16l-5.32 14.8h5.48zm43.32 1.13c0 10.37-5.59 16.32-14.84 16.32-4.68 0-8.92-1.67-11.88-4.78l3.92-5.05c2.31 2.47 5.27 3.82 8.12 3.82 4.95 0 7.37-2.9 7.37-8.01v-1.83h-0.16c-1.51 2.37-4.41 3.87-7.85 3.87-7.26 0-12.74-5.43-12.74-13.6 0-8.28 5.65-13.71 12.85-13.71 3.44 0 6.29 1.45 7.8 3.82h0.16V18.1h7.26v22.63zm-6.83-9.57c0-4.89-3.01-8.01-7.15-8.01-4.19 0-7.2 3.12-7.2 8.01 0 4.84 3.01 7.96 7.2 7.96 4.14 0 7.15-3.07 7.15-7.96zm27.42-12.85l-9.62 25.86h-0.16l-9.68-25.86h7.74l5.38 16.56h0.16l5.32-16.56h5.86z" />
    </svg>
  )
}

function VisaLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 12" fill="#1A1F71">
      <path d="M13.882 0.312L9.123 11.602H6.126L3.693 2.502C3.546 1.928 3.412 1.716 2.97 1.48C2.26 1.096 1.056 0.73 0 0.502L0.082 0.312H5.093C5.748 0.312 6.32 0.742 6.46 1.482L7.697 8.082L10.746 0.312H13.882ZM25.962 8.16C25.973 5.048 21.658 4.872 21.685 3.486C21.693 3.064 22.1 2.612 23.013 2.492C23.465 2.43 24.717 2.378 26.037 2.982L26.568 0.506C25.842 0.244 24.912 0 23.77 0C20.865 0 18.805 1.542 18.788 3.738C18.762 5.372 20.244 6.284 21.36 6.83C22.508 7.39 22.894 7.746 22.888 8.246C22.877 9.012 21.966 9.352 21.118 9.366C19.641 9.39 18.783 8.972 18.103 8.658L17.558 11.202C18.358 11.57 19.837 11.88 21.365 11.896C24.453 11.896 26.46-0.37 25.962 8.16ZM33.682 11.602H36.425L34.032 0.312H31.572C30.985 0.312 30.495 0.654 30.28 1.168L25.882 11.602H28.98L29.598 9.892H33.415L33.682 11.602ZM30.45 7.552L32.008 3.284L32.905 7.552H30.45ZM18.332 0.312L15.932 11.602H13.013L15.413 0.312H18.332Z"/>
    </svg>
  )
}

function MastercardLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 15" fill="none">
      <circle cx="7" cy="7.5" r="7" fill="#EB001B"/>
      <circle cx="17" cy="7.5" r="7" fill="#F79E1B"/>
      <path d="M12 2.138A6.98 6.98 0 009.28 7.5c0 2.227.973 4.223 2.52 5.562A6.98 6.98 0 0014.52 7.5a6.98 6.98 0 00-2.52-5.362z" fill="#FF5F00"/>
    </svg>
  )
}

function MaestroLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 15" fill="none">
      <circle cx="7" cy="7.5" r="7" fill="#0061A8"/>
      <circle cx="17" cy="7.5" r="7" fill="#EB001B"/>
      <path d="M12 2.138A6.98 6.98 0 009.28 7.5c0 2.227.973 4.223 2.52 5.562A6.98 6.98 0 0014.52 7.5a6.98 6.98 0 00-2.52-5.362z" fill="#6C6BBD"/>
    </svg>
  )
}
