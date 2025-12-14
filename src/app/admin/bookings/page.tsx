"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search, Download, Mail, Archive, Flag } from "lucide-react";
import { useState, useEffect } from "react";

export default function BookingsManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "completed" | "cancelled">("all");

    interface Booking {
        id: number;
        name: string;
        email: string;
        phone: string;
        checkIn: string;
        checkOut: string;
        adults: number;
        children: number | null;
        roomPreferences: string | null;
        specialRequests: string | null;
        budgetRange: string | null;
        status: string | null;
        priority: boolean | null;
        notes: string | null;
        createdAt: Date | string;
        updatedAt: Date | string;
    }

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch("/api/booking");
                if (res.ok) {
                    const data = await res.json();
                    setBookings(data);
                }
            } catch (error) {
                console.error("Failed to fetch bookings", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch =
            booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
            filter === "all" || booking.status === filter;

        return matchesSearch && matchesFilter;
    });

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this booking?")) return;

        try {
            const res = await fetch(`/api/booking?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setBookings(bookings.filter(b => b.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete booking", error);
        }
    };

    const handleStatusUpdate = async (id: number, newStatus: string) => {
        try {
            const res = await fetch("/api/booking", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });

            if (res.ok) {
                setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const handleExport = () => {
        const csv = [
            ["ID", "Name", "Email", "Phone", "Check-in", "Check-out", "Adults", "Children", "Status", "Created"],
            ...filteredBookings.map(b => [
                b.id,
                b.name,
                b.email,
                b.phone,
                b.checkIn,
                b.checkOut,
                b.adults,
                b.children || 0,
                b.status || "pending",
                new Date(b.createdAt).toLocaleDateString()
            ])
        ].map(row => row.join(",")).join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-800";
            case "completed":
                return "bg-blue-100 text-blue-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground">Loading bookings...</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-foreground">Booking Requests</h1>
                        <p className="text-muted-foreground mt-1">
                            {filteredBookings.length} bookings
                        </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleExport}>
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </Button>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex gap-4 mb-6">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search bookings..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant={filter === "all" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFilter("all")}
                                >
                                    All
                                </Button>
                                <Button
                                    variant={filter === "pending" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFilter("pending")}
                                >
                                    Pending
                                </Button>
                                <Button
                                    variant={filter === "confirmed" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFilter("confirmed")}
                                >
                                    Confirmed
                                </Button>
                                <Button
                                    variant={filter === "completed" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFilter("completed")}
                                >
                                    Completed
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {filteredBookings.map((booking) => (
                                <Card
                                    key={booking.id}
                                    className={`hover:shadow-lg transition-shadow ${booking.status === "pending" ? "border-l-4 border-l-primary" : ""}`}
                                >
                                    <CardContent className="pt-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold">{booking.name}</h3>
                                                    {booking.priority && (
                                                        <Flag className="w-4 h-4 text-red-500 fill-red-500" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-1">
                                                    {booking.email} • {booking.phone}
                                                </p>
                                                <p className="text-sm font-medium mb-2">
                                                    {booking.checkIn} to {booking.checkOut} • {booking.adults} adults
                                                    {booking.children ? `, ${booking.children} children` : ""}
                                                </p>
                                                {booking.specialRequests && (
                                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                                        {booking.specialRequests}
                                                    </p>
                                                )}
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(booking.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <select
                                                    value={booking.status || "pending"}
                                                    onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                                                    className={`text-xs px-2 py-1 rounded-full font-medium border-none focus:ring-0 cursor-pointer ${getStatusColor(booking.status || "pending")}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                                <Button variant="outline" size="sm" onClick={() => window.location.href = `mailto:${booking.email}`}>
                                                    <Mail className="w-4 h-4 mr-2" />
                                                    Email
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => handleDelete(booking.id)}>
                                                    <Archive className="w-4 h-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {filteredBookings.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">No bookings found</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
