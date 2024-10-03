import type React from "react";
import { Background } from "./StarFieldBg";
import { useTranslation } from "react-i18next";

export function Link(props: React.PropsWithoutRef<{name: string, description: string, link: string}>) {
    const { t } = useTranslation();
    return (<a href={props.link} className="tw-block flex-grow flex-shrink basis-0 border border-ctp-text/50 p-4 rounded-lg max-w-96 bg-ctp-base base hover:bg-gray-800 transition-colors w-full h-full">
        <h2 className="font-extrabold mb-4 text-ctp-green">{t(props.name)}</h2>
        <p>{t(props.description)}</p>
    </a>)
}

export function Links() {
    return (
        <div className="flex gap-4 max-w-[90vw] items-center justify-center flex-wrap animate-[fadeIn_2s]">
            <Link link="/introducao" name="home:links.selfIntroduction.title" description="home:links.selfIntroduction.description"/>
            <Link link="/projetos" name="home:links.projects.title" description="home:links.projects.description"/>
        </div>
    )
}

export function HomePage() {
    const { t } = useTranslation();

    const date = new Date();
    const hours = date.getHours();
    let compliment: string = " Olá";
    if ((hours >= 0 && hours < 7) || hours >= 20) {
        compliment = t("goodNight");
    } else if (hours >= 7 && hours < 13) {
        compliment = t("goodMorning");
    } else if (hours >= 13) {
        compliment = t("goodAfternoon");
    }

    return (
        <>
            <Background />
            <div className='h-screen w-screen flex items-center justify-center flex-col gap-4'>
                <h1 className="text-ctp-red text-3xl font-bold animate-[fadeIn_2s]">👋 {compliment}</h1>
                <p className="animate-[fadeIn_2s]">{t("welcome")}</p>
                <Links />
            </div>
        </>
    )
}