
"use client";

import React, { useState } from "react";
import { Search, Send, ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { contacts, mockChatHistory, currentUser } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");

  const activeContact = selectedContactId ? contacts.find(c => c.id === selectedContactId) : null;
  const messages = selectedContactId ? mockChatHistory[selectedContactId] || [] : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if(!messageInput.trim()) return;
    // In a real app, we would send this to the backend
    setMessageInput("");
  };

  return (
    <div className="h-[calc(100vh-140px)] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex">
      {/* Sidebar: Contact List */}
      <div className={cn(
        "w-full md:w-80 flex-col border-r border-slate-200 bg-slate-50/50",
        selectedContactId ? "hidden md:flex" : "flex"
      )}>
        <div className="p-4 border-b border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search messages..." className="pl-9 bg-slate-50" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContactId(contact.id)}
              className={cn(
                "w-full p-4 flex items-center gap-3 hover:bg-slate-100 transition-colors border-b border-slate-100 last:border-0 text-left",
                selectedContactId === contact.id ? "bg-white border-l-4 border-l-secondary shadow-sm" : "border-l-4 border-l-transparent"
              )}
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                  {contact.avatarUrl ? (
                    <img src={contact.avatarUrl} alt={contact.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-slate-500">{contact.name[0]}</span>
                  )}
                </div>
                {contact.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold text-slate-900 truncate">{contact.name}</span>
                  <span className="text-xs text-slate-500 whitespace-nowrap">{contact.lastMessageTime}</span>
                </div>
                <p className={cn("text-sm truncate", contact.unreadCount > 0 ? "font-semibold text-slate-900" : "text-slate-500")}>
                  {contact.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={cn(
        "flex-1 flex-col bg-slate-50/30",
        selectedContactId ? "flex" : "hidden md:flex"
      )}>
        {activeContact ? (
          <>
            {/* Chat Header */}
            <div className="h-16 px-6 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="md:hidden -ml-2" onClick={() => setSelectedContactId(null)}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                  {activeContact.avatarUrl ? (
                    <img src={activeContact.avatarUrl} alt={activeContact.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-slate-500">{activeContact.name[0]}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{activeContact.name}</h3>
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    {activeContact.online ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="text-slate-500">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-500">
                  <Video className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-500">
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
                    <p className="text-sm">{msg.text}</p>
                    <p className={cn("text-[10px] mt-1 text-right", msg.isMe ? "text-slate-300" : "text-slate-400")}>{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200 shrink-0">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input 
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..." 
                  className="flex-1"
                />
                <Button type="submit" className="btn-secondary aspect-square p-0 w-10">
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
