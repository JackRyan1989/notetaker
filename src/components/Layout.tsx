import { ReactNode } from "react"

interface LayoutProps {
    children: ReactNode,
}

const Layout = (props: LayoutProps) => {
    return (
        <div className="ds-l-row ds-u-margin--0 full-height">
            {props.children}
        </div>
    )
}

export default Layout
