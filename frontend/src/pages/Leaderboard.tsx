import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";

export default function LeaderboardPage() {
  const [validData, setValidData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/leaderboard")
      .then((res) => setValidData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center text-muted-foreground">Loading leaderboard...</div>;

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
            <div className="p-4 bg-yellow-500/10 rounded-full">
                <Trophy className="h-12 w-12 text-yellow-500" />
            </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Contributor Leaderboard</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Celebrating the top open-source contributors to the OpenUI component library.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-muted/30 border-b border-border">
           <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground px-4">
               <div className="col-span-2 text-center">Rank</div>
               <div className="col-span-7">Contributor</div>
               <div className="col-span-3 text-right">Components</div>
           </div>
        </CardHeader>
        <CardContent className="p-0">
           {validData.length === 0 ? (
               <div className="p-8 text-center text-muted-foreground">
                   No contributions yet. Be the first to top the leaderboard!
               </div>
           ) : (
               <div className="divide-y divide-border/50">
                  {validData.map((data, index) => {
                      const isTop3 = index < 3;
                      return (
                         <div key={data._id} className="grid grid-cols-12 items-center px-8 py-4 hover:bg-muted/10 transition-colors group">
                            <div className="col-span-2 flex justify-center">
                               {index === 0 ? (
                                   <Trophy className="h-6 w-6 text-yellow-500 drop-shadow-sm" />
                               ) : index === 1 ? (
                                   <Medal className="h-6 w-6 text-slate-300 drop-shadow-sm" />
                               ) : index === 2 ? (
                                   <Award className="h-6 w-6 text-amber-600 drop-shadow-sm" />
                               ) : (
                                   <span className="text-xl font-bold text-muted-foreground/50 group-hover:text-muted-foreground transition-colors">{index + 1}</span>
                               )}
                            </div>
                            <div className="col-span-7">
                               <span className={`text-lg transition-colors ${isTop3 ? 'font-bold text-foreground' : 'font-medium text-muted-foreground group-hover:text-foreground'}`}>
                                   {data.name}
                               </span>
                            </div>
                            <div className="col-span-3 text-right">
                               <span className="inline-flex items-center justify-center bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-sm">
                                   {data.componentsCount}
                               </span>
                            </div>
                         </div>
                      );
                  })}
               </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
