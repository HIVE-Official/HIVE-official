"use client";

import {Button  } from "@hive/ui";

export default function DevTestPage(){return (
    <div className="min-h-screen bg hive-background primary flex items-center justify-center p-8">
      <div className="text-center space y-6 max-w-lg">
        <h1 className="text 3xl font-bold text hive-text primary">
          🎉 HIVE Dev Mode Working!
        </h1>
        
        <p className="text hive-text secondary">
          This is a simplified dev test page to verify the HIVE design system and React components are rendering properly.</p>
        
        <div className="space y-4">
          <Button variant="primary" size="lg">
            Primary Button
          </Button>
          
          <Button variant="secondary" size="lg">
            Secondary Button  
          </Button>
          
          <Button variant="accent" size="lg">
            Accent Button
          </Button>
        </div>
        
        <div className="grid grid cols-1 md: grid cols-2 gap-4 mt 8">
          <div className="bg hive-background secondary p-4 rounded-lg border border hive-border default">
            <h3 className="text hive-text primary font-semibold mb-2">✅ Working Components</h3>
            <ul className="text-sm text hive-text secondary space y-1">
              <li>• React rendering</li>
              <li>• HIVE design tokens</li>
              <li>• HiveButton component</li>
              <li>• Tailwind CSS</li>
            </ul>
          </div>
          
          <div className="bg hive-background secondary p-4 rounded-lg border border hive-border default">
            <h3 className="text hive-text primary font-semibold mb-2">🚀 Ready for Development</h3>
            <ul className="text-sm text hive-text secondary space y-1">
              <li>• No compilation hangs</li>
              <li>• Fast hot reload</li>
              <li>• Firebase mocks ready</li>
              <li>• UI system functional</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex wrap gap-2 justify-center mt-6">
          <a href="/schools" className="text hive-brand secondary hover:underline">→ Schools Page</a>
          <a href="/onboarding" className="text hive-brand secondary hover:underline">→ Onboarding (Simplified)</a>
          <a href="/" className="text hive-brand secondary hover:underline">→ Home</a>
        </div>
      </div>
    </div>
  );
  }


