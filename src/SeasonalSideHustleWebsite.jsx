import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { QRCodeSVG } from "qrcode.react"
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  ChevronDown,
  Clock3,
  ClipboardCheck,
  DollarSign,
  Home,
  Phone,
  Shield,
  Sparkles,
  Star,
  CalendarDays,
  CheckCircle2,
  BadgeCheck,
  MapPin,
  MessageSquare,
  FileSignature,
  SunMedium,
} from "lucide-react"

const brand = {
  businessName: "Zach's Easy Side Jobs",
  ownerName: "Zach S.",
  phone: "561-818-6161",
  phoneDigits: "5618186161",
  city: "South Florida",
}

const featuredIdeas = [
  {
    season: "Spring",
    emoji: "🌸",
    title: "Front Yard Cleanup",
    price: "$10–$20",
    desc: "Pick up sticks, tidy outdoor toys, and help make the front yard look neat."
  },
  {
    season: "Summer",
    emoji: "☀️",
    title: "Plant Watering",
    price: "$6–$10",
    desc: "Water front-yard plants and porch plants in the South Florida heat."
  },
  {
    season: "Fall",
    emoji: "🍂",
    title: "Leaf Raking & Bagging",
    price: "$12–$22",
    desc: "Rake light leaves and bag them in the front yard only."
  },
  {
    season: "Winter",
    emoji: "❄️",
    title: "Holiday Decoration Takedown",
    price: "$8–$15",
    desc: "Help take down lightweight outdoor decorations from the front yard or porch."
  }
]

const seasonalJobs = {
  Spring: [
    { job: "Front yard cleanup", pay: "$10–$20", level: "Easy" },
    { job: "Plant watering", pay: "$6–$10", level: "Easy" },
    { job: "Front porch sweeping", pay: "$7–$12", level: "Helpful" },
    { job: "Driveway bike wash", pay: "$6–$10 each", level: "Easy" },
    { job: "Scooter wash", pay: "$6–$10 each", level: "Easy" },
    { job: "Outdoor toy pickup", pay: "$5–$10", level: "Easy" },
    { job: "Sports gear organizing", pay: "$8–$14", level: "Sporty" },
    { job: "Outdoor table setup", pay: "$8–$15", level: "Helpful" },
    { job: "Mailbox card drop-off", pay: "$5–$8", level: "Creative" },
    { job: "Driveway chalk sign art", pay: "$6–$12", level: "Creative" }
  ],
  Summer: [
    { job: "Plant watering", pay: "$6–$10", level: "Easy" },
    { job: "Front yard cleanup", pay: "$10–$20", level: "Easy" },
    { job: "Driveway bike wash", pay: "$6–$10 each", level: "Easy" },
    { job: "Scooter wash", pay: "$6–$10 each", level: "Easy" },
    { job: "Sports gear organizing", pay: "$8–$14", level: "Sporty" },
    { job: "Outdoor chair setup", pay: "$7–$12", level: "Helpful" },
    { job: "Outdoor cooler organizing", pay: "$7–$12", level: "Helpful" },
    { job: "Snack bag setup", pay: "$3–$6 per bag", level: "Creative" },
    { job: "Drink table setup", pay: "$8–$15", level: "Popular" },
    { job: "Front porch reading buddy", pay: "$8–$12", level: "Trusted" }
  ],
  Fall: [
    { job: "Leaf raking and bagging", pay: "$12–$22", level: "Popular" },
    { job: "Front yard cleanup", pay: "$10–$20", level: "Easy" },
    { job: "Front porch sweeping", pay: "$7–$12", level: "Easy" },
    { job: "Plant watering", pay: "$6–$10", level: "Easy" },
    { job: "Sports gear organizing", pay: "$8–$14", level: "Sporty" },
    { job: "Outdoor chair setup", pay: "$7–$12", level: "Helpful" },
    { job: "Pumpkin porch setup", pay: "$8–$14", level: "Creative" },
    { job: "Mailbox flyer delivery", pay: "$5–$8", level: "Helpful" },
    { job: "Driveway chalk sign art", pay: "$6–$12", level: "Creative" },
    { job: "Outdoor toy pickup", pay: "$5–$10", level: "Easy" }
  ],
  Winter: [
    { job: "Holiday decoration takedown", pay: "$8–$15", level: "Helpful" },
    { job: "Front porch sweeping", pay: "$7–$12", level: "Easy" },
    { job: "Outdoor toy bin cleanup", pay: "$6–$10", level: "Easy" },
    { job: "Sports gear organizing", pay: "$8–$14", level: "Sporty" },
    { job: "Outdoor table organizing", pay: "$7–$12", level: "Helpful" },
    { job: "Mailbox card drop-off", pay: "$5–$8", level: "Creative" },
    { job: "Porch note card sets", pay: "$3–$6 per set", level: "Creative" },
    { job: "Driveway bike wash", pay: "$6–$10 each", level: "Easy" },
    { job: "Scooter wash", pay: "$6–$10 each", level: "Easy" },
    { job: "Front yard cleanup", pay: "$10–$20", level: "Easy" }
  ]
}

const safety = [
  "Always ask a parent or guardian first.",
  "Work only with people you know nearby.",
  "Keep jobs simple and safe.",
  "Use clear prices before starting.",
  "Save some of the money you earn."
]

const policyRules = [
  "Everything has to be ready in the front yard.",
  "I will not go into anybody’s houses.",
  "You have to sign a waiver before the service starts.",
  "Please stay inside of your house for him to be comfortable and feel safe.",
  "I will pay the price of the service selected below."
]

const tabs = [
  { name: "Spring", emoji: "🌸", gradient: "from-emerald-400 via-teal-300 to-cyan-300", bg: "from-emerald-50 to-cyan-50", accent: "text-emerald-700" },
  { name: "Summer", emoji: "☀️", gradient: "from-amber-300 via-orange-300 to-cyan-300", bg: "from-amber-50 to-cyan-50", accent: "text-orange-700" },
  { name: "Fall", emoji: "🍂", gradient: "from-amber-500 via-orange-400 to-teal-400", bg: "from-amber-50 to-orange-50", accent: "text-amber-800" },
  { name: "Winter", emoji: "❄️", gradient: "from-sky-300 via-cyan-300 to-teal-300", bg: "from-sky-50 to-cyan-50", accent: "text-sky-800" }
]

const navItems = [
  { key: "home", label: "Home", icon: Home },
  { key: "services", label: "Services", icon: Briefcase },
  { key: "how", label: "How It Works", icon: ClipboardCheck },
  { key: "policy", label: "Policy", icon: Shield },
  { key: "schedule", label: "Schedule", icon: CalendarDays },
  { key: "booking", label: "Text Zach", icon: Phone },
  { key: "about", label: "About Me", icon: Star },
  { key: "feedback", label: "Feedback", icon: MessageSquare },
  { key: "safety", label: "Safety", icon: Sparkles },
]

const pageOrder = navItems.map((item) => item.key)

export const __testCases = [
  { name: "default season is Spring", expected: "Spring" },
  { name: "each season has at least 10 jobs", expected: true },
  { name: "booking tab exists", expected: true },
  { name: "policy tab exists", expected: true },
  { name: "jobs follow front yard only policy", expected: true },
  { name: "qr section exists", expected: true },
  { name: "policy gate can open before booking", expected: true },
  { name: "service list uses outdoor-only jobs", expected: true },
  { name: "each service has a displayed price", expected: true },
  { name: "qr code value points to sms booking link", expected: true },
  { name: "booking template includes name address service and day time", expected: true },
  { name: "how it works section exists", expected: true },
  { name: "availability section exists", expected: true },
  { name: "auto reply section exists", expected: true },
  { name: "waiver button exists", expected: true },
  { name: "professional hero includes trust badges", expected: true },
  { name: "fully usable contact actions exist", expected: true },
  { name: "feedback tab exists", expected: true },
  { name: "feedback form exists", expected: true }
]

const pageInfo = Object.fromEntries(navItems.map((item) => [item.key, { label: item.label, icon: item.icon }]))

export default function SeasonalSideHustleWebsite() {
  const [showPolicyGate, setShowPolicyGate] = useState(false)
  const [policyRead, setPolicyRead] = useState(false)
  const [activeSeason, setActiveSeason] = useState("Spring")
  const [openSeason, setOpenSeason] = useState("Spring")
  const [search, setSearch] = useState("")
  const [selectedService, setSelectedService] = useState("Front yard cleanup")
  const [activePage, setActivePage] = useState("home")
  const [requestedDate, setRequestedDate] = useState("")
  const [requestedTime, setRequestedTime] = useState("After School")

  const jobsSectionRef = useRef(null)
  const aboutSectionRef = useRef(null)
  const scheduleSectionRef = useRef(null)
  const howRef = useRef(null)
  const feedbackSectionRef = useRef(null)
  const safetySectionRef = useRef(null)
  const bookingSectionRef = useRef(null)
  const policySectionRef = useRef(null)
  const topRef = useRef(null)

  const activeTab = tabs.find((tab) => tab.name === activeSeason) ?? tabs[0]

  useEffect(() => {
    setSearch("")
  }, [activeSeason])

  const filteredJobs = useMemo(() => {
    return seasonalJobs[activeSeason].filter((item) =>
      item.job.toLowerCase().includes(search.toLowerCase())
    )
  }, [activeSeason, search])

  const allJobCount = Object.values(seasonalJobs).reduce((sum, jobs) => sum + jobs.length, 0)
  const allServices = Object.values(seasonalJobs).flat()
  const uniqueServices = [...new Map(allServices.map((item) => [item.job, item])).values()]

  const selectedServicePrice = uniqueServices.find((item) => item.job === selectedService)?.pay ?? "Price agreed before starting"
  const selectedServicePriceUsd = `${selectedServicePrice} USD`
  const requestedSlot = requestedDate ? `${requestedDate} at ${requestedTime}` : `Not selected yet (${requestedTime})`

  const smsTemplate = `Hi! I’d like to book a service.%0A%0AName:%0AAddress:%0AService:${encodeURIComponent(selectedService)}%0APrice:${encodeURIComponent(selectedServicePrice)}%0ADay/Time:%0A`
  const smsHref = `sms:${brand.phoneDigits}?body=${`Hi! I’d like to book a service.%0A%0AName:%0AAddress:%0AService:${encodeURIComponent(selectedService)}%0APrice:${encodeURIComponent(selectedServicePrice)}%0ARequested Date/Time:${encodeURIComponent(requestedSlot)}%0AThis request is not confirmed until Zach agrees to the time.%0A`}`
  const telHref = `tel:${brand.phoneDigits}`

  const autoReplyMessage = `Hi! Thanks for reaching out 😊\n\nHere are my services:\n• Front Yard Cleanup ($10–$20)
• Plant Watering ($6–$10)
• Leaf Raking & Bagging ($12–$22)
• Porch / Driveway Sweeping ($7–$12)\n\nAll jobs are outdoor only and require a quick agreement 👍\n\nWhat job do you need?`

  const handleDropdownToggle = (season) => {
    if (openSeason === season) {
      setOpenSeason("")
    } else {
      setActiveSeason(season)
      setOpenSeason(season)
    }
  }

  const scrollToSection = (page, ref) => {
    if (page === "booking" && !policyRead) {
      setShowPolicyGate(true)
      return
    }
    setActivePage(page)
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 50)
  }

  const continueFromPolicy = () => {
    setPolicyRead(true)
    setActivePage("booking")
    setTimeout(() => {
      bookingSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 50)
  }

  const goToPage = (page) => {
    const refMap = {
      home: topRef,
      about: aboutSectionRef,
      how: howRef,
      services: jobsSectionRef,
      policy: policySectionRef,
      schedule: scheduleSectionRef,
      booking: bookingSectionRef,
      feedback: feedbackSectionRef,
      safety: safetySectionRef,
    }

    if (page === "home") {
      setActivePage("home")
      setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50)
      return
    }

    scrollToSection(page, refMap[page])
  }

  const pageIndex = pageOrder.indexOf(activePage)
  const prevPage = pageIndex > 0 ? pageOrder[pageIndex - 1] : null
  const nextPage = pageIndex < pageOrder.length - 1 ? pageOrder[pageIndex + 1] : null

  return (
    <>
      <AnimatePresence>
        {showPolicyGate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <motion.div initial={{ scale: 0.92, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0 }} className="w-full max-w-lg rounded-3xl bg-white p-6 text-center shadow-2xl">
              <div className="mb-4 text-5xl">⚠️</div>
              <h2 className="mb-2 text-2xl font-black">Read Policy First</h2>
              <p className="mb-4 text-slate-600">Before booking a service, please read the policy page.</p>
              <div className="mb-5 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500">
                <Shield className="h-4 w-4" />
                <span>Policy → Done → Booking</span>
              </div>
              <button type="button" onClick={() => {
                setShowPolicyGate(false)
                setActivePage("policy")
                setTimeout(() => {
                  policySectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
                }, 50)
              }} className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white">
                Go to Policy Page
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activePage === "policy" && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
            <button type="button" onClick={continueFromPolicy} className="rounded-full bg-green-500 px-6 py-3 font-bold text-white shadow-lg ring-4 ring-green-200">
              Done ✓ Continue to Booking
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={topRef} className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,_#fffdf7,_#d9f3ee_34%,_#eef6ff_68%,_#f8fafc_100%)] text-slate-900">
        <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-48 bg-gradient-to-r from-emerald-200/35 via-amber-100/30 to-sky-200/35 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 py-8 md:py-10">
          <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="sticky top-0 z-20 mb-6 rounded-[1.5rem] border border-white bg-white/85 px-4 py-3 shadow-lg backdrop-blur">
            <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500">
              <Sparkles className="h-4 w-4" />
              <span>Move left to right from services to texting for the easiest booking path</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {navItems.map(({ key, label, icon: Icon }) => (
                <button key={key} type="button" onClick={() => goToPage(key)} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-bold transition-all ${
                  activePage === key
                    ? key === "booking"
                      ? "scale-105 bg-gradient-to-r from-teal-600 to-sky-500 text-white shadow-md"
                      : "scale-105 bg-slate-900 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}>
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </motion.nav>

          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            {prevPage && (
              <button type="button" onClick={() => goToPage(prevPage)} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50">
                <ArrowLeft className="h-4 w-4" />
                {pageInfo[prevPage].label}
              </button>
            )}
            <div className="rounded-full bg-gradient-to-r from-emerald-100 via-amber-50 to-sky-100 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-white">
              You are here: {pageInfo[activePage].label}
            </div>
            {nextPage && (
              <button type="button" onClick={() => goToPage(nextPage)} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50">
                {pageInfo[nextPage].label}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {activePage === "home" && (
              <motion.div key="home" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.28 }}>
                <header className="relative mb-10 overflow-hidden rounded-[2rem] border border-white bg-white/90 p-8 shadow-xl backdrop-blur md:p-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-50/90 via-white/70 to-cyan-50/90" />
                  <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-emerald-300/25 blur-3xl" />
                  <div className="absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-sky-300/25 blur-3xl" />

                  <div className="relative grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <div>
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white bg-white/80 px-4 py-2 text-sm font-semibold shadow-sm">
                        <BadgeCheck className="h-4 w-4" />
                        <span>Professional Outdoor Service Website</span>
                      </div>
                      <h1 className="mb-4 text-4xl font-black leading-none tracking-tight md:text-6xl">
                        {brand.businessName}
                        <span className="block bg-gradient-to-r from-teal-700 via-emerald-500 to-sky-500 bg-clip-text text-transparent">
                          simple, safe, and ready for customers
                        </span>
                      </h1>
                      <p className="mb-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                        A polished website for South Florida neighbors to browse services, see prices, read the policy, and book Zach quickly by text.
                      </p>
                      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
                        Only in S. FL Avenir Coral Isles Circle for now...
                      </div>
                      <div className="mb-6 flex flex-wrap gap-3">
                        <a href={smsHref} className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-600 to-sky-500 px-5 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105">
                          <MessageSquare className="h-4 w-4" />
                          Text to Book
                        </a>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm font-semibold">
                        <div className="rounded-full bg-emerald-100 px-4 py-2 text-emerald-700">Clear pricing</div>
                        <div className="rounded-full bg-amber-100 px-4 py-2 text-amber-800">Fast booking</div>
                        <div className="rounded-full bg-sky-100 px-4 py-2 text-sky-700">Outdoor only</div>
                      </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-white bg-white/85 p-6 shadow-lg backdrop-blur">
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                        <SunMedium className="h-4 w-4" />
                        Quick Start
                      </div>
                      <div className="space-y-4">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                          <div className="text-sm font-semibold text-slate-500">Step 1</div>
                          <div className="text-lg font-black text-slate-900">Browse the services</div>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                          <div className="text-sm font-semibold text-slate-500">Step 2</div>
                          <div className="text-lg font-black text-slate-900">Read how it works</div>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                          <div className="text-sm font-semibold text-slate-500">Step 3</div>
                          <div className="text-lg font-black text-slate-900">Read the policy first</div>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                          <div className="text-sm font-semibold text-slate-500">Step 4</div>
                          <div className="text-lg font-black text-slate-900">Pick a time and text Zach</div>
                        </div>
                        <div className="grid gap-3 pt-2 sm:grid-cols-2">
                          <button type="button" onClick={() => goToPage("services")} className="rounded-2xl bg-slate-900 px-5 py-3 text-left font-bold text-white shadow-md transition-transform hover:scale-105">
                            Open Services
                          </button>
                          <button type="button" onClick={() => goToPage("how")} className="rounded-2xl bg-white px-5 py-3 text-left font-bold text-slate-900 shadow-md ring-1 ring-slate-200 transition-transform hover:scale-105">
                            See the Steps
                          </button>
                          <button type="button" onClick={() => goToPage("policy")} className="rounded-2xl bg-gradient-to-r from-teal-600 to-sky-500 px-5 py-3 text-left font-bold text-white shadow-md transition-transform hover:scale-105">
                            Read Policy
                          </button>
                          <button type="button" onClick={() => goToPage("schedule")} className="rounded-2xl bg-white px-5 py-3 text-left font-bold text-slate-900 shadow-md ring-1 ring-slate-200 transition-transform hover:scale-105">
                            Pick a Time
                          </button>
                        </div>
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                          <div className="mb-1 text-sm font-semibold text-emerald-700">At a glance</div>
                          <div className="text-lg font-black text-slate-900">{allJobCount} total service ideas</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </header>
              </motion.div>
            )}

            {activePage === "about" && (
              <motion.section key="about" ref={aboutSectionRef} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.28 }} className="mb-12">
                <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white bg-white shadow-xl">
                  <div className="bg-gradient-to-r from-amber-100 via-emerald-100 to-sky-100 px-6 py-8 md:px-10">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-black text-slate-800 shadow-sm">
                      <Star className="h-4 w-4" />
                      About Zach
                    </div>
                    <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">Why this even exists</h2>
                    <p className="mt-3 max-w-3xl text-lg leading-relaxed text-slate-700">
                      This is the official story of how a kid, some free time, and a strong respect for cash turned into a neighborhood service website.
                    </p>
                  </div>

                  <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="space-y-5">
                      <div className="rounded-[1.5rem] border border-yellow-100 bg-yellow-50 p-5">
                        <h3 className="mb-2 text-2xl font-black text-slate-900">The origin story</h3>
                        <p className="text-base leading-relaxed text-slate-700">
                          I was bored and loved helping. That is a dangerous combination because it creates productivity.
                          Instead of just sitting around, I figured I could help people out, stay busy, and make the day less boring.
                        </p>
                      </div>

                      <div className="rounded-[1.5rem] border border-sky-100 bg-sky-50 p-5">
                        <h3 className="mb-2 text-2xl font-black text-slate-900">Hockey energy</h3>
                        <p className="text-base leading-relaxed text-slate-700">
                          I play hockey, so I already understand important business skills like effort, speed, balance, and not quitting when something gets annoying.
                          Basically, if I can chase a puck, I can probably sweep a porch.
                        </p>
                      </div>

                      <div className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-5">
                        <h3 className="mb-2 text-2xl font-black text-slate-900">Financial honesty</h3>
                        <p className="text-base leading-relaxed text-slate-700">
                          I love money. Not in a villain way. In a "working hard and getting paid feels awesome" way.
                          Money means saving up, buying stuff I want, and proving that being helpful can actually pay off.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="rounded-[1.75rem] bg-slate-900 p-6 text-white shadow-lg">
                        <div className="mb-3 text-sm font-bold uppercase tracking-wide text-sky-200">Zach Stats</div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-2xl bg-white/10 p-4">
                            <div className="text-sm text-white/70">Started because</div>
                            <div className="text-xl font-black">Boredom</div>
                          </div>
                          <div className="rounded-2xl bg-white/10 p-4">
                            <div className="text-sm text-white/70">Favorite bonus</div>
                            <div className="text-xl font-black">Getting paid</div>
                          </div>
                          <div className="rounded-2xl bg-white/10 p-4">
                            <div className="text-sm text-white/70">Sport</div>
                            <div className="text-xl font-black">Hockey</div>
                          </div>
                          <div className="rounded-2xl bg-white/10 p-4">
                            <div className="text-sm text-white/70">Business mood</div>
                            <div className="text-xl font-black">Helpful but hilarious</div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[1.5rem] border border-cyan-100 bg-cyan-50 p-5">
                        <h3 className="mb-3 text-2xl font-black text-slate-900">Things I bring to the job</h3>
                        <div className="space-y-3 text-slate-700">
                          <div className="rounded-2xl bg-white p-4 shadow-sm">A good attitude and at least medium-level comedic value.</div>
                          <div className="rounded-2xl bg-white p-4 shadow-sm">Real effort, not fake "I touched it once" effort.</div>
                          <div className="rounded-2xl bg-white p-4 shadow-sm">Outdoor-only service because I like safety and simple rules.</div>
                        </div>
                      </div>

                      <div className="rounded-[1.5rem] border border-amber-100 bg-gradient-to-r from-amber-50 to-yellow-50 p-5">
                        <h3 className="mb-2 text-2xl font-black text-slate-900">Final statement</h3>
                        <p className="text-base leading-relaxed text-slate-700">
                          This business was built on three powerful ideas:
                          helping people, playing hockey, and respecting the beauty of a paid job well done.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {activePage === "services" && (
              <motion.section key="services" ref={jobsSectionRef} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.28 }} className="mb-12">
                <div className="mx-auto max-w-4xl rounded-[2rem] border border-white bg-white/90 p-6 shadow-xl backdrop-blur md:p-8">
                  <div className="mb-6 flex flex-wrap items-start justify-between gap-4 text-center md:text-left">
                    <div className="w-full">
                      <h2 className="mb-2 text-3xl font-black">Season Services</h2>
                      <p className="mx-auto max-w-2xl text-slate-600 md:mx-0">Open a season dropdown to see jobs, exact prices, and choose the service you want.</p>
                    </div>
                    <div className={`mx-auto rounded-full border border-white bg-gradient-to-r px-4 py-2 text-sm font-semibold shadow-sm md:mx-0 ${activeTab.bg} ${activeTab.accent}`}>
                      {filteredJobs.length} ideas in {activeSeason}
                    </div>
                  </div>

                  <div className="mb-5 grid gap-4 md:grid-cols-[1fr_auto]">
                    <div className="relative">
                      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${activeSeason.toLowerCase()} services...`} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-300" />
                    </div>
                    <button type="button" onClick={() => goToPage("how")} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white transition-transform hover:scale-105">
                      <ClipboardCheck className="h-4 w-4" />
                      See Booking Steps
                    </button>
                  </div>

                  <div className="mb-6 flex items-center justify-center">
                    <div className="rounded-full border border-white bg-gradient-to-r from-emerald-100 via-amber-50 to-sky-100 px-5 py-2 text-sm font-bold text-slate-700 shadow-sm">Pick a season below to open the dropdown ↓</div>
                  </div>

                  <div className="mb-5 space-y-3">
                    {tabs.map((tab) => {
                      const isOpen = openSeason === tab.name
                      const jobs = seasonalJobs[tab.name]
                      const visibleJobs = isOpen ? jobs.filter((item) => item.job.toLowerCase().includes(search.toLowerCase())) : []

                      return (
                        <motion.div key={tab.name} layout className="overflow-hidden rounded-[1.5rem] border border-white bg-white/70 shadow-sm">
                          <button type="button" onClick={() => handleDropdownToggle(tab.name)} className={`w-full px-5 py-4 text-left transition-all ${isOpen ? `bg-gradient-to-r ${tab.gradient} text-white` : "bg-white text-slate-800 hover:bg-slate-50"}`}>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{tab.emoji}</span>
                                <div>
                                  <div className="text-lg font-black">{tab.name}</div>
                                  <div className={`text-sm ${isOpen ? "text-white/85" : "text-slate-500"}`}>{featuredIdeas.find((idea) => idea.season === tab.name)?.title}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className={`rounded-full px-3 py-1 text-xs font-bold ${isOpen ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>{jobs.length} services</div>
                                <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
                              </div>
                            </div>
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className={`overflow-hidden border-t border-white bg-gradient-to-br p-5 ${tab.bg}`}>
                                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                                  <div>
                                    <h3 className="text-2xl font-black">{tab.name} Services</h3>
                                    <p className="text-slate-600">All services stay outdoors and follow the policy.</p>
                                  </div>
                                  <div className={`rounded-full bg-white px-4 py-2 text-sm font-bold ${tab.accent}`}>{visibleJobs.length} showing</div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                  {visibleJobs.map((item, index) => (
                                    <motion.button key={item.job} type="button" whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} onClick={() => {
                                      setSelectedService(item.job)
                                      if (!policyRead) {
                                        setShowPolicyGate(true)
                                        return
                                      }
                                      setActivePage("schedule")
                                      setTimeout(() => scheduleSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50)
                                    }} className="rounded-2xl border border-white bg-white px-4 py-4 text-left shadow-md">
                                      <div className="mb-2 flex items-start justify-between gap-3">
                                        <div className="text-lg font-bold leading-tight">{item.job}</div>
                                        <div className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">#{index + 1}</div>
                                      </div>
                                      <div className="mb-3 flex items-center justify-between gap-3">
                                        <div className="inline-flex items-center gap-1 font-bold text-sky-700">
                                          <DollarSign className="h-4 w-4" />
                                          {item.pay}
                                        </div>
                                        <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">{item.level}</div>
                                      </div>
                                      <div className="inline-flex items-center gap-2 text-sm font-bold text-teal-700">
                                        Choose this service
                                        <ArrowRight className="h-4 w-4" />
                                      </div>
                                    </motion.button>
                                  ))}
                                </div>

                                {visibleJobs.length === 0 && <div className="mt-4 rounded-2xl border border-white bg-white/80 px-4 py-4 font-medium text-slate-700">No services matched that search. Try another word.</div>}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </motion.section>
            )}

            {activePage === "schedule" && (
              <motion.section key="schedule" ref={scheduleSectionRef} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.28 }} className="mb-10">
                <div className="mx-auto max-w-5xl rounded-[2rem] border border-white bg-white p-6 shadow-xl md:p-8">
                  <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-sky-700">
                        <CalendarDays className="h-4 w-4" />
                        Schedule Service
                      </div>
                      <h2 className="mb-2 text-3xl font-black">Request a day and time</h2>
                      <p className="text-slate-600">Customers can request a service time here, but the appointment is only confirmed after Zach agrees to it.</p>
                    </div>
                    <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
                      Only 2 service requests per day
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                    <div className="space-y-4">
                      <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                        <label className="mb-2 block text-sm font-bold text-slate-700">Choose a service</label>
                        <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-900 outline-none">
                          {uniqueServices.map((service) => (
                            <option key={service.job} value={service.job}>{service.job} â€” {service.pay} USD</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                          <label className="mb-2 block text-sm font-bold text-slate-700">Requested date</label>
                          <input type="date" value={requestedDate} onChange={(e) => setRequestedDate(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-900 outline-none" />
                        </div>
                        <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                          <label className="mb-2 block text-sm font-bold text-slate-700">Requested time</label>
                          <select value={requestedTime} onChange={(e) => setRequestedTime(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-900 outline-none">
                            <option>After School</option>
                            <option>4:00 PM</option>
                            <option>4:30 PM</option>
                            <option>5:00 PM</option>
                            <option>5:30 PM</option>
                            <option>Weekend Morning</option>
                            <option>Weekend Afternoon</option>
                          </select>
                        </div>
                      </div>

                      <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5 text-slate-800">
                        <div className="mb-2 font-black">Scheduling rules</div>
                        <div className="space-y-2 text-sm leading-relaxed">
                          <p>Only 2 service requests can be scheduled per day.</p>
                          <p>Your requested time is not approved automatically.</p>
                          <p>Zach has to agree to the day and time before the service is confirmed.</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[1.5rem] bg-gradient-to-br from-slate-900 to-slate-700 p-5 text-white shadow-lg">
                      <div className="mb-2 text-sm font-bold text-sky-200">Schedule summary</div>
                      <div className="mb-3 text-2xl font-black">{selectedService}</div>
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
                        <DollarSign className="h-4 w-4" />
                        {selectedServicePriceUsd}
                      </div>
                      <div className="mb-4 rounded-2xl bg-white/10 p-4 text-sm leading-relaxed text-white/90">
                        Requested slot: {requestedSlot}
                      </div>
                      <div className="mb-4 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm leading-relaxed text-white/90">
                        This is a request only. Zach must approve the time before the appointment is booked.
                      </div>
                      <a href={smsHref} className="block rounded-2xl bg-white px-5 py-4 text-center font-black text-slate-900 shadow-md transition-transform hover:scale-105">
                        Text Zach to Request This Time
                      </a>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {activePage === "how" && (
              <motion.section key="how" ref={howRef} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.28 }} className="mb-12">
                <div className="mx-auto max-w-5xl space-y-6">
                  <div className="rounded-[2rem] border border-white bg-white p-6 shadow-xl md:p-8">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                      <ClipboardCheck className="h-4 w-4" />
                      How It Works
                    </div>
                    <div className="grid gap-4 md:grid-cols-5">
                      {[
                        ["1", "Choose your service"],
                        ["2", "Text me using the booking button"],
                        ["3", "Agree to the waiver and policy"],
                        ["4", "I complete the job"],
                        ["5", "Pay after the job is done"],
                      ].map(([num, text]) => (
                        <div key={num} className="rounded-3xl border border-slate-100 bg-slate-50 p-4 text-center shadow-sm">
                          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-black text-white">{num}</div>
                          <div className="font-bold text-slate-800">{text}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-[2rem] border border-white bg-white p-6 shadow-xl md:p-8">
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-sky-700">
                        <Clock3 className="h-4 w-4" />
                        Available Times
                      </div>
                      <div className="space-y-3">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                          <div className="font-black text-slate-900">After School</div>
                          <div className="text-slate-600">4:00 PM – 6:30 PM</div>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                          <div className="font-black text-slate-900">Weekends</div>
                          <div className="text-slate-600">9:00 AM – 5:00 PM</div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[2rem] border border-white bg-white p-6 shadow-xl md:p-8">
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
                        <MessageSquare className="h-4 w-4" />
                        Auto Reply Message
                      </div>
                      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 whitespace-pre-line">
                        {autoReplyMessage}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-white bg-gradient-to-r from-emerald-50 via-white to-sky-50 p-6 shadow-xl md:p-8">
                    <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                      <div>
                        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-2 text-sm font-bold text-teal-700">
                          <FileSignature className="h-4 w-4" />
                          Waiver + Agreement
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">View & Agree to Waiver</h3>
                        <p className="mt-2 text-slate-600">Before booking, customers should read the policy and waiver. Then they can continue to the booking page.</p>
                      </div>
                      <button type="button" onClick={() => goToPage("policy")} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white shadow-md hover:scale-105 transition-transform">
                        Open Waiver Page
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {activePage === "policy" && (
              <motion.section key="policy" ref={policySectionRef} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.28 }} className="mb-10">
                <div className="mx-auto max-w-5xl rounded-[2rem] border border-white bg-white p-6 shadow-xl md:p-8">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="mb-3 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">Policy Page</div>
                      <h2 className="mb-2 text-3xl font-black md:text-4xl">Service Policy</h2>
                      <p className="text-slate-600">These rules apply to every service on the website.</p>
                    </div>
                    <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 font-bold text-amber-800">Please read before booking</div>
                  </div>
                  <div className="mb-6 grid gap-4 md:grid-cols-5">
                    {policyRules.map((rule, idx) => (
                      <motion.div key={rule} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5 shadow-sm">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-black text-white">{idx + 1}</div>
                        <div className="text-lg font-bold leading-relaxed">{rule}</div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="rounded-[1.5rem] border border-white bg-gradient-to-r from-emerald-50 to-sky-50 p-5">
                    <div className="mb-2 text-xl font-black">What this means</div>
                    <p className="leading-relaxed text-slate-700">All services are outdoor-only. The customer should have everything ready in the front yard before Zach arrives. Zach will not enter any house for any reason. A waiver must be signed before work begins, and the customer agrees to pay the selected service price.</p>
                  </div>
                </div>
              </motion.section>
            )}

            {activePage === "booking" && (
              <motion.section key="booking" ref={bookingSectionRef} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.28 }} className="mb-10">
                <div className="mx-auto max-w-5xl rounded-[2rem] bg-gradient-to-br from-slate-900 via-teal-700 to-sky-500 p-6 text-white shadow-xl md:p-8">
                  <div className="grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                      <div className="mb-4 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-bold backdrop-blur-sm">Final Step</div>
                      <h2 className="mb-3 text-3xl font-black md:text-4xl">Choose a service and text Zach</h2>
                      <p className="mb-5 text-lg leading-relaxed text-white/90">Pick the service you want, then continue to the scheduling page to request a day and time before sending the booking request.</p>
                      <div className="space-y-4">
                        <div className="rounded-[1.5rem] border border-white/20 bg-white/15 p-4 backdrop-blur-sm">
                          <label className="mb-2 block text-sm font-bold">Pick a service</label>
                          <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="w-full rounded-2xl bg-white px-4 py-3 font-semibold text-slate-900 outline-none">
                            {uniqueServices.map((service) => (
                              <option key={service.job} value={service.job}>{service.job} — {service.pay}</option>
                            ))}
                          </select>
                        </div>

                        <div className="rounded-[1.5rem] border border-white/20 bg-white/15 p-4 backdrop-blur-sm">
                          <div className="mb-2 inline-flex items-center gap-2 text-sm font-bold">
                            <CalendarDays className="h-4 w-4" />
                            Booking Text Template
                          </div>
                          <div className="rounded-2xl bg-white/90 p-4 text-sm text-slate-700 whitespace-pre-line">
                            Hi! I’d like to book a service.

                            Name:
                            Address:
                            Service: {selectedService}
                            Price: {selectedServicePrice}
                            Requested Date/Time: {requestedSlot}
                            This request is not confirmed until Zach agrees to the time.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[1.5rem] bg-white p-5 text-slate-900 shadow-lg">
                      <div className="mb-2 text-sm font-bold text-slate-500">Selected service</div>
                      <div className="mb-2 text-2xl font-black">{selectedService}</div>
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
                        <DollarSign className="h-4 w-4" />
                        {selectedServicePrice}
                      </div>
                      <div className="mb-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-slate-700">
                        <div className="mb-2 text-sm font-bold text-slate-500">Contact</div>
                        <div className="mb-1 text-2xl font-black tracking-wide">{brand.phone}</div>
                        <div className="inline-flex items-center gap-2 text-sm text-slate-600"><MapPin className="h-4 w-4" /> {brand.city}</div>
                      </div>
                      <div className="mb-4 flex items-center gap-4">
                        <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-slate-200 bg-white p-2">
                          <QRCodeSVG value={smsHref} size={80} includeMargin />
                        </div>
                        <div className="text-sm text-slate-600">This QR code is real and scannable. After you publish the site, people can scan it to open a text to Zach.</div>
                      </div>
                      <div className="grid gap-3">
                        <button type="button" onClick={() => {
                          setActivePage("schedule")
                          setTimeout(() => scheduleSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50)
                        }} className="block rounded-2xl bg-gradient-to-r from-teal-600 to-sky-500 px-5 py-4 text-center font-black text-white shadow-md transition-transform hover:scale-105">
                          Continue to Schedule
                        </button>
                        <a href={telHref} className="block rounded-2xl bg-slate-900 px-5 py-4 text-center font-black text-white shadow-md transition-transform hover:scale-105">Call Zach</a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {activePage === "feedback" && (
              <motion.section key="feedback" ref={feedbackSectionRef} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.28 }} className="mb-12">
                <div className="mx-auto max-w-3xl rounded-[2rem] border border-white bg-white p-6 shadow-xl md:p-8">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                    <MessageSquare className="h-4 w-4" />
                    Feedback
                  </div>
                  <h2 className="mb-3 text-3xl font-black">Customer Feedback</h2>
                  <p className="mb-6 text-slate-600">Neighbors can leave a quick review after a job is finished.</p>

                  <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                    <div className="space-y-4">
                      <input type="text" placeholder="Your name" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
                      <select className="w-full rounded-2xl border border-slate-200 px-4 py-3">
                        <option>Choose a rating</option>
                        <option>⭐</option>
                        <option>⭐⭐</option>
                        <option>⭐⭐⭐</option>
                        <option>⭐⭐⭐⭐</option>
                        <option>⭐⭐⭐⭐⭐</option>
                      </select>
                      <textarea placeholder="Write your feedback here..." className="w-full rounded-2xl border border-slate-200 px-4 py-3" rows={5}></textarea>
                      <button className="w-full rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white transition-transform hover:scale-105">Submit Feedback</button>
                    </div>

                    <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                      <h3 className="mb-3 text-xl font-black">Why feedback helps</h3>
                      <div className="space-y-3 text-slate-600">
                        <div className="rounded-2xl bg-white p-4 shadow-sm">It helps new neighbors feel comfortable booking.</div>
                        <div className="rounded-2xl bg-white p-4 shadow-sm">It shows that the business is real and trustworthy.</div>
                        <div className="rounded-2xl bg-white p-4 shadow-sm">It helps Zach improve future jobs.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {activePage === "safety" && (
              <motion.section key="safety" ref={safetySectionRef} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.28 }} className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[2rem] border border-white bg-white p-6 shadow-xl md:p-8">
                  <h2 className="mb-5 text-3xl font-black">Safety Rules</h2>
                  <div className="space-y-3">
                    {safety.map((tip, index) => (
                      <motion.div key={tip} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                        <div className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full text-sm font-black text-white ${index % 2 === 0 ? "bg-teal-600" : "bg-sky-500"}`}>{index + 1}</div>
                        <p className="pt-0.5 text-slate-700">{tip}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white bg-white p-6 shadow-xl md:p-8">
                  <h2 className="mb-5 text-3xl font-black">Best Plan for a Busy Kid</h2>
                  <p className="mb-5 text-lg leading-relaxed text-slate-600">Keep it simple by choosing just one idea per season and staying with outdoor-only services.</p>
                  <div className="grid gap-3 text-base font-semibold sm:grid-cols-2">
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-emerald-700">Spring: Front yard cleanup</div>
                    <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 text-orange-700">Summer: Plant watering</div>
                    <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 text-orange-800">Fall: Leaf raking and bagging</div>
                    <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4 text-sky-800">Winter: Holiday decoration takedown</div>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

