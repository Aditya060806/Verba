import React, { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  RotateCcw, 
  CheckCircle2, 
  Target, 
  FileText, 
  Link, 
  TrendingUp,
  AlertTriangle,
  Users,
  Scale,
  Clock,
  Star,
  Zap
} from 'lucide-react';

interface ArgumentComponent {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  category: 'core' | 'evidence' | 'structure' | 'advanced';
}

interface DroppedComponent extends ArgumentComponent {
  position: number;
}

const ArgumentBuilder = () => {
  const [availableComponents] = useState<ArgumentComponent[]>([
    // Core Components
    { 
      id: 'claim', 
      label: 'Claim', 
      description: 'Your main argument or position',
      icon: Target,
      color: 'bg-blue-100 border-blue-300 text-blue-800',
      category: 'core'
    },
    { 
      id: 'evidence', 
      label: 'Evidence', 
      description: 'Facts and data supporting your claim',
      icon: FileText,
      color: 'bg-green-100 border-green-300 text-green-800',
      category: 'evidence'
    },
    { 
      id: 'warrant', 
      label: 'Warrant', 
      description: 'Explains why evidence supports claim',
      icon: Link,
      color: 'bg-purple-100 border-purple-300 text-purple-800',
      category: 'core'
    },
    { 
      id: 'impact', 
      label: 'Impact', 
      description: 'Why your argument matters',
      icon: TrendingUp,
      color: 'bg-red-100 border-red-300 text-red-800',
      category: 'core'
    },
    
    // Evidence Types
    { 
      id: 'statistics', 
      label: 'Statistics', 
      description: 'Numerical data and percentages',
      icon: TrendingUp,
      color: 'bg-emerald-100 border-emerald-300 text-emerald-800',
      category: 'evidence'
    },
    { 
      id: 'expert-testimony', 
      label: 'Expert Testimony', 
      description: 'Quotes from credible authorities',
      icon: Users,
      color: 'bg-amber-100 border-amber-300 text-amber-800',
      category: 'evidence'
    },
    { 
      id: 'historical-example', 
      label: 'Historical Example', 
      description: 'Past events as precedent',
      icon: Clock,
      color: 'bg-orange-100 border-orange-300 text-orange-800',
      category: 'evidence'
    },
    
    // Structure Components
    { 
      id: 'counter-argument', 
      label: 'Counter-Argument', 
      description: 'Opposing viewpoint consideration',
      icon: Scale,
      color: 'bg-slate-100 border-slate-300 text-slate-800',
      category: 'structure'
    },
    { 
      id: 'rebuttal', 
      label: 'Rebuttal', 
      description: 'Response to counter-arguments',
      icon: Zap,
      color: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      category: 'structure'
    },
    
    // Advanced Components
    { 
      id: 'fallacy-check', 
      label: 'Fallacy Check', 
      description: 'Identify logical fallacies',
      icon: AlertTriangle,
      color: 'bg-rose-100 border-rose-300 text-rose-800',
      category: 'advanced'
    },
    { 
      id: 'credibility', 
      label: 'Source Credibility', 
      description: 'Establish source reliability',
      icon: Star,
      color: 'bg-indigo-100 border-indigo-300 text-indigo-800',
      category: 'advanced'
    }
  ]);

  const [droppedComponents, setDroppedComponents] = useState<DroppedComponent[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const categoryColors = {
    core: 'bg-blue-50 border-blue-200',
    evidence: 'bg-green-50 border-green-200', 
    structure: 'bg-purple-50 border-purple-200',
    advanced: 'bg-orange-50 border-orange-200'
  };

  const categoryLabels = {
    core: 'Core Components',
    evidence: 'Evidence Types',
    structure: 'Structure Elements',
    advanced: 'Advanced Tools'
  };

  const groupedComponents = availableComponents.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, ArgumentComponent[]>);

  const onDragEnd = useCallback((result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === 'argument-structure') {
      const component = availableComponents.find(c => c.id === draggableId);
      if (component && !droppedComponents.find(dc => dc.id === draggableId)) {
        const newComponent: DroppedComponent = {
          ...component,
          position: destination.index
        };
        
        const newDroppedComponents = [...droppedComponents];
        newDroppedComponents.splice(destination.index, 0, newComponent);
        
        // Update positions
        const updatedComponents = newDroppedComponents.map((comp, index) => ({
          ...comp,
          position: index
        }));
        
        setDroppedComponents(updatedComponents);
        
        // Check if argument is complete
        const hasCore = updatedComponents.some(c => ['claim', 'evidence', 'warrant', 'impact'].includes(c.id));
        setIsComplete(updatedComponents.length >= 4 && hasCore);
      }
    } else if (source.droppableId === 'argument-structure' && destination.droppableId === 'argument-structure') {
      // Reorder within argument structure
      const newComponents = Array.from(droppedComponents);
      const [reorderedItem] = newComponents.splice(source.index, 1);
      newComponents.splice(destination.index, 0, reorderedItem);
      
      const updatedComponents = newComponents.map((comp, index) => ({
        ...comp,
        position: index
      }));
      
      setDroppedComponents(updatedComponents);
    }
  }, [droppedComponents, availableComponents]);

  const resetArgument = () => {
    setDroppedComponents([]);
    setIsComplete(false);
  };

  const removeComponent = (id: string) => {
    const updatedComponents = droppedComponents.filter(c => c.id !== id);
    setDroppedComponents(updatedComponents);
    
    const hasCore = updatedComponents.some(c => ['claim', 'evidence', 'warrant', 'impact'].includes(c.id));
    setIsComplete(updatedComponents.length >= 4 && hasCore);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-heading font-bold text-gradient mb-2">
          Argument Builder
        </h2>
        <p className="text-foreground-secondary">
          Drag and drop components to build your argument structure
        </p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Available Components */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Available Components</h3>
            
            {Object.entries(groupedComponents).map(([category, components]) => (
              <Card key={category} className={`${categoryColors[category as keyof typeof categoryColors]} border-2`}>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 text-foreground">
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </h4>
                  <Droppable droppableId={`available-${category}`} isDropDisabled={true}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="space-y-2"
                      >
                        {components.map((component, index) => (
                          <Draggable
                            key={component.id}
                            draggableId={component.id}
                            index={index}
                            isDragDisabled={droppedComponents.some(dc => dc.id === component.id)}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`p-3 rounded-lg border-2 cursor-grab active:cursor-grabbing transition-all ${
                                  component.color
                                } ${
                                  droppedComponents.some(dc => dc.id === component.id)
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:scale-105'
                                } ${
                                  snapshot.isDragging ? 'shadow-lg scale-105' : ''
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <component.icon className="w-5 h-5" />
                                  <div className="flex-1">
                                    <div className="font-medium">{component.label}</div>
                                    <div className="text-sm opacity-80">{component.description}</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Argument Structure */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Your Argument Structure</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={resetArgument}
                className="flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </Button>
            </div>

            <Droppable droppableId="argument-structure">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[400px] p-4 rounded-lg border-2 border-dashed transition-colors ${
                    snapshot.isDragOver
                      ? 'border-primary bg-primary/5'
                      : 'border-card-border bg-card/20'
                  }`}
                >
                  {droppedComponents.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-foreground-secondary">
                      <div className="text-center">
                        <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Drag components here to build your argument</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {droppedComponents.map((component, index) => (
                        <Draggable
                          key={component.id}
                          draggableId={component.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-4 rounded-lg border-2 transition-all ${
                                component.color
                              } ${
                                snapshot.isDragging ? 'shadow-lg scale-105' : ''
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/50 text-xs font-bold">
                                    {index + 1}
                                  </div>
                                  <component.icon className="w-5 h-5" />
                                  <div>
                                    <div className="font-medium">{component.label}</div>
                                    <div className="text-sm opacity-80">{component.description}</div>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeComponent(component.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  ×
                                </Button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </div>
              )}
            </Droppable>

            {/* Completion Status */}
            {droppedComponents.length > 0 && (
              <Card className={`border-2 ${
                isComplete 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-yellow-200 bg-yellow-50'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    {isComplete ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <Target className="w-6 h-6 text-yellow-600" />
                    )}
                    <div>
                      <div className="font-medium">
                        {isComplete ? 'Argument Complete!' : 'Building Argument...'}
                      </div>
                      <div className="text-sm opacity-80">
                        {isComplete 
                          ? 'Your argument has all essential components'
                          : `Need ${4 - droppedComponents.length} more components for a complete argument`
                        }
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default ArgumentBuilder; 