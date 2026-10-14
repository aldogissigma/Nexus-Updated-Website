"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, CreditCard, Lock, Plus, ShieldCheck, Wallet } from "lucide-react"

import { ApplePay, ApplePaySound } from "@/assets"

const TOP_UP_AMOUNTS = [5, 10, 20, 40]

type PaymentMethod = "apple-pay" | "card"

/**
 * Plays the local Apple Pay sound safely across browsers
 */
function playApplePaySound() {
  try {
    // Works with imported module string or public static path fallback
    const soundSrc = typeof ApplePaySound === "string" ? ApplePaySound : (ApplePaySound as { src?: string })?.src || "/assets/applepay.mp3"
    const audio = new Audio(soundSrc)
    audio.volume = 1.0
    audio.currentTime = 0
    audio.play().catch((err) => {
      console.warn("Audio autoplay blocked by browser:", err)
    })
  } catch (err) {
    console.error("Audio error:", err)
  }
}

export function ManagePanel() {
  const [balance, setBalance] = useState(22.4)
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
      playApplePaySound()
    }, 800)
  }

  return (
    <section aria-labelledby="manage-heading" className="mx-auto w-full max-w-5xl">
      <div className="mb-6">
        <h2 id="manage-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Pop Card & Balance
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Check your travel balance and top up instantly with Apple Pay or Debit Card.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Pop Card Visual */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-nexus-green via-[#12705f] to-nexus-ink p-7 text-white shadow-xl border border-white/20 transition-all duration-300 hover:scale-[1.01]">
            <div className="pointer-events-none absolute -right-12 -top-12 size-56 rounded-full bg-nexus-blue/30 blur-3xl" />
            <div className="pointer-events-none absolute -left-12 -bottom-12 size-56 rounded-full bg-nexus-yellow/20 blur-3xl" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md shadow-xs">
                  <Wallet className="size-4.5 text-white" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  Nexus Pop
                </span>
              </div>
              <span className="rounded-full bg-nexus-green/40 border border-nexus-green/50 px-3 py-1 text-xs font-bold text-nexus-yellow backdrop-blur-md shadow-xs">
                Active
              </span>
            </div>

            <div className="relative z-10 my-8">
              <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                Available Balance
              </span>
              <div className="mt-1 text-5xl font-black tracking-tight tabular-nums drop-shadow-xs">
                £{balance.toFixed(2)}
              </div>
            </div>

            <div className="relative z-10 flex items-end justify-between text-xs text-white/90 border-t border-white/20 pt-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">Cardholder</p>
                <p className="text-sm font-semibold text-white mt-0.5">J. Smith</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">Network</p>
                <p className="font-mono text-sm tracking-wider font-semibold text-white">•••• 4821</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card p-3.5 text-xs font-medium text-foreground shadow-xs">
            <ShieldCheck className="size-4 text-nexus-green" />
            <span>Express Transit enabled for Tyne & Wear Metro</span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
          <form onSubmit={handleTopUp} className="space-y-6">
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
                      className={`rounded-2xl py-3.5 text-base font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md scale-[1.02]"
                          : "border border-border bg-muted/50 text-foreground hover:bg-muted"
                      }`}
                    >
                      £{amount}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                2. Select Payment Method
              </label>
              <div className="grid grid-cols-2 gap-2 rounded-2xl bg-muted p-1.5 border border-border">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("apple-pay")}
                  className={`flex items-center justify-center rounded-xl py-3 text-base font-bold transition-all ${
                    paymentMethod === "apple-pay"
                      ? "bg-card text-foreground shadow-sm border border-border/50"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="relative h-6 w-20">
                    <Image
                      src={ApplePay}
                      alt="Apple Pay"
                      fill
                      className="object-contain dark:invert"
                    />
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
                    paymentMethod === "card"
                      ? "bg-card text-foreground shadow-sm border border-border/50"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <CreditCard className="size-4" />
                  <span>Debit / Credit Card</span>
                </button>
              </div>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4 pt-2 animate-in fade-in-50 duration-200">
                <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
                  <span>Card Information</span>
                </div>

                <div>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card Number"
                    required
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM / YY"
                    required
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <input
                    type="password"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="CVV"
                    required
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "apple-pay" ? (
              <button
                type="submit"
                disabled={isProcessing}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-foreground text-background font-bold transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50 shadow-md"
              >
                {isProcessing ? (
                  <span className="size-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-base font-bold">Pay with</span>
                    <div className="relative h-6 w-16">
                      <Image
                        src={ApplePay}
                        alt="Apple Pay"
                        fill
                        className="object-contain invert dark:invert-0"
                      />
                    </div>
                  </div>
                )}
              </button>
            ) : (
              <button
                type="submit"
                disabled={isProcessing}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-primary-foreground font-bold text-base transition-all hover:bg-primary/90 active:scale-[0.99] disabled:opacity-50 shadow-md"
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

            {lastAction && (
              <div
                className="flex items-center gap-3 rounded-2xl bg-nexus-green/15 border border-nexus-green/30 px-4 py-3.5 text-sm font-bold text-nexus-green animate-in fade-in-50"
                role="status"
              >
                <Check className="size-5 shrink-0" />
                <span>{lastAction}</span>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
              <Lock className="size-3.5 text-nexus-green" />
              <span>256-Bit Encrypted Secure Transaction</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
