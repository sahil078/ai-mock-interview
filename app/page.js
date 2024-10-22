// app/page.js or wherever your Home component is located
import Header from "./dashboard/_components/Header";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <div>
      <Header/>
      <Dashboard />
    </div>
  );
}
