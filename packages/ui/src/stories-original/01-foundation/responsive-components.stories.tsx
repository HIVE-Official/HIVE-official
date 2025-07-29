import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { 
  X, 
  ChevronDown, 
  RefreshCw, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Share2, 
  Copy,
  Menu,
  Settings,
  User,
  LogOut,
  FileText
} from 'lucide-react';

const meta: Meta = {
  title: '01-Foundation/Responsive Components',
  parameters: {
    docs: {
      description: {
        component: 'HIVE Responsive Components - Bottom Sheet, Swipe Actions, Pull to Refresh, and Context Menus with mobile-first design',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Bottom Sheet Component
const BottomSheet = ({ 
  isOpen, 
  onClose, 
  children,
  snapPoints = ['25%', '50%', '90%'],
  initialSnap = 1
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  snapPoints?: string[]
  initialSnap?: number
}) => {
  const [currentSnap, setCurrentSnap] = React.useState(initialSnap);
  
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    
    if (velocity.y > 500 || offset.y > 200) {
      onClose();
    } else if (velocity.y < -500 || offset.y < -200) {
      setCurrentSnap(Math.min(currentSnap + 1, snapPoints.length - 1));
    } else if (velocity.y > 200) {
      setCurrentSnap(Math.max(currentSnap - 1, 0));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[var(--hive-background-primary)]/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: `calc(100% - ${snapPoints[currentSnap]})` }}
            exit={{ y: '100%' }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="fixed inset-x-0 bottom-0 z-50 bg-[var(--hive-background-primary)] border-t border-[var(--hive-border-default)] rounded-t-xl"
            style={{ height: '100vh' }}
          >
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="w-12 h-1 bg-[var(--hive-border-default)] rounded-full" />
            </div>
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4">
              <h3 className="text-[var(--hive-text-primary)] text-lg font-semibold">Bottom Sheet</h3>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full bg-[var(--hive-background-secondary)] text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-secondary)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={18} />
              </motion.button>
            </div>
            
            {/* Content */}
            <div className="px-6 pb-6 overflow-y-auto" style={{ height: 'calc(100% - 80px)' }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Swipe Actions Component
const SwipeActions = ({ 
  children,
  leftActions,
  rightActions,
  onSwipe
}: {
  children: React.ReactNode
  leftActions?: Array<{
    icon: React.ReactNode
    label: string
    color: string
    action: () => void
  }>
  rightActions?: Array<{
    icon: React.ReactNode
    label: string
    color: string
    action: () => void
  }>
  onSwipe?: (direction: 'left' | 'right', actionIndex: number) => void
}) => {
  const [swipeOffset, setSwipeOffset] = React.useState(0);
  const [isRevealed, setIsRevealed] = React.useState(false);

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setSwipeOffset(info.offset.x);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const threshold = 100;
    
    if (Math.abs(offset.x) > threshold || Math.abs(velocity.x) > 500) {
      setIsRevealed(true);
      setSwipeOffset(offset.x > 0 ? 120 : -120);
    } else {
      setIsRevealed(false);
      setSwipeOffset(0);
    }
  };

  const executeAction = (actions: typeof leftActions, index: number, direction: 'left' | 'right') => {
    if (actions?.[index]) {
      actions[index].action();
      onSwipe?.(direction, index);
      setIsRevealed(false);
      setSwipeOffset(0);
    }
  };

  return (
    <div className="relative overflow-hidden bg-[var(--hive-background-secondary)] rounded-lg">
      {/* Left Actions */}
      {leftActions && (
        <div className="absolute left-0 top-0 h-full flex">
          {leftActions.map((action, index) => (
            <motion.button
              key={index}
              onClick={() => executeAction(leftActions, index, 'left')}
              className="flex flex-col items-center justify-center px-6 text-[var(--hive-text-primary)]"
              style={{ backgroundColor: action.color }}
              initial={{ x: -120 }}
              animate={{ x: swipeOffset > 0 ? 0 : -120 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {action.icon}
              <span className="text-xs mt-1">{action.label}</span>
            </motion.button>
          ))}
        </div>
      )}

      {/* Right Actions */}
      {rightActions && (
        <div className="absolute right-0 top-0 h-full flex">
          {rightActions.map((action, index) => (
            <motion.button
              key={index}
              onClick={() => executeAction(rightActions, index, 'right')}
              className="flex flex-col items-center justify-center px-6 text-[var(--hive-text-primary)]"
              style={{ backgroundColor: action.color }}
              initial={{ x: 120 }}
              animate={{ x: swipeOffset < 0 ? 0 : 120 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {action.icon}
              <span className="text-xs mt-1">{action.label}</span>
            </motion.button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -150, right: 150 }}
        dragElastic={0.2}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={{ x: swipeOffset }}
        className="relative z-10 bg-[var(--hive-background-secondary)]"
      >
        {children}
      </motion.div>
    </div>
  );
};

// Pull to Refresh Component
const PullToRefresh = ({ 
  onRefresh,
  children,
  refreshThreshold = 100
}: {
  onRefresh: () => Promise<void>
  children: React.ReactNode
  refreshThreshold?: number
}) => {
  const [pullDistance, setPullDistance] = React.useState(0);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [canRefresh, setCanRefresh] = React.useState(false);

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const distance = Math.max(0, info.offset.y);
    setPullDistance(distance);
    setCanRefresh(distance >= refreshThreshold);
  };

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (canRefresh && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
        setCanRefresh(false);
      }
    } else {
      setPullDistance(0);
      setCanRefresh(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Refresh Indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center py-4 bg-[var(--hive-background-primary)] border-b border-[var(--hive-border-default)]"
        initial={{ y: -60, opacity: 0 }}
        animate={{ 
          y: pullDistance > 0 ? Math.min(pullDistance - 60, 0) : -60,
          opacity: pullDistance > 30 ? 1 : 0
        }}
      >
        <div className="flex items-center space-x-2">
          <motion.div
            animate={{ 
              rotate: isRefreshing ? 360 : canRefresh ? 180 : 0 
            }}
            transition={{ 
              duration: isRefreshing ? 1 : 0.3,
              repeat: isRefreshing ? Infinity : 0,
              ease: "linear"
            }}
          >
            <RefreshCw 
              size={20} 
              className={canRefresh ? 'text-[var(--hive-brand-secondary)]' : 'text-[var(--hive-text-tertiary)]'}
            />
          </motion.div>
          <span className={`text-sm ${canRefresh ? 'text-[var(--hive-brand-secondary)]' : 'text-[var(--hive-text-tertiary)]'}`}>
            {isRefreshing ? 'Refreshing...' : canRefresh ? 'Release to refresh' : 'Pull to refresh'}
          </span>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.3, bottom: 0 }}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={{ y: isRefreshing ? refreshThreshold : 0 }}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  );
};

// Context Menu Component
const ContextMenu = ({ 
  children,
  items,
  trigger = 'rightClick'
}: {
  children: React.ReactNode
  items: Array<{
    icon: React.ReactNode
    label: string
    action: () => void
    color?: string
    disabled?: boolean
  }>
  trigger?: 'rightClick' | 'longPress'
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [longPressTimer, setLongPressTimer] = React.useState<NodeJS.Timeout | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    if (trigger === 'rightClick') {
      event.preventDefault();
      setPosition({ x: event.clientX, y: event.clientY });
      setIsOpen(true);
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (trigger === 'longPress') {
      const timer = setTimeout(() => {
        setPosition({ x: event.clientX, y: event.clientY });
        setIsOpen(true);
      }, 500);
      setLongPressTimer(timer);
    }
  };

  const handleMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleItemClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <>
      <div
        onContextMenu={handleContextMenu}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative"
      >
        {children}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed z-50 bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-lg py-2 backdrop-blur-md shadow-xl"
            style={{
              left: position.x,
              top: position.y,
              transform: 'translate(-10px, -10px)'
            }}
          >
            {items.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => handleItemClick(item.action)}
                disabled={item.disabled}
                className={`
                  flex items-center space-x-3 w-full px-4 py-2 text-left transition-colors
                  ${item.disabled 
                    ? 'text-[#6B7280] cursor-not-allowed' 
                    : 'text-[var(--hive-text-secondary)] hover:bg-[var(--hive-background-secondary)] hover:text-[var(--hive-text-primary)]'
                  }
                `}
                whileHover={!item.disabled ? { backgroundColor: 'var(--hive-background-secondary)' } : {}}
                style={{ color: item.color && !item.disabled ? item.color : undefined }}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Stories
export const BottomSheetStory: Story = {
  name: 'Bottom Sheet',
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="bg-[var(--hive-background-primary)] min-h-screen p-8">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-8">Bottom Sheet</h2>
        <p className="text-[var(--hive-text-secondary)] mb-8">
          Mobile-first modal with drag interactions and snap points.
        </p>
        
        <motion.button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] rounded-lg font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Open Bottom Sheet
        </motion.button>

        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          snapPoints={['30%', '60%', '90%']}
          initialSnap={0}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-4">Sheet Content</h3>
              <p className="text-[var(--hive-text-secondary)] mb-4">
                This bottom sheet supports multiple snap points and drag gestures. 
                You can drag the handle or swipe up/down to change the height.
              </p>
            </div>

            <div className="space-y-4">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="p-4 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]">
                  <h4 className="text-[var(--hive-text-primary)] font-medium mb-2">List Item {i + 1}</h4>
                  <p className="text-[var(--hive-text-tertiary)] text-sm">
                    Some content that demonstrates scrolling within the bottom sheet.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </BottomSheet>
      </div>
    );
  },
};

export const SwipeActionsStory: Story = {
  name: 'Swipe Actions',
  render: () => {
    const [messages, setMessages] = React.useState([
      { id: 1, sender: 'Alex Johnson', message: 'Hey! Are you free for the study session tomorrow?', time: '2m ago' },
      { id: 2, sender: 'Sarah Chen', message: 'Thanks for sharing those notes from yesterday\'s lecture', time: '5m ago' },
      { id: 3, sender: 'Mike Rodriguez', message: 'Did you finish the assignment? I\'m stuck on question 3', time: '10m ago' },
    ]);

    const handleDelete = (id: number) => {
      setMessages(prev => prev.filter(msg => msg.id !== id));
    };

    const leftActions = [
      {
        icon: <Share2 size={18} />,
        label: 'Share',
        color: 'var(--hive-status-success)',
        action: () => console.log('Share')
      }
    ];

    const rightActions = [
      {
        icon: <Edit size={18} />,
        label: 'Edit',
        color: '#6366F1',
        action: () => console.log('Edit')
      },
      {
        icon: <Trash2 size={18} />,
        label: 'Delete',
        color: 'var(--hive-status-error)',
        action: () => console.log('Delete')
      }
    ];

    return (
      <div className="bg-[var(--hive-background-primary)] min-h-screen p-8">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-8">Swipe Actions</h2>
        <p className="text-[var(--hive-text-secondary)] mb-8">
          Swipe left or right on message items to reveal contextual actions.
        </p>

        <div className="max-w-md space-y-4">
          {messages.map((message) => (
            <SwipeActions
              key={message.id}
              leftActions={leftActions}
              rightActions={[
                ...rightActions.slice(0, -1),
                {
                  ...rightActions[rightActions.length - 1],
                  action: () => handleDelete(message.id)
                }
              ]}
            >
              <div className="p-4 border border-[var(--hive-border-default)]">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-[var(--hive-text-primary)] font-medium">{message.sender}</h4>
                  <span className="text-[var(--hive-text-tertiary)] text-xs">{message.time}</span>
                </div>
                <p className="text-[var(--hive-text-secondary)] text-sm">{message.message}</p>
              </div>
            </SwipeActions>
          ))}
        </div>
      </div>
    );
  },
};

export const PullToRefreshStory: Story = {
  name: 'Pull to Refresh',
  render: () => {
    const [items, setItems] = React.useState([
      'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'
    ]);
    const [lastRefresh, setLastRefresh] = React.useState<Date>(new Date());

    const handleRefresh = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setItems(prev => [
        `New Item ${Date.now()}`,
        ...prev.slice(0, 10) // Keep only 10 items
      ]);
      setLastRefresh(new Date());
    };

    return (
      <div className="bg-[var(--hive-background-primary)] min-h-screen">
        <div className="p-8 pb-4">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-4">Pull to Refresh</h2>
          <p className="text-[var(--hive-text-secondary)] mb-2">
            Pull down on the content area to refresh the list.
          </p>
          <p className="text-[var(--hive-text-tertiary)] text-sm">
            Last refreshed: {lastRefresh.toLocaleTimeString()}
          </p>
        </div>

        <PullToRefresh onRefresh={handleRefresh}>
          <div className="px-8 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={`${item}-${index}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[var(--hive-text-primary)] font-medium">{item}</h3>
                  <span className="text-[var(--hive-text-tertiary)] text-sm">
                    {index === 0 && item.includes('New') ? 'New!' : `Item ${index + 1}`}
                  </span>
                </div>
                <p className="text-[var(--hive-text-tertiary)] text-sm mt-2">
                  This is some content for {item}. Pull down to refresh and see new items appear.
                </p>
              </motion.div>
            ))}
          </div>
        </PullToRefresh>
      </div>
    );
  },
};

export const ContextMenuStory: Story = {
  name: 'Context Menu',
  render: () => {
    const contextItems = [
      {
        icon: <Edit size={16} />,
        label: 'Edit',
        action: () => console.log('Edit clicked')
      },
      {
        icon: <Copy size={16} />,
        label: 'Copy',
        action: () => console.log('Copy clicked')
      },
      {
        icon: <Share2 size={16} />,
        label: 'Share',
        action: () => console.log('Share clicked')
      },
      {
        icon: <Trash2 size={16} />,
        label: 'Delete',
        action: () => console.log('Delete clicked'),
        color: 'var(--hive-status-error)'
      }
    ];

    return (
      <div className="bg-[var(--hive-background-primary)] min-h-screen p-8">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-8">Context Menu</h2>
        <p className="text-[var(--hive-text-secondary)] mb-8">
          Right-click or long-press on items to reveal context menus.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-[var(--hive-text-secondary)] mb-4">Right Click Menu</h3>
            <ContextMenu items={contextItems} trigger="rightClick">
              <div className="p-6 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-center cursor-pointer hover:border-[var(--hive-brand-secondary)]/20 transition-colors">
                <h4 className="text-[var(--hive-text-primary)] font-medium mb-2">Right Click Me</h4>
                <p className="text-[var(--hive-text-tertiary)] text-sm">
                  Right-click to open context menu
                </p>
              </div>
            </ContextMenu>
          </div>

          <div>
            <h3 className="text-lg font-medium text-[var(--hive-text-secondary)] mb-4">Long Press Menu</h3>
            <ContextMenu items={contextItems} trigger="longPress">
              <div className="p-6 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-center cursor-pointer hover:border-[var(--hive-brand-secondary)]/20 transition-colors select-none">
                <h4 className="text-[var(--hive-text-primary)] font-medium mb-2">Long Press Me</h4>
                <p className="text-[var(--hive-text-tertiary)] text-sm">
                  Hold down to open context menu
                </p>
              </div>
            </ContextMenu>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-medium text-[var(--hive-text-secondary)] mb-4">Usage Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['File Item 1', 'File Item 2', 'File Item 3'].map((item, index) => (
              <ContextMenu key={index} items={contextItems} trigger="rightClick">
                <div className="p-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg hover:border-[var(--hive-brand-secondary)]/20 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[var(--hive-brand-secondary)]/20 rounded-lg flex items-center justify-center text-[var(--hive-brand-secondary)]">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="text-[var(--hive-text-primary)] font-medium">{item}</h4>
                      <p className="text-[var(--hive-text-tertiary)] text-sm">Document file</p>
                    </div>
                  </div>
                </div>
              </ContextMenu>
            ))}
          </div>
        </div>
      </div>
    );
  },
};