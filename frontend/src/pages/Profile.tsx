import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { User as UserIcon, LayoutGrid, PlusCircle } from 'lucide-react';
import { MiniLivePreview } from '@/components/MiniLivePreview';

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    return (
        <button onClick={() => { logout(); navigate("/login"); }} className="w-full mt-4 bg-red-500/10 text-red-500 hover:bg-red-500/20 py-2 rounded-md font-medium text-sm transition-colors cursor-pointer">
            Logout
        </button>
    );
};

export default function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const [userComponents, setUserComponents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        api.get('/api/components/me')
            .then(res => setUserComponents(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [user]);

    if (authLoading || loading) return <div className="p-8 text-center text-zinc-400">Loading profile...</div>;
    if (!user) return null;

    const approvedCount = userComponents.filter((c: any) => c.status === "approved").length;
    const pendingCount = userComponents.filter((c: any) => c.status === "pending").length;

    return (
        <div className="container mx-auto py-8 px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Profile Info */}
                <div className="w-full md:w-1/3 lg:w-1/4">
                    <Card>
                        <CardContent className="pt-6 flex flex-col items-center text-center">
                            <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                                <UserIcon className="h-12 w-12 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold">{user.name}</h2>
                            <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
                            <div className="flex gap-2 mb-6 text-sm">
                                <Badge variant="secondary">Role: {user.role}</Badge>
                                <Badge variant="outline">Verified</Badge>
                            </div>

                            <div className="w-full grid grid-cols-2 gap-2 text-sm border-t pt-4 border-border">
                                <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
                                    <span className="font-bold text-xl">{approvedCount}</span>
                                    <span className="text-muted-foreground text-xs uppercase tracking-wider">Published</span>
                                </div>
                                <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
                                    <span className="font-bold text-xl">{pendingCount}</span>
                                    <span className="text-muted-foreground text-xs uppercase tracking-wider">Pending</span>
                                </div>
                            </div>
                            <LogoutButton />
                        </CardContent>
                    </Card>
                </div>

                {/* Main content - User's Components */}
                <div className="w-full md:w-2/3 lg:w-3/4">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <LayoutGrid className="h-6 w-6" />
                            Your Components
                        </h3>
                        <Link
                            to="/submit"
                            className="hidden md:flex items-center gap-2 text-sm font-medium bg-primary text-background hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
                        >
                            <PlusCircle className="h-4 w-4" />
                            <span>Submit</span>
                        </Link>
                    </div>

                    {userComponents.length === 0 ? (
                        <div className="text-center p-12 border border-dashed border-border rounded-lg bg-muted/10">
                            <p className="text-muted-foreground mb-4">You haven't submitted any components yet.</p>
                            <Link to="/submit" className="text-sm font-medium bg-primary text-background hover:bg-primary/90 px-4 py-2 rounded-md transition-colors">
                                Submit your first component
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {userComponents.map((comp: any) => {
                                const isApproved = comp.status === "approved";
                                const CardWrapper = ({ children }: { children: React.ReactNode }) => isApproved
                                    ? <Link to={`/components/${comp.slug}`} className="flex flex-col group">{children}</Link>
                                    : <div className="flex flex-col">{children}</div>;

                                return (
                                    <Card key={comp._id.toString()} className={`flex flex-col overflow-hidden p-0 ${isApproved ? "cursor-pointer hover:border-primary/50 transition-colors" : ""}`}>
                                        <CardWrapper>
                                            <div className="aspect-[4/3] border-b border-border/50 bg-muted/20">
                                                <MiniLivePreview code={comp.code} themeSupport={comp.themeSupport || "both"} />
                                            </div>
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="capitalize">{comp.category}</Badge>

                                                    </div>
                                                    <Badge
                                                        variant={comp.status === "approved" ? "default" : comp.status === "rejected" ? "destructive" : "secondary"}
                                                        className={`capitalize ${comp.status === "approved" ? "text-background" : comp.status === "rejected" ? "text-red-500 bg-red-100/10 hover:bg-red-100/20" : ""}`}
                                                    >
                                                        {comp.status}
                                                    </Badge>
                                                </div>
                                                <CardTitle className={`text-lg ${isApproved ? "group-hover:text-primary transition-colors" : ""}`}>
                                                    {comp.title}
                                                </CardTitle>
                                            </CardHeader>
                                        </CardWrapper>
                                        <CardFooter className="mt-auto pt-4 text-xs text-muted-foreground flex justify-between items-center border-t border-border">
                                            <span>Submitted on {new Date(comp.createdAt).toLocaleDateString()}</span>
                                            <Link
                                                to={`/edit/${comp._id.toString()}`}
                                                onClick={e => e.stopPropagation()}
                                                className="px-3 py-1 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md transition-colors"
                                            >
                                                Edit
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
