"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search, Download, Mail, Archive, Flag } from "lucide-react";
import { useState, useEffect } from "react";

export default function TransportManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "completed" | "cancelled">("all");

    interface TransportRequest {
        id: number;
        name: string;
        email: string;
        phone: string;
        serviceType: string;
        pickupLocation: string;
        pickupDateTime: string;
        dropoffLocation: string;
        passengers: number;
        luggage: string | null;
        vehiclePreference: string | null;
        flightDetails: string | null;
        specialRequests: string | null;
        status: string | null;
        priority: boolean | null;
        notes: string | null;
        createdAt: Date | string;
        updatedAt: Date | string;
    }

    const [requests, setRequests] = useState<TransportRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await fetch("/api/transport");
                if (res.ok) {
                    const data = await res.json();
                    setRequests(data);
                }
            } catch (error) {
                console.error("Failed to fetch transport requests", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    const filteredRequests = requests.filter(request => {
        const matchesSearch =
            request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filter === "all" || request.status === filter;

        return matchesSearch && matchesFilter;
    });

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this transport request?")) return;

        try {
            const res = await fetch(`/api/transport?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setRequests(requests.filter(r => r.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete transport request", error);
        }
    };

    const handleStatusUpdate = async (id: number, newStatus: string) => {
        try {
            const res = await fetch("/api/transport", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });

            if (res.ok) {
                setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const handleExport = () => {
        const csv = [
            ["ID", "Name", "Email", "Phone", "Service Type", "Pickup", "Dropoff", "Date/Time", "Passengers", "Status", "Created"],
            ...filteredRequests.map(r => [
                r.id,
                r.name,
                r.email,
                r.phone,
                r.serviceType,
                r.pickupLocation,
                r.dropoffLocation,
                r.pickupDateTime,
                r.passengers,
                r.status || "pending",
                new Date(r.createdAt).toLocaleDateString()
            ])
        ].map(row => row.join(",")).join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `transport-requests-${new Date().toISOString().split('T')[0]}.csv`;
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
                    <p className="text-muted-foreground">Loading transport requests...</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-foreground">Transport Requests</h1>
                        <p className="text-muted-foreground mt-1">
                            {filteredRequests.length} transport requests
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
                                    placeholder="Search transport requests..."
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
                            {filteredRequests.map((request) => (
                                <Card
                                    key={request.id}
                                    className={`hover:shadow-lg transition-shadow ${request.status === "pending" ? "border-l-4 border-l-primary" : ""}`}
                                >
                                    <CardContent className="pt-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold">{request.name}</h3>
                                                    {request.priority && (
                                                        <Flag className="w-4 h-4 text-red-500 fill-red-500" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-1">
                                                    {request.email} • {request.phone}
                                                </p>
                                                <p className="text-sm font-medium mb-2">
                                                    {request.serviceType.replace("_", " ").toUpperCase()} • {request.passengers} passenger(s)
                                                </p>
                                                <p className="text-sm mb-1">
                                                    <span className="font-medium">From:</span> {request.pickupLocation}
                                                </p>
                                                <p className="text-sm mb-2">
                                                    <span className="font-medium">To:</span> {request.dropoffLocation}
                                                </p>
                                                <p className="text-sm mb-2">
                                                    <span className="font-medium">Date/Time:</span> {new Date(request.pickupDateTime).toLocaleString()}
                                                </p>
                                                {request.flightDetails && (
                                                    <p className="text-sm mb-2">
                                                        <span className="font-medium">Flight:</span> {request.flightDetails}
                                                    </p>
                                                )}
                                                {request.specialRequests && (
                                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                                        {request.specialRequests}
                                                    </p>
                                                )}
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(request.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <select
                                                    value={request.status || "pending"}
                                                    onChange={(e) => handleStatusUpdate(request.id, e.target.value)}
                                                    className={`text-xs px-2 py-1 rounded-full font-medium border-none focus:ring-0 cursor-pointer ${getStatusColor(request.status || "pending")}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                                <Button variant="outline" size="sm" onClick={() => window.location.href = `mailto:${request.email}`}>
                                                    <Mail className="w-4 h-4 mr-2" />
                                                    Email
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => handleDelete(request.id)}>
                                                    <Archive className="w-4 h-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {filteredRequests.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">No transport requests found</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
