"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Save, Globe, Mail, Bell, Shield } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        siteName: "RiadConnect",
        siteDescription: "Digital platform for Moroccan Riad owners",
        contactEmail: "hello@riadconnect.ma",
        supportEmail: "support@riadconnect.ma",
        phone: "+212 600 000 000",
        address: "Marrakech, Morocco",
        facebook: "https://facebook.com/riadconnect",
        instagram: "https://instagram.com/riadconnect",
        twitter: "https://twitter.com/riadconnect",
        emailNotifications: true,
        newWaitlistSignup: true,
        newSurveyResponse: true,
        newContactMessage: true,
        weeklyReport: true,
        maintenanceMode: false
    });

    const handleSave = async () => {
        try {
            // Save settings to localStorage as temporary storage
            localStorage.setItem('riadconnect_settings', JSON.stringify(settings));
            alert("Settings saved successfully!");
        } catch (error) {
            console.error("Error saving settings:", error);
            alert("Failed to save settings. Please try again.");
        }
    };

    const handleChange = (field: string, value: string | boolean) => {
        setSettings({ ...settings, [field]: value });
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-foreground">Settings</h1>
                        <p className="text-muted-foreground mt-1">Manage your platform configuration</p>
                    </div>
                    <Button onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                    </Button>
                </div>

                {/* Site Settings */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Globe className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <CardTitle>Site Settings</CardTitle>
                                <CardDescription>Basic information about your platform</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Site Name</label>
                                <input
                                    type="text"
                                    value={settings.siteName}
                                    onChange={(e) => handleChange("siteName", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Contact Email</label>
                                <input
                                    type="email"
                                    value={settings.contactEmail}
                                    onChange={(e) => handleChange("contactEmail", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Site Description</label>
                            <textarea
                                value={settings.siteDescription}
                                onChange={(e) => handleChange("siteDescription", e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                                <Mail className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <CardTitle>Contact Information</CardTitle>
                                <CardDescription>How users can reach you</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Support Email</label>
                                <input
                                    type="email"
                                    value={settings.supportEmail}
                                    onChange={(e) => handleChange("supportEmail", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Phone Number</label>
                                <input
                                    type="tel"
                                    value={settings.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Address</label>
                            <input
                                type="text"
                                value={settings.address}
                                onChange={(e) => handleChange("address", e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Social Media */}
                <Card>
                    <CardHeader>
                        <CardTitle>Social Media Links</CardTitle>
                        <CardDescription>Connect your social media profiles</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Facebook</label>
                            <input
                                type="url"
                                value={settings.facebook}
                                onChange={(e) => handleChange("facebook", e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Instagram</label>
                            <input
                                type="url"
                                value={settings.instagram}
                                onChange={(e) => handleChange("instagram", e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Twitter</label>
                            <input
                                type="url"
                                value={settings.twitter}
                                onChange={(e) => handleChange("twitter", e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                                <Bell className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <CardTitle>Email Notifications</CardTitle>
                                <CardDescription>Configure when you receive email alerts</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">New Waitlist Signup</p>
                                <p className="text-sm text-muted-foreground">Get notified when someone joins the waitlist</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.newWaitlistSignup}
                                onChange={(e) => handleChange("newWaitlistSignup", e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">New Survey Response</p>
                                <p className="text-sm text-muted-foreground">Get notified when someone completes a survey</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.newSurveyResponse}
                                onChange={(e) => handleChange("newSurveyResponse", e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">New Contact Message</p>
                                <p className="text-sm text-muted-foreground">Get notified when someone sends a message</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.newContactMessage}
                                onChange={(e) => handleChange("newContactMessage", e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Weekly Report</p>
                                <p className="text-sm text-muted-foreground">Receive a weekly summary of platform activity</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.weeklyReport}
                                onChange={(e) => handleChange("weeklyReport", e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Advanced Settings */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <CardTitle>Advanced Settings</CardTitle>
                                <CardDescription>Dangerous zone - use with caution</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                            <div>
                                <p className="font-medium text-red-900">Maintenance Mode</p>
                                <p className="text-sm text-red-700">Temporarily disable the public site</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.maintenanceMode}
                                onChange={(e) => handleChange("maintenanceMode", e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button onClick={handleSave} size="lg">
                        <Save className="w-4 h-4 mr-2" />
                        Save All Settings
                    </Button>
                </div>
            </div>
        </AdminLayout>
    );
}
