import SattaDashboard from "@/components/SattaDashboard";
import {
  getTodayResult,
  getYesterdayResults,
  getSettings,
  getLastResult,
  getMonthlyResults,
  getDisawarData
} from "@/services/result";

export default async function Home() {
  // Fetch all data
  const [
    todayResults,
    yesterdayResults,
    lastResult,
    disawarData,
    settings
  ] = await Promise.all([
    getTodayResult(),
    getYesterdayResults(),
    getLastResult(),
    getDisawarData(),
    getSettings()
  ]);

  // Get current month's results
  const currentDate = new Date();
  const monthlyResults = await getMonthlyResults(
    currentDate.getMonth() + 1,
    currentDate.getFullYear()
  );

  // Site 1 configuration
  const siteConfig = {
    siteName: 'B1 SATTA',
    contactName: settings?.site1_contactName || settings?.contactName || '',
    whatsappNumber: settings?.site1_whatsappNumber || settings?.whatsappNumber || '',
    paymentNumber: settings?.site1_paymentNumber || '',
    rate: settings?.site1_rate || ''
  };

  return (
    <SattaDashboard
      todayResults={todayResults}
      yesterdayResults={yesterdayResults}
      lastResult={lastResult}
      setting={siteConfig}
      monthlyResults={monthlyResults}
      disawarData={disawarData}
    />
  );
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;