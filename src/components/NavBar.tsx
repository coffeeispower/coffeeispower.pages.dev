import { useTranslation } from "react-i18next"

export const Link: React.FC<React.PropsWithChildren<{href: string}>> = (props) => {
    const currentPage = window.location.pathname == props.href;
    const currentPageStyles = "bg-ctp-maroon text-black rounded-xl";
    const differentPageStyles = "hover:text-ctp-maroon";
    return <a className={`select-none px-2 mx-2 transition-colors ${currentPage ? currentPageStyles : differentPageStyles}`} href={currentPage ? undefined : props.href}>{props.children}</a>
}
export function NavBar() {
    const { t } = useTranslation();
    return <nav className="flex py-2 border-b border-b-ctp-surface1">
        <div className="mx-auto container">
            <Link href="/"><i className="bi bi-house-fill"></i> {t("navbar:home")}</Link>
            <Link href="/introducao"><i className="bi bi-person-fill"/> {t("navbar:introduction")}</Link>
            <Link href="/projetos"><i className="bi bi-star-fill"/> {t("navbar:projects")}</Link>
        </div>
    </nav>
}