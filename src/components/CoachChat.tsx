import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Mic, MicOff, Send, Copy, ThumbsUp, ThumbsDown, Volume2 } from "lucide-react";
import React, { useEffect, useRef } from "react";
import AdvancedAudioVisualizer from "./AdvancedAudioVisualizer";

const CoachChat = ({
  messages,
  isLoading,
  inputValue,
  setInputValue,
  handleKeyPress,
  sendMessage,
  toggleVoiceInput,
  isListening,
  speak,
  copyMessage,
  rateMessage,
  textareaRef,
  messagesEndRef,
  isSpeaking // <-- add isSpeaking prop
}: any) => {
  // For animating quick replies
  const quickReplyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (quickReplyRef.current) {
      quickReplyRef.current.classList.add("animate-fade-in");
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Audio Visualizer for voice input/output */}
      {(isListening || isSpeaking) && (
        <AdvancedAudioVisualizer
          isRecording={isListening}
          isPlaying={isSpeaking}
          className="mb-2"
        />
      )}
      <ScrollArea className="flex-1 p-4 custom-scrollbar overflow-y-auto max-h-[50vh] min-h-[200px]">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-foreground-secondary">
            <Bot className="w-12 h-12 mx-auto mb-3 text-primary animate-fade-in" />
            <h3 className="font-semibold mb-2 animate-fade-in">Hi! I'm your AI Debate Coach</h3>
            <p className="text-sm leading-relaxed animate-fade-in">Ask me anything about debate strategy, argument structure, rebuttals, or practice with me!</p>
            <div ref={quickReplyRef} className="flex flex-wrap gap-2 mt-4 justify-center opacity-0 animate-fade-in animate-delay-300">
              <Button variant="outline" size="sm" onClick={() => setInputValue("How do I structure a strong opening statement?")} className="text-xs animate-slide-in-up animate-delay-500">Opening Strategy</Button>
              <Button variant="outline" size="sm" onClick={() => setInputValue("What's the best way to rebut an argument?")} className="text-xs animate-slide-in-up animate-delay-700">Rebuttal Tips</Button>
              <Button variant="outline" size="sm" onClick={() => setInputValue("Help me practice my delivery")} className="text-xs animate-slide-in-up animate-delay-900">Practice Session</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message: any, idx: number) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in animate-slide-in-up`} style={{ animationDelay: `${idx * 60}ms` }}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.type === 'user' ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground' : 'bg-card-secondary border border-card-border'}`}>
                  <div className="flex items-start gap-2">
                    {message.type === 'ai' && <Bot className="w-4 h-4 mt-0.5 text-primary shrink-0" />}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {message.type === 'ai' && (
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" onClick={() => speak(message.content)} className="h-6 w-6 p-0 hover:bg-primary/10" title="Read aloud"><Volume2 className="w-3 h-3" /></Button>
                            <Button variant="ghost" size="sm" onClick={() => copyMessage(message.content)} className="h-6 w-6 p-0 hover:bg-primary/10" title="Copy"><Copy className="w-3 h-3" /></Button>
                            <Button variant="ghost" size="sm" onClick={() => rateMessage(message.id, true)} className={`h-6 w-6 p-0 hover:bg-success/10 ${message.helpful === true ? 'text-success' : ''}`} title="Helpful"><ThumbsUp className="w-3 h-3" /></Button>
                            <Button variant="ghost" size="sm" onClick={() => rateMessage(message.id, false)} className={`h-6 w-6 p-0 hover:bg-destructive/10 ${message.helpful === false ? 'text-destructive' : ''}`} title="Not helpful"><ThumbsDown className="w-3 h-3" /></Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fade-in animate-slide-in-up animate-delay-300">
                <div className="bg-card-secondary border border-card-border rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-primary" />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>
      <div className="p-4 border-t border-card-border">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Textarea ref={textareaRef} value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyPress} placeholder="Ask me about debate strategy, or start practicing..." className="min-h-[44px] max-h-32 resize-none pr-12 rounded-xl" disabled={isLoading} />
            <Button variant="ghost" size="sm" onClick={toggleVoiceInput} className={`absolute right-2 top-2 h-7 w-7 p-0 ${isListening ? 'text-destructive' : 'text-foreground-secondary'}`} title={isListening ? "Stop listening" : "Voice input"} disabled={isLoading}>
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
          </div>
          <Button onClick={sendMessage} disabled={!inputValue.trim() || isLoading} className="h-11 px-4 rounded-xl bg-gradient-to-r from-primary to-accent hover:shadow-lg">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoachChat; 