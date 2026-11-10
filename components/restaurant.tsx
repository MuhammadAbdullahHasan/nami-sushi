"use client";

import * as React from "react";
import { DishOrbitCarousel } from "@/components/ui/dish-orbit-carousel";
import { SushiConveyorMenu, type ConveyorDish } from "@/components/ui/sushi-conveyor-menu";
import { BELT, LEGEND, SIGNATURE } from "@/lib/menu";
import CREDITS from "@/lib/credits.json";

type Line = { name: string; price: string; qty: number };

const toNumber = (price: string) => Number(price.replace(/[^\d]/g, "")) || 0;
const pkr = (n: number) => `PKR ${n.toLocaleString("en-US")}`;

export function Restaurant() {
  const [order, setOrder] = React.useState([] as Line[]);
  const [toast, setToast] = React.useState(null as string | null);
  const [bumpKey, setBumpKey] = React.useState(0);
  const [trayOpen, setTrayOpen] = React.useState(false);
  const toastTimer = React.useRef(0);

  const say = (text: string) => {
    setToast(text);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  };

  const add = (name: string, price: string) => {
    setOrder((lines) => {
      const found = lines.find((l) => l.name === name);
      return found ? lines.map((l) => (l === found ? { ...l, qty: l.qty + 1 } : l)) : [...lines, { name, price, qty: 1 }];
    });
    setBumpKey((k) => k + 1);
    say(`${name} added to your order`);
  };

  const count = order.reduce((n, l) => n + l.qty, 0);
  const total = order.reduce((n, l) => n + toNumber(l.price) * l.qty, 0);

  return (
    <>
      <header className="relative z-20 border-b border-border/70 bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <a href="#" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-primary font-serif text-lg text-primary-foreground">波</span>
            <span className="text-lg font-semibold tracking-tight">Nami <span className="font-light text-muted-foreground">Sushi Bar</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex" aria-label="Main">
            {[["Signature", "#signature"], ["The belt", "#belt"], ["Visit", "#visit"]].map(([label, href]) => (
              <a key={href} href={href} className="transition-colors hover:text-foreground">{label}</a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setTrayOpen((o) => !o)}
            aria-expanded={trayOpen}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Your order
            <span key={bumpKey} className={`grid min-w-6 place-items-center rounded-full bg-primary px-1.5 text-xs text-primary-foreground ${bumpKey ? "bump" : ""}`}>{count}</span>
          </button>
        </div>
      </header>

      {trayOpen && (
        <div className="fixed right-4 top-20 z-40 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-border bg-card p-5 shadow-2xl" role="dialog" aria-label="Your order">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Your order</p>
            <button type="button" onClick={() => setTrayOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">Close</button>
          </div>
          {order.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">Nothing yet. Tap a plate on the belt, then &ldquo;Add to order&rdquo;.</p>
          ) : (
            <>
              <ul className="mt-3 divide-y divide-border text-sm">
                {order.map((l) => (
                  <li key={l.name} className="flex justify-between gap-3 py-2">
                    <span>{l.qty} × {l.name}</span>
                    <span className="tabular-nums text-muted-foreground">{pkr(toNumber(l.price) * l.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex justify-between border-t border-border pt-3 font-semibold">
                <span>Total</span><span className="tabular-nums">{pkr(total)}</span>
              </div>
              <button type="button" onClick={() => { setOrder([]); setTrayOpen(false); say("Order sent to the kitchen (demo)"); }} className="mt-4 h-11 w-full rounded-full bg-primary text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
                Send to kitchen
              </button>
            </>
          )}
        </div>
      )}

      <main>
        <section id="signature" aria-label="Signature dishes">
          <DishOrbitCarousel
            dishes={SIGNATURE}
            height="100svh"
            loop={false}
            onOrder={(dish) => add(`${dish.title} ${dish.subtitle}`, dishPrice(dish.subtitle))}
            onPlay={(dish) => say(`The ${dish.subtitle.toLowerCase()} video is coming soon`)}
          />
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-6 pt-24 text-center sm:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">回転寿司 · Kaiten sushi</p>
          <h2 className="mt-4 text-balance font-serif text-4xl leading-tight sm:text-6xl">The plate colour <span className="text-primary">is the price</span>.</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Sushi rides past on the belt. Pick what you like, stack your plates, and we count them at the end.</p>
        </section>

        <section id="belt" className="scroll-mt-4">
          <SushiConveyorMenu
            items={BELT}
            eyebrow="On the belt now"
            heading="Grab a plate"
            caption="Hover a plate to lift it. Click it for details, or drag the belt."
            legend={LEGEND}
            autoplay
            interval={3200}
            onAdd={(item: ConveyorDish) => add(item.name, item.price)}
            action={
              <button type="button" onClick={() => setTrayOpen(true)} className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-medium transition-transform hover:-translate-y-0.5">
                View your order ({count})
              </button>
            }
          />
        </section>

        <section id="visit" className="mx-auto grid max-w-6xl gap-4 px-4 py-24 sm:grid-cols-3 sm:px-8">
          {[
            ["Sit at the belt", "Walk in, take a seat at the counter and start picking. No booking needed for the bar."],
            ["Order to your table", "Ramen, gyoza and desserts are cooked to order and brought to you hot."],
            ["Take it home", "Order on WhatsApp and pick up a box of your favourites on the way home."],
          ].map(([title, text], i) => (
            <div key={title} className="rounded-3xl border border-border bg-card p-7 transition-transform duration-300 hover:-translate-y-1">
              <span className="font-serif text-3xl text-primary">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:px-8">
          <p className="flex items-center gap-2 text-foreground"><span className="font-serif text-primary">波</span> Nami Sushi Bar</p>
          <p>Demo restaurant site &middot; &copy; {new Date().getFullYear()}</p>
        </div>
        <Credits />
      </footer>

      {toast && (
        <div role="status" className="toast fixed bottom-6 left-1/2 z-50 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background shadow-xl">
          {toast}
        </div>
      )}
    </>
  );
}

function dishPrice(subtitle: string) {
  const prices: Record<string, string> = { Ramen: "PKR 2,200", Platter: "PKR 4,800", "Poke bowl": "PKR 2,600", Gyoza: "PKR 1,400", Cheesecake: "PKR 1,200" };
  return prices[subtitle] ?? "PKR 0";
}

function Credits() {
  return (
    <details className="mx-auto max-w-7xl px-4 pb-8 text-xs text-muted-foreground sm:px-8">
      <summary className="cursor-pointer select-none hover:text-foreground">Photo credits</summary>
      <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
        {CREDITS.map((c) => (
          <li key={c.name}>
            <a href={c.page} target="_blank" rel="noopener noreferrer" className="underline decoration-current/30 underline-offset-2 hover:text-foreground">{c.title}</a>
            {" "}by {c.author} &middot; {c.license}
          </li>
        ))}
      </ul>
    </details>
  );
}
