
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Send, ArrowLeft, MoreVertical, Phone, Video, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface Conversation {
    contact: { id: string; name: string; role: string };
    lastMessage: string;
    lastMessageAt: string;
    unreadCount: number;
}

interface ChatMessage {
    id: string;
    body: string;
    isMe: boolean;
    createdAt: string;
}

export default function MessagesPage() {
    const { user } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [messageInput, setMessageInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const basePath = user?.role === 'TUTOR' ? '/tutor' : '/student';

    // Fetch conversations on mount
    useEffect(() => {
        api<{ conversations: Conversation[] }>(`${basePath}/messages`)
            .then(data => setConversations(data.conversations || []))
            .catch(() => setConversations([]))
            .finally(() => setLoading(false));
    }, [basePath]);

    // Fetch thread when selecting a contact
    useEffect(() => {
        if (!selectedContactId) return;
        api<{ messages: ChatMessage[] }>(`${basePath}/messages/${selectedContactId}`)
            .then(data => setMessages(data.messages || []))
            .catch(() => setMessages([]));
    }, [selectedContactId, basePath]);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const activeContact = selectedContactId
        ? conversations.find(c => c.contact.id === selectedContactId)?.contact
        : null;

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim() || !selectedContactId) return;

        setSending(true);
        try {
            const res = await api<{ message: { id: string; body: string; createdAt: string } }>(`${basePath}/messages`, {
                method: 'POST',
                body: { toUserId: selectedContactId, body: messageInput.trim() },
            });
            setMessages(prev => [...prev, { id: res.message.id, body: res.message.body, isMe: true, createdAt: res.message.createdAt }]);
            setMessageInput("");
        } catch {
            // Silently fail — message stays in input for retry
        } finally {
            setSending(false);
        }
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' }).format(date);
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return new Intl.DateTimeFormat('en-GB', { weekday: 'short' }).format(date);
        return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(date);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[40vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-140px)] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex">
            {/* Sidebar: Contact List */}
            <div className={cn(
                "w-full md:w-80 flex-col border-r border-slate-200 bg-white/50",
                selectedContactId ? "hidden md:flex" : "flex"
            )}>
                <div className="p-4 border-b border-slate-200 bg-white">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input placeholder="Search messages..." className="pl-9 bg-white" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.length > 0 ? conversations.map((convo) => (
                        <button
                            key={convo.contact.id}
                            onClick={() => setSelectedContactId(convo.contact.id)}
                            className={cn(
                                "w-full p-4 flex items-center gap-3 hover:bg-slate-100 transition-colors border-b border-slate-100 last:border-0 text-left",
                                selectedContactId === convo.contact.id ? "bg-white border-l-4 border-l-secondary shadow-sm" : "border-l-4 border-l-transparent"
                            )}
                        >
                            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                                <span className="font-bold text-slate-500">{convo.contact.name[0]}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="font-semibold text-slate-900 truncate">{convo.contact.name}</span>
                                    <span className="text-xs text-slate-500 whitespace-nowrap">
                                        {convo.lastMessageAt ? formatTime(convo.lastMessageAt) : ''}
                                    </span>
                                </div>
                                <p className={cn("text-sm truncate", convo.unreadCount > 0 ? "font-semibold text-slate-900" : "text-slate-500")}>
                                    {convo.lastMessage}
                                </p>
                            </div>
                            {convo.unreadCount > 0 && (
                                <span className="w-5 h-5 rounded-full bg-secondary text-white text-xs flex items-center justify-center shrink-0">
                                    {convo.unreadCount}
                                </span>
                            )}
                        </button>
                    )) : (
                        <div className="p-8 text-center text-slate-400">
                            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
                            <p className="text-sm">No conversations yet</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className={cn(
                "flex-1 flex-col bg-white/30",
                selectedContactId ? "flex" : "hidden md:flex"
            )}>
                {activeContact ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-16 px-6 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                <Button variant="ghost" size="icon" aria-label="Back to contacts" className="md:hidden -ml-2" onClick={() => setSelectedContactId(null)}>
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                                    <span className="font-bold text-slate-500">{activeContact.name[0]}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{activeContact.name}</h3>
                                    <span className="text-xs text-slate-500 capitalize">{activeContact.role.toLowerCase()}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" aria-label="Call" className="text-slate-500">
                                    <Phone className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" size="icon" aria-label="Video call" className="text-slate-500">
                                    <Video className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" size="icon" aria-label="More options" className="text-slate-500">
                                    <MoreVertical className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={cn("flex", msg.isMe ? "justify-end" : "justify-start")}>
                                    <div className={cn(
                                        "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
                                        msg.isMe ? "bg-primary text-white rounded-br-none" : "bg-white text-slate-800 rounded-bl-none border border-slate-100"
                                    )}>
                                        <p className="text-sm">{msg.body}</p>
                                        <p className={cn("text-[10px] mt-1 text-right", msg.isMe ? "text-slate-300" : "text-slate-400")}>
                                            {formatTime(msg.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-slate-200 shrink-0">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <Input
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1"
                                    disabled={sending}
                                />
                                <Button type="submit" className="btn-secondary aspect-square p-0 w-10" disabled={sending}>
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <Send className="w-8 h-8 opacity-20" />
                        </div>
                        <p className="text-lg font-medium text-slate-600">No chat selected</p>
                        <p className="text-sm">Choose a contact to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
}
