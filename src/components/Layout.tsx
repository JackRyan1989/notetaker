import { ReactNode } from "react"

interface LayoutProps {
    children: ReactNode,
}

const Layout = ({children}: LayoutProps) => {
    return (
        <div className="ds-l-row ds-u-margin--0 full-height c-page-header-full-width">
            {children}
        </div>
    )
}

export default Layout
