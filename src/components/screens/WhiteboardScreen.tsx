import React, { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, Triangle, PencilBrush } from "fabric";
import { 
  PenTool, 
  Square, 
  Circle as CircleIcon, 
  Triangle as TriangleIcon, 
  Type, 
  Download, 
  Upload, 
  Trash2, 
  Undo, 
  Redo,
  GitBranch,
  BarChart3,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const WhiteboardScreen = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState("#000000");
  const [activeTool, setActiveTool] = useState<"select" | "draw" | "rectangle" | "circle" | "triangle" | "text">("select");
  const [activeMode, setActiveMode] = useState<"whiteboard" | "mindmap" | "infographic">("whiteboard");

  const colors = ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500"];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 1200,
      height: 700,
      backgroundColor: "#ffffff",
    });

    canvas.freeDrawingBrush = new PencilBrush(canvas);
    canvas.freeDrawingBrush.color = activeColor;
    canvas.freeDrawingBrush.width = 2;

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === "draw";
    
    if (activeTool === "draw" && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = 2;
    }
  }, [activeTool, activeColor, fabricCanvas]);

  const handleToolClick = (tool: typeof activeTool) => {
    setActiveTool(tool);

    if (!fabricCanvas) return;

    const centerX = fabricCanvas.width! / 2;
    const centerY = fabricCanvas.height! / 2;

    switch (tool) {
      case "rectangle":
        const rect = new Rect({
          left: centerX - 50,
          top: centerY - 25,
          fill: activeColor,
          width: 100,
          height: 50,
          stroke: "#333",
          strokeWidth: 2,
        });
        fabricCanvas.add(rect);
        break;
      case "circle":
        const circle = new Circle({
          left: centerX - 30,
          top: centerY - 30,
          fill: activeColor,
          radius: 30,
          stroke: "#333",
          strokeWidth: 2,
        });
        fabricCanvas.add(circle);
        break;
      case "triangle":
        const triangle = new Triangle({
          left: centerX - 30,
          top: centerY - 30,
          fill: activeColor,
          width: 60,
          height: 60,
          stroke: "#333",
          strokeWidth: 2,
        });
        fabricCanvas.add(triangle);
        break;
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
  };

  const handleUndo = () => {
    // Basic undo functionality - would need more sophisticated history tracking
    const objects = fabricCanvas?.getObjects();
    if (objects && objects.length > 0) {
      fabricCanvas?.remove(objects[objects.length - 1]);
    }
  };

  const tools = [
    { name: "Select", icon: PenTool, tool: "select" as const },
    { name: "Draw", icon: PenTool, tool: "draw" as const },
    { name: "Rectangle", icon: Square, tool: "rectangle" as const },
    { name: "Circle", icon: CircleIcon, tool: "circle" as const },
    { name: "Triangle", icon: TriangleIcon, tool: "triangle" as const },
    { name: "Text", icon: Type, tool: "text" as const },
  ];

  const modes = [
    { name: "Whiteboard", mode: "whiteboard" as const, icon: PenTool },
    { name: "Mind Map", mode: "mindmap" as const, icon: GitBranch },
    { name: "Infographic", mode: "infographic" as const, icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Creative Whiteboard</h1>
          <p className="text-gray-600">Express your ideas with our interactive whiteboard, mindmap, and infographic tools</p>
        </div>

        {/* Mode Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Creative Modes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              {modes.map((mode) => {
                const IconComponent = mode.icon;
                return (
                  <Button
                    key={mode.name}
                    variant={activeMode === mode.mode ? "default" : "outline"}
                    onClick={() => setActiveMode(mode.mode)}
                    className="flex items-center gap-2"
                  >
                    <IconComponent className="w-4 h-4" />
                    {mode.name}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Toolbar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Drawing Tools */}
              <div>
                <h4 className="font-medium mb-2">Drawing Tools</h4>
                <div className="grid grid-cols-2 gap-2">
                  {tools.map((tool) => {
                    const IconComponent = tool.icon;
                    return (
                      <Button
                        key={tool.name}
                        variant={activeTool === tool.tool ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleToolClick(tool.tool)}
                        className="flex flex-col items-center gap-1 h-auto py-2"
                      >
                        <IconComponent className="w-4 h-4" />
                        <span className="text-xs">{tool.name}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              <Separator />

              {/* Colors */}
              <div>
                <h4 className="font-medium mb-2">Colors</h4>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setActiveColor(color)}
                      className={`w-8 h-8 rounded border-2 ${
                        activeColor === color ? "border-gray-900" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <Separator />

              {/* Actions */}
              <div className="space-y-2">
                <Button variant="outline" size="sm" onClick={handleUndo} className="w-full justify-start">
                  <Undo className="w-4 h-4 mr-2" />
                  Undo
                </Button>
                <Button variant="outline" size="sm" onClick={handleClear} className="w-full justify-start">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              {/* Mode-specific features */}
              {activeMode === "mindmap" && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Mind Map Features</h4>
                    <div className="space-y-2">
                      <Badge variant="secondary" className="w-full justify-center">
                        Auto-connect nodes
                      </Badge>
                      <Badge variant="secondary" className="w-full justify-center">
                        Smart layouts
                      </Badge>
                    </div>
                  </div>
                </>
              )}

              {activeMode === "infographic" && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Infographic Elements</h4>
                    <div className="space-y-2">
                      <Badge variant="secondary" className="w-full justify-center">
                        Charts & Graphs
                      </Badge>
                      <Badge variant="secondary" className="w-full justify-center">
                        Data visualization
                      </Badge>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Canvas Area */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Canvas - {activeMode.charAt(0).toUpperCase() + activeMode.slice(1)} Mode</span>
                <Badge variant="outline">{activeTool}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <canvas 
                  ref={canvasRef} 
                  className="block"
                  style={{ maxWidth: "100%", height: "700px" }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WhiteboardScreen;