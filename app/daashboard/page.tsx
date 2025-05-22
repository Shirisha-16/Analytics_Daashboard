// app/dashboard/page.tsx
// This file will contain the actual dashboard content.

import { DashboardLayout } from "@/components/dashboard-layout"
import { WeatherSection } from "@/components/weather/weather-section"
import NewsSection from "@/components/news/news-section"
import { FinanceSection } from "@/components/finance/finance-section"
import { OverviewSection } from "@/components/overview/overview-section"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from 'next/navigation' // Import redirect for server-side redirection

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  // If no session, redirect to the sign-in page
  if (!session) {
    redirect('/auth/signin')
  }

  // If a session exists, render the dashboard content
  return (
    <DashboardLayout>
      <OverviewSection />
      <WeatherSection />
      <NewsSection category="general" />
      <FinanceSection />
    </DashboardLayout>
  )
}