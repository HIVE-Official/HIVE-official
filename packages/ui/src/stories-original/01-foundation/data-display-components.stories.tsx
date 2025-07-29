import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { motion } from 'framer-motion';

const meta: Meta = {
  title: '01-Foundation/Data Display Components',
  parameters: {
    docs: {
      description: {
        component: 'HIVE Data Display Components - Activity Heatmap, Counter Badge, and Status Indicators with dark luxury aesthetic',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Activity Heatmap Component
const ActivityHeatmap = ({ 
  data, 
  weeks = 52,
  showTooltip = true 
}: { 
  data: Array<{date: string, count: number}>
  weeks?: number
  showTooltip?: boolean
}) => {
  const [hoveredData, setHoveredData] = React.useState<{date: string, count: number} | null>(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const getIntensityColor = (count: number) => {
    if (count === 0) return 'var(--hive-background-secondary)';
    if (count <= 2) return 'var(--hive-brand-secondary)/20';
    if (count <= 5) return 'var(--hive-brand-secondary)/40';
    if (count <= 8) return 'var(--hive-brand-secondary)/60';
    if (count <= 12) return 'var(--hive-brand-secondary)/80';
    return 'var(--hive-brand-secondary)';
  };

  const handleMouseEnter = (dataPoint: {date: string, count: number}, event: React.MouseEvent) => {
    setHoveredData(dataPoint);
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  const generateWeeks = () => {
    const today = new Date();
    const startDate = new Date(today.getTime() - (weeks * 7 * 24 * 60 * 60 * 1000));
    const weekData = [];
    
    for (let week = 0; week < weeks; week++) {
      const weekStart = new Date(startDate.getTime() + (week * 7 * 24 * 60 * 60 * 1000));
      const days = [];
      
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(weekStart.getTime() + (day * 24 * 60 * 60 * 1000));
        const dateString = currentDate.toISOString().split('T')[0];
        const dayData = data.find(d => d.date === dateString);
        days.push({
          date: dateString,
          count: dayData?.count || Math.floor(Math.random() * 15) // Fallback to random data
        });
      }
      weekData.push(days);
    }
    return weekData;
  };

  const weekData = generateWeeks();

  return (
    <div className="relative">
      <div className="flex space-x-1 overflow-x-auto pb-4">
        {weekData.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col space-y-1">
            {week.map((day, dayIndex) => (
              <motion.div
                key={day.date}
                className="w-3 h-3 rounded-sm border border-[var(--hive-border-default)] cursor-pointer"
                style={{ 
                  backgroundColor: getIntensityColor(day.count).replace('/', '/') 
                }}
                whileHover={{ 
                  scale: 1.2,
                  borderColor: 'var(--hive-brand-secondary)'
                }}
                onMouseEnter={(e) => showTooltip && handleMouseEnter(day, e)}
                onMouseLeave={() => setHoveredData(null)}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {showTooltip && hoveredData && (
        <motion.div
          className="fixed z-50 bg-[var(--hive-background-primary)] border border-[var(--hive-brand-secondary)]/20 rounded-lg p-3 pointer-events-none backdrop-blur-md"
          style={{
            left: mousePos.x + 10,
            top: mousePos.y - 50,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="text-[var(--hive-text-primary)] font-medium">
            {hoveredData.count} activities
          </div>
          <div className="text-[var(--hive-text-tertiary)] text-sm">
            {new Date(hoveredData.date).toLocaleDateString()}
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-between mt-4 text-sm text-[var(--hive-text-tertiary)]">
        <span>Less</span>
        <div className="flex space-x-1">
          {[0, 2, 5, 8, 12, 15].map((count) => (
            <div
              key={count}
              className="w-3 h-3 rounded-sm border border-[var(--hive-border-default)]"
              style={{ backgroundColor: getIntensityColor(count).replace('/', '/') }}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

// Counter Badge Component
const CounterBadge = ({ 
  count, 
  max = 99,
  variant = 'default',
  size = 'md',
  showZero = false
}: {
  count: number
  max?: number
  variant?: 'default' | 'success' | 'warning' | 'error' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  showZero?: boolean
}) => {
  if (!showZero && count === 0) return null;

  const displayCount = count > max ? `${max}+` : count.toString();

  const variants = {
    default: 'bg-[#6366F1] border-[#6366F1]',
    success: 'bg-[var(--hive-status-success)] border-[var(--hive-status-success)]',
    warning: 'bg-[var(--hive-status-warning)] border-[var(--hive-status-warning)]',
    error: 'bg-[var(--hive-status-error)] border-[var(--hive-status-error)]',
    gold: 'bg-[var(--hive-brand-secondary)] border-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]'
  };

  const sizes = {
    sm: 'min-w-4 h-4 text-xs px-1',
    md: 'min-w-5 h-5 text-xs px-1.5',
    lg: 'min-w-6 h-6 text-sm px-2'
  };

  return (
    <motion.div
      className={`
        inline-flex items-center justify-center rounded-full border font-medium text-[var(--hive-text-primary)]
        ${variants[variant]} ${sizes[size]}
      `}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", bounce: 0.5 }}
    >
      {displayCount}
    </motion.div>
  );
};

// Status Indicator Component
const StatusIndicator = ({ 
  status,
  label,
  showLabel = true,
  size = 'md',
  pulse = false
}: {
  status: 'online' | 'offline' | 'away' | 'busy' | 'active' | 'inactive'
  label?: string
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
}) => {
  const statusConfig = {
    online: { color: 'var(--hive-status-success)', bgColor: 'var(--hive-status-success)/20', label: 'Online' },
    offline: { color: '#6B7280', bgColor: '#6B7280/20', label: 'Offline' },
    away: { color: 'var(--hive-status-warning)', bgColor: 'var(--hive-status-warning)/20', label: 'Away' },
    busy: { color: 'var(--hive-status-error)', bgColor: 'var(--hive-status-error)/20', label: 'Busy' },
    active: { color: 'var(--hive-brand-secondary)', bgColor: 'var(--hive-brand-secondary)/20', label: 'Active' },
    inactive: { color: '#6B7280', bgColor: '#6B7280/20', label: 'Inactive' }
  };

  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const config = statusConfig[status];
  const displayLabel = label || config.label;

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <motion.div
          className={`${sizes[size]} rounded-full border border-[var(--hive-border-default)]`}
          style={{ 
            backgroundColor: config.color,
            boxShadow: `0 0 0 0.5 ${config.bgColor.replace('/', '/')}`
          }}
          animate={pulse ? { scale: [1, 1.2, 1] } : {}}
          transition={pulse ? { repeat: Infinity, duration: 2 } : {}}
        />
        {pulse && (
          <motion.div
            className={`absolute inset-0 ${sizes[size]} rounded-full opacity-30`}
            style={{ backgroundColor: config.color }}
            animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </div>
      {showLabel && (
        <span className="text-sm font-medium text-[var(--hive-text-secondary)]">
          {displayLabel}
        </span>
      )}
    </div>
  );
};

// Stories
export const ActivityHeatmapStory: Story = {
  name: 'Activity Heatmap',
  render: () => {
    // Generate sample data
    const generateSampleData = () => {
      const data = [];
      const today = new Date();
      for (let i = 0; i < 365; i++) {
        const date = new Date(today.getTime() - (i * 24 * 60 * 60 * 1000));
        data.push({
          date: date.toISOString().split('T')[0],
          count: Math.floor(Math.random() * 15)
        });
      }
      return data;
    };

    const sampleData = generateSampleData();

    return (
      <div className="bg-[var(--hive-background-primary)] min-h-screen p-8">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-8">Activity Heatmap</h2>
        <p className="text-[var(--hive-text-secondary)] mb-8">
          GitHub-style activity heatmap showing user engagement patterns over time.
        </p>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium text-[var(--hive-text-secondary)] mb-4">365 Days Activity</h3>
            <ActivityHeatmap data={sampleData} weeks={52} />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-[var(--hive-text-secondary)] mb-4">3 Months Activity</h3>
            <ActivityHeatmap data={sampleData} weeks={12} />
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-4">
            <div className="text-2xl font-bold text-[var(--hive-brand-secondary)] mb-2">847</div>
            <div className="text-[var(--hive-text-secondary)] text-sm">Total Activities</div>
          </div>
          <div className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-4">
            <div className="text-2xl font-bold text-[var(--hive-status-success)] mb-2">23</div>
            <div className="text-[var(--hive-text-secondary)] text-sm">Active Days</div>
          </div>
          <div className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-4">
            <div className="text-2xl font-bold text-[var(--hive-status-warning)] mb-2">15</div>
            <div className="text-[var(--hive-text-secondary)] text-sm">Max Daily</div>
          </div>
        </div>
      </div>
    );
  },
};

export const CounterBadgeStory: Story = {
  name: 'Counter Badge',
  render: () => {
    const [notifications, setNotifications] = React.useState(12);
    const [messages, setMessages] = React.useState(3);
    const [alerts, setAlerts] = React.useState(0);

    return (
      <div className="bg-[var(--hive-background-primary)] min-h-screen p-8">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-8">Counter Badge</h2>
        <p className="text-[var(--hive-text-secondary)] mb-8">
          Notification badges with various styles, sizes, and color variants.
        </p>
        
        <div className="space-y-8">
          {/* Variants */}
          <div>
            <h3 className="text-lg font-medium text-[var(--hive-text-secondary)] mb-4">Variants</h3>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-[var(--hive-text-secondary)]">Default</span>
                <CounterBadge count={5} variant="default" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[var(--hive-text-secondary)]">Success</span>
                <CounterBadge count={3} variant="success" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[var(--hive-text-secondary)]">Warning</span>
                <CounterBadge count={8} variant="warning" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[var(--hive-text-secondary)]">Error</span>
                <CounterBadge count={12} variant="error" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[var(--hive-text-secondary)]">Gold</span>
                <CounterBadge count={99} variant="gold" />
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-lg font-medium text-[var(--hive-text-secondary)] mb-4">Sizes</h3>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-[var(--hive-text-secondary)]">Small</span>
                <CounterBadge count={5} size="sm" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[var(--hive-text-secondary)]">Medium</span>
                <CounterBadge count={15} size="md" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[var(--hive-text-secondary)]">Large</span>
                <CounterBadge count={25} size="lg" />
              </div>
            </div>
          </div>

          {/* High Numbers */}
          <div>
            <h3 className="text-lg font-medium text-[var(--hive-text-secondary)] mb-4">High Numbers</h3>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-[var(--hive-text-secondary)]">99+</span>
                <CounterBadge count={150} max={99} variant="error" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[var(--hive-text-secondary)]">999+</span>
                <CounterBadge count={1500} max={999} variant="gold" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[var(--hive-text-secondary)]">Zero (hidden)</span>
                <CounterBadge count={0} showZero={false} />
                <span className="text-[var(--hive-text-tertiary)] text-sm">← Hidden when zero</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[var(--hive-text-secondary)]">Zero (shown)</span>
                <CounterBadge count={0} showZero={true} variant="default" />
              </div>
            </div>
          </div>

          {/* Interactive Demo */}
          <div>
            <h3 className="text-lg font-medium text-[var(--hive-text-secondary)] mb-4">Interactive Demo</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[var(--hive-text-secondary)] font-medium">Notifications</span>
                  <CounterBadge count={notifications} variant="gold" />
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    onClick={() => setNotifications(prev => Math.max(0, prev - 1))}
                    className="px-3 py-2 bg-[var(--hive-status-error)] text-[var(--hive-text-primary)] rounded-lg text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    -1
                  </motion.button>
                  <motion.button
                    onClick={() => setNotifications(prev => prev + 1)}
                    className="px-3 py-2 bg-[var(--hive-status-success)] text-[var(--hive-text-primary)] rounded-lg text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    +1
                  </motion.button>
                </div>
              </div>

              <div className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[var(--hive-text-secondary)] font-medium">Messages</span>
                  <CounterBadge count={messages} variant="success" />
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    onClick={() => setMessages(prev => Math.max(0, prev - 1))}
                    className="px-3 py-2 bg-[var(--hive-status-error)] text-[var(--hive-text-primary)] rounded-lg text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    -1
                  </motion.button>
                  <motion.button
                    onClick={() => setMessages(prev => prev + 1)}
                    className="px-3 py-2 bg-[var(--hive-status-success)] text-[var(--hive-text-primary)] rounded-lg text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    +1
                  </motion.button>
                </div>
              </div>

              <div className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[var(--hive-text-secondary)] font-medium">Alerts</span>
                  <CounterBadge count={alerts} variant="error" showZero={true} />
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    onClick={() => setAlerts(prev => Math.max(0, prev - 1))}
                    className="px-3 py-2 bg-[var(--hive-status-error)] text-[var(--hive-text-primary)] rounded-lg text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    -1
                  </motion.button>
                  <motion.button
                    onClick={() => setAlerts(prev => prev + 1)}
                    className="px-3 py-2 bg-[var(--hive-status-success)] text-[var(--hive-text-primary)] rounded-lg text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    +1
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const StatusIndicatorStory: Story = {
  name: 'Status Indicator',
  render: () => {
    const [userStatus, setUserStatus] = React.useState<'online' | 'offline' | 'away' | 'busy'>('online');

    return (
      <div className="bg-[var(--hive-background-primary)] min-h-screen p-8">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-8">Status Indicator</h2>
        <p className="text-[var(--hive-text-secondary)] mb-8">
          User status indicators with various states, sizes, and animation options.
        </p>
        
        <div className="space-y-8">
          {/* All Status Types */}
          <div>
            <h3 className="text-lg font-medium text-[var(--hive-text-secondary)] mb-4">Status Types</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <StatusIndicator status="online" />
              <StatusIndicator status="offline" />
              <StatusIndicator status="away" />
              <StatusIndicator status="busy" />
              <StatusIndicator status="active" />
              <StatusIndicator status="inactive" />
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-lg font-medium text-[var(--hive-text-secondary)] mb-4">Sizes</h3>
            <div className="flex items-center space-x-8">
              <StatusIndicator status="online" size="sm" label="Small" />
              <StatusIndicator status="online" size="md" label="Medium" />
              <StatusIndicator status="online" size="lg" label="Large" />
            </div>
          </div>

          {/* With Pulse Animation */}
          <div>
            <h3 className="text-lg font-medium text-[var(--hive-text-secondary)] mb-4">Pulse Animation</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <StatusIndicator status="online" pulse={true} />
              <StatusIndicator status="active" pulse={true} />
              <StatusIndicator status="busy" pulse={true} />
            </div>
          </div>

          {/* Without Labels */}
          <div>
            <h3 className="text-lg font-medium text-[var(--hive-text-secondary)] mb-4">Icon Only</h3>
            <div className="flex items-center space-x-4">
              <StatusIndicator status="online" showLabel={false} />
              <StatusIndicator status="away" showLabel={false} />
              <StatusIndicator status="busy" showLabel={false} />
              <StatusIndicator status="offline" showLabel={false} />
            </div>
          </div>

          {/* Interactive Demo */}
          <div>
            <h3 className="text-lg font-medium text-[var(--hive-text-secondary)] mb-4">Interactive Status Change</h3>
            <div className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[var(--hive-brand-secondary)] rounded-full flex items-center justify-center text-[var(--hive-background-primary)] font-bold">
                    JD
                  </div>
                  <div>
                    <div className="text-[var(--hive-text-primary)] font-medium">Jacob Doe</div>
                    <StatusIndicator status={userStatus} pulse={userStatus === 'online'} />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(['online', 'away', 'busy', 'offline'] as const).map((status) => (
                  <motion.button
                    key={status}
                    onClick={() => setUserStatus(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      userStatus === status
                        ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]'
                        : 'bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)] hover:bg-[var(--hive-border-default)]'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Usage in Context */}
          <div>
            <h3 className="text-lg font-medium text-[var(--hive-text-secondary)] mb-4">Usage Examples</h3>
            <div className="space-y-4">
              {/* Member List */}
              <div className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-4">
                <h4 className="text-[var(--hive-text-primary)] font-medium mb-3">Space Members</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Alex Johnson', status: 'online' as const, avatar: 'AJ' },
                    { name: 'Sarah Chen', status: 'away' as const, avatar: 'SC' },
                    { name: 'Mike Rodriguez', status: 'busy' as const, avatar: 'MR' },
                    { name: 'Emma Thompson', status: 'offline' as const, avatar: 'ET' },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-8 h-8 bg-[var(--hive-border-default)] rounded-full flex items-center justify-center text-[var(--hive-text-secondary)] text-sm font-medium">
                          {member.avatar}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5">
                          <StatusIndicator status={member.status} showLabel={false} size="sm" />
                        </div>
                      </div>
                      <span className="text-[var(--hive-text-secondary)]">{member.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};