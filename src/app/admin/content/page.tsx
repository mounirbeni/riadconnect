"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { Save, RefreshCw } from "lucide-react";

export default function ContentManagement() {
    const [content, setContent] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Define editable fields
    const sections = [
        {
            title: "Hero Section",
            fields: [
                { key: "hero_title", label: "Hero Title", type: "text" },
                { key: "hero_subtitle", label: "Hero Subtitle", type: "textarea" },
                { key: "hero_cta_primary", label: "Primary CTA Text", type: "text" },
                { key: "hero_cta_secondary", label: "Secondary CTA Text", type: "text" },
            ]
        },
        {
            title: "Contact Info",
            fields: [
                { key: "contact_email", label: "Email Address", type: "text" },
                { key: "contact_phone", label: "Phone Number", type: "text" },
                { key: "contact_address", label: "Address", type: "textarea" },
            ]
        }
    ];

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/content");
            if (res.ok) {
                const data = await res.json();
                setContent(data);
            }
        } catch (error) {
            console.error("Failed to fetch content", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (key: string, value: string, section: string) => {
        setSaving(true);
        try {
            const res = await fetch("/api/content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key, value, section }),
            });

            if (res.ok) {
                // Show success toast (optional)
            }
        } catch (error) {
            console.error("Failed to save content", error);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (key: string, value: string) => {
        setContent(prev => ({ ...prev, [key]: value }));
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground">Loading content...</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-foreground">Site Content</h1>
                        <p className="text-muted-foreground mt-1">Manage text and content across the website</p>
                    </div>
                    <Button variant="outline" onClick={fetchContent}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {sections.map((section) => (
                        <Card key={section.title}>
                            <CardHeader>
                                <CardTitle>{section.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {section.fields.map((field) => (
                                    <div key={field.key} className="space-y-2">
                                        <label className="text-sm font-medium">{field.label}</label>
                                        <div className="flex gap-4">
                                            {field.type === "textarea" ? (
                                                <textarea
                                                    value={content[field.key] || ""}
                                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                                    className="flex-1 min-h-[100px] p-3 rounded-md border border-input bg-background"
                                                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={content[field.key] || ""}
                                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                                    className="flex-1 p-2 rounded-md border border-input bg-background"
                                                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                                                />
                                            )}
                                            <Button
                                                size="sm"
                                                onClick={() => handleSave(field.key, content[field.key] || "", section.title)}
                                                disabled={saving}
                                            >
                                                <Save className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
