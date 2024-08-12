import Link from "next/link";
import Icon from '@mdi/react';
import { mdilArrowRight } from '@mdi/light-js';
import 'swiper/css';

interface SlideProps {
    slide: {
        name?: string;
        descripion?: string;
        _id?: string;
        photos?: string[]; // Ensure photos is an array of strings
    }
}

const Slide = ({ slide }: SlideProps) => {
    if (!slide || !slide.photos || slide.photos.length === 0) {
        return null; // Or you can return a placeholder or default content
    }

    return (
        <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={"w-screen h-[32rem] lg:h-96 object-cover"} src={process.env.NEXT_PUBLIC_HOST + slide.photos[0]} alt={''}/>
            <aside>
                <div>
                    <article>{slide.name}</article>
                    <label>{slide.descripion}</label>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Link href={`/blog/${slide._id}`}>Перейти<Icon path={mdilArrowRight} size={1}/></Link>
            </aside>
        </>
    );
};

export default Slide;
