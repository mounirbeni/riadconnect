"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search, Download, Mail, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function SurveyManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    interface Survey {
        id: number;
        name: string;
        email: string;
        phone: string | null;
        riadName: string;
        location: string | null;
        currentChallenges: string | null;
        digitalTools: string | null;
        budget: string | null;
        priorities: string | null;
        additionalComments: string | null;
        status: string | null;
        notes: string | null;
        createdAt: Date | string;
        updatedAt: Date | string;
    }

    const [surveys, setSurveys] = useState<Survey[]>([]);

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const res = await fetch("/api/surveys");
                if (res.ok) {
                    const data = await res.json();
                    setSurveys(data);
                }
            } catch (error) {
                console.error("Failed to fetch surveys", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSurveys();
    }, []);

    const filteredSurveys = surveys.filter(survey =>
        survey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        survey.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        survey.riadName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this survey response?")) return;

        try {
            const res = await fetch(`/api/surveys?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setSurveys(surveys.filter(s => s.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete survey", error);
        }
    };

    const handleStatusUpdate = async (id: number, newStatus: string) => {
        try {
            const res = await fetch("/api/surveys", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });

            if (res.ok) {
                setSurveys(surveys.map(s => s.id === id ? { ...s, status: newStatus } : s));
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const handleExport = () => {
        const csv = [
            ["ID", "Name", "Email", "Phone", "Riad Name", "Location", "Challenges", "Digital Tools", "Budget", "Priorities", "Status", "Date"],
            ...filteredSurveys.map(s => [
                s.id,
                s.name,
                s.email,
                s.phone || "",
                s.riadName,
                s.location || "",
                s.currentChallenges || "",
                s.digitalTools || "",
                s.budget || "",
                s.priorities || "",
                s.status || "pending",
                new Date(s.createdAt).toLocaleDateString()
            ])
        ].map(row => row.join(",")).join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `survey-responses-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "reviewed":
                return "bg-blue-100 text-blue-800";
            case "contacted":
                return "bg-green-100 text-green-800";
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
                    <p className="text-muted-foreground">Loading survey responses...</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-foreground">Survey Responses</h1>
                        <p className="text-muted-foreground mt-1">{filteredSurveys.length} total responses</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleExport}>
                        <Download className="w-4 h-4 mr-2" />
                        Export All
                    </Button>
                </div>

                {/* Search */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or riad..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Survey Cards */}
                <div className="space-y-4">
                    {filteredSurveys.map((survey) => (
                        <Card key={survey.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-lg">{survey.name}</CardTitle>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {survey.riadName} • {survey.email}
                                            {survey.location && ` • ${survey.location}`}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 items-end">
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(survey.createdAt).toLocaleDateString()}
                                        </p>
                                        <select
                                            value={survey.status || "pending"}
                                            onChange={(e) => handleStatusUpdate(survey.id, e.target.value)}
                                            className={`text-xs px-2 py-1 rounded-full font-medium border-none focus:ring-0 cursor-pointer ${getStatusColor(survey.status || "pending")}`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="reviewed">Reviewed</option>
                                            <option value="contacted">Contacted</option>
                                        </select>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {survey.currentChallenges && (
                                        <div>
                                            <p className="text-sm font-semibold text-muted-foreground mb-1">Current Challenges</p>
                                            <p className="text-sm">{survey.currentChallenges}</p>
                                        </div>
                                    )}
                                    {survey.digitalTools && (
                                        <div>
                                            <p className="text-sm font-semibold text-muted-foreground mb-1">Current Digital Tools</p>
                                            <p className="text-sm">{survey.digitalTools}</p>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-2 gap-4">
                                        {survey.budget && (
                                            <div>
                                                <p className="text-sm font-semibold text-muted-foreground mb-1">Budget</p>
                                                <p className="text-sm">{survey.budget}</p>
                                            </div>
                                        )}
                                        {survey.priorities && (
                                            <div>
                                                <p className="text-sm font-semibold text-muted-foreground mb-1">Top Priorities</p>
                                                <p className="text-sm">{survey.priorities}</p>
                                            </div>
                                        )}
                                    </div>
                                    {survey.additionalComments && (
                                        <div>
                                            <p className="text-sm font-semibold text-muted-foreground mb-1">Additional Comments</p>
                                            <p className="text-sm">{survey.additionalComments}</p>
                                        </div>
                                    )}
                                    <div className="flex gap-2 pt-2">
                                        <Button variant="outline" size="sm" onClick={() => window.location.href = `mailto:${survey.email}`}>
                                            <Mail className="w-4 h-4 mr-2" />
                                            Email
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(survey.id)}>
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredSurveys.length === 0 && (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <p className="text-muted-foreground">No survey responses found</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AdminLayout>
    );
}
