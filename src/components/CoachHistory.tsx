import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Archive, Clock, Download, MessageSquarePlus, Search } from "lucide-react";
import React from "react";

const CoachHistory = ({ conversationSessions, searchTerm, setSearchTerm, filterCategory, setFilterCategory, messages, exportMessages }: any) => (
  <div className="p-4 space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold flex items-center">
        <Clock className="w-4 h-4 mr-2 text-primary" />
        Conversation History
      </h3>
      <Button variant="outline" size="sm" onClick={exportMessages} className="text-xs">
        <Download className="w-3 h-3 mr-1" />Export
      </Button>
    </div>
    <div className="space-y-2">
      <div className="relative">
        <Search className="w-3 h-3 absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-secondary" />
        <input type="text" placeholder="Search conversations..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-8 pr-3 py-2 text-xs border border-card-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary/20" />
      </div>
      <div className="flex gap-2">
        {['all', 'advice', 'practice', 'questions'].map(category => (
          <Button key={category} variant={filterCategory === category ? "default" : "outline"} size="sm" onClick={() => setFilterCategory(category)} className="text-xs h-6">{category}</Button>
        ))}
      </div>
    </div>
    <ScrollArea className="h-64">
      {conversationSessions.length === 0 ? (
        <div className="text-center py-8 text-foreground-secondary">
          <Archive className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">No conversation history yet</p>
          <p className="text-xs">Start chatting to build your history!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {conversationSessions.filter((session: any) => session.title.toLowerCase().includes(searchTerm.toLowerCase()) && (filterCategory === 'all' || session.category === filterCategory)).map((session: any) => (
            <Card key={session.id} className="p-3 hover:border-primary/30 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1">{session.title}</h4>
                  <p className="text-xs text-foreground-secondary mb-2">{session.messageCount} messages • {session.category}</p>
                  <div className="text-xs text-foreground-secondary">{new Date(session.timestamp).toLocaleDateString()} • {new Date(session.lastActivity).toLocaleTimeString()}</div>
                </div>
                <Badge variant="outline" className="text-xs">{session.category}</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </ScrollArea>
    <div className="pt-4 border-t border-card-border">
      <div className="text-center text-xs text-foreground-secondary">
        <MessageSquarePlus className="w-4 h-4 inline mr-1" />
        {conversationSessions.length} total conversations
      </div>
    </div>
  </div>
);

export default CoachHistory; 