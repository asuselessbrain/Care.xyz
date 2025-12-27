import Banner from "@/components/home/Banner";
import ServicesOverview from "@/components/home/ServicesOverview";
import About from "@/components/home/About";
import Testimonials from "@/components/home/Testimonials";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Care.xyz | Baby Sitting & Elderly Care",
  description:
    "Reliable babysitting, elderly care and special care at home. Book trusted caregivers easily.",
};
export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="space-y-20">
      {/* <Test></Test>
      <p>{JSON.stringify(session)}</p> */}
      <section>
        <Banner></Banner>
      </section>
      <section>
        <About></About>
      </section>
      <section>
        <ServicesOverview></ServicesOverview>
      </section>
      <section>
        <Testimonials></Testimonials>
      </section>


    </div>
  );
}
