import Footer from "@/components/footer/Footer"
import Navbar from "@/components/navbar/Navbar"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar isAuth={false} />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  )
}
