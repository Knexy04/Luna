import Slider from "@/app/components/slider";
import ItemShowcase from "@/app/components/showcase";
import Sale from "@/app/components/sale";
import ForYouCase from "./components/foryoucase"

export default function Home() {
    return (
        <main className="page">
            <Slider/>
            <ItemShowcase name = {"Новинки"}/>
            <Sale/>
            <ForYouCase id={"1"} name={"Подборки"}/>
            <ItemShowcase name={"Хиты продаж"}/>
        </main>
    )
}
