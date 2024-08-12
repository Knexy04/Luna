import Icon from '@mdi/react';
import { mdiEmoticonSadOutline } from '@mdi/js';

export default function NotFound() {
    return (
        <div className={"h-screen relative w-full gap-4 pt-2 flex justify-center text-xl items-center bg-back"}>
            <p className={"py-4 pr-4 font-bold border-r-2 border-r-black border-opacity-20"}>404</p> <p>Упс! Страница не найдена</p>
            <Icon className={"notFound"} path={mdiEmoticonSadOutline} size={24} />
        </div>
    )
}