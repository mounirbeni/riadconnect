"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
    Users,
    FileText,
    MessageSquare,
    Calendar,
    Car,
    MapPin,
    Utensils,
    Heart,
    Briefcase,
    HelpCircle,
    Download
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        waitlist: 0,
        contacts: 0,
        bookings: 0,
        transport: 0,
        tours: 0,
        food: 0,
        wellness: 0,
        business: 0,
        general: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [waitlist, contacts, bookings, transport, tours, food, wellness, business, general] = await Promise.all([
                    fetch("/api/waitlist").then(r => r.json()),
                    fetch("/api/contact").then(r => r.json()),
                    fetch("/api/booking").then(r => r.json()),
                    fetch("/api/transport").then(r => r.json()),
                    fetch("/api/tours").then(r => r.json()),
                    fetch("/api/food-experiences").then(r => r.json()),
                    fetch("/api/wellness").then(r => r.json()),
                    fetch("/api/business").then(r => r.json()),
                    fetch("/api/general-services").then(r => r.json())
                ]);

                setStats({
                    waitlist: waitlist.length,
                    contacts: contacts.length,
                    bookings: bookings.length,
                    transport: transport.length,
                    tours: tours.length,
                    food: food.length,
                    wellness: wellness.length,
                    business: business.length,
                    general: general.length
                });
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const serviceCards = [
        {
            title: "Bookings",
            value: stats.bookings,
            icon: Calendar,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            link: "/admin/bookings"
        },
        {
            title: "Transport",
            value: stats.transport,
            icon: Car,
            color: "text-green-600",
            bgColor: "bg-green-50",
            link: "/admin/transport"
        },
        {
            title: "Tours",
            value: stats.tours,
            icon: MapPin,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            link: "/admin/tours"
        },
        {
            title: "Food Experiences",
            value: stats.food,
            icon: Utensils,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            link: "/admin/food-experiences"
        },
        {
            title: "Wellness",
            value: stats.wellness,
            icon: Heart,
            color: "text-pink-600",
            bgColor: "bg-pink-50",
            link: "/admin/wellness"
        },
        {
            title: "Business",
            value: stats.business,
            icon: Briefcase,
            color: "text-indigo-600",
            bgColor: "bg-indigo-50",
            link: "/admin/business"
        },
        {
            title: "General Services",
            value: stats.general,
            icon: HelpCircle,
            color: "text-teal-600",
            bgColor: "bg-teal-50",
            link: "/admin/general-services"
        },
        {
            title: "Waitlist",
            value: stats.waitlist,
            icon: Users,
            color: "text-cyan-600",
            bgColor: "bg-cyan-50",
            link: "/admin/waitlist"
        },
        {
            title: "Contact Messages",
            value: stats.contacts,
            icon: MessageSquare,
            color: "text-red-600",
            bgColor: "bg-red-50",
            link: "/admin/contacts"
        }
    ];

    const totalRequests = stats.bookings + stats.transport + stats.tours + stats.food + stats.wellness + stats.business + stats.general;

    const handleExportData = () => {
        const data = [
            ["Service Type", "Count"],
            ["Bookings", stats.bookings],
            ["Transport", stats.transport],
            ["Tours", stats.tours],
            ["Food Experiences", stats.food],
            ["Wellness", stats.wellness],
            ["Business", stats.business],
            ["General Services", stats.general],
            ["Waitlist", stats.waitlist],
            ["Contact Messages", stats.contacts],
            ["", ""],
            ["Total Service Requests", totalRequests],
            ["Total Waitlist", stats.waitlist],
            ["Total Contacts", stats.contacts]
        ].map(row => row.join(",")).join("\n");

        const blob = new Blob([data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `dashboard-summary-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-foreground">Dashboard</h1>
                        <p className="text-muted-foreground mt-1">
                            {loading ? "Loading..." : `${totalRequests} total service requests`}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm" onClick={handleExportData}>
                            <Download className="w-4 h-4 mr-2" />
                            Export Data
                        </Button>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="pt-6">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Total Service Requests</p>
                                <p className="text-3xl font-bold font-serif">{loading ? "..." : totalRequests}</p>
                                <p className="text-xs text-muted-foreground mt-2">All service types combined</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="pt-6">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Waitlist Signups</p>
                                <p className="text-3xl font-bold font-serif">{loading ? "..." : stats.waitlist}</p>
                                <p className="text-xs text-muted-foreground mt-2">Interested riad owners</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="pt-6">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Contact Messages</p>
                                <p className="text-3xl font-bold font-serif">{loading ? "..." : stats.contacts}</p>
                                <p className="text-xs text-muted-foreground mt-2">Inquiries and messages</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Service Breakdown */}
                <div>
                    <h2 className="text-xl font-serif font-bold mb-4">Service Requests</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {serviceCards.map((service, idx) => (
                            <Link key={idx} href={service.link}>
                                <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                                    <CardContent className="pt-6">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">{service.title}</p>
                                                <p className="text-2xl font-bold font-serif">
                                                    {loading ? "..." : service.value}
                                                </p>
                                            </div>
                                            <div className={`w-10 h-10 rounded-lg ${service.bgColor} flex items-center justify-center`}>
                                                <service.icon className={`w-5 h-5 ${service.color}`} />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common administrative tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            <Button variant="outline" asChild className="justify-start">
                                <Link href="/admin/bookings">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    View Bookings
                                </Link>
                            </Button>
                            <Button variant="outline" asChild className="justify-start">
                                <Link href="/admin/contacts">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    View Messages
                                </Link>
                            </Button>
                            <Button variant="outline" asChild className="justify-start">
                                <Link href="/admin/waitlist">
                                    <Users className="w-4 h-4 mr-2" />
                                    View Waitlist
                                </Link>
                            </Button>
                            <Button variant="outline" asChild className="justify-start">
                                <Link href="/admin/content">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Manage Content
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
