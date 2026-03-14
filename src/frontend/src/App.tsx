import { Badge } from "@/components/ui/badge";
import {
  BarChart2,
  ChevronDown,
  FileText,
  HardHat,
  Mail,
  MapPin,
  Network,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Animation Variants ────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Static Data ───────────────────────────────────────────────────────────
const skills = [
  { label: "Work Progress Reports (WPR)", icon: FileText },
  { label: "Project Documentation", icon: BarChart2 },
  { label: "Site Supervision", icon: HardHat },
  { label: "Primavera", icon: Network, note: "Learning" },
  { label: "Safety Compliance", icon: ShieldCheck },
  { label: "Engineering Coordination", icon: Wrench },
];

const experiencePoints = [
  "Prepared comprehensive Work Progress Reports (WPR) for project tracking and stakeholder communication.",
  "Assisted in site supervision and monitored work progress to ensure alignment with project timelines.",
  "Maintained and organized project documentation including drawings, logs, and site records.",
  "Coordinated effectively with team members and site staff to streamline daily operations.",
];

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

// ─── Contact Row Component ────────────────────────────────────────────────────
function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  ocid,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
  ocid: string;
}) {
  const inner = (
    <>
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          background: "oklch(var(--gold) / 0.1)",
          border: "1px solid oklch(var(--gold) / 0.25)",
        }}
      >
        <Icon className="w-5 h-5" style={{ color: "oklch(var(--gold))" }} />
      </div>
      <div>
        <p
          className="text-xs font-medium uppercase tracking-widest mb-0.5"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          {label}
        </p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </>
  );

  const rowCls = "flex items-center gap-4 p-4 rounded-lg";
  const rowStyle = {
    background: "oklch(0.25 0.03 245 / 0.5)",
    border: "1px solid oklch(0.32 0.04 245)",
  };

  if (href) {
    return (
      <a
        href={href}
        className={`block hover:opacity-80 transition-opacity ${rowCls}`}
        style={rowStyle}
        data-ocid={ocid}
      >
        {inner}
      </a>
    );
  }
  return (
    <div className={rowCls} style={rowStyle} data-ocid={ocid}>
      {inner}
    </div>
  );
}

// ─── Section Wrapper ────────────────────────────────────────────────────────
function SectionCard({
  id,
  title,
  children,
  ocid,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  ocid: string;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className="py-16 scroll-mt-20"
      data-ocid={ocid}
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            {title}
          </h2>
          <div className="section-divider" />
        </div>
        <div
          className="rounded-xl p-8"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.028 245), oklch(0.20 0.03 255))",
            border: "1px solid oklch(0.30 0.04 245)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
          }}
        >
          {children}
        </div>
      </div>
    </motion.section>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── Sticky Nav ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-background/90 border-b border-border shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display font-bold text-lg text-gold tracking-wide">
            HJ
          </span>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            <span
              className={`block h-0.5 w-6 bg-foreground transition-transform duration-200 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-transform duration-200 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-6 py-4 text-sm font-medium text-muted-foreground hover:text-gold transition-colors border-b border-border/50"
                data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <header
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-blueprint.dim_1400x600.jpg')",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.14 0.04 255 / 0.75) 0%, oklch(0.14 0.04 255 / 0.6) 50%, oklch(0.18 0.02 250) 100%)",
          }}
        />

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-4"
          >
            <span
              className="inline-block text-xs font-medium tracking-[0.25em] uppercase px-4 py-1.5 rounded-full border"
              style={{
                color: "oklch(var(--gold))",
                borderColor: "oklch(var(--gold) / 0.4)",
                background: "oklch(var(--gold) / 0.08)",
              }}
            >
              Mechanical Engineer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight"
          >
            Hamza <span style={{ color: "oklch(var(--gold))" }}>Junaid</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Site Supervision · Project Documentation · Engineering Coordination
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-12 flex items-center justify-center"
          >
            <button
              type="button"
              onClick={() => handleNavClick("#about")}
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
              data-ocid="hero.scroll_down.button"
            >
              <span className="text-xs tracking-widest uppercase">Explore</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </motion.div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="bg-background">
        {/* About */}
        <SectionCard id="about" title="About Me" ocid="about.card">
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            I am a Mechanical Engineer with hands-on experience in{" "}
            <strong className="text-foreground">site supervision</strong> and{" "}
            <strong className="text-foreground">project documentation</strong>.
            I have worked extensively with Work Progress Reports (WPR) and
            assisted in coordinating site activities to ensure smooth project
            execution. I am currently advancing my expertise through{" "}
            <strong className="text-foreground">Primavera P6</strong> and
            deepening my knowledge in project management and engineering
            documentation standards.
          </p>
        </SectionCard>

        {/* Skills */}
        <SectionCard id="skills" title="Skills" ocid="skills.card">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {skills.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.label}
                  variants={fadeUp}
                  custom={i}
                  className="flex items-center gap-4 p-4 rounded-lg cursor-default"
                  style={{
                    background: "oklch(0.25 0.03 245 / 0.6)",
                    border: "1px solid oklch(0.32 0.04 245)",
                    transition: "all 0.2s ease",
                  }}
                  whileHover={{
                    scale: 1.02,
                    borderColor: "oklch(0.78 0.13 82 / 0.5)",
                  }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: "oklch(var(--gold) / 0.12)",
                      border: "1px solid oklch(var(--gold) / 0.25)",
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "oklch(var(--gold))" }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground">
                      {skill.label}
                    </span>
                    {skill.note && (
                      <Badge
                        variant="secondary"
                        className="ml-2 text-xs"
                        style={{
                          background: "oklch(var(--gold) / 0.15)",
                          color: "oklch(var(--gold))",
                          border: "1px solid oklch(var(--gold) / 0.3)",
                        }}
                      >
                        {skill.note}
                      </Badge>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </SectionCard>

        {/* Experience */}
        <SectionCard id="experience" title="Experience" ocid="experience.card">
          <div
            className="relative pl-6 border-l-2"
            style={{ borderColor: "oklch(var(--gold) / 0.4)" }}
          >
            <div
              className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2"
              style={{
                background: "oklch(var(--background))",
                borderColor: "oklch(var(--gold))",
              }}
            />
            <div className="mb-2">
              <h3 className="text-xl font-display font-semibold text-foreground">
                Assistant Supervisor
              </h3>
              <p
                className="text-sm mt-0.5"
                style={{ color: "oklch(var(--gold))" }}
              >
                Site Engineering & Documentation
              </p>
            </div>
            <ul className="mt-5 space-y-3">
              {experiencePoints.map((point, i) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                  data-ocid={`experience.item.${i + 1}`}
                >
                  <span
                    className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                    style={{ background: "oklch(var(--gold))" }}
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </SectionCard>

        {/* Education */}
        <SectionCard id="education" title="Education" ocid="education.card">
          <div className="flex items-start gap-5">
            <div
              className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
              style={{
                background: "oklch(var(--gold) / 0.1)",
                border: "1px solid oklch(var(--gold) / 0.3)",
              }}
            >
              <svg
                role="img"
                aria-label="Education icon"
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "oklch(var(--gold))" }}
              >
                <title>Education icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.63 48.63 0 0 1 12 20.904a48.63 48.63 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-1.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>
            </div>
            <div>
              <p
                className="text-xs font-medium tracking-widest uppercase mb-1"
                style={{ color: "oklch(var(--gold))" }}
              >
                Degree
              </p>
              <h3 className="text-xl font-display font-semibold text-foreground leading-snug">
                Bachelor of Science in Mechanical Engineering
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                BS Mechanical Engineering
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Contact */}
        <SectionCard id="contact" title="Get In Touch" ocid="contact.card">
          <div className="space-y-5">
            <ContactRow
              icon={Mail}
              label="Email"
              value="hamzajunaid825@gmail.com"
              href="mailto:hamzajunaid825@gmail.com"
              ocid="contact.email.link"
            />
            <ContactRow
              icon={Phone}
              label="Phone"
              value="+966-539056697"
              href="tel:+966539056697"
              ocid="contact.phone.link"
            />
            <ContactRow
              icon={MapPin}
              label="Location"
              value="Pakistan"
              href={null}
              ocid="contact.location.card"
            />
          </div>
        </SectionCard>
      </main>

      {/* ── Footer ── */}
      <footer
        className="py-10 mt-8 border-t border-border"
        style={{
          background:
            "linear-gradient(to top, oklch(0.14 0.04 255), oklch(0.18 0.02 250))",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-display font-bold text-lg text-foreground">
              Hamza Junaid
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Mechanical Engineer
            </p>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Hamza Junaid. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gold transition-colors"
              data-ocid="footer.caffeine.link"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
