"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Download, Calendar, TrendingUp, Users, FileText, MessageSquare } from "lucide-react";

export default function AnalyticsDashboard() {
    // Mock analytics data
    const metrics = {
        totalVisitors: 12847,
        visitorsChange: "+18%",
        pageViews: 45632,
        pageViewsChange: "+24%",
        avgSessionDuration: "3m 42s",
        durationChange: "+12%",
        bounceRate: "42%",
        bounceChange: "-8%"
    };

    const topPages = [
        { page: "/", views: 8234, percentage: 18 },
        { page: "/services", views: 6521, percentage: 14 },
        { page: "/pricing", views: 5432, percentage: 12 },
        { page: "/about", views: 4123, percentage: 9 },
        { page: "/waitlist", views: 3876, percentage: 8 }
    ];

    const conversionMetrics = [
        { name: "Waitlist Signups", value: 127, rate: "68%", trend: "+12%" },
        { name: "Survey Completions", value: 89, rate: "45%", trend: "+8%" },
        { name: "Contact Forms", value: 34, rate: "23%", trend: "+5%" }
    ];

    const trafficSources = [
        { source: "Direct", visitors: 4234, percentage: 33 },
        { source: "Google Search", visitors: 3876, percentage: 30 },
        { source: "Social Media", visitors: 2341, percentage: 18 },
        { source: "Referral", visitors: 1567, percentage: 12 },
        { source: "Email", visitors: 829, percentage: 7 }
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-foreground">Analytics</h1>
                        <p className="text-muted-foreground mt-1">Track your platform&apos;s performance</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Last 30 Days
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export Report
                        </Button>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Total Visitors</p>
                                    <p className="text-3xl font-bold font-serif">{metrics.totalVisitors.toLocaleString()}</p>
                                    <p className="text-xs text-green-600 mt-2">{metrics.visitorsChange} vs last month</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Page Views</p>
                                    <p className="text-3xl font-bold font-serif">{metrics.pageViews.toLocaleString()}</p>
                                    <p className="text-xs text-green-600 mt-2">{metrics.pageViewsChange} vs last month</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Avg. Session</p>
                                    <p className="text-3xl font-bold font-serif">{metrics.avgSessionDuration}</p>
                                    <p className="text-xs text-green-600 mt-2">{metrics.durationChange} vs last month</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Bounce Rate</p>
                                    <p className="text-3xl font-bold font-serif">{metrics.bounceRate}</p>
                                    <p className="text-xs text-green-600 mt-2">{metrics.bounceChange} vs last month</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                                    <MessageSquare className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Pages */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Pages</CardTitle>
                            <CardDescription>Most visited pages on your site</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {topPages.map((page, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium">{page.page}</span>
                                            <span className="text-muted-foreground">{page.views.toLocaleString()} views</span>
                                        </div>
                                        <div className="w-full bg-secondary rounded-full h-2">
                                            <div
                                                className="bg-primary rounded-full h-2 transition-all duration-300"
                                                style={{ width: `${page.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Traffic Sources */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Traffic Sources</CardTitle>
                            <CardDescription>Where your visitors come from</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {trafficSources.map((source, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium">{source.source}</span>
                                            <span className="text-muted-foreground">{source.visitors.toLocaleString()} visitors ({source.percentage}%)</span>
                                        </div>
                                        <div className="w-full bg-secondary rounded-full h-2">
                                            <div
                                                className="bg-accent rounded-full h-2 transition-all duration-300"
                                                style={{ width: `${source.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Conversion Metrics */}
                <Card>
                    <CardHeader>
                        <CardTitle>Conversion Metrics</CardTitle>
                        <CardDescription>Track how visitors convert to leads</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {conversionMetrics.map((metric, idx) => (
                                <div key={idx} className="space-y-2">
                                    <p className="text-sm text-muted-foreground">{metric.name}</p>
                                    <p className="text-2xl font-bold font-serif">{metric.value}</p>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-muted-foreground">Conversion: {metric.rate}</span>
                                        <span className="text-green-600">{metric.trend}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
