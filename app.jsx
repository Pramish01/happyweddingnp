
import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { useState, useEffect, useRef, useCallback } from "react";
import "./global.css";



const NAV_LINKS = ["home", "portfolio", "about", "services", "reviews", "contact"];

const PORTFOLIO_CARDS = [
    {
        id: "01",
        title: "Sudarshan & Mohita",
        place: "Kathmandu, Nepal",
        images: [
            "/photos/sudarshan_mohita/1.jpg",
        ],
    },
    {
        id: "02",
        title: "Chime & Tsering",
        place: "Kathmandu, Nepal",
        images: [
            "/photos/chime_tsering/1.JPEG",

        ],
    },
    {
        id: "03",
        title: "Bibek & Bitisha",
        place: "Kathmandu, Nepal",
        images: [
            "/photos/bibek_bitisha/1.JPG",

        ],
    },
    {
        id: "04",
        title: "Date Frame",
        images: [
            "/photos/date_frame/2.jpeg",
        ]
    },
    {
        id: "05",
        title: "Aayush & Samjhana",
        place: "Bhaktapur, Nepal",
        images: [
            "/photos/",
        ],
    },
    {
        id: "06",
        title: "Sagar & Nisha",
        place: "Lalitpur, Nepal",
        images: [
            "/photos/",
        ],
    },
    {
        id: "07",
        title: "Diwas & Dejina",
        place: "Lalitpur, Nepal",
        images: [
            "/photos/",
        ],
    },
];

const TESTIMONIALS = [
    {
        text: "Atul captured every emotion of our day so naturally — the tears, the laughter, the tiny moments we didn't even realise were happening. Our photos are truly timeless and we revisit them every anniversary.",
        by: "— Sudarshan & Mohita · Kathmandu",
    },
    {
        text: "From our very first call, Atul made us feel completely at ease. On the wedding day he was invisible but everywhere — and the gallery he delivered left us absolutely speechless. We cannot recommend him highly enough.",
        by: "— Chime & Tsering · Kathmandu",
    },
    {
        text: "Our Pokhara wedding photos are beyond anything we ever imagined. Atul has a rare talent for finding light and beauty in every single frame. We will treasure these images for the rest of our lives.",
        by: "— Rohan & Priya · Pokhara",
    },
    {
        text: "Atul documented our Bhaktapur ceremony with so much care. The way he worked around our rituals without missing a single moment was remarkable. Every guest has asked us for his contact since.",
        by: "— Aayush & Samjhana · Bhaktapur",
    },
];

const SERVICES = [
    {
        num: "01",
        title: "The Portrait Session",
        body: "A dedicated pre-wedding or portrait session to capture your story before the big day. Perfect for engagements, maternity, or personal branding shoots.",
        price: "From Rs 50,000",
        delay: 0,
    },
    {
        num: "02",
        title: "The Elopement",
        body: "A half-day intimate session for small ceremonies and micro-weddings. Perfect for couples who value privacy and raw emotion over grand events.",
        price: "From Rs 1,00,000",
        delay: 0.08,
    },
    {
        num: "03",
        title: "The Classic Wedding",
        body: "Full-day coverage from getting ready through the first dance. Includes a pre-wedding consultation and a curated gallery of 500+ images.",
        price: "From Rs 2,50,000",
        delay: 0.16,
    },
    {
        num: "04",
        title: "The Destination",
        body: "Two-day coverage for destination celebrations across Nepal. Travel included, luxury album and full engagement session as standard.",
        price: "From Rs 3,50,000",
        delay: 0.24,
    },
];

const STATS = [
    { target: 50, suffix: "+", label: "Weddings Captured" },
    { target: 99.99, isFloat: true, suffix: "", label: "% Client Satisfaction" },
    { target: 5, suffix: "+", label: "Years Experience" },
    { target: 2000, suffix: "+", label: "Photos Delivered" },
];

const MARQUEE_ITEMS = [
    "Wedding Photography", "Elopements", "Pre-Wedding Sessions",
    "Portrait Galleries", "Destination Weddings", "Editorial Portraits",
];

function useScrollReveal() {
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
            { threshold: 0.15 }
        );
        document
            .querySelectorAll(".reveal, .reveal-left, .reveal-right, .s-rule")
            .forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);
}


function CustomCursor() {
    const dot = useRef(null);
    const ring = useRef(null);
    const state = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });

    useEffect(() => {
        const onMove = (e) => {
            state.current.mx = e.clientX;
            state.current.my = e.clientY;
            if (dot.current) {
                dot.current.style.left = e.clientX + "px";
                dot.current.style.top = e.clientY + "px";
            }
        };
        document.addEventListener("mousemove", onMove);

        let raf;
        const loop = () => {
            const s = state.current;
            s.rx += (s.mx - s.rx) * 0.12;
            s.ry += (s.my - s.ry) * 0.12;
            if (ring.current) {
                ring.current.style.left = s.rx + "px";
                ring.current.style.top = s.ry + "px";
            }
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        const grow = () => { if (ring.current) { ring.current.style.width = "58px"; ring.current.style.height = "58px"; ring.current.style.opacity = "0.8"; } };
        const shrink = () => { if (ring.current) { ring.current.style.width = "38px"; ring.current.style.height = "38px"; ring.current.style.opacity = "0.5"; } };

        // Attach after hydration
        const tid = setTimeout(() => {
            document
                .querySelectorAll("a, button:not(.testi-dot), .portfolio-card, .svc-card")
                .forEach((el) => {
                    el.addEventListener("mouseenter", grow);
                    el.addEventListener("mouseleave", shrink);
                });
        }, 400);

        return () => {
            document.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(raf);
            clearTimeout(tid);
        };
    }, []);

    return (
        <>
            <div ref={dot} className="hw-cursor-dot" />
            <div ref={ring} className="hw-cursor-ring" />
        </>
    );
}


function Sidebar({ isOpen, onClose }) {
    return (
        <aside className={`hw-sidebar${isOpen ? " open" : ""}`} aria-label="Site navigation">
            {/* Brand */}
            <div className="sidebar-brand">
                <div className="logo-circle">
                    <div className="logo-spin-ring" />
                    <img src="/photos/logo.png" alt="Happy Wedding" className="logo-img" />
                </div>
                <div className="brand-name">Happy<br />Wedding</div>
                <div className="brand-sub">Wedding Photographer</div>
                <div className="brand-line" />
            </div>

            {/* Nav */}
            <nav>
                <ul>
                    {NAV_LINKS.map((l) => (
                        <li key={l}>
                            <a href={`#${l}`} onClick={onClose}>
                                {l.charAt(0).toUpperCase() + l.slice(1)}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Social */}
            <div className="sidebar-bottom">
                <a
                    href="https://www.instagram.com/happy_wedding2026/"
                    target="_blank"
                    rel="noreferrer"
                    className="insta-link"
                    aria-label="Instagram"
                >
                    <img src="/photos/insta_logo.png" alt="Instagram" />
                </a>
            </div>
        </aside>
    );
}

function Burger({ isOpen, onToggle }) {
    return (
        <button
            className={`hw-burger${isOpen ? " open" : ""}`}
            onClick={onToggle}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
        >
            <span /><span /><span />
        </button>
    );
}


function Petals() {
    const petals = useRef(
        Array.from({ length: 18 }, (_, i) => ({
            id: i,
            s: Math.random() * 6 + 3,
            l: Math.random() * 100,
            dur: 8 + Math.random() * 12,
            del: Math.random() * 10,
        }))
    ).current;

    return (
        <div className="petals-wrap" aria-hidden="true">
            {petals.map((p) => (
                <div
                    key={p.id}
                    className="petal"
                    style={{
                        width: p.s, height: p.s,
                        left: `${p.l}%`,
                        animationDuration: `${p.dur}s`,
                        animationDelay: `${p.del}s`,
                    }}
                />
            ))}
        </div>
    );
}


function Hero() {
    return (
        <section id="home" className="hero-section" aria-label="Hero">
            <Petals />

            <div className="hero-text">
                <p className="hero-label fu1">
                    <span className="hero-label-line" />
                    Welcome · Est. 2025
                </p>

                <h1 className="hero-h1 fu2">
                    I'm <em>Atul.</em>
                    <span className="hero-script">Telling love<br />in frames.</span>
                </h1>

                <div className="hero-divider fu3">
                    <span /><i>wedding · pre-wedding · portraits</i><span />
                </div>

                <p className="hero-body fu4">
                    A wedding photographer based in the heart of Nepal. I believe the most
                    beautiful images are born from quiet moments — a glance, a held breath,
                    light falling just right.
                </p>

                <div className="hero-cta fu5">
                    <a href="#portfolio" className="btn-primary"><span>View Portfolio</span></a>
                    <a href="#contact" className="btn-outline">Book a Date →</a>
                </div>

                <p className="hero-sig fu6">Atul Shrestha</p>
            </div>

            <div className="hero-img-wrap">
                <img
                    src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1000&q=85"
                    alt="Bride and groom — wedding photography by Atul Shrestha"
                />
                <div className="hero-img-overlay" />
                <div className="hero-tag">
                    <div className="hero-tag-num">50+</div>
                    <div className="hero-tag-txt">Weddings Captured</div>
                </div>
            </div>
        </section>
    );
}


function MarqueeBar() {
    const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
    return (
        <div className="marquee-wrap" aria-hidden="true">
            <div className="marquee-track">
                {doubled.flatMap((item, i) => [
                    <span key={`t${i}`}>{item}</span>,
                    <span key={`d${i}`} className="mq-dot">✦</span>,
                ])}
            </div>
        </div>
    );
}


function PortfolioCard({ card }) {
    const [idx, setIdx] = useState(0);
    const ivRef = useRef(null);
    const wrapRef = useRef(null);

    const startSlider = useCallback(() => {
        if (!ivRef.current && card.images.length > 1) {
            ivRef.current = setInterval(
                () => setIdx((i) => (i + 1) % card.images.length),
                2500
            );
        }
    }, [card.images.length]);

    const stopSlider = useCallback(() => {
        clearInterval(ivRef.current);
        ivRef.current = null;
    }, []);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el || card.images.length < 2) return;

        // Start only once in view
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { startSlider(); obs.unobserve(el); } },
            { threshold: 0.3 }
        );
        obs.observe(el);
        el.addEventListener("mouseenter", stopSlider);
        el.addEventListener("mouseleave", startSlider);

        return () => {
            stopSlider();
            obs.disconnect();
            el.removeEventListener("mouseenter", stopSlider);
            el.removeEventListener("mouseleave", startSlider);
        };
    }, [startSlider, stopSlider, card.images.length]);

    return (
        <article className="portfolio-card">
            <div className="slider-wrap" ref={wrapRef}>
                {card.images.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`${card.title} — photo ${i + 1}`}
                        className={`img-slide${i === idx ? " active" : ""}`}
                        loading={i === 0 ? "eager" : "lazy"}
                    />
                ))}
                <div className="card-hover-overlay" />
            </div>
            <div className="card-info">
                <div className="card-num">{card.id}</div>
                <div className="card-title">{card.title}</div>
                <div className="card-place">{card.place}</div>
            </div>
        </article>
    );
}

function Portfolio() {
    return (
        <section id="portfolio" className="hw-section" style={{ background: "var(--bone)" }}>
            <p className="s-label">Portfolio</p>
            <h2 className="s-h2">Recent <em>Weddings</em></h2>
            <div className="s-rule" />
            <div className="portfolio-grid">
                {PORTFOLIO_CARDS.map((card) => (
                    <PortfolioCard key={card.id} card={card} />
                ))}
            </div>
        </section>
    );
}


function CountUp({ target, suffix = "", isFloat = false }) {
    const spanRef = useRef(null);
    const ran = useRef(false);

    useEffect(() => {
        const el = spanRef.current;
        if (!el) return;

        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !ran.current) {
                ran.current = true;
                const dur = 1600;
                const t0 = performance.now();
                const step = (now) => {
                    const p = Math.min((now - t0) / dur, 1);
                    el.textContent = isFloat
                        ? (p * target).toFixed(2)
                        : Math.floor(p * target);
                    if (p < 1) requestAnimationFrame(step);
                    else el.textContent = isFloat ? target.toFixed(2) : String(target);
                };
                requestAnimationFrame(step);
                obs.unobserve(el);
            }
        }, { threshold: 0.5 });

        obs.observe(el);
        return () => obs.disconnect();
    }, [target, isFloat]);

    return <><span ref={spanRef}>0</span>{suffix}</>;
}


function About() {
    return (
        <div id="about" className="about-section">
            {/* Left — photo */}
            <div className="about-visual reveal-left">
                <img
                    src="/photos/owner.jpeg"
                    alt="Atul Shrestha — wedding photographer"
                />
                <div className="about-visual-overlay" />
                <div className="about-badge">
                    <div className="about-badge-num">
                        50<span style={{ fontSize: "1rem" }}>+</span>
                    </div>
                    <div className="about-badge-txt">Weddings</div>
                </div>
            </div>

            {/* Right — text */}
            <div className="about-text">
                <p className="s-label reveal" style={{ color: "var(--gold)" }}>About Me</p>
                <h2 className="s-h2 reveal" style={{ color: "#fff" }}>
                    The Photographer<br /><em>Behind the Lens</em>
                </h2>
                <div className="s-rule reveal" style={{ background: "linear-gradient(to right,var(--gold),transparent)" }} />

                {/* Stats */}
                <div className="stats-grid reveal">
                    {STATS.map((s, i) => (
                        <div
                            key={i}
                            className="stat-cell"
                            style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,.08)" : "none" }}
                        >
                            <div className="stat-num">
                                <CountUp target={s.target} suffix={s.suffix} isFloat={!!s.isFloat} />
                            </div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>

                <p className="about-body reveal">
                    Born and raised in Kathmandu, I've been documenting love stories across
                    Nepal for over five years. My approach is quiet and observational — I blend
                    into your day so the moments feel completely natural, then I find the light,
                    the geometry, and the feeling that makes an image eternal.
                </p>

                <ul className="about-list reveal">
                    <li>Documentary-style, candid approach</li>
                    <li>Full-resolution digital gallery delivery</li>
                    <li>Professionally colour-graded editing</li>
                    <li>Both digital &amp; printed albums offered</li>
                </ul>

                <a href="#contact" className="btn-primary reveal" style={{ alignSelf: "flex-start" }}>
                    <span>Book a Consultation</span>
                </a>
            </div>
        </div>
    );
}


function Services() {
    return (
        <section id="services" className="hw-section" style={{ background: "var(--bone)" }}>
            <p className="s-label reveal">What I Offer</p>
            <h2 className="s-h2 reveal">Photography <em>Packages</em></h2>
            <div className="s-rule reveal" />
            <div className="services-grid">
                {SERVICES.map((s) => (
                    <div
                        key={s.num}
                        className="svc-card reveal"
                        style={{ transitionDelay: `${s.delay}s` }}
                    >
                        <span className="svc-num">{s.num}</span>
                        <div className="svc-title">{s.title}</div>
                        <p className="svc-body">{s.body}</p>
                        <div className="svc-price">{s.price}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}


function Testimonials() {
    const [cur, setCur] = useState(0);
    const tmr = useRef(null);

    const resetTimer = useCallback((n) => {
        clearInterval(tmr.current);
        const next = ((n % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length;
        setCur(next);
        tmr.current = setInterval(
            () => setCur((c) => (c + 1) % TESTIMONIALS.length),
            5500
        );
    }, []);

    useEffect(() => {
        tmr.current = setInterval(
            () => setCur((c) => (c + 1) % TESTIMONIALS.length),
            5500
        );
        return () => clearInterval(tmr.current);
    }, []);

    return (
        <section id="reviews" className="testimonials-section">
            <p className="s-label reveal" style={{ justifyContent: "center" }}>Kind Words</p>
            <h2 className="s-h2 reveal" style={{ textAlign: "center" }}>What Couples <em>Say</em></h2>
            <div className="s-rule reveal" style={{ margin: "20px auto 48px" }} />

            <div className="testi-container">
                <span className="testi-quote" aria-hidden="true">"</span>

                {TESTIMONIALS.map((t, i) => (
                    <div key={i} className={`testi-slide${i === cur ? " on" : ""}`} role="group" aria-label={`Testimonial ${i + 1}`}>
                        <p className="testi-text">{t.text}</p>
                        <div className="testi-hr" />
                        <p className="testi-by">{t.by}</p>
                    </div>
                ))}

                <div className="testi-controls">
                    <button className="testi-btn" onClick={() => resetTimer(cur - 1)} aria-label="Previous testimonial">←</button>
                    <div className="dots" role="tablist">
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                className={`testi-dot${i === cur ? " on" : ""}`}
                                onClick={() => resetTimer(i)}
                                aria-label={`Testimonial ${i + 1}`}
                                aria-selected={i === cur}
                                role="tab"
                            />
                        ))}
                    </div>
                    <button className="testi-btn" onClick={() => resetTimer(cur + 1)} aria-label="Next testimonial">→</button>
                </div>
            </div>
        </section>
    );
}


function Contact() {
    const EMPTY = { name: "", email: "", date: "", location: "", message: "" };
    const [form, setForm] = useState(EMPTY);
    const [status, setStatus] = useState("idle"); // idle | sent | error

    const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");
        try {


            await new Promise((r) => setTimeout(r, 800)); // simulated delay
            setStatus("sent");
            setForm(EMPTY);
            setTimeout(() => setStatus("idle"), 4000);
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    const btnLabel =
        status === "sending" ? "Sending…" :
            status === "sent" ? "Message Sent ✓" :
                status === "error" ? "Something went wrong" :
                    "Send My Message ✦";

    return (
        <div id="contact" className="contact-wrap">
            {/* Art panel */}
            <div className="contact-art">
                <img
                    src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=900&q=80"
                    alt="Wedding ceremony"
                />
                <div className="contact-art-overlay" />
                <div className="contact-art-text">
                    <p>"Let's create<br />something<br />beautiful<br />together."</p>
                </div>
            </div>

            {/* Form */}
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <p className="s-label" style={{ color: "var(--gold)" }}>Contact</p>
                <h2 className="s-h2" style={{ color: "#fff" }}>Book Your <em>Date</em></h2>
                <div className="s-rule" style={{ background: "linear-gradient(to right,var(--gold),transparent)", margin: "20px 0 36px", width: 80 }} />

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="cf-name">Your Name</label>
                        <input id="cf-name" className="form-inp" type="text" placeholder="Jane Smith" value={form.name} onChange={set("name")} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cf-email">Email Address</label>
                        <input id="cf-email" className="form-inp" type="email" placeholder="jane@email.com" value={form.email} onChange={set("email")} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="cf-date">Wedding Date</label>
                        <input id="cf-date" className="form-inp" type="date" value={form.date} onChange={set("date")} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cf-loc">Location</label>
                        <input id="cf-loc" className="form-inp" type="text" placeholder="e.g. Kathmandu, Nepal" value={form.location} onChange={set("location")} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="cf-msg">Tell Me About Your Day</label>
                    <textarea
                        id="cf-msg"
                        className="form-inp"
                        placeholder="A little about your venue, vision, and what matters most to you…"
                        value={form.message}
                        onChange={set("message")}
                        style={{ height: 110, resize: "none" }}
                    />
                </div>

                <button
                    type="submit"
                    className="btn-submit"
                    disabled={status === "sending"}
                    style={{ opacity: status === "sending" ? 0.7 : 1 }}
                >
                    <span>{btnLabel}</span>
                </button>
            </form>
        </div>
    );
}

function Clients() {
    const logos = [
        "Vogue Weddings", "Martha Stewart", "Brides Magazine",
        "The Knot", "Junebug Weddings", "Harper's Bazaar",
    ];
    return (
        <div className="clients-bar">
            <p className="clients-label">As Featured In</p>
            <div className="clients-row">
                {logos.map((l) => <span key={l} className="c-logo">{l}</span>)}
            </div>
        </div>
    );
}

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-grid">
                <div>
                    <div className="f-brand-name">Happy Wedding</div>
                    <div className="f-brand-sub">Wedding Photographer</div>
                    <p className="f-brand-desc">
                        Capturing love stories across Nepal. Available for destination weddings within Nepal.
                    </p>
                </div>

                <div className="f-col">
                    <h4>Navigate</h4>
                    <ul>
                        {NAV_LINKS.map((l) => (
                            <li key={l}><a href={`#${l}`}>{l.charAt(0).toUpperCase() + l.slice(1)}</a></li>
                        ))}
                    </ul>
                </div>

                <div className="f-col">
                    <h4>Connect</h4>
                    <ul>
                        <li>
                            <a href="https://www.instagram.com/happy_wedding2026/" target="_blank" rel="noreferrer">
                                Instagram
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="f-col">
                    <h4>Info</h4>
                    <ul>
                        <li><a href="mailto:happywedding2026@gmail.com">happywedding2026@gmail.com</a></li>
                        <li><a href="tel:+9779841121671">+977 9841121671</a></li>
                        <li>Kathmandu, Nepal</li>
                        <li>Available Nepal-wide</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 Happy Wedding | Wedding Photographer</p>
                <p>Made with <span style={{ color: "var(--gold)" }}>♥</span> · All rights reserved</p>
            </div>
        </footer>
    );
}


export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useScrollReveal();

    return (
        <>
            <CustomCursor />
            <Burger isOpen={sidebarOpen} onToggle={() => setSidebarOpen((o) => !o)} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="site-main" id="top">
                <Hero />
                <MarqueeBar />
                <Portfolio />
                <About />
                <Services />
                <Testimonials />
                <Contact />
                <Clients />
                <Footer />
            </main>
        </>
    );
}