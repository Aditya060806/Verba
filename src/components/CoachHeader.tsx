import { Bot, Settings, X, VolumeX, Minimize2, Maximize2, MessageSquare, Lightbulb, Target, Clock, BarChart3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface CoachHeaderProps {
  mode: string;
  setMode: (mode: string) => void;
  isExpanded: boolean;
  setIsExpanded: (v: boolean) => void;
  voiceSettings: any;
  setVoiceSettings: (v: any) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;
  setIsOpen: (v: boolean) => void;
  messageCount: number;
}

const modes = [
  { id: 'chat', icon: MessageSquare, label: 'Chat' },
  { id: 'tips', icon: Lightbulb, label: 'Tips' },
  { id: 'practice', icon: Target, label: 'Practice' },
  { id: 'history', icon: Clock, label: 'History' },
  { id: 'analytics', icon: BarChart3, label: 'Stats' }
];

const CoachHeader = ({ mode, setMode, isExpanded, setIsExpanded, voiceSettings, setVoiceSettings, isSpeaking, stopSpeaking, setIsOpen, messageCount }: CoachHeaderProps) => (
  <div className="pb-3 shrink-0">
    <div className="flex items-center justify-between">
      <div className="text-lg font-heading text-gradient flex items-center">
        <Bot className="w-5 h-5 mr-2" />
        AI Debate Coach
      </div>
      <div className="flex items-center space-x-2">
        {isSpeaking && (
          <Button variant="ghost" size="sm" onClick={stopSpeaking} className="hover:bg-card-secondary text-destructive" title="Stop speaking">
            <VolumeX className="w-4 h-4" />
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="hover:bg-card-secondary">
              <Settings className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Voice Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-3 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="voice-enabled" className="text-sm">Enable Voice</Label>
                <Switch id="voice-enabled" checked={voiceSettings.enabled} onCheckedChange={checked => setVoiceSettings((prev: any) => ({ ...prev, enabled: checked }))} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-speak" className="text-sm">Auto-speak</Label>
                <Switch id="auto-speak" checked={voiceSettings.autoSpeak} onCheckedChange={checked => setVoiceSettings((prev: any) => ({ ...prev, autoSpeak: checked }))} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Speed: {voiceSettings.speed.toFixed(1)}x</Label>
                <Slider value={[voiceSettings.speed]} onValueChange={([value]) => setVoiceSettings((prev: any) => ({ ...prev, speed: value }))} min={0.5} max={2} step={0.1} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Volume: {Math.round(voiceSettings.volume * 100)}%</Label>
                <Slider value={[voiceSettings.volume]} onValueChange={([value]) => setVoiceSettings((prev: any) => ({ ...prev, volume: value }))} min={0} max={1} step={0.1} />
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="hover:bg-card-secondary">
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
    <div className="grid grid-cols-5 gap-1 p-1 bg-card-secondary rounded-lg mt-2">
      {modes.map(m => (
        <Button key={m.id} variant={mode === m.id ? "default" : "ghost"} size="sm" onClick={() => setMode(m.id)} className="text-xs h-8 p-1" title={m.label} aria-label={m.label}>
          <m.icon className="w-3 h-3" />
        </Button>
      ))}
    </div>
    <div className="flex justify-between items-center mt-2">
      <div className="text-xs text-foreground-secondary">{messageCount > 0 && `${messageCount} messages`}</div>
      <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="text-xs p-1" title={isExpanded ? "Collapse" : "Expand"} aria-label={isExpanded ? "Collapse" : "Expand"}>
        {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
      </Button>
    </div>
  </div>
);

export default CoachHeader; 