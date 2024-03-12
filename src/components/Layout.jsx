
export default function Layout({children}) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-7 h-screen">
            <div className="col-span-2 hidden lg:block"></div>
            <div className=" h-screen col-span-3 relative">
                {children}
            </div>
            <div className="col-span-2 hidden lg:block"></div>
        </div>
    )
}