import Layout from "../../components/Layout";
import Users from "../../components/Users";


export default function UsersPage() {
    return (
        <Layout>
            <div className="h-screen border-x border-slate-700">
            <div className="h-[10dvh] border-b border-slate-700"></div>
            <div className="h-[90dvh] overflow-y-auto pb-20">
                <div className="relative">
                    
                    <Users />
                </div>
            </div>
            </div>
        </Layout>
        )
}