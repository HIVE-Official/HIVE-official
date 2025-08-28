import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: '🎨 Design System/Colors',
  parameters: {
    docs: {
      description: {
        component: 'HIVE color palette featuring black, gold, and white with semantic meanings.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const HiveColorPalette: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">HIVE Core Colors</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-32 h-32 bg-black rounded-lg mb-2 border"></div>
            <p className="font-medium">HIVE Black</p>
            <p className="text-sm text-gray-600">#000000</p>
            <p className="text-xs">Authority & Depth</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 bg-yellow-500 rounded-lg mb-2"></div>
            <p className="font-medium">HIVE Gold</p>
            <p className="text-sm text-gray-600">#FFD700</p>
            <p className="text-xs">Energy & Success</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 bg-white rounded-lg mb-2 border"></div>
            <p className="font-medium">HIVE White</p>
            <p className="text-sm text-gray-600">#FFFFFF</p>
            <p className="text-xs">Clarity & Space</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Semantic Colors</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-green-500 rounded-lg mb-2"></div>
            <p className="font-medium">Success</p>
            <p className="text-xs">Actions completed</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-red-500 rounded-lg mb-2"></div>
            <p className="font-medium">Error</p>
            <p className="text-xs">Issues & warnings</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-500 rounded-lg mb-2"></div>
            <p className="font-medium">Information</p>
            <p className="text-xs">Helpful context</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-orange-500 rounded-lg mb-2"></div>
            <p className="font-medium">Warning</p>
            <p className="text-xs">Caution needed</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ColorUsageGuidelines: Story = {
  render: () => (
    <div className="space-y-6 p-6 max-w-4xl">
      <h2 className="text-2xl font-bold">Color Usage Guidelines</h2>
      
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-bold text-lg mb-2">HIVE Black</h3>
          <p className="mb-2">Primary text, headers, navigation elements</p>
          <div className="bg-black text-white p-3 rounded">
            Example: Primary navigation and headings
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-bold text-lg mb-2">HIVE Gold</h3>
          <p className="mb-2">Call-to-action buttons, highlights, active states</p>
          <div className="bg-yellow-500 text-black p-3 rounded font-medium">
            Example: Join Space button
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-bold text-lg mb-2">HIVE White</h3>
          <p className="mb-2">Backgrounds, cards, clean spaces</p>
          <div className="bg-white border p-3 rounded">
            Example: Content cards and modals
          </div>
        </div>
      </div>
    </div>
  ),
};