import type { StaticImageData } from "next/image"
import {
  ClassAndYouthMetroPass,
  ConcessionaryTravelPass,
  PopBlue,
  PopCardSeasonTickets,
  PopCardUnder16,
  PopPayAsYouGoPAYG,
  RenewACTPass,
  SchoolPass,
} from "@/assets"
import type { Faq } from "@/components/ui/faq-list"

export type AgeGroup = "under16" | "16to21" | "adult" | "60plus" | "group"

export type PopCard = {
  slug: string
  name: string
  shortName: string
  badge?: string
  image: StaticImageData
  extraImages?: { image: StaticImageData; alt: string }[]
  audience: string
  summary: string
  intro: string[]
  validOn: string[]
  cost: string
  bestFor: AgeGroup[]
  apply: string[]
  manage: string[]
  goodToKnow: string[]
  faqs: Faq[]
}

export const POP_CARDS: PopCard[] = [
  {
    slug: "pay-as-you-go",
    name: "Pop Pay As You Go",
    shortName: "Pop PAYG",
    image: PopPayAsYouGoPAYG,
    audience: "Adults and anyone travelling now and then",
    summary: "Load credit and pay for each journey as you make it, with daily price capping.",
    intro: [
      "Pop Pay As You Go is the smart way to pay for public transport in North East England. Top up your Pop PAYG card and use it to pay for journeys on Tyne and Wear Metro, buses, the Shields Ferry and Northern trains on the Northumberland Line, as you make them.",
      "Daily capping means you never pay more than the price of a day ticket for the zones you travel in — however many journeys you make.",
    ],
    validOn: ["Tyne and Wear Metro", "Buses", "Shields Ferry", "Northern trains on the Northumberland Line"],
    cost: "The card is free when you order online. You only pay for the journeys you make.",
    bestFor: ["adult"],
    apply: [
      "Create a Pop account online (or visit a Nexus TravelShop).",
      "Order a Pop PAYG card — no photo needed.",
      "Add credit online, in the Pop app, or at any Metro ticket machine.",
      "Tap on at the start and tap off at the end of every Metro journey.",
    ],
    manage: [
      "Register your card so your balance is protected if it's lost or stolen.",
      "Turn on auto top-up so your balance never runs out.",
      "Check your balance and journey history in your Pop account.",
    ],
    goodToKnow: [
      "If you forget to tap off on Metro you may be charged the maximum fare.",
      "Each person needs their own card — you can't share one card between two people on the same journey.",
      "Online top-ups are collected the next time you tap on a Metro validator.",
    ],
    faqs: [
      {
        question: "How is PAYG different from contactless?",
        answer:
          "Both cap your daily spend. Pop PAYG can be registered and protected if lost, supports auto top-up and gives you a full journey history in your Pop account.",
      },
      {
        question: "Does my credit expire?",
        answer: "No. Your credit stays on the card for as long as you keep using it.",
      },
    ],
  },
  {
    slug: "pop-blue",
    name: "Pop Blue",
    shortName: "Pop Blue",
    image: PopBlue,
    audience: "Young people aged 21 and under",
    summary: "Pay-as-you-go at lower youth fares for anyone aged 21 or under.",
    intro: [
      "Pop blue is the smart way to pay for your travel if you're aged 21 or under. Load a balance on to your Pop blue card and use it to pay for journeys on Tyne and Wear Metro, buses, the Shields Ferry and Northern trains on the Northumberland Line, as you make them.",
      "You pay reduced youth fares automatically, and daily capping still applies.",
    ],
    validOn: ["Tyne and Wear Metro", "Buses", "Shields Ferry", "Northern trains on the Northumberland Line"],
    cost: "Free to apply. You pay lower youth fares for each journey.",
    bestFor: ["16to21"],
    apply: [
      "Apply online with a passport-style photo.",
      "Upload proof of age (passport, driving licence or birth certificate).",
      "Your personalised card is posted to you — usually within 5 working days.",
      "Top up and start travelling.",
    ],
    manage: [
      "Top up online, in the Pop app or at Metro ticket machines.",
      "Set up auto top-up so you never get caught short.",
      "Load a Metro or Network One season ticket on to the same card.",
    ],
    goodToKnow: [
      "The card shows your photo and can only be used by you.",
      "Your card stops giving youth fares after your 22nd birthday — you can then switch to Pop PAYG.",
    ],
    faqs: [
      {
        question: "Can I use Pop blue if I'm at university?",
        answer: "Yes — as long as you're 21 or under. Students over 21 can look at student season tickets.",
      },
      {
        question: "What if my card gets lost?",
        answer:
          "Report it in your Pop account straight away. We'll block the card and transfer your balance to a replacement.",
      },
    ],
  },
  {
    slug: "under-16-and-school-pass",
    name: "Under 16 Pop & School Pass",
    shortName: "Under 16 & School Pass",
    image: PopCardUnder16,
    extraImages: [{ image: SchoolPass, alt: "Example School Pass card" }],
    audience: "Children in school year 11 and below",
    summary: "Child fares all day with Under 16 Pop, plus School Passes for home-to-school travel.",
    intro: [
      "Children can travel at concessionary child fares all day, every day on all public transport in Tyne and Wear with an Under 16 Pop card. It's available to all children who live in Tyne and Wear in year 11 and below — aged 5 to 15 on 31 August before the start of the academic year.",
      "School Passes can be used on all local public transport in the county, including bus, Metro and local rail between Sunderland and Blaydon. Travel between home, school and other places you study until 7:00pm on school days. Buy one for the whole academic year or just for each term.",
    ],
    validOn: ["All buses in Tyne and Wear", "Tyne and Wear Metro", "Shields Ferry", "Local rail between Sunderland and Blaydon"],
    cost: "Under 16 Pop is free. School Passes can be bought for a term or for the full academic year.",
    bestFor: ["under16"],
    apply: [
      "A parent or carer applies online with a recent photo of the child.",
      "Provide proof of age and a Tyne and Wear address.",
      "Choose whether to add a School Pass (termly or annual).",
      "The card is posted out — the School Pass is loaded on to the same card.",
    ],
    manage: [
      "Parents can top up PAYG credit online for trips outside school travel.",
      "Renew the School Pass each term or year from the same account.",
      "Report a lost card online and order a replacement.",
    ],
    goodToKnow: [
      "Children under 5 travel free with a fare-paying adult.",
      "The School Pass is only valid on school days and until 7:00pm.",
      "Pupils may be asked to show their card, so keep it with you.",
    ],
    faqs: [
      {
        question: "Does my child need both cards?",
        answer:
          "No — it's one card. The Under 16 Pop gives child fares, and a School Pass can be added to it for home-to-school journeys.",
      },
      {
        question: "What happens in school holidays?",
        answer:
          "The School Pass doesn't work in the holidays, but the Under 16 Pop still gives child fares every day.",
      },
    ],
  },
  {
    slug: "pop-junior-blue",
    name: "Pop Junior Blue Card",
    shortName: "Pop Junior Blue",
    badge: "Junior",
    image: PopBlue,
    audience: "Younger children travelling with credit",
    summary: "A pay-as-you-go Pop blue card for children, topped up by a parent or carer.",
    intro: [
      "The Pop Junior Blue card is a pay-as-you-go card for children aged 5 to 15. A parent or carer loads credit on to it, and each journey is charged at the child fare.",
      "It's a simple way for children to travel independently without carrying cash — and parents can see where credit has been spent.",
    ],
    validOn: ["Tyne and Wear Metro", "Buses", "Shields Ferry", "Local rail between Sunderland and Blaydon"],
    cost: "Free to apply. Journeys are charged at child fares.",
    bestFor: ["under16"],
    apply: [
      "A parent or carer applies online and links the card to their Pop account.",
      "Upload a photo of the child and proof of age.",
      "Add a starting balance or set up auto top-up.",
      "The card is posted to the account holder's address.",
    ],
    manage: [
      "Top up from the parent's Pop account or app.",
      "See journey history for peace of mind.",
      "Block the card instantly if it's lost.",
    ],
    goodToKnow: [
      "Child fares apply until 31 August after the child finishes year 11.",
      "The card can be upgraded to Pop blue when your child turns 16.",
    ],
    faqs: [
      {
        question: "Can I set a spending limit?",
        answer: "Daily capping limits the maximum spent each day, and you choose how much credit to load.",
      },
    ],
  },
  {
    slug: "season-tickets-network-one",
    name: "Season Tickets & Network One",
    shortName: "Season & Network One",
    image: PopCardSeasonTickets,
    audience: "Commuters, students and regular travellers",
    summary: "Unlimited travel for a week, month or year on Metro or across all operators.",
    intro: [
      "This is the Pop card that Metro Season Tickets (including Student or 18 and Under) and Network One tickets (including for Students and Young People) are loaded on to.",
      "Metro Season Tickets give unlimited travel on Metro and the Shields Ferry. Network One tickets go further — valid on buses from every operator, Metro, the Shields Ferry and local rail in Tyne and Wear.",
    ],
    validOn: ["Tyne and Wear Metro", "Shields Ferry", "All buses (Network One)", "Local rail (Network One)"],
    cost: "Pay for the period you need — weekly, 4-weekly or annual. Annual tickets give the lowest cost per day.",
    bestFor: ["adult", "16to21"],
    apply: [
      "Order a Pop card online with a photo.",
      "Choose Metro Season or Network One, the zones and the length of ticket.",
      "Pay online — many employers offer an interest-free annual ticket loan.",
      "Collect your ticket by tapping your card on any Metro ticket machine or validator.",
    ],
    manage: [
      "Renew online before your ticket runs out — you can renew up to 14 days early.",
      "When you renew online, load the ticket at a Metro station by tapping your card.",
      "Request a refund for the unused part of a season ticket.",
    ],
    goodToKnow: [
      "Student and 18-and-under versions are much cheaper — you'll need proof of eligibility.",
      "Network One is the best choice if you regularly change between bus and Metro.",
    ],
    faqs: [
      {
        question: "Metro Season or Network One?",
        answer:
          "If you only use Metro (and the ferry), Metro Season is cheaper. If your journey includes buses from different operators, Network One covers them all.",
      },
      {
        question: "Can I pause my season ticket?",
        answer: "No, but you can apply for a refund on the unused part if your plans change.",
      },
    ],
  },
  {
    slug: "concessionary-travel-pass",
    name: "Concessionary Travel Pass (CT Pass) / Gold Card",
    shortName: "CT Pass / Gold Card",
    image: ConcessionaryTravelPass,
    extraImages: [{ image: RenewACTPass, alt: "Example renewed Concessionary Travel Pass" }],
    audience: "State Pension age or eligible disabled residents",
    summary: "Free bus travel, plus a Metro Gold Card for Metro, ferry and local rail.",
    intro: [
      "If you are State Pension age or over, or disabled and live in Tyne and Wear, you can travel on buses for free with a Concessionary Travel Pass (CT Pass).",
      "You need a CT Pass to buy a Metro Gold Card, which is valid on Metro, the Shields Ferry and rail services between Newcastle and Sunderland. If you're a Tyne and Wear resident, you can buy a Gold Card when you apply for your CT Pass.",
    ],
    validOn: ["Buses (CT Pass)", "Tyne and Wear Metro (Gold Card)", "Shields Ferry (Gold Card)", "Rail Newcastle–Sunderland (Gold Card)"],
    cost: "The CT Pass is free. The Metro Gold Card is an optional low-cost annual add-on.",
    bestFor: ["60plus"],
    apply: [
      "Apply online or at a Nexus TravelShop.",
      "Provide proof of age or proof of disability, plus proof of address in Tyne and Wear.",
      "Upload or bring a recent photo.",
      "Add a Metro Gold Card at the same time if you'd like one.",
    ],
    manage: [
      "Renew or replace your CT Pass by creating an account online.",
      "We'll remind you before your pass expires.",
      "Report a lost or stolen pass online and order a replacement.",
    ],
    goodToKnow: [
      "Some disabled pass holders can also get a companion pass so someone can travel with them for free.",
      "Bus travel times can be limited on weekday mornings — check the pass conditions for your area.",
      "See nexus.org.uk for the full list of eligible disabilities.",
    ],
    faqs: [
      {
        question: "Can I use my CT Pass outside Tyne and Wear?",
        answer: "Yes — the CT Pass gives free off-peak bus travel across England. The Gold Card is only valid locally.",
      },
      {
        question: "How do I renew my pass?",
        answer:
          "Create an online account and choose 'Renew or replace'. You'll need a recent photo, and your new pass is posted to you.",
      },
    ],
  },
  {
    slug: "class-and-youth-group-pass",
    name: "Class & Youth Group Pass",
    shortName: "Class & Youth Group",
    image: ClassAndYouthMetroPass,
    audience: "Schools, clubs and youth organisations",
    summary: "One pass for up to 40 young people and 10 adults travelling together on Metro.",
    intro: [
      "The Class and Youth Group Metro Pass is valid for up to 40 students aged 18 and under and up to 10 accompanying adults travelling in a group.",
      "It's valid for travel on the whole Metro system and the Shields Ferry. You must be travelling in a group and after 9:00am.",
    ],
    validOn: ["The whole Metro system", "Shields Ferry"],
    cost: "One pass for the whole group — far cheaper than buying individual tickets.",
    bestFor: ["group"],
    apply: [
      "A teacher or group leader applies online on behalf of the school or organisation.",
      "Enter the organisation's details and a named contact.",
      "The pass is posted to the organisation, showing its name and validity dates.",
      "Show the pass to staff when asked during your trip.",
    ],
    manage: [
      "Request a replacement online if your pass is lost or damaged.",
      "Renew the pass when it reaches its 'valid until' date.",
    ],
    goodToKnow: [
      "Travel must start after 9:00am.",
      "The group must travel together — the pass can't be split.",
      "Let station staff know in advance if you're travelling with a very large group.",
    ],
    faqs: [
      {
        question: "Can we use the pass on buses?",
        answer: "No — the pass covers Metro and the Shields Ferry only.",
      },
    ],
  },
]

export function getPopCard(slug: string) {
  return POP_CARDS.find((card) => card.slug === slug)
}
