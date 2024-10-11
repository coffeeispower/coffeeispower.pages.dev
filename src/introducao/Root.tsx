import { NavBar } from "../components/NavBar";

const BIRTHDAY = new Date(2007, 9, 12);
const SECONDS_IN_A_YEAR = 1000 * 60 * 60 * 24 * 365;
const AGE_IN_MILLISECONDS = (+new Date) - (+BIRTHDAY);
const AGE = Math.floor(AGE_IN_MILLISECONDS / SECONDS_IN_A_YEAR);

function Header() {
    return (<section>
        <div className="max-w-screen-xl mx-auto flex max-md:flex-col justify-evenly items-center md:items-stretch py-14 gap-10">
            <div className="space-y-2 min-w-max">
                <img src="https://cdn.discordapp.com/avatars/579228258835496970/583c030634c875747a101d4ef82f6b86.webp" className="rounded-full" />
                <h1 className="text-ctp-green font-extrabold text-2xl">Tiago Dinis</h1>
                <div>
                    <p>{AGE} anos</p>
                    <p>Portugal, Aveiro</p>
                </div>
            </div>
            <div className="flex flex-col justify-center space-y-4 max-w-screen-sm max-md:px-10">
                <h1 className="text-3xl text-ctp-mauve font-semibold">Prazer em conhecer! 🤝</h1>
                <div className="space-y-1">
                    <p className="text-justify">
                        Sou um programador português interessado em computadores, tecnologia, programação e linux. Gosto de criar programas e soluções com programação e explorar computadores no meu tempo livre.
                    </p>
                </div>
            </div>
        </div>
    </section>)
}

export function Root() {
    return <>
        <NavBar />
        <Header />
    </>
}