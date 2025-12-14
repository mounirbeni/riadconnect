"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search, Mail, Archive, Flag, Eye } from "lucide-react";
import { useState, useEffect } from "react";

export default function ContactManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

    interface Contact {
        id: number;
        name: string;
        email: string;
        phone: string | null;
        riadName: string | null;
        subject: string | null;
        message: string;
        status: string | null;
        priority: boolean | null;
        createdAt: Date | string;
    }

    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await fetch("/api/contact");
                if (res.ok) {
                    const data = await res.json();
                    setContacts(data);
                }
            } catch (error) {
                console.error("Failed to fetch contacts", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, []);

    const filteredContacts = contacts.filter(contact => {
        const matchesSearch =
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (contact.subject?.toLowerCase() || "").includes(searchTerm.toLowerCase());

        const matchesFilter =
            filter === "all" || contact.status === filter;

        return matchesSearch && matchesFilter;
    });

    const unreadCount = contacts.filter(c => c.status === "unread").length;

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground">Loading contacts...</p>
                </div>
            </AdminLayout>
        );
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this message?")) return;

        try {
            const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setContacts(contacts.filter(c => c.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete contact", error);
        }
    };

    const handleStatusUpdate = async (id: number, newStatus: string) => {
        try {
            const res = await fetch("/api/contact", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });

            if (res.ok) {
                setContacts(contacts.map(c => c.id === id ? { ...c, status: newStatus } : c));
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
                        <h1 className="text-3xl font-serif font-bold text-foreground">Contact Messages</h1>
                        <p className="text-muted-foreground mt-1">
                            {filteredContacts.length} messages • {unreadCount} unread
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search messages..."
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
                                    variant={filter === "unread" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFilter("unread")}
                                >
                                    Unread ({unreadCount})
                                </Button>
                                <Button
                                    variant={filter === "read" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFilter("read")}
                                >
                                    Read
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Messages */}
                <div className="space-y-3">
                    {filteredContacts.map((contact) => (
                        <Card
                            key={contact.id}
                            className={`hover:shadow-lg transition-shadow cursor-pointer ${contact.status === "unread" ? "border-l-4 border-l-primary" : ""
                                }`}
                        >
                            <CardContent className="pt-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-semibold">{contact.name}</h3>
                                            {contact.status === "unread" && (
                                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                            )}
                                            {contact.priority && (
                                                <Flag className="w-4 h-4 text-red-500 fill-red-500" />
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-1">
                                            {contact.email} {contact.phone && `• ${contact.phone}`}
                                            {contact.riadName && ` • ${contact.riadName}`}
                                        </p>
                                        <p className="font-medium text-sm mb-2">{contact.subject || "No Subject"}</p>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{contact.message}</p>
                                        <p className="text-xs text-muted-foreground mt-3">{new Date(contact.createdAt).toLocaleString()}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {contact.status === "unread" ? (
                                            <Button variant="outline" size="sm" onClick={() => handleStatusUpdate(contact.id, "read")}>
                                                <Eye className="w-4 h-4 mr-2" />
                                                Mark Read
                                            </Button>
                                        ) : (
                                            <Button variant="outline" size="sm" onClick={() => handleStatusUpdate(contact.id, "unread")}>
                                                <Mail className="w-4 h-4 mr-2" />
                                                Mark Unread
                                            </Button>
                                        )}
                                        <Button variant="outline" size="sm" onClick={() => window.location.href = `mailto:${contact.email}`}>
                                            <Mail className="w-4 h-4 mr-2" />
                                            Reply
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(contact.id)}>
                                            <Archive className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredContacts.length === 0 && (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <p className="text-muted-foreground">No messages found</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AdminLayout>
    );
}
