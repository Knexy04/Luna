import Image from  "next/image"
import logo from "@/public/logo.svg"

const Footer = () => {
    return ( 
        <div className="page xl:mt-0 xl:mb-0 mt-16 mb-16">
            <div className="flex justify-center ">
                <div className="w-11/12 border-t-2 border-black flex justify-around text-center h-48 items-center px-4">
                    <div className="logo w-2/6">
                        <Image src={logo.src} width={80} height={80} alt={"logo"}/>
                    </div>
                    <div className="title_footer w-2/6 text-sm">
                        Наша цель ,дать тебе только все самое лучшее, 
                        что ты заслуживаешь 🤍
                    </div>
                    <div className="w-2/6 flex justify-end">
                        <div className="contacts flex flex-col gap-4 text-sm ">
                            <div className="inst">
                                <a href="https://google.com">INSTAGRAM</a>
                            </div>
                            <div className="TELEGRAM">
                                <a href="https://google.com">TELEGRAM</a>
                            </div>
                            <div className="NUMBER">
                                <a href="https://google.com">8 915 915 70 05</a>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
     );
}
 
export default Footer;