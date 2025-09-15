import SattaDashboard from "@/components/SattaDashboard";
import { getLastResult, getMonthlyResults, getSettings, getTodayResult, getYesterdayResults, getDisawarData } from "@/services/result";

export default async function Home() {
  const todayResults = await getTodayResult();
  const yesterdayResults = await getYesterdayResults();
  const setting = await getSettings();
  const lastResult = await getLastResult();
  const disawarData = await getDisawarData();

  // Get current month's results
  const currentDate = new Date();
  const monthlyResults = await getMonthlyResults(
    currentDate.getMonth() + 1,
    currentDate.getFullYear()
  );

  console.log("Today:", todayResults, "Yesterday:", yesterdayResults, "Disawar:", disawarData);

  return (
    <SattaDashboard
      todayResults={todayResults}
      yesterdayResults={yesterdayResults}
      lastResult={lastResult}
      setting={setting}
      monthlyResults={monthlyResults}
      disawarData={disawarData}
    />
  );
}