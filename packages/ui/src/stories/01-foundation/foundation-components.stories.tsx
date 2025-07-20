import type { Meta, StoryObj } from '@storybook/react';
import { 
  AlertDialog,
  Avatar,
  ScrollArea,
  Switch,
  Tabs,
  Textarea,
  Alert,
  Label 
} from '../../components';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../../components/ui/resizable';
import { DropdownMenu } from '../../components/ui/dropdown-menu';
import { Settings, Download, Upload, BarChart3, PieChart, TrendingUp, User, FileText, X } from 'lucide-react';

// Placeholder components for components that don't exist yet
const HiveSelect = ({ children, variant, multiple, ...props }: any) => (
  <select 
    className="w-full px-3 py-2 bg-[#111113] border border-[#2A2A2D] rounded-lg text-[#E5E5E7] focus:border-[#FFD700] focus:outline-none"
    {...props}
  >
    {children}
  </select>
);

const HiveModal = ({ children, open, onClose, size = 'md' }: any) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className={`bg-[#111113] rounded-lg border border-[#2A2A2D] ${
        size === 'sm' ? 'max-w-sm' : size === 'lg' ? 'max-w-2xl' : 'max-w-md'
      } w-full mx-4`}>
        {children}
      </div>
    </div>
  );
};

HiveModal.Header = ({ children }: any) => (
  <div className="flex items-center justify-between p-6 border-b border-[#2A2A2D]">
    {children}
  </div>
);

HiveModal.Body = ({ children }: any) => (
  <div className="p-6">{children}</div>
);

HiveModal.Footer = ({ children }: any) => (
  <div className="flex items-center justify-end gap-3 p-6 border-t border-[#2A2A2D]">
    {children}
  </div>
);

const HiveTable = ({ data = [], columns = [], variant, pagination, search, selection, onRowClick }: any) => (
  <div className="bg-[#111113] rounded-lg border border-[#2A2A2D] overflow-hidden">
    <table className="w-full">
      <thead className="bg-[#1A1A1C]">
        <tr>
          {columns?.map((col: any, idx: number) => (
            <th key={idx} className="text-left p-4 text-[#C1C1C4] font-medium">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((row: any, idx: number) => (
          <tr key={idx} className="border-t border-[#2A2A2D] hover:bg-[#1A1A1C]">
            {columns?.map((col: any, colIdx: number) => (
              <td key={colIdx} className="p-4 text-[#E5E5E7]">
                {col.render ? col.render(row[col.key]) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const HiveProgress = ({ value = 0, variant = 'default', type = 'linear', size = 'md', indeterminate }: any) => {
  if (type === 'circular') {
    const sizeClass = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12';
    return (
      <div className={`${sizeClass} relative`}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-[#2A2A2D]"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - value / 100)}`}
            className={variant === 'gold' ? 'text-[#FFD700]' : variant === 'success' ? 'text-[#10B981]' : 'text-[#3B82F6]'}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[#E5E5E7] text-sm font-medium">
          {value}%
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full bg-[#2A2A2D] rounded-full h-2">
      <div 
        className={`h-2 rounded-full transition-all duration-300 ${
          variant === 'gold' ? 'bg-[#FFD700]' : variant === 'success' ? 'bg-[#10B981]' : 'bg-[#3B82F6]'
        } ${indeterminate ? 'animate-pulse' : ''}`}
        style={{ width: indeterminate ? '100%' : `${value}%` }}
      />
    </div>
  );
};

const HiveFileUpload = ({ onFileSelect, acceptedTypes, maxSize, multiple, variant, preview, size }: any) => (
  <div className={`border-2 border-dashed border-[#2A2A2D] rounded-lg p-8 text-center hover:border-[#FFD700] transition-colors ${
    size === 'sm' ? 'p-4' : ''
  }`}>
    <div className="text-[#9B9B9F] mb-2">
      {variant === 'minimal' ? 'Upload file' : 'Drag & drop files here, or click to select'}
    </div>
    <input
      type="file"
      className="hidden"
      multiple={multiple}
      accept={acceptedTypes?.join(',')}
    />
    <button className="px-4 py-2 bg-[#FFD700] text-[#0A0A0B] rounded-lg font-medium">
      Choose Files
    </button>
  </div>
);

const HiveCharts = ({ type, data, options, height }: any) => (
  <div 
    className="bg-[#0A0A0B] rounded-lg flex items-center justify-center text-[#9B9B9F]"
    style={{ height: height || 300 }}
  >
    {type.toUpperCase()} Chart Placeholder
    <div className="ml-2 text-xs">({data?.labels?.length || 0} data points)</div>
  </div>
);

const HiveMenu = ({ trigger, items }: any) => (
  <div className="relative inline-block">
    {trigger}
  </div>
);

const meta: Meta = {
  title: '01-Foundation/Foundation Components',
  parameters: {
    docs: {
      description: {
        component: 'Complete foundation components for building HIVE applications',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock data
const mockTableData = [
  { id: 1, name: 'John Smith', role: 'Designer', status: 'Active', lastSeen: '2m ago' },
  { id: 2, name: 'Sarah Chen', role: 'Developer', status: 'Active', lastSeen: '5m ago' },
  { id: 3, name: 'Alex Johnson', role: 'Product Manager', status: 'Away', lastSeen: '1h ago' },
  { id: 4, name: 'Jordan Kim', role: 'Designer', status: 'Offline', lastSeen: '3h ago' },
];

const mockChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Tools Created',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: '#FFD700',
      backgroundColor: 'rgba(255, 215, 0, 0.1)',
    },
    {
      label: 'Users Active',
      data: [2, 3, 20, 5, 1, 4],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
    },
  ],
};

// HIVE Select
export const SelectComponent: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">HIVE Select</h1>
      
      <div className="max-w-2xl space-y-6">
        <div>
          <Label className="text-[#C1C1C4] mb-2 block">Default Select</Label>
          <HiveSelect>
            <option value="">Choose an option...</option>
            <option value="design">Design</option>
            <option value="development">Development</option>
            <option value="product">Product</option>
            <option value="marketing">Marketing</option>
          </HiveSelect>
        </div>
        
        <div>
          <Label className="text-[#C1C1C4] mb-2 block">Multi-select</Label>
          <HiveSelect multiple variant="glass">
            <option value="react">React</option>
            <option value="vue">Vue</option>
            <option value="angular">Angular</option>
            <option value="svelte">Svelte</option>
          </HiveSelect>
        </div>
        
        <div>
          <Label className="text-[#C1C1C4] mb-2 block">Gold Variant</Label>
          <HiveSelect variant="gold">
            <option value="">Premium options...</option>
            <option value="pro">Professional</option>
            <option value="enterprise">Enterprise</option>
            <option value="custom">Custom</option>
          </HiveSelect>
        </div>
      </div>
    </div>
  ),
};

// HIVE Modal
export const ModalComponent: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">HIVE Modal</h1>
      
      <div className="space-y-6">
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-[#FFD700] text-[#0A0A0B] rounded-lg font-medium">
            Open Basic Modal
          </button>
          <button className="px-4 py-2 bg-[#111113] border border-[#2A2A2D] text-[#E5E5E7] rounded-lg font-medium">
            Open Form Modal
          </button>
          <button className="px-4 py-2 bg-[#EF4444] text-white rounded-lg font-medium">
            Open Confirmation
          </button>
        </div>
        
        <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">Modal Preview</h3>
          <div className="bg-[#0A0A0B]/80 p-8 rounded-lg border border-[#2A2A2D] backdrop-blur-sm">
            <HiveModal open={true} onClose={() => {}} size="md">
              <HiveModal.Header>
                <h2 className="text-xl font-semibold text-[#E5E5E7]">Create New Tool</h2>
                <button className="text-[#9B9B9F] hover:text-[#E5E5E7]">
                  <X className="w-5 h-5" />
                </button>
              </HiveModal.Header>
              
              <HiveModal.Body>
                <div className="space-y-4">
                  <div>
                    <Label className="text-[#C1C1C4] mb-2 block">Tool Name</Label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 bg-[#1A1A1C] border border-[#2A2A2D] rounded-lg text-[#E5E5E7]"
                      placeholder="Enter tool name..."
                    />
                  </div>
                  <div>
                    <Label className="text-[#C1C1C4] mb-2 block">Description</Label>
                    <Textarea 
                      className="w-full px-3 py-2 bg-[#1A1A1C] border border-[#2A2A2D] rounded-lg text-[#E5E5E7]"
                      placeholder="Describe your tool..."
                      rows={3}
                    />
                  </div>
                </div>
              </HiveModal.Body>
              
              <HiveModal.Footer>
                <button className="px-4 py-2 text-[#C1C1C4] hover:text-[#E5E5E7]">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-[#FFD700] text-[#0A0A0B] rounded-lg font-medium">
                  Create Tool
                </button>
              </HiveModal.Footer>
            </HiveModal>
          </div>
        </div>
      </div>
    </div>
  ),
};

// HIVE Table
export const TableComponent: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">HIVE Table</h1>
      
      <div className="space-y-8">
        <HiveTable 
          data={mockTableData}
          columns={[
            { key: 'name', header: 'Name', sortable: true },
            { key: 'role', header: 'Role', sortable: true },
            { 
              key: 'status', 
              header: 'Status', 
              render: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  value === 'Active' ? 'bg-[#10B981]/20 text-[#10B981]' :
                  value === 'Away' ? 'bg-[#F59E0B]/20 text-[#F59E0B]' :
                  'bg-[#6B7280]/20 text-[#6B7280]'
                }`}>
                  {value}
                </span>
              )
            },
            { key: 'lastSeen', header: 'Last Seen' },
          ]}
          variant="glass"
          pagination={{ pageSize: 10, showPagination: true }}
          search={{ enabled: true, placeholder: 'Search members...' }}
          selection={{ enabled: true, multiple: true }}
          onRowClick={(row) => console.log('Row clicked:', row)}
        />
        
        <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">Table Features</h3>
          <ul className="text-[#C1C1C4] space-y-2">
            <li>• Sortable columns with custom sort functions</li>
            <li>• Search and filter with real-time results</li>
            <li>• Row selection (single and multiple)</li>
            <li>• Pagination with customizable page sizes</li>
            <li>• Custom cell renderers and formatters</li>
            <li>• Responsive design with horizontal scroll</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};

// HIVE Progress
export const ProgressComponent: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">HIVE Progress</h1>
      
      <div className="max-w-2xl space-y-8">
        <div>
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-4">Linear Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-[#C1C1C4] mb-1">
                <span>Tool Creation</span>
                <span>75%</span>
              </div>
              <HiveProgress value={75} variant="default" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm text-[#C1C1C4] mb-1">
                <span>Upload Progress</span>
                <span>45%</span>
              </div>
              <HiveProgress value={45} variant="gold" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm text-[#C1C1C4] mb-1">
                <span>Success Rate</span>
                <span>90%</span>
              </div>
              <HiveProgress value={90} variant="success" />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-4">Circular Progress</h3>
          <div className="flex gap-8">
            <HiveProgress type="circular" value={65} size="sm" />
            <HiveProgress type="circular" value={85} size="md" variant="gold" />
            <HiveProgress type="circular" value={95} size="lg" variant="success" />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-4">Indeterminate</h3>
          <HiveProgress indeterminate variant="glass" />
        </div>
      </div>
    </div>
  ),
};

// HIVE File Upload
export const FileUploadComponent: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">HIVE File Upload</h1>
      
      <div className="max-w-2xl space-y-8">
        <div>
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-4">Drag & Drop Upload</h3>
          <HiveFileUpload 
            onFileSelect={(files) => console.log('Files selected:', files)}
            acceptedTypes={['image/*', '.pdf', '.doc', '.docx']}
            maxSize={10 * 1024 * 1024} // 10MB
            multiple
            variant="default"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-4">Gold Variant</h3>
          <HiveFileUpload 
            onFileSelect={(files) => console.log('Files selected:', files)}
            acceptedTypes={['image/*']}
            maxSize={5 * 1024 * 1024} // 5MB
            variant="gold"
            preview
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-4">Compact Upload</h3>
          <HiveFileUpload 
            onFileSelect={(files) => console.log('Files selected:', files)}
            variant="minimal"
            size="sm"
            multiple={false}
          />
        </div>
      </div>
    </div>
  ),
};

// HIVE Charts
export const ChartsComponent: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">HIVE Charts</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-4">Line Chart</h3>
          <HiveCharts 
            type="line"
            data={mockChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              theme: 'dark',
            }}
            height={300}
          />
        </div>
        
        <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-4">Bar Chart</h3>
          <HiveCharts 
            type="bar"
            data={mockChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              theme: 'dark',
            }}
            height={300}
          />
        </div>
        
        <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-4">Pie Chart</h3>
          <HiveCharts 
            type="pie"
            data={{
              labels: ['Design', 'Development', 'Product', 'Marketing'],
              datasets: [{
                data: [35, 30, 20, 15],
                backgroundColor: ['#FFD700', '#3B82F6', '#10B981', '#F59E0B'],
              }]
            }}
            height={300}
          />
        </div>
        
        <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-4">Area Chart</h3>
          <HiveCharts 
            type="area"
            data={mockChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              theme: 'dark',
              fill: true,
            }}
            height={300}
          />
        </div>
      </div>
    </div>
  ),
};

// HIVE Menu
export const MenuComponent: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">HIVE Menu</h1>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-4">Context Menu</h3>
          <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
            <HiveMenu 
              trigger={
                <button className="px-4 py-2 bg-[#FFD700] text-[#0A0A0B] rounded-lg font-medium">
                  Right-click for menu
                </button>
              }
              items={[
                { label: 'Edit', icon: <Settings className="w-4 h-4" />, shortcut: 'Cmd+E' },
                { label: 'Duplicate', icon: <FileText className="w-4 h-4" />, shortcut: 'Cmd+D' },
                { type: 'separator' },
                { label: 'Download', icon: <Download className="w-4 h-4" />, shortcut: 'Cmd+S' },
                { label: 'Share', icon: <Upload className="w-4 h-4" /> },
                { type: 'separator' },
                { label: 'Delete', destructive: true, shortcut: 'Del' },
              ]}
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-4">Dropdown Menu</h3>
          <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <button className="px-4 py-2 bg-[#111113] border border-[#2A2A2D] text-[#E5E5E7] rounded-lg font-medium">
                  Actions
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item className="text-[#EF4444]">
                  Sign out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Shadcn UI Components
export const ShadcnComponents: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">Foundation UI Components</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Alert Dialog</h2>
          <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
            <AlertDialog>
              <AlertDialog.Trigger asChild>
                <button className="px-4 py-2 bg-[#EF4444] text-white rounded-lg">
                  Delete Item
                </button>
              </AlertDialog.Trigger>
              <AlertDialog.Content>
                <AlertDialog.Header>
                  <AlertDialog.Title>Are you sure?</AlertDialog.Title>
                  <AlertDialog.Description>
                    This action cannot be undone. This will permanently delete the item.
                  </AlertDialog.Description>
                </AlertDialog.Header>
                <AlertDialog.Footer>
                  <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                  <AlertDialog.Action className="bg-[#EF4444]">Delete</AlertDialog.Action>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Tabs</h2>
          <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
            <Tabs defaultValue="overview" className="w-full">
              <Tabs.List className="grid w-full grid-cols-3">
                <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
                <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="overview" className="mt-6">
                <div className="text-[#C1C1C4]">Overview content goes here...</div>
              </Tabs.Content>
              <Tabs.Content value="analytics" className="mt-6">
                <div className="text-[#C1C1C4]">Analytics content goes here...</div>
              </Tabs.Content>
              <Tabs.Content value="settings" className="mt-6">
                <div className="text-[#C1C1C4]">Settings content goes here...</div>
              </Tabs.Content>
            </Tabs>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Switch & Avatar</h2>
          <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D] space-y-6">
            <div className="flex items-center gap-4">
              <Switch />
              <Label className="text-[#C1C1C4]">Enable notifications</Label>
            </div>
            
            <div className="flex items-center gap-4">
              <Avatar>
                <Avatar.Image src="/avatar-demo.jpg" />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
              <div>
                <div className="text-[#E5E5E7] font-medium">John Doe</div>
                <div className="text-[#9B9B9F] text-sm">john@example.com</div>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Scroll Area & Resizable</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
              <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">Scroll Area</h3>
              <ScrollArea className="h-48 w-full border border-[#2A2A2D] rounded-lg p-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="py-2 text-[#C1C1C4]">
                    Scrollable item {i + 1}
                  </div>
                ))}
              </ScrollArea>
            </div>
            
            <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
              <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">Resizable Panel</h3>
              <ResizablePanelGroup direction="horizontal" className="h-48 border border-[#2A2A2D] rounded-lg">
                <ResizablePanel defaultSize={50}>
                  <div className="p-4 text-[#C1C1C4]">Panel 1</div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
                  <div className="p-4 text-[#C1C1C4]">Panel 2</div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Alert</h2>
          <div className="space-y-4">
            <Alert>
              <AlertDialog.Description>
                This is a default alert message.
              </AlertDialog.Description>
            </Alert>
            
            <Alert variant="destructive">
              <AlertDialog.Description>
                This is an error alert message.
              </AlertDialog.Description>
            </Alert>
          </div>
        </section>
      </div>
    </div>
  ),
};