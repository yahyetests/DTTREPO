
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/toast";
import { Bell, Lock, User, CreditCard, Shield } from "lucide-react";

export default function SettingsPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [saving, setSaving] = useState(false);

    // Split user name into first/last for display
    const nameParts = (user?.name || '').split(' ');
    const [firstName, setFirstName] = useState(nameParts[0] || '');
    const [lastName, setLastName] = useState(nameParts.slice(1).join(' ') || '');

    const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?';

    const handleSave = async () => {
        setSaving(true);
        try {
            const fullName = `${firstName} ${lastName}`.trim();
            const endpoint = user?.role === 'TUTOR' ? '/tutor/profile' : '/student/profile';
            await api(endpoint, { method: 'PATCH', body: { name: fullName } });
            toast('Profile updated successfully!', 'success');
        } catch (err) {
            toast('Failed to update profile. Please try again.', 'error');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
                <p className="text-slate-500">Manage your profile, security, and preferences.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
                {/* Navigation - Simulated Tabs */}
                <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start gap-2 bg-blue-50 text-primary font-semibold">
                        <User className="w-4 h-4" /> Profile
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2 text-slate-600">
                        <Lock className="w-4 h-4" /> Security
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2 text-slate-600">
                        <Bell className="w-4 h-4" /> Notifications
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2 text-slate-600">
                        <CreditCard className="w-4 h-4" /> Billing
                    </Button>
                </div>

                {/* Content */}
                <div className="md:col-span-3 space-y-6">

                    {/* Profile Section */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 mb-1">Personal Information</h2>
                            <p className="text-sm text-slate-500">Update your personal details.</p>
                        </div>

                        <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xl font-bold">
                                {initials}
                            </div>
                            <div>
                                <Button variant="outline" size="sm" className="mr-2">Change Avatar</Button>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">Remove</Button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" value={firstName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" value={lastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" value={user?.email || ''} disabled className="bg-white" />
                                <p className="text-xs text-slate-500">Contact support to change your email.</p>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button className="btn-secondary" onClick={handleSave} disabled={saving}>
                                {saving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </div>

                    {/* Preferences Placeholder */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 mb-1">Notification Preferences</h2>
                            <p className="text-sm text-slate-500">Choose how you want to be notified.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white">
                                <div className="flex items-center gap-3">
                                    <Bell className="w-5 h-5 text-slate-500" />
                                    <span className="text-sm font-medium text-slate-900">Email Notifications for Sessions</span>
                                </div>
                                <div className="h-5 w-9 bg-primary rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 h-3 w-3 bg-white rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white">
                                <div className="flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-slate-500" />
                                    <span className="text-sm font-medium text-slate-900">Marketing & Newsletter</span>
                                </div>
                                <div className="h-5 w-9 bg-slate-300 rounded-full relative cursor-pointer">
                                    <div className="absolute left-1 top-1 h-3 w-3 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
