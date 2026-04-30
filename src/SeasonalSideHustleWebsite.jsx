import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { QRCodeSVG } from "qrcode.react"
import logoUrl from "./assets/zachs-easy-side-jobs-logo.svg"
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  ChevronDown,
  Clock3,
  ClipboardCheck,
  DollarSign,
  HelpCircle,
  Home,
  Phone,
  Shield,
  Sparkles,
  Star,
  CalendarDays,
  CheckCircle2,
  BadgeCheck,
  BarChart3,
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
    code: "SPR",
    title: "Front Yard Cleanup",
    price: "$10-$20",
    desc: "Pick up sticks, tidy outdoor toys, and help make the front yard look neat."
  },
  {
    season: "Summer",
    code: "SUM",
    title: "Plant Watering",
    price: "$6-$10",
    desc: "Water front-yard plants and porch plants in the South Florida heat."
  },
  {
    season: "Fall",
    code: "FALL",
    title: "Leaf Raking & Bagging",
    price: "$12-$22",
    desc: "Rake light leaves and bag them in the front yard only."
  },
  {
    season: "Winter",
    code: "WIN",
    title: "Holiday Decoration Takedown",
    price: "$8-$15",
    desc: "Help take down lightweight outdoor decorations from the front yard or porch."
  }
]

const seasonalJobs = {
  Spring: [
    { job: "Front yard cleanup", pay: "$10-$20", level: "Easy" },
    { job: "Plant watering", pay: "$6-$10", level: "Easy" },
    { job: "Front porch sweeping", pay: "$7-$12", level: "Helpful" },
    { job: "Driveway bike wash", pay: "$6-$10 each", level: "Easy" },
    { job: "Scooter wash", pay: "$6-$10 each", level: "Easy" },
    { job: "Outdoor toy pickup", pay: "$5-$10", level: "Easy" },
    { job: "Sports gear organizing", pay: "$8-$14", level: "Sporty" },
    { job: "Outdoor table setup", pay: "$8-$15", level: "Helpful" },
    { job: "Mailbox card drop-off", pay: "$5-$8", level: "Creative" },
    { job: "Driveway chalk sign art", pay: "$6-$12", level: "Creative" }
  ],
  Summer: [
    { job: "Plant watering", pay: "$6-$10", level: "Easy" },
    { job: "Front yard cleanup", pay: "$10-$20", level: "Easy" },
    { job: "Driveway bike wash", pay: "$6-$10 each", level: "Easy" },
    { job: "Scooter wash", pay: "$6-$10 each", level: "Easy" },
    { job: "Sports gear organizing", pay: "$8-$14", level: "Sporty" },
    { job: "Outdoor chair setup", pay: "$7-$12", level: "Helpful" },
    { job: "Outdoor cooler organizing", pay: "$7-$12", level: "Helpful" },
    { job: "Snack bag setup", pay: "$3-$6 per bag", level: "Creative" },
    { job: "Drink table setup", pay: "$8-$15", level: "Popular" },
    { job: "Front porch reading buddy", pay: "$8-$12", level: "Trusted" }
  ],
  Fall: [
    { job: "Leaf raking and bagging", pay: "$12-$22", level: "Popular" },
    { job: "Front yard cleanup", pay: "$10-$20", level: "Easy" },
    { job: "Front porch sweeping", pay: "$7-$12", level: "Easy" },
    { job: "Plant watering", pay: "$6-$10", level: "Easy" },
    { job: "Sports gear organizing", pay: "$8-$14", level: "Sporty" },
    { job: "Outdoor chair setup", pay: "$7-$12", level: "Helpful" },
    { job: "Pumpkin porch setup", pay: "$8-$14", level: "Creative" },
    { job: "Mailbox flyer delivery", pay: "$5-$8", level: "Helpful" },
    { job: "Driveway chalk sign art", pay: "$6-$12", level: "Creative" },
    { job: "Outdoor toy pickup", pay: "$5-$10", level: "Easy" }
  ],
  Winter: [
    { job: "Holiday decoration takedown", pay: "$8-$15", level: "Helpful" },
    { job: "Front porch sweeping", pay: "$7-$12", level: "Easy" },
    { job: "Outdoor toy bin cleanup", pay: "$6-$10", level: "Easy" },
    { job: "Sports gear organizing", pay: "$8-$14", level: "Sporty" },
    { job: "Outdoor table organizing", pay: "$7-$12", level: "Helpful" },
    { job: "Mailbox card drop-off", pay: "$5-$8", level: "Creative" },
    { job: "Porch note card sets", pay: "$3-$6 per set", level: "Creative" },
    { job: "Driveway bike wash", pay: "$6-$10 each", level: "Easy" },
    { job: "Scooter wash", pay: "$6-$10 each", level: "Easy" },
    { job: "Front yard cleanup", pay: "$10-$20", level: "Easy" }
  ]
}

const customService = {
  job: "Custom outdoor request",
  pay: "Ask Zach",
  level: "Custom",
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
  "I will not go into anybody's houses.",
  "You have to sign a waiver before the service starts.",
  "Please stay inside of your house for him to be comfortable and feel safe.",
  "I will pay the price of the service selected below."
]

const faqs = [
  {
    question: "Where does Zach work?",
    answer: "For now, services are only available in S. FL Avenir Coral Isles Circle."
  },
  {
    question: "Are jobs indoor or outdoor?",
    answer: "All jobs are outdoor only. Zach will not go inside any house."
  },
  {
    question: "When is a request confirmed?",
    answer: "A request is confirmed only after Zach agrees to the day, time, and service details."
  },
  {
    question: "When do customers pay?",
    answer: "Customers pay after the job is finished, based on the service price agreed before work starts."
  },
  {
    question: "Is the policy required?",
    answer: "Yes. The policy and waiver must be read and agreed to before the service starts."
  },
]

const tabs = [
  { name: "Spring", code: "SPR", gradient: "from-emerald-500 to-teal-600", bg: "from-emerald-50 to-teal-50", accent: "text-emerald-700" },
  { name: "Summer", code: "SUM", gradient: "from-amber-500 to-sky-600", bg: "from-amber-50 to-sky-50", accent: "text-amber-800" },
  { name: "Fall", code: "FALL", gradient: "from-orange-500 to-teal-600", bg: "from-orange-50 to-teal-50", accent: "text-orange-800" },
  { name: "Winter", code: "WIN", gradient: "from-sky-500 to-cyan-600", bg: "from-sky-50 to-cyan-50", accent: "text-sky-800" }
]

const navItems = [
  { key: "home", label: "Home", icon: Home },
  { key: "key", label: "Key", icon: BadgeCheck },
  { key: "services", label: "Services", icon: Briefcase },
  { key: "custom", label: "Custom", icon: Sparkles },
  { key: "pricing", label: "Pricing", icon: DollarSign },
  { key: "how", label: "How It Works", icon: ClipboardCheck },
  { key: "policy", label: "Policy", icon: Shield },
  { key: "booking", label: "Book", icon: Phone },
  { key: "area", label: "Service Area", icon: MapPin },
  { key: "stats", label: "My Stats", icon: BarChart3 },
  { key: "faq", label: "FAQ", icon: HelpCircle },
  { key: "about", label: "About Me", icon: Star },
  { key: "feedback", label: "Feedback", icon: MessageSquare },
  { key: "safety", label: "Safety", icon: Sparkles },
]

const pageOrder = navItems.map((item) => item.key)

export const __testCases = [
  { name: "default season is Spring", expected: "Spring" },
  { name: "each season has at least 10 jobs", expected: true },
  { name: "booking tab exists", expected: true },
  { name: "key tab exists", expected: true },
  { name: "custom tab exists", expected: true },
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
  { name: "feedback form exists", expected: true },
  { name: "stats tab exists", expected: true },
  { name: "booking stats are saved locally", expected: true },
  { name: "faq tab exists", expected: true },
  { name: "pricing tab exists", expected: true },
  { name: "service area tab exists", expected: true }
]

const pageInfo = {
  ...Object.fromEntries(navItems.map((item) => [item.key, { label: item.label, icon: item.icon }])),
  booking: { label: "Booking", icon: Phone },
}

const keyTabs = [
  {
    key: "labels",
    label: "Labels",
    short: "Job tags",
    icon: Briefcase,
  },
  {
    key: "prices",
    label: "Prices",
    short: "Money",
    icon: DollarSign,
  },
  {
    key: "booking",
    label: "Booking",
    short: "How to book",
    icon: ClipboardCheck,
  },
  {
    key: "safety",
    label: "Safety",
    short: "Rules",
    icon: Shield,
  },
  {
    key: "seasons",
    label: "Seasons",
    short: "Best jobs",
    icon: SunMedium,
  },
  {
    key: "area",
    label: "Area",
    short: "Where",
    icon: MapPin,
  },
  {
    key: "contact",
    label: "Contact",
    short: "Text only",
    icon: Phone,
  },
]

const labelKey = [
  { label: "Easy", meaning: "Simple work that should be quick and safe.", example: "Plant watering or toy pickup." },
  { label: "Helpful", meaning: "Useful setup or cleanup for the front yard or porch.", example: "Outdoor table setup or porch sweeping." },
  { label: "Popular", meaning: "Jobs neighbors may request often.", example: "Leaf raking or bike wash." },
  { label: "Creative", meaning: "Outdoor jobs with cards, signs, or simple setup.", example: "Driveway chalk sign art." },
  { label: "Custom", meaning: "A safe outdoor job that is not listed yet.", example: "Customer explains the job first." },
]

const priceKey = [
  { title: "Price range", detail: "A range like $10-$20 means the final price depends on the size of the job." },
  { title: "Ask Zach", detail: "For custom jobs, Zach and the customer agree on the price before any work starts." },
  { title: "No surprise price", detail: "The service, price, day, and time should be clear before the job begins." },
  { title: "When to pay", detail: "Payment happens after the job is finished." },
]

const bookingKey = [
  { title: "Pick a service", detail: "Choose a listed service or use Custom if the job is not listed." },
  { title: "Read the policy", detail: "The job must follow the outdoor-only rules before booking." },
  { title: "Choose a time", detail: "Pick the requested day and time in the booking form." },
  { title: "Text Zach", detail: "The text opens on the phone. The job is not confirmed until Zach agrees." },
]

const statsStorageKey = "zachs-easy-side-jobs-stats"
const statsSessionKey = "zachs-easy-side-jobs-visit-counted"

const emptyStats = {
  visits: 0,
  totalBookings: 0,
  bookingsByService: {},
  lastUpdated: null,
}

const loadStats = () => {
  if (typeof window === "undefined") return emptyStats

  try {
    const saved = window.localStorage.getItem(statsStorageKey)
    if (!saved) return emptyStats

    const parsed = JSON.parse(saved)
    return {
      ...emptyStats,
      ...parsed,
      bookingsByService: parsed.bookingsByService ?? {},
    }
  } catch {
    return emptyStats
  }
}

const saveStats = (stats) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(statsStorageKey, JSON.stringify(stats))
  }

  return stats
}

const isLocalPreview = () => {
  if (typeof window === "undefined") return false
  return ["localhost", "127.0.0.1"].includes(window.location.hostname)
}

const pageMotion = {
  initial: { opacity: 0, y: 22, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -14, scale: 0.99 },
  transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
}

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.04,
    },
  },
}

const serviceCardMotion = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] } },
}

export default function SeasonalSideHustleWebsite() {
  const [showPolicyGate, setShowPolicyGate] = useState(false)
  const [showWaiver, setShowWaiver] = useState(false)
  const [policyRead, setPolicyRead] = useState(false)
  const [activeKeyTab, setActiveKeyTab] = useState("labels")
  const [activeSeason, setActiveSeason] = useState("Spring")
  const [openSeason, setOpenSeason] = useState("Spring")
  const [search, setSearch] = useState("")
  const [selectedService, setSelectedService] = useState("Front yard cleanup")
  const [activePage, setActivePage] = useState("home")
  const [requestedDate, setRequestedDate] = useState("")
  const [requestedTime, setRequestedTime] = useState("After School")
  const [stats, setStats] = useState(loadStats)

  const jobsSectionRef = useRef(null)
  const pricingSectionRef = useRef(null)
  const aboutSectionRef = useRef(null)
  const howRef = useRef(null)
  const feedbackSectionRef = useRef(null)
  const safetySectionRef = useRef(null)
  const bookingSectionRef = useRef(null)
  const policySectionRef = useRef(null)
  const statsSectionRef = useRef(null)
  const faqSectionRef = useRef(null)
  const areaSectionRef = useRef(null)
  const keySectionRef = useRef(null)
  const topRef = useRef(null)

  const activeTab = tabs.find((tab) => tab.name === activeSeason) ?? tabs[0]

  useEffect(() => {
    if (typeof window === "undefined") return
    if (isLocalPreview()) return
    if (window.sessionStorage.getItem(statsSessionKey)) return

    window.sessionStorage.setItem(statsSessionKey, "true")
    setStats((currentStats) =>
      saveStats({
        ...currentStats,
        visits: (currentStats.visits ?? 0) + 1,
        lastUpdated: new Date().toISOString(),
      })
    )
  }, [])

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
  const uniqueServices = [...new Map(allServices.map((item) => [item.job, item])).values(), customService]
  const bookingRows = uniqueServices
    .map((service) => ({
      ...service,
      bookings: stats.bookingsByService?.[service.job] ?? 0,
    }))
    .sort((a, b) => b.bookings - a.bookings || a.job.localeCompare(b.job))
  const totalBookings = stats.totalBookings ?? 0
  const topBookedService = bookingRows.find((service) => service.bookings > 0)
  const lastUpdated = stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleString() : "Not yet"
  const activityCount = (stats.visits ?? 0) + totalBookings
  const activityFill = Math.min(100, activityCount * 12)

  const selectedServicePrice = uniqueServices.find((item) => item.job === selectedService)?.pay ?? "Price agreed before starting"
  const selectedServicePriceUsd = `${selectedServicePrice} USD`
  const requestedSlot = requestedDate ? `${requestedDate} at ${requestedTime}` : `Not selected yet (${requestedTime})`

  const smsTemplate = `Hi! I'd like to book a service.%0A%0AName:%0AAddress:%0AService:${encodeURIComponent(selectedService)}%0APrice:${encodeURIComponent(selectedServicePrice)}%0ADay/Time:%0A`
  const bookingSmsHref = `sms:${brand.phoneDigits}?body=${`Hi! I'd like to book a service.%0A%0AName:%0AAddress:%0AService:${encodeURIComponent(selectedService)}%0APrice:${encodeURIComponent(selectedServicePrice)}%0ARequested Date/Time:${encodeURIComponent(requestedSlot)}%0AThis request is not confirmed until Zach agrees to the time.%0A`}`
  const professionalAutoReplyMessage = `Hi! Thanks for reaching out.\n\nHere are my services:\n- Front Yard Cleanup ($10-$20)\n- Plant Watering ($6-$10)\n- Leaf Raking & Bagging ($12-$22)\n- Porch / Driveway Sweeping ($7-$12)\n\nAll jobs are outdoor only and require a quick agreement before work starts.\n\nWhat service do you need?`

  const recordBookingStart = (serviceName = selectedService) => {
    setStats((currentStats) => {
      const bookingsByService = currentStats.bookingsByService ?? {}
      return saveStats({
        ...currentStats,
        totalBookings: (currentStats.totalBookings ?? 0) + 1,
        bookingsByService: {
          ...bookingsByService,
          [serviceName]: (bookingsByService[serviceName] ?? 0) + 1,
        },
        lastUpdated: new Date().toISOString(),
      })
    })
  }

  const recordManualVisit = () => {
    setStats((currentStats) =>
      saveStats({
        ...currentStats,
        visits: (currentStats.visits ?? 0) + 1,
        lastUpdated: new Date().toISOString(),
      })
    )
  }

  const resetStats = () => {
    setStats(saveStats(emptyStats))
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(statsSessionKey)
    }
  }

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

  const openWaiver = () => {
    setShowPolicyGate(false)
    setShowWaiver(true)
  }

  const agreeToWaiver = () => {
    setPolicyRead(true)
    setShowWaiver(false)
    setActivePage("booking")
    setTimeout(() => {
      bookingSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 50)
  }

  const goToPage = (page) => {
    const refMap = {
      home: topRef,
      key: keySectionRef,
      about: aboutSectionRef,
      how: howRef,
      services: jobsSectionRef,
      custom: jobsSectionRef,
      pricing: pricingSectionRef,
      policy: policySectionRef,
      booking: bookingSectionRef,
      area: areaSectionRef,
      stats: statsSectionRef,
      faq: faqSectionRef,
      feedback: feedbackSectionRef,
      safety: safetySectionRef,
    }

    if (page === "home") {
      setActivePage("home")
      setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50)
      return
    }

    if (page === "custom") {
      setSelectedService(customService.job)
      setActivePage("custom")
      setTimeout(() => jobsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50)
      return
    }

    scrollToSection(page, refMap[page])
  }

  const pageIndex = pageOrder.indexOf(activePage)
  const prevPage = pageIndex > 0 ? pageOrder[pageIndex - 1] : null
  const nextPage = pageIndex >= 0 && pageIndex < pageOrder.length - 1 ? pageOrder[pageIndex + 1] : null

  return (
    <>
      <AnimatePresence>
        {showPolicyGate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <motion.div initial={{ scale: 0.92, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0 }} className="w-full max-w-lg rounded-3xl bg-white p-6 text-center shadow-2xl">
              <div className="mb-4 text-5xl">!</div>
              <h2 className="mb-2 text-2xl font-black">Read Policy First</h2>
              <p className="mb-4 text-slate-600">Before booking a service, please read the policy page.</p>
              <div className="mb-5 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500">
                <Shield className="h-4 w-4" />
                <span>Policy - Done - Booking</span>
              </div>
              <button type="button" onClick={() => {
                openWaiver()
              }} className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white">
                Open Waiver
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWaiver && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <motion.div initial={{ scale: 0.94, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0 }} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl md:p-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-2 text-sm font-black text-teal-700">
                <FileSignature className="h-4 w-4" />
                Waiver + Service Agreement
              </div>
              <h2 className="mb-3 text-3xl font-black text-slate-900">Read Before Booking</h2>
              <p className="mb-5 leading-relaxed text-slate-600">
                By requesting a service, the customer agrees that the job is outdoor-only, the service area is limited, and the requested time is not confirmed until Zach agrees.
              </p>
              <div className="mb-6 grid gap-3">
                {[
                  "All work must stay outside in the front yard, porch, driveway, or approved outdoor area.",
                  "Zach will not enter any house for any reason.",
                  "The service, price, day, and time must be clear before work starts.",
                  "A parent or guardian should know about the request before the job begins.",
                  "Payment is made after the job is complete.",
                ].map((item, index) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-black text-white">{index + 1}</div>
                    <p className="pt-1 text-sm font-semibold leading-relaxed text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap justify-end gap-3">
                <button type="button" onClick={() => setShowWaiver(false)} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-bold text-slate-700">
                  Close
                </button>
                <button type="button" onClick={agreeToWaiver} className="rounded-2xl bg-slate-900 px-5 py-3 font-black text-white">
                  I Agree - Continue To Booking
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activePage === "policy" && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
            <button type="button" onClick={continueFromPolicy} className="rounded-full bg-green-500 px-6 py-3 font-bold text-white shadow-lg ring-4 ring-green-200">
              Done - Continue to Booking
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={topRef} className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,_#fffdf7,_#d9f3ee_34%,_#eef6ff_68%,_#f8fafc_100%)] text-slate-900">
        <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-48 bg-gradient-to-r from-emerald-200/35 via-amber-100/30 to-sky-200/35 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 py-8 md:py-10">
          <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="sticky top-0 z-20 mb-6 overflow-hidden rounded-[1.5rem] border border-white bg-white/90 shadow-lg backdrop-blur">
            <div className="flex flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="truncate text-sm font-black text-slate-900">{brand.businessName}</div>
                <div className="text-xs font-semibold text-slate-500">Outdoor-only neighborhood services</div>
              </div>
              <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-bold leading-relaxed text-slate-700">
                Start with Key, choose a service, read Policy, then Book by text.
              </div>
            </div>
            <div className="site-tab-strip border-t border-slate-100 px-3 py-3">
              {navItems.map(({ key, label, icon: Icon }) => (
                <motion.button key={key} type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => goToPage(key)} className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all ${
                  activePage === key
                    ? key === "booking"
                      ? "scale-105 bg-gradient-to-r from-teal-600 to-sky-500 text-white shadow-md"
                      : "scale-105 bg-slate-900 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}>
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </motion.button>
              ))}
            </div>
          </motion.nav>

          <div className="mb-6 grid gap-3 rounded-[1.5rem] border border-white bg-white/80 p-4 shadow-sm backdrop-blur md:grid-cols-[1fr_auto_1fr] md:items-center">
            {prevPage && (
              <button type="button" onClick={() => goToPage(prevPage)} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50">
                <ArrowLeft className="h-4 w-4" />
                {pageInfo[prevPage].label}
              </button>
            )}
            <div className="text-center">
              <div className="mb-1 text-xs font-black uppercase tracking-wide text-slate-500">Directions</div>
              <div className="rounded-full bg-gradient-to-r from-emerald-100 via-amber-50 to-sky-100 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-white">
                You are here: {pageInfo[activePage].label}
              </div>
              <div className="mt-2 text-xs font-semibold text-slate-500">Use the top tabs or arrows to move around the website.</div>
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
                <header className="home-animated-scene relative mb-10 overflow-hidden rounded-[2rem] border border-white/80 p-8 shadow-xl backdrop-blur md:p-10">
                  <div className="home-sky-glow" />
                  <div className="home-sun" />
                  <div className="home-sun-ray home-sun-ray-one" />
                  <div className="home-sun-ray home-sun-ray-two" />
                  <div className="home-cloud home-cloud-one" />
                  <div className="home-cloud home-cloud-two" />
                  <div className="home-cloud home-cloud-three" />
                  <div className="home-spotlight" />
                  <div className="home-path" />
                  <div className="home-path-stripe home-path-stripe-one" />
                  <div className="home-path-stripe home-path-stripe-two" />
                  <div className="home-path-stripe home-path-stripe-three" />
                  <div className="home-lawn home-lawn-one" />
                  <div className="home-lawn home-lawn-two" />
                  <div className="home-yard-line home-yard-line-one" />
                  <div className="home-yard-line home-yard-line-two" />
                  <div className="home-yard-card home-yard-card-one">Plant watering</div>
                  <div className="home-yard-card home-yard-card-two">Bike wash</div>
                  <div className="home-yard-card home-yard-card-three">Porch sweeping</div>
                  <div className="home-service-runner">
                    <span />
                  </div>
                  <div className="home-spark home-spark-one" />
                  <div className="home-spark home-spark-two" />
                  <div className="home-spark home-spark-three" />
                  <div className="home-leaf home-leaf-one" />
                  <div className="home-leaf home-leaf-two" />
                  <div className="home-leaf home-leaf-three" />

                  <div className="relative grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <div>
                      <div className="mb-5 max-w-md rounded-[1.5rem] border border-white bg-white/85 p-3 shadow-lg backdrop-blur">
                        <img src={logoUrl} alt="Zach's Easy Side Jobs" className="h-auto w-full" />
                      </div>
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white bg-white/80 px-4 py-2 text-sm font-semibold shadow-sm">
                        <BadgeCheck className="h-4 w-4" />
                        <span>Outdoor services for neighbors</span>
                      </div>
                      <h1 className="mb-4 text-4xl font-black leading-none tracking-tight md:text-6xl">
                        {brand.businessName}
                        <span className="block bg-gradient-to-r from-teal-700 via-emerald-500 to-sky-500 bg-clip-text text-transparent">
                          simple, safe, and easy to request
                        </span>
                      </h1>
                      <p className="mb-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                        Browse services, see prices, read the policy, and request a time by text.
                      </p>
                      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
                        Only in S. FL Avenir Coral Isles Circle for now. Outdoor-only services.
                      </div>
                      <div className="mb-6 flex flex-wrap gap-3">
                        <a href={bookingSmsHref} onClick={() => recordBookingStart(selectedService)} className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-600 to-sky-500 px-5 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105">
                          <MessageSquare className="h-4 w-4" />
                          Text to Book
                        </a>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm font-semibold">
                        <div className="rounded-full bg-emerald-100 px-4 py-2 text-emerald-700">Clear pricing</div>
                        <div className="rounded-full bg-amber-100 px-4 py-2 text-amber-800">Easy requests</div>
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
                          <button type="button" onClick={() => goToPage("booking")} className="rounded-2xl bg-white px-5 py-3 text-left font-bold text-slate-900 shadow-md ring-1 ring-slate-200 transition-transform hover:scale-105">
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

            {activePage === "key" && (
              <motion.section key="key" ref={keySectionRef} {...pageMotion} className="mb-12">
                <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white bg-white shadow-xl">
                  <div className="bg-gradient-to-r from-slate-950 via-teal-800 to-sky-700 p-6 text-white md:p-8">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
                      <BadgeCheck className="h-4 w-4" />
                      Site Key
                    </div>
                    <h2 className="mb-2 text-3xl font-black md:text-4xl">What everything means</h2>
                    <p className="max-w-2xl text-base font-semibold leading-relaxed text-white/85">
                      This is the quick guide for customers. Each tab explains one part of the website in simple words.
                    </p>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="mb-5 grid gap-2 rounded-[1.5rem] border border-slate-100 bg-slate-50 p-2 sm:grid-cols-2 lg:grid-cols-4">
                      {keyTabs.map(({ key, label, short, icon: Icon }) => (
                        <button key={key} type="button" onClick={() => setActiveKeyTab(key)} className={`flex min-h-16 items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                          activeKeyTab === key
                            ? "bg-slate-900 text-white shadow-md"
                            : "bg-white text-slate-700 shadow-sm ring-1 ring-slate-100 hover:bg-slate-100"
                        }`}>
                          <Icon className="h-5 w-5 shrink-0" />
                          <span>
                            <span className="block text-sm font-black">{label}</span>
                            <span className={`block text-xs font-semibold ${activeKeyTab === key ? "text-white/70" : "text-slate-500"}`}>{short}</span>
                          </span>
                        </button>
                      ))}
                    </div>

                    {activeKeyTab === "labels" && (
                      <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                        <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-700">
                          <Briefcase className="h-4 w-4" />
                          Service labels
                        </div>
                        <p className="mb-4 text-sm font-semibold leading-relaxed text-slate-600">
                          These words tell customers what kind of service they are looking at.
                        </p>
                        <div className="grid gap-3 md:grid-cols-2">
                          {labelKey.map((item) => (
                            <div key={item.label} className="rounded-2xl bg-white p-4 shadow-sm">
                              <div className="mb-1 text-lg font-black text-slate-900">{item.label}</div>
                              <div className="text-sm font-semibold leading-relaxed text-slate-600">{item.meaning}</div>
                              <div className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500">{item.example}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeKeyTab === "prices" && (
                      <div className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-5">
                        <div className="mb-3 flex items-center gap-2 text-sm font-black text-emerald-800">
                          <DollarSign className="h-4 w-4" />
                          Price key
                        </div>
                        <p className="mb-4 text-sm font-semibold leading-relaxed text-emerald-900">
                          Prices are meant to be clear before work begins.
                        </p>
                        <div className="grid gap-3 text-sm font-semibold leading-relaxed text-emerald-900 md:grid-cols-2">
                          {priceKey.map((item) => (
                            <div key={item.title} className="rounded-2xl bg-white/80 p-4">
                              <div className="mb-1 text-base font-black text-slate-900">{item.title}</div>
                              <div>{item.detail}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeKeyTab === "booking" && (
                      <div className="rounded-[1.5rem] border border-sky-100 bg-sky-50 p-5">
                        <div className="mb-3 flex items-center gap-2 text-sm font-black text-sky-800">
                          <ClipboardCheck className="h-4 w-4" />
                          Booking key
                        </div>
                        <p className="mb-4 text-sm font-semibold leading-relaxed text-sky-900">
                          Booking is a request. The appointment is only real after Zach confirms it.
                        </p>
                        <div className="grid gap-3 md:grid-cols-2">
                          {bookingKey.map((step, index) => (
                            <div key={step.title} className="flex items-start gap-3 rounded-2xl bg-white/80 p-4">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-black text-white">{index + 1}</div>
                              <div>
                                <div className="font-black text-slate-900">{step.title}</div>
                                <div className="mt-1 text-sm font-semibold leading-relaxed text-slate-600">{step.detail}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeKeyTab === "safety" && (
                      <div className="rounded-[1.5rem] border border-amber-100 bg-amber-50 p-5">
                        <div className="mb-3 flex items-center gap-2 text-sm font-black text-amber-900">
                          <Shield className="h-4 w-4" />
                          Safety key
                        </div>
                        <p className="mb-4 text-sm font-semibold leading-relaxed text-amber-950">
                          These rules keep each job simple and safe.
                        </p>
                        <div className="grid gap-3 text-sm font-semibold leading-relaxed text-amber-950 md:grid-cols-2">
                          {[
                            "Outdoor-only work.",
                            "Zach does not go inside homes.",
                            "Everything should be ready in the front yard.",
                            "A parent or guardian should know about the job.",
                            "The job is confirmed only after Zach agrees.",
                            "Payment happens after the job is complete.",
                          ].map((rule) => (
                            <div key={rule} className="flex items-start gap-3 rounded-2xl bg-white/80 p-4">
                              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                              <span>{rule}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeKeyTab === "seasons" && (
                      <div className="rounded-[1.5rem] border border-cyan-100 bg-cyan-50 p-5">
                        <div className="mb-3 flex items-center gap-2 text-sm font-black text-cyan-900">
                          <SunMedium className="h-4 w-4" />
                          Season key
                        </div>
                        <p className="mb-4 text-sm font-semibold leading-relaxed text-cyan-950">
                          Seasons help customers find jobs that make sense during the year.
                        </p>
                        <div className="grid gap-3 md:grid-cols-4">
                          {featuredIdeas.map((idea) => (
                            <div key={idea.season} className="rounded-2xl bg-white/80 p-4 shadow-sm">
                              <div className="text-lg font-black text-slate-900">{idea.season}</div>
                              <div className="mt-1 text-sm font-bold text-cyan-800">{idea.title}</div>
                              <div className="mt-2 text-sm font-semibold text-slate-600">{idea.price}</div>
                              <div className="mt-3 text-xs font-semibold leading-relaxed text-slate-500">{idea.desc}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeKeyTab === "area" && (
                      <div className="rounded-[1.5rem] border border-teal-100 bg-teal-50 p-5">
                        <div className="mb-3 flex items-center gap-2 text-sm font-black text-teal-900">
                          <MapPin className="h-4 w-4" />
                          Area key
                        </div>
                        <p className="mb-4 text-sm font-semibold leading-relaxed text-teal-950">
                          The service area is limited for now, so customers should check this before booking.
                        </p>
                        <div className="grid gap-3 md:grid-cols-3">
                          <div className="rounded-2xl bg-white/80 p-4">
                            <div className="mb-1 text-sm font-black text-teal-800">Where</div>
                            <div className="font-bold text-slate-800">S. FL Avenir Coral Isles Circle</div>
                          </div>
                          <div className="rounded-2xl bg-white/80 p-4">
                            <div className="mb-1 text-sm font-black text-teal-800">Work area</div>
                            <div className="font-bold text-slate-800">Front yard and outdoor areas only</div>
                          </div>
                          <div className="rounded-2xl bg-white/80 p-4">
                            <div className="mb-1 text-sm font-black text-teal-800">Not included</div>
                            <div className="font-bold text-slate-800">No indoor work or entering homes</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeKeyTab === "contact" && (
                      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                        <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-800">
                          <Phone className="h-4 w-4" />
                          Contact key
                        </div>
                        <p className="mb-4 text-sm font-semibold leading-relaxed text-slate-600">
                          The booking text includes the service, price, requested time, and policy note.
                        </p>
                        <div className="grid gap-3 md:grid-cols-3">
                          <div className="rounded-2xl bg-slate-50 p-4">
                            <div className="mb-1 text-sm font-black text-slate-500">Best button</div>
                            <div className="font-black text-slate-900">Text Zach To Request</div>
                          </div>
                          <div className="rounded-2xl bg-slate-50 p-4">
                            <div className="mb-1 text-sm font-black text-slate-500">Best action</div>
                            <div className="font-bold text-slate-800">Text Zach with service, price, day, and time</div>
                          </div>
                          <div className="rounded-2xl bg-slate-50 p-4">
                            <div className="mb-1 text-sm font-black text-slate-500">Confirmed when</div>
                            <div className="font-bold text-slate-800">Only after Zach agrees to the details</div>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <button type="button" onClick={() => goToPage("booking")} className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-900 shadow-sm ring-1 ring-slate-200">
                            <MessageSquare className="h-4 w-4" />
                            Open Booking
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.section>
            )}

            {activePage === "about" && (
              <motion.section key="about" ref={aboutSectionRef} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.28 }} className="mb-12">
                <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white bg-white shadow-xl">
                  <div className="bg-gradient-to-r from-amber-100 via-emerald-100 to-sky-100 px-6 py-8 md:px-10">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-black text-slate-800 shadow-sm">
                      <Star className="h-4 w-4" />
                      About Zach
                    </div>
                    <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">About Zach</h2>
                    <p className="mt-3 max-w-3xl text-lg leading-relaxed text-slate-700">
                      Zach helps neighbors with simple outdoor jobs after school and on weekends.
                    </p>
                  </div>

                  <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="space-y-5">
                      <div className="rounded-[1.5rem] border border-yellow-100 bg-yellow-50 p-5">
                        <h3 className="mb-2 text-2xl font-black text-slate-900">Reliable outdoor help</h3>
                        <p className="text-base leading-relaxed text-slate-700">
                          I help with simple front-yard jobs like cleanup, watering, sweeping, and bike washes. Every job stays outside and starts only after the service details are clear.
                        </p>
                      </div>

                      <div className="rounded-[1.5rem] border border-sky-100 bg-sky-50 p-5">
                        <h3 className="mb-2 text-2xl font-black text-slate-900">Good effort</h3>
                        <p className="text-base leading-relaxed text-slate-700">
                          I bring a good attitude, clear communication, and steady effort to each job. If a requested service is not safe or clear, I will not start it.
                        </p>
                      </div>

                      <div className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-5">
                        <h3 className="mb-2 text-2xl font-black text-slate-900">Clear prices</h3>
                        <p className="text-base leading-relaxed text-slate-700">
                          Prices are listed before the work starts. Payment is made after the job is finished and the service is complete.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="rounded-[1.75rem] bg-slate-900 p-6 text-white shadow-lg">
                        <div className="mb-3 text-sm font-bold uppercase tracking-wide text-sky-200">Quick Facts</div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-2xl bg-white/10 p-4">
                            <div className="text-sm text-white/70">Service area</div>
                            <div className="text-xl font-black">Local neighbors</div>
                          </div>
                          <div className="rounded-2xl bg-white/10 p-4">
                            <div className="text-sm text-white/70">Work type</div>
                            <div className="text-xl font-black">Outdoor only</div>
                          </div>
                          <div className="rounded-2xl bg-white/10 p-4">
                            <div className="text-sm text-white/70">Availability</div>
                            <div className="text-xl font-black">After school</div>
                          </div>
                          <div className="rounded-2xl bg-white/10 p-4">
                            <div className="text-sm text-white/70">Main rule</div>
                            <div className="text-xl font-black">Safety first</div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[1.5rem] border border-cyan-100 bg-cyan-50 p-5">
                        <h3 className="mb-3 text-2xl font-black text-slate-900">What to expect</h3>
                        <div className="space-y-3 text-slate-700">
                          <div className="rounded-2xl bg-white p-4 shadow-sm">Clear service details before work starts.</div>
                          <div className="rounded-2xl bg-white p-4 shadow-sm">Simple outdoor help completed carefully.</div>
                          <div className="rounded-2xl bg-white p-4 shadow-sm">No indoor work and no unclear jobs.</div>
                        </div>
                      </div>

                      <div className="rounded-[1.5rem] border border-amber-100 bg-gradient-to-r from-amber-50 to-yellow-50 p-5">
                        <h3 className="mb-2 text-2xl font-black text-slate-900">Ready to request a job?</h3>
                        <p className="text-base leading-relaxed text-slate-700">
                          Choose a service, read the policy, pick a time, and text Zach with the request.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {activePage === "faq" && (
              <motion.section key="faq" ref={faqSectionRef} {...pageMotion} className="mb-12">
                <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white bg-white shadow-xl">
                  <div className="bg-gradient-to-r from-slate-950 via-teal-800 to-sky-700 p-6 text-white md:p-8">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
                      <HelpCircle className="h-4 w-4" />
                      Customer Questions
                    </div>
                    <h2 className="mb-2 text-3xl font-black md:text-4xl">Frequently Asked Questions</h2>
                    <p className="max-w-2xl text-white/85">
                      Quick answers for neighbors before they request a service.
                    </p>
                  </div>

                  <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-4 p-6 md:grid-cols-2 md:p-8">
                    {faqs.map((item, index) => (
                      <motion.div key={item.question} variants={serviceCardMotion} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5 shadow-sm">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-black text-white">
                          {index + 1}
                        </div>
                        <h3 className="mb-2 text-xl font-black text-slate-900">{item.question}</h3>
                        <p className="leading-relaxed text-slate-600">{item.answer}</p>
                      </motion.div>
                    ))}
                  </motion.div>

                  <div className="border-t border-slate-100 bg-gradient-to-r from-emerald-50 to-sky-50 p-6 md:p-8">
                    <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                      <div>
                        <h3 className="text-2xl font-black text-slate-900">Ready to request a job?</h3>
                        <p className="mt-2 text-slate-600">Choose a service, pick a requested time, and text Zach to confirm the details.</p>
                      </div>
                      <motion.button type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => goToPage("services")} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white shadow-md">
                        View Services
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {activePage === "services" && (
              <motion.section key="services" ref={jobsSectionRef} {...pageMotion} className="mb-12">
                <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white bg-white/95 shadow-xl backdrop-blur">
                  <div className="border-b border-slate-100 bg-gradient-to-r from-slate-950 via-teal-800 to-sky-700 p-6 text-white md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
                          <Briefcase className="h-4 w-4" />
                          Service Catalog
                        </div>
                        <h2 className="mb-2 text-3xl font-black md:text-4xl">Seasonal Services</h2>
                        <p className="max-w-2xl text-white/85">
                          Browse outdoor jobs by season, compare clear prices, and choose a service to request a time.
                        </p>
                      </div>
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="rounded-2xl bg-white/15 px-4 py-3 text-sm font-bold shadow-sm backdrop-blur">
                        {filteredJobs.length} services in {activeSeason}
                      </motion.div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">

                  <div className="mb-5 grid gap-4 md:grid-cols-[1fr_auto]">
                    <div className="relative">
                      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${activeSeason.toLowerCase()} services...`} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-300" />
                    </div>
                    <motion.button type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => goToPage("how")} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white shadow-md transition-colors hover:bg-slate-800">
                      <ClipboardCheck className="h-4 w-4" />
                      See Booking Steps
                    </motion.button>
                  </div>

                  <div className="mb-6 flex items-center justify-center">
                    <div className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-bold text-slate-700 shadow-sm">Select a season to view available services.</div>
                  </div>

                  <div className="mb-5 space-y-3">
                    {tabs.map((tab) => {
                      const isOpen = openSeason === tab.name
                      const jobs = seasonalJobs[tab.name]
                      const visibleJobs = isOpen ? jobs.filter((item) => item.job.toLowerCase().includes(search.toLowerCase())) : []

                      return (
                          <motion.div key={tab.name} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }} className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-sm">
                            <motion.button type="button" whileHover={{ backgroundColor: isOpen ? undefined : "#f8fafc" }} whileTap={{ scale: 0.995 }} onClick={() => handleDropdownToggle(tab.name)} className={`w-full px-5 py-4 text-left transition-all ${isOpen ? `bg-gradient-to-r ${tab.gradient} text-white` : "bg-white text-slate-800"}`}>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <span className={`flex h-11 min-w-12 items-center justify-center rounded-xl px-2 text-xs font-black tracking-wide ${isOpen ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"}`}>{tab.code}</span>
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
                          </motion.button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} className={`overflow-hidden border-t border-slate-100 bg-gradient-to-br p-5 ${tab.bg}`}>
                                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                                  <div>
                                    <h3 className="text-2xl font-black">{tab.name} Services</h3>
                                    <p className="text-slate-600">All services stay outdoors and follow the policy.</p>
                                  </div>
                                  <div className={`rounded-full bg-white px-4 py-2 text-sm font-bold ${tab.accent}`}>{visibleJobs.length} showing</div>
                                </div>

                                <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2">
                                  {visibleJobs.map((item, index) => (
                                    <motion.button key={item.job} type="button" variants={serviceCardMotion} whileHover={{ y: -5, boxShadow: "0 18px 34px rgba(15, 23, 42, 0.12)" }} whileTap={{ scale: 0.98 }} onClick={() => {
                                      setSelectedService(item.job)
                                      if (!policyRead) {
                                        setShowPolicyGate(true)
                                        return
                                      }
                                      setActivePage("booking")
                                      setTimeout(() => bookingSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50)
                                    }} className="rounded-2xl border border-white bg-white px-4 py-4 text-left shadow-sm">
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
                                </motion.div>

                                {visibleJobs.length === 0 && <div className="mt-4 rounded-2xl border border-white bg-white/80 px-4 py-4 font-medium text-slate-700">No services matched that search. Try another word.</div>}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    })}
                  </div>
                  </div>
                </div>
              </motion.section>
            )}

            {activePage === "custom" && (
              <motion.section key="custom" ref={jobsSectionRef} {...pageMotion} className="mb-12">
                <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-white bg-white/95 shadow-xl backdrop-blur">
                  <div className="bg-gradient-to-r from-slate-950 via-teal-800 to-sky-700 p-6 text-white md:p-8">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
                      <Sparkles className="h-4 w-4" />
                      Custom Request
                    </div>
                    <h2 className="mb-2 text-3xl font-black md:text-4xl">Custom Outdoor Job</h2>
                    <p className="max-w-2xl text-white/85">
                      Request another simple outdoor job. Zach confirms the service and price before work starts.
                    </p>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="mb-6 rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                      <div className="mb-3 flex items-start justify-between gap-4">
                        <div>
                          <div className="text-2xl font-black text-slate-900">{customService.job}</div>
                          <div className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                            Good for simple outdoor help that is not listed in the regular service menu.
                          </div>
                        </div>
                        <div className="rounded-full bg-white px-4 py-2 text-sm font-black text-emerald-700 shadow-sm">{customService.pay}</div>
                      </div>
                      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-relaxed text-amber-900">
                        Custom jobs still follow the outdoor-only policy. The price must be agreed before work begins.
                      </div>
                    </div>

                    <motion.button type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => {
                      setSelectedService(customService.job)
                      if (!policyRead) {
                        setShowPolicyGate(true)
                        return
                      }
                      setActivePage("booking")
                      setTimeout(() => bookingSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50)
                    }} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white shadow-md">
                      Request Custom Job
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.section>
            )}

            {activePage === "pricing" && (
              <motion.section key="pricing" ref={pricingSectionRef} {...pageMotion} className="mb-12">
                <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white bg-white shadow-xl">
                  <div className="bg-gradient-to-r from-slate-950 via-emerald-800 to-teal-700 p-6 text-white md:p-8">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
                      <DollarSign className="h-4 w-4" />
                      Simple Price Menu
                    </div>
                    <h2 className="mb-2 text-3xl font-black md:text-4xl">Clear Prices Before Work Starts</h2>
                    <p className="max-w-2xl text-white/85">
                      Prices depend on the size of the job. Zach confirms the service and price before starting.
                    </p>
                  </div>

                  <div className="grid gap-4 p-6 md:grid-cols-2 md:p-8">
                    {uniqueServices.slice(0, 12).map((service) => (
                      <motion.button key={service.job} type="button" variants={serviceCardMotion} initial="hidden" animate="show" whileHover={{ y: -4, boxShadow: "0 16px 30px rgba(15, 23, 42, 0.1)" }} whileTap={{ scale: 0.98 }} onClick={() => {
                        setSelectedService(service.job)
                        setActivePage("booking")
                        setTimeout(() => bookingSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50)
                      }} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5 text-left shadow-sm">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <div className="font-black text-slate-900">{service.job}</div>
                            <div className="mt-1 text-sm font-semibold text-slate-500">{service.level}</div>
                          </div>
                          <div className="rounded-full bg-white px-4 py-2 text-sm font-black text-emerald-700 shadow-sm">{service.pay}</div>
                        </div>
                        <div className="inline-flex items-center gap-2 text-sm font-black text-teal-700">
                          Request this price
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 bg-amber-50 p-5 text-sm font-semibold leading-relaxed text-amber-900 md:px-8">
                    Final price is agreed before work begins. Payment is made after the job is complete.
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
                          <div className="text-slate-600">4:00 PM - 6:30 PM</div>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                          <div className="font-black text-slate-900">Weekends</div>
                          <div className="text-slate-600">9:00 AM - 5:00 PM</div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[2rem] border border-white bg-white p-6 shadow-xl md:p-8">
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
                        <MessageSquare className="h-4 w-4" />
                        Auto Reply Message
                      </div>
                      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 whitespace-pre-line">
                        {professionalAutoReplyMessage}
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
                      <button type="button" onClick={openWaiver} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white shadow-md hover:scale-105 transition-transform">
                        Open Waiver
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
                      <h2 className="mb-3 text-3xl font-black md:text-4xl">Choose a service, time, and waiver</h2>
                      <p className="mb-5 text-lg leading-relaxed text-white/90">Pick the service, request a day and time, read the waiver, then send the booking text.</p>
                      <div className="space-y-4">
                        <div className="rounded-[1.5rem] border border-white/20 bg-white/15 p-4 backdrop-blur-sm">
                          <label className="mb-2 block text-sm font-bold">Pick a service</label>
                          <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="w-full rounded-2xl bg-white px-4 py-3 font-semibold text-slate-900 outline-none">
                            {uniqueServices.map((service) => (
                              <option key={service.job} value={service.job}>{service.job} - {service.pay}</option>
                            ))}
                          </select>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="rounded-[1.5rem] border border-white/20 bg-white/15 p-4 backdrop-blur-sm">
                            <label className="mb-2 block text-sm font-bold">Requested date</label>
                            <input type="date" value={requestedDate} onChange={(e) => setRequestedDate(e.target.value)} className="w-full rounded-2xl bg-white px-4 py-3 font-semibold text-slate-900 outline-none" />
                          </div>
                          <div className="rounded-[1.5rem] border border-white/20 bg-white/15 p-4 backdrop-blur-sm">
                            <label className="mb-2 block text-sm font-bold">Requested time</label>
                            <select value={requestedTime} onChange={(e) => setRequestedTime(e.target.value)} className="w-full rounded-2xl bg-white px-4 py-3 font-semibold text-slate-900 outline-none">
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

                        <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-relaxed text-amber-900">
                          Requested times are not approved automatically. Zach must agree before the service is confirmed.
                        </div>

                        <div className="rounded-[1.5rem] border border-white/20 bg-white/15 p-4 backdrop-blur-sm">
                          <div className="mb-2 inline-flex items-center gap-2 text-sm font-bold">
                            <CalendarDays className="h-4 w-4" />
                            Booking Text Template
                          </div>
                          <div className="rounded-2xl bg-white/90 p-4 text-sm text-slate-700 whitespace-pre-line">
                            Hi! I'd like to book a service.

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
                        <div className="mb-2 text-sm font-bold text-slate-500">Booking step</div>
                        <div className="mb-1 text-2xl font-black tracking-wide">Text Zach to request</div>
                        <div className="inline-flex items-center gap-2 text-sm text-slate-600"><MapPin className="h-4 w-4" /> {brand.city}</div>
                      </div>
                      <div className="mb-4 flex items-center gap-4">
                        <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-slate-200 bg-white p-2">
                          <QRCodeSVG value={bookingSmsHref} size={80} includeMargin />
                        </div>
                        <div className="text-sm text-slate-600">This QR code is real and scannable. After you publish the site, people can scan it to open a text to Zach.</div>
                      </div>
                      <div className="grid gap-3">
                        <button type="button" onClick={openWaiver} className="block rounded-2xl bg-gradient-to-r from-teal-600 to-sky-500 px-5 py-4 text-center font-black text-white shadow-md transition-transform hover:scale-105">
                          View Waiver
                        </button>
                        <a href={bookingSmsHref} onClick={(event) => {
                          if (!policyRead) {
                            event.preventDefault()
                            openWaiver()
                            return
                          }
                          recordBookingStart(selectedService)
                        }} className={`block rounded-2xl px-5 py-4 text-center font-black shadow-md transition-transform hover:scale-105 ${policyRead ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-500"}`}>
                          Text Zach To Request
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {activePage === "area" && (
              <motion.section key="area" ref={areaSectionRef} {...pageMotion} className="mb-12">
                <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white bg-white shadow-xl">
                  <div className="bg-gradient-to-r from-slate-950 via-sky-800 to-teal-700 p-6 text-white md:p-8">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
                      <MapPin className="h-4 w-4" />
                      Service Area
                    </div>
                    <h2 className="mb-2 text-3xl font-black md:text-4xl">Where Services Are Available</h2>
                    <p className="max-w-2xl text-white/85">
                      Check the current service area and outdoor-only rules before requesting a job.
                    </p>
                  </div>

                  <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1fr_0.9fr]">
                    <div className="space-y-4">
                      <div className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-5">
                        <div className="mb-2 text-sm font-bold text-emerald-700">Service area</div>
                        <div className="text-xl font-black text-slate-900">S. FL Avenir Coral Isles Circle</div>
                        <p className="mt-2 text-sm font-semibold text-emerald-800">Outdoor-only services for now.</p>
                      </div>
                      <div className="rounded-[1.5rem] border border-amber-100 bg-amber-50 p-5">
                        <div className="mb-2 text-sm font-bold text-amber-800">Before work starts</div>
                        <p className="font-semibold leading-relaxed text-amber-900">The service, price, day, time, and policy must be clear before Zach begins.</p>
                      </div>
                    </div>

                    <div className="rounded-[1.5rem] bg-slate-900 p-5 text-white shadow-lg">
                      <div className="mb-4 text-sm font-bold text-sky-200">Before requesting</div>
                      <div className="space-y-3">
                        {[
                          "The job must be outside.",
                          "Everything should be ready in the front yard.",
                          "The time is confirmed only after Zach agrees.",
                          "The policy must be read before work starts.",
                        ].map((item, index) => (
                          <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-black text-slate-900">{index + 1}</div>
                            <div className="pt-0.5 text-sm font-semibold text-white/90">{item}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 rounded-2xl bg-white/10 p-4 text-sm leading-relaxed text-white/85">
                        This keeps the service simple, local, and safe.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {activePage === "stats" && (
              <motion.section key="stats" ref={statsSectionRef} {...pageMotion} className="mb-12">
                <div className="mx-auto max-w-6xl space-y-6">
                  <div className="overflow-hidden rounded-[2rem] border border-white bg-white shadow-xl">
                    <div className="bg-gradient-to-r from-slate-950 via-teal-800 to-sky-700 p-6 text-white md:p-8">
                    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
                          <BarChart3 className="h-4 w-4" />
                          Website Activity
                        </div>
                        <h2 className="mb-2 text-3xl font-black md:text-4xl">Visits and service bookings</h2>
                        <p className="max-w-2xl text-white/85">
                          This tab shows visits and service requests tracked on this device.
                        </p>
                      </div>
                      <motion.button type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={resetStats} className="rounded-2xl bg-white/15 px-4 py-3 text-sm font-black text-white shadow-sm ring-1 ring-white/20 backdrop-blur hover:bg-white/20">
                        Clear Stats
                      </motion.button>
                    </div>

                    <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="text-sm font-bold text-sky-100">Activity counter</div>
                          <div className="text-2xl font-black">{activityCount} total actions</div>
                        </div>
                        <div className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
                          {stats.visits ?? 0} visits + {totalBookings} requests
                        </div>
                      </div>
                      <div className="h-4 overflow-hidden rounded-full bg-white/15">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${activityFill}%` }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-sky-200" />
                      </div>
                    </div>
                    </div>

                    <div className="grid gap-4 p-6 md:grid-cols-3 md:p-8">
                      <div className="rounded-[1.5rem] bg-slate-900 p-5 text-white shadow-md">
                        <div className="mb-2 text-sm font-bold text-slate-300">Website visits</div>
                        <motion.div key={stats.visits ?? 0} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black">{stats.visits ?? 0}</motion.div>
                        <div className="mt-3 text-sm text-slate-300">Counts once per browser session.</div>
                      </div>
                      <div className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-5 shadow-sm">
                        <div className="mb-2 text-sm font-bold text-emerald-700">Total service requests</div>
                        <motion.div key={totalBookings} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black text-emerald-800">{totalBookings}</motion.div>
                        <div className="mt-3 text-sm font-semibold text-emerald-700">Counts when someone taps a booking text button.</div>
                      </div>
                      <div className="rounded-[1.5rem] border border-sky-100 bg-sky-50 p-5 shadow-sm">
                        <div className="mb-2 text-sm font-bold text-sky-700">Most requested service</div>
                        <div className="text-2xl font-black text-sky-900">{topBookedService?.job ?? "No bookings yet"}</div>
                        <div className="mt-3 text-sm font-semibold text-sky-700">
                          {topBookedService ? `${topBookedService.bookings} requests` : "Start by sending a test request."}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-white bg-white p-6 shadow-xl md:p-8">
                    <div className="mb-5">
                      <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                        <Sparkles className="h-4 w-4" />
                        Activity Center
                      </div>
                      <h3 className="text-2xl font-black text-slate-900">Try the stats live</h3>
                      <p className="mt-1 text-slate-600">Use these buttons to test how the counters move before real customers use the website.</p>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
                      <div>
                        <label className="mb-2 block text-sm font-bold text-slate-700">Service to test</label>
                        <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-sky-300">
                          {uniqueServices.map((service) => (
                            <option key={service.job} value={service.job}>{service.job} - {service.pay}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[32rem]">
                        <motion.button type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={recordManualVisit} className="rounded-2xl bg-slate-900 px-4 py-3 font-black text-white shadow-md">
                          Add Visit
                        </motion.button>
                        <motion.button type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => recordBookingStart(selectedService)} className="rounded-2xl bg-gradient-to-r from-teal-600 to-sky-500 px-4 py-3 font-black text-white shadow-md">
                          Add Request
                        </motion.button>
                        <motion.button type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => goToPage("booking")} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-black text-slate-900 shadow-sm">
                          Open Booking
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-white bg-white p-6 shadow-xl md:p-8">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-2xl font-black text-slate-900">Requests by service</h3>
                        <p className="mt-1 text-sm font-semibold text-slate-500">Last updated: {lastUpdated}</p>
                      </div>
                      <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                        {uniqueServices.length} services tracked
                      </div>
                    </div>

                    <div className="space-y-3">
                      {bookingRows.map((service) => {
                        const percent = totalBookings > 0 ? Math.round((service.bookings / totalBookings) * 100) : 0

                        return (
                          <div key={service.job} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4">
                            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                              <div>
                                <div className="font-black text-slate-900">{service.job}</div>
                                <div className="text-sm font-semibold text-slate-500">{service.pay}</div>
                              </div>
                              <div className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-800 shadow-sm">
                                {service.bookings} requested
                              </div>
                            </div>
                            <div className="h-3 overflow-hidden rounded-full bg-white">
                              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500" style={{ width: `${percent}%` }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="mt-5 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-relaxed text-amber-900">
                      These numbers are saved on this browser. To count every visitor across all devices, the site needs a shared backend or analytics service.
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
                        <option>Star 1</option>
                        <option>Star 2</option>
                        <option>Star 3</option>
                        <option>Star 4</option>
                        <option>Star 5</option>
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

