"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
    Search,
    Download,
    Mail,
    Trash2,
    Filter
} from "lucide-react";
import { useState, useEffect } from "react";

export default function WaitlistManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    interface WaitlistEntry {
        id: number;
        name: string;
        email: string;
        riadName: string | null;
        role: string | null; // This stores location from the form
        status: string | null;
        createdAt: Date | string;
    }

    const [waitlistData, setWaitlistData] = useState<WaitlistEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWaitlist = async () => {
            try {
                const res = await fetch("/api/waitlist");
                if (res.ok) {
                    const data = await res.json();
                    setWaitlistData(data);
                }
            } catch (error) {
                console.error("Failed to fetch waitlist", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWaitlist();
    }, []);

    const filteredData = waitlistData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.riadName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (item.role?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    const handleSelectAll = () => {
        if (selectedItems.length === filteredData.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(filteredData.map(item => item.id));
        }
    };

    const handleSelectItem = (id: number) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const handleExport = () => {
        const csv = [
            ["ID", "Name", "Email", "Riad Name", "Location", "Status", "Date"],
            ...filteredData.map(item => [
                item.id,
                item.name,
                item.email,
                item.riadName || "N/A",
                item.role || "N/A",
                item.status || "pending",
                new Date(item.createdAt).toLocaleDateString()
            ])
        ].map(row => row.join(",")).join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const handleBulkEmail = () => {
        const selectedEmails = waitlistData
            .filter(item => selectedItems.includes(item.id))
            .map(item => item.email)
            .join(",");
        
        // Open default email client with selected emails
        window.location.href = `mailto:?bcc=${selectedEmails}&subject=RiadConnect Update`;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "approved":
                return "bg-green-100 text-green-800";
            case "contacted":
                return "bg-blue-100 text-blue-800";
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
                    <p className="text-muted-foreground">Loading waitlist...</p>
                </div>
            </AdminLayout>
        );
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this entry?")) return;

        try {
            const res = await fetch(`/api/waitlist?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setWaitlistData(waitlistData.filter(c => c.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete entry", error);
        }
    };

    const handleStatusUpdate = async (id: number, newStatus: string) => {
        try {
            const res = await fetch("/api/waitlist", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });

            if (res.ok) {
                setWaitlistData(waitlistData.map(c => c.id === id ? { ...c, status: newStatus } : c));
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-foreground">Waitlist Management</h1>
                        <p className="text-muted-foreground mt-1">{filteredData.length} total signups</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm" onClick={handleExport}>
                            <Download className="w-4 h-4 mr-2" />
                            Export CSV
                        </Button>
                        {selectedItems.length > 0 && (
                            <Button size="sm" onClick={handleBulkEmail}>
                                <Mail className="w-4 h-4 mr-2" />
                                Email Selected ({selectedItems.length})
                            </Button>
                        )}
                    </div>
                </div>

                {/* Search and Filters */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, riad, or location..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <Button variant="outline" size="sm">
                                <Filter className="w-4 h-4 mr-2" />
                                Filters
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-3 px-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.length === filteredData.length}
                                                onChange={handleSelectAll}
                                                className="rounded border-gray-300"
                                            />
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Name</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Email</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Riad</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Location</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Date</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((item) => (
                                        <tr key={item.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                                            <td className="py-3 px-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(item.id)}
                                                    onChange={() => handleSelectItem(item.id)}
                                                    className="rounded border-gray-300"
                                                />
                                            </td>
                                            <td className="py-3 px-4">
                                                <p className="font-medium text-sm">{item.name}</p>
                                            </td>
                                            <td className="py-3 px-4">
                                                <p className="text-sm text-muted-foreground">{item.email}</p>
                                            </td>
                                            <td className="py-3 px-4">
                                                <p className="text-sm">{item.riadName || "N/A"}</p>
                                            </td>
                                            <td className="py-3 px-4">
                                                <p className="text-sm text-muted-foreground">{item.role || "N/A"}</p>
                                            </td>
                                            <td className="py-3 px-4">
                                                <p className="text-sm text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</p>
                                            </td>
                                            <td className="py-3 px-4">
                                                <select
                                                    value={item.status || "pending"}
                                                    onChange={(e) => handleStatusUpdate(item.id, e.target.value)}
                                                    className={`text-xs px-2 py-1 rounded-full font-medium border-none focus:ring-0 cursor-pointer ${getStatusColor(item.status || "pending")}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="contacted">Contacted</option>
                                                    <option value="approved">Approved</option>
                                                </select>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => window.location.href = `mailto:${item.email}`}>
                                                        <Mail className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700" onClick={() => handleDelete(item.id)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredData.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">No results found</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
