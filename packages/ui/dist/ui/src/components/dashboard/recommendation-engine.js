"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Users, Zap, BookOpen, TrendingUp, RefreshCw, Target, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../hive-button';
import { Badge } from '../ui/badge';
// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    },
    hover: {
        y: -4,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
        }
    }
};
export function RecommendationEngine({ data, onSpaceJoin, onToolBookmark, onConnectionRequest, onContentLike, onContentBookmark, onRefresh, className = "" }) {
    const [activeSection, setActiveSection] = useState('spaces');
    const [showAllSections, setShowAllSections] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    // Handle refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        await onRefresh();
        setRefreshing(false);
    };
    // Format time ago
    const formatTimeAgo = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        if (days > 0)
            return `${days}d ago`;
        if (hours > 0)
            return `${hours}h ago`;
        return 'Just now';
    };
    return (_jsx(motion.div, { className: `recommendation-engine space-y-6 ${className}`, variants: containerVariants, initial: "hidden", animate: "visible", children: _jsx(motion.div, { variants: cardVariants, children: _jsx(Card, { className: "bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20", children: _jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Sparkles, { className: "h-5 w-5 text-indigo-400" }), _jsx("span", { children: "Personalized for You" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => setShowAllSections(!showAllSections), children: showAllSections ? 'Focused View' : 'All Sections' }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: handleRefresh, disabled: refreshing, children: [_jsx(RefreshCw, { className: `h-4 w-4 mr-1 ${refreshing ? 'animate-spin' : ''}` }), "Refresh"] })] })] }), _jsx("p", { className: true }), "\\\"text-sm text-hive-text-mutedLight\\\"> Discover spaces, tools, and connections tailored to your interests and activity"] }) }) }) })) /* Section Tabs */;
    { /* Section Tabs */ }
    {
        !showAllSections && (_jsxs(motion.div, { variants: cardVariants, children: [_jsx("div", { className: true }), "\\\"flex items-center space-x-2 bg-hive-background-overlay p-1 rounded-lg\\\">", [
                    { key: 'spaces', label: 'Spaces', icon: Users, count: data.spaces.length },
                    { key: 'tools', label: 'Tools', icon: Zap, count: data.tools.length },
                    { key: 'connections', label: 'People', icon: MessageCircle, count: data.connections.length },
                    { key: 'content', label: 'Content', icon: BookOpen, count: data.content.length }
                ].map(({ key, label, icon: Icon, count }) => (_jsx(Button, { variant: activeSection === key ?  :  }, key))), " \\\"default\\\" : \\\"ghost\\\"} size=\\\"sm\\\" onClick=", () => setActiveSection(key), "className=\\\"flex-1 text-xs\\\" >", _jsx(Icon, { className: true }), "\\\"h-3 w-3 mr-1\\\" />", label, _jsx(Badge, { variant: true }), "\\\"secondary\\\" className=\\\"ml-1 text-xs\\\">", count] }));
        Button >
        ;
    }
    div >
    ;
    motion.div >
    ;
}
{ /* Recommendations Content */ }
_jsx(AnimatePresence, { mode: true });
"wait\">;
{
    (showAllSections || activeSection === 'spaces') && (_jsx(SpaceRecommendations, { spaces: data.spaces, onJoin: onSpaceJoin, formatTimeAgo: formatTimeAgo, showTitle: showAllSections }));
}
{
    (showAllSections || activeSection === 'tools') && (_jsx(ToolRecommendations, { tools: data.tools, onBookmark: onToolBookmark, formatTimeAgo: formatTimeAgo, showTitle: showAllSections }));
}
{
    (showAllSections || activeSection === 'connections') && (_jsx(ConnectionRecommendations, { connections: data.connections, onConnect: onConnectionRequest, formatTimeAgo: formatTimeAgo, showTitle: showAllSections }));
}
{
    (showAllSections || activeSection === 'content') && (_jsx(ContentRecommendations, { content: data.content, onLike: onContentLike, onBookmark: onContentBookmark, formatTimeAgo: formatTimeAgo, showTitle: showAllSections }));
}
AnimatePresence >
    { /* Trending Section */}
    < motion.div;
variants = { cardVariants } >
    (_jsx(Card, { children: _jsxs(CardHeader, { children: [_jsx(CardTitle, { className: true }), "\\\"flex items-center space-x-2\\\">", _jsx(TrendingUp, { className: true }), "\\\"h-5 w-5 text-hive-gold\\\" />", _jsx("span", { children: "Trending Now" })] }) })
        ,
            _jsxs(CardContent, { children: [_jsx("div", { className: true }), "\\\"grid grid-cols-1 md:grid-cols-2 gap-6\\\">", _jsxs("div", { children: [_jsx("h4", { className: true }), "\\\"font-medium text-white mb-3 flex items-center\\\">", _jsx(Target, { className: true }), "\\\"h-4 w-4 mr-2 text-blue-400\\\" /> Popular Topics"] }), _jsx("div", { className: true }), "\\\"space-y-2\\\">", data.trending.hashtags.slice(0, 5).map((item, index) => (_jsx("div", { className: true }, item.tag))), "\\\"flex items-center justify-between p-2 rounded bg-hive-background-overlay hover:bg-hive-background-interactive transition-colors cursor-pointer\\\">", _jsx("div", { className: true }), "\\\"flex items-center space-x-2\\\">", _jsx("span", { className: true }), "\\\"text-xs text-hive-text-mutedLight\\\">#", index + 1] })
                ,
                    _jsx("span", { className: true }));
"font-medium text-sm text-white\">#{item.tag}</span>;
div >
    _jsx("div", { className: true });
"flex items-center space-x-2\">
    < span;
className = ;
"text-xs text-hive-text-mutedLight\">{item.count}</span>
    < Badge;
variant = ;
"outline\" className={`text-xs ${;
item.growth > 0 ? 'text-green-400 border-green-400' : 'text-gray-400';
`}>
                          {item.growth > 0 ? '+' : ''}{item.growth}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Trending Topics */}
              <div>
                <h4 className=\"font-medium text-white mb-3 flex items-center\">
                  <Award className=\"h-4 w-4 mr-2 text-purple-400\" />
                  Hot Discussions
                </h4>
                <div className=\"space-y-2\">
                  {data.trending.topics.slice(0, 5).map((item, index) => (
                    <div key={item.topic} className=\"p-2 rounded bg-hive-background-overlay hover:bg-hive-background-interactive transition-colors cursor-pointer\">
                      <div className=\"flex items-center justify-between mb-1\">
                        <span className=\"font-medium text-sm text-white\">{item.topic}</span>
                        <span className=\"text-xs text-hive-text-mutedLight\">{item.spaces} spaces</span>
                      </div>
                      <Progress value={(item.engagement / 1000) * 100} className=\"h-1\" />
                      <p className=\"text-xs text-hive-text-mutedLight mt-1\">
                        {item.engagement} interactions this week
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

// Space Recommendations Component
interface SpaceRecommendationsProps {
  spaces: SpaceRecommendation[];
  onJoin: (spaceId: string) => void;
  formatTimeAgo: (timestamp: string) => string;
  showTitle: boolean;
}

function SpaceRecommendations({ spaces, onJoin, formatTimeAgo, showTitle }: SpaceRecommendationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        {showTitle && (
          <CardHeader>
            <CardTitle className=\"flex items-center space-x-2\">
              <Users className=\"h-5 w-5 text-blue-400\" />
              <span>Recommended Spaces</span>
            </CardTitle>
          </CardHeader>
        )}
        <CardContent className={showTitle ? '' : 'pt-6'}>
          <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
            {spaces.slice(0, 4).map((space) => (
              <motion.div
                key={space.id}
                className=\"p-4 rounded-lg bg-hive-background-overlay border border-hive-border-default hover:border-hive-gold/30 transition-all cursor-pointer group\"
                variants={cardVariants}
                whileHover=\"hover\"
              >
                <div className=\"flex items-start justify-between mb-3\">
                  <div className=\"flex-1\">
                    <h4 className=\"font-medium text-white group-hover:text-hive-gold transition-colors\">
                      {space.name}
                    </h4>
                    <p className=\"text-sm text-hive-text-mutedLight mt-1 line-clamp-2\">
                      {space.description}
                    </p>
                  </div>
                  <Badge variant=\"outline\" className=\"text-xs ml-2\">
                    {space.matchScore}% match
                  </Badge>
                </div>
                
                <div className=\"flex items-center justify-between mb-3\">
                  <div className=\"flex items-center space-x-2\">
                    <Users className=\"h-4 w-4 text-hive-text-mutedLight\" />
                    <span className=\"text-sm text-hive-text-mutedLight\">
                      {space.memberCount} members
                    </span>
                  </div>
                  <Badge variant=\"secondary\" className=\"text-xs capitalize\">
                    {space.category}
                  </Badge>
                </div>
                
                {/* Preview Members */}
                <div className=\"flex items-center justify-between\">
                  <div className=\"flex -space-x-2\">
                    {space.previewMembers.slice(0, 3).map((member, index) => (
                      <Avatar key={member.id} className=\"w-6 h-6 border-2 border-hive-background-primary\">
                        <AvatarImage src={member.avatarUrl} />
                        <AvatarFallback className=\"text-xs\">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {space.previewMembers.length > 3 && (
                      <div className=\"w-6 h-6 bg-hive-background-tertiary rounded-full border-2 border-hive-background-primary flex items-center justify-center\">
                        <span className=\"text-xs text-white\">+{space.previewMembers.length - 3}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    size=\"sm\"
                    onClick={(e) => {
                      e.stopPropagation();
                      onJoin(space.id);
                    }}
                    disabled={space.isJoined || space.isPending}
                    className=\"bg-hive-gold text-hive-obsidian hover:bg-hive-champagne\"
                  >
                    {space.isJoined ? 'Joined' : space.isPending ? 'Pending' : 'Join'}
                  </Button>
                </div>
                
                {/* Match Reasons */}
                <div className=\"mt-3 flex flex-wrap gap-1\">
                  {space.matchReasons.slice(0, 2).map((reason) => (
                    <Badge key={reason} variant=\"outline\" className=\"text-xs\">
                      {reason}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Tool Recommendations Component (similar structure)
function ToolRecommendations({ tools, onBookmark, formatTimeAgo, showTitle }: {
  tools: ToolRecommendation[];
  onBookmark: (toolId: string) => void;
  formatTimeAgo: (timestamp: string) => string;
  showTitle: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        {showTitle && (
          <CardHeader>
            <CardTitle className=\"flex items-center space-x-2\">
              <Zap className=\"h-5 w-5 text-purple-400\" />
              <span>Recommended Tools</span>
            </CardTitle>
          </CardHeader>
        )}
        <CardContent className={showTitle ? '' : 'pt-6'}>
          <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
            {tools.slice(0, 4).map((tool) => (
              <motion.div
                key={tool.id}
                className=\"p-4 rounded-lg bg-hive-background-overlay border border-hive-border-default hover:border-hive-gold/30 transition-all cursor-pointer group\"
                variants={cardVariants}
                whileHover=\"hover\"
              >
                <div className=\"flex items-start justify-between mb-3\">
                  <div className=\"flex-1\">
                    <h4 className=\"font-medium text-white group-hover:text-hive-gold transition-colors\">
                      {tool.name}
                    </h4>
                    <p className=\"text-sm text-hive-text-mutedLight mt-1 line-clamp-2\">
                      {tool.description}
                    </p>
                  </div>
                  <Badge variant=\"outline\" className=\"text-xs ml-2\">
                    {tool.matchScore}% match
                  </Badge>
                </div>
                
                <div className=\"flex items-center justify-between mb-3\">
                  <div className=\"flex items-center space-x-3\">
                    <div className=\"flex items-center space-x-1\">
                      <Star className=\"h-4 w-4 text-yellow-400\" />
                      <span className=\"text-sm text-white\">{tool.rating}</span>
                    </div>
                    <span className=\"text-sm text-hive-text-mutedLight\">
                      {tool.usageCount} uses
                    </span>
                  </div>
                  <Badge variant=\"secondary\" className=\"text-xs capitalize\">
                    {tool.category}
                  </Badge>
                </div>
                
                <div className=\"flex items-center justify-between\">
                  <p className=\"text-xs text-hive-text-mutedLight\">
                    by {tool.author} • {formatTimeAgo(tool.lastUpdated)}
                  </p>
                  
                  <Button
                    size=\"sm\"
                    variant=\"outline\"
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookmark(tool.id);
                    }}
                    className={tool.isBookmarked ? 'text-hive-gold border-hive-gold' : ''}
                  >
                    <Heart className={`;
h - 3;
w - 3;
mr - 1;
$;
{
    tool.isBookmarked ? 'fill-current' : '';
}
`} />
                    {tool.isBookmarked ? 'Saved' : 'Save'}
                  </Button>
                </div>
                
                {/* Tags */}
                <div className=\"mt-3 flex flex-wrap gap-1\">
                  {tool.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant=\"outline\" className=\"text-xs\">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Connection Recommendations Component
function ConnectionRecommendations({ connections, onConnect, formatTimeAgo, showTitle }: {
  connections: ConnectionRecommendation[];
  onConnect: (userId: string) => void;
  formatTimeAgo: (timestamp: string) => string;
  showTitle: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        {showTitle && (
          <CardHeader>
            <CardTitle className=\"flex items-center space-x-2\">
              <MessageCircle className=\"h-5 w-5 text-green-400\" />
              <span>People You May Know</span>
            </CardTitle>
          </CardHeader>
        )}
        <CardContent className={showTitle ? '' : 'pt-6'}>
          <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
            {connections.slice(0, 4).map((connection) => (
              <motion.div
                key={connection.id}
                className=\"p-4 rounded-lg bg-hive-background-overlay border border-hive-border-default hover:border-hive-gold/30 transition-all cursor-pointer group\"
                variants={cardVariants}
                whileHover=\"hover\"
              >
                <div className=\"flex items-start space-x-3 mb-3\">
                  <Avatar className=\"w-10 h-10\">
                    <AvatarImage src={connection.avatarUrl} />
                    <AvatarFallback>
                      {connection.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className=\"flex-1 min-w-0\">
                    <h4 className=\"font-medium text-white group-hover:text-hive-gold transition-colors\">
                      {connection.name}
                    </h4>
                    <p className=\"text-sm text-hive-text-mutedLight\">@{connection.handle}</p>
                    {connection.major && (
                      <p className=\"text-xs text-hive-text-mutedLight\">
                        {connection.major} • {connection.academicYear}
                      </p>
                    )}
                  </div>
                  <Badge variant=\"outline\" className=\"text-xs\">
                    {connection.matchScore}% match
                  </Badge>
                </div>
                
                <div className=\"mb-3 space-y-1\">
                  <div className=\"flex items-center text-xs text-hive-text-mutedLight\">
                    <Users className=\"h-3 w-3 mr-1\" />
                    {connection.mutualSpaces} mutual spaces
                  </div>
                  {connection.mutualConnections > 0 && (
                    <div className=\"flex items-center text-xs text-hive-text-mutedLight\">
                      <MessageCircle className=\"h-3 w-3 mr-1\" />
                      {connection.mutualConnections} mutual connections
                    </div>
                  )}
                </div>
                
                <div className=\"flex items-center justify-between\">
                  <div className=\"flex flex-wrap gap-1\">
                    {connection.sharedInterests.slice(0, 2).map((interest) => (
                      <Badge key={interest} variant=\"outline\" className=\"text-xs\">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button
                    size=\"sm\"
                    onClick={(e) => {
                      e.stopPropagation();
                      onConnect(connection.id);
                    }}
                    disabled={connection.isConnected || connection.isPending}
                    className=\"bg-hive-gold text-hive-obsidian hover:bg-hive-champagne\"
                  >
                    {connection.isConnected ? 'Connected' : connection.isPending ? 'Pending' : 'Connect'}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Content Recommendations Component
function ContentRecommendations({ content, onLike, onBookmark, formatTimeAgo, showTitle }: {
  content: ContentRecommendation[];
  onLike: (contentId: string) => void;
  onBookmark: (contentId: string) => void;
  formatTimeAgo: (timestamp: string) => string;
  showTitle: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        {showTitle && (
          <CardHeader>
            <CardTitle className=\"flex items-center space-x-2\">
              <BookOpen className=\"h-5 w-5 text-orange-400\" />
              <span>Recommended Content</span>
            </CardTitle>
          </CardHeader>
        )}
        <CardContent className={showTitle ? '' : 'pt-6'}>
          <div className=\"space-y-4\">
            {content.slice(0, 3).map((item) => (
              <motion.div
                key={item.id}
                className=\"p-4 rounded-lg bg-hive-background-overlay border border-hive-border-default hover:border-hive-gold/30 transition-all cursor-pointer group\"
                variants={cardVariants}
                whileHover=\"hover\"
              >
                <div className=\"flex items-start space-x-3\">
                  <Avatar className=\"w-8 h-8\">
                    <AvatarImage src={item.authorAvatar} />
                    <AvatarFallback className=\"text-xs\">
                      {item.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className=\"flex-1 min-w-0\">
                    <div className=\"flex items-start justify-between mb-2\">
                      <div>
                        <h4 className=\"font-medium text-white group-hover:text-hive-gold transition-colors line-clamp-1\">
                          {item.title}
                        </h4>
                        <p className=\"text-xs text-hive-text-mutedLight\">
                          by {item.author} {item.spaceName && ` in $;
{
    item.spaceName;
}
`} • {formatTimeAgo(item.timestamp)}
                        </p>
                      </div>
                      <Badge variant=\"outline\" className=\"text-xs ml-2 capitalize\">
                        {item.type}
                      </Badge>
                    </div>
                    
                    <p className=\"text-sm text-hive-text-mutedLight mb-3 line-clamp-2\">
                      {item.preview}
                    </p>
                    
                    <div className=\"flex items-center justify-between\">
                      <div className=\"flex items-center space-x-4 text-xs text-hive-text-mutedLight\">
                        <span className=\"flex items-center\">
                          <Heart className=\"h-3 w-3 mr-1\" />
                          {item.engagement.likes}
                        </span>
                        <span className=\"flex items-center\">
                          <MessageCircle className=\"h-3 w-3 mr-1\" />
                          {item.engagement.comments}
                        </span>
                        <span className=\"flex items-center\">
                          <Share2 className=\"h-3 w-3 mr-1\" />
                          {item.engagement.shares}
                        </span>
                      </div>
                      
                      <div className=\"flex items-center space-x-2\">
                        <Button
                          variant=\"ghost\"
                          size=\"sm\"
                          onClick={(e) => {
                            e.stopPropagation();
                            onLike(item.id);
                          }}
                          className={`;
h - 6;
w - 6;
p - 0;
$;
{
    item.isLiked ? 'text-pink-400' : '';
}
`}
                        >
                          <Heart className={`;
h - 3;
w - 3;
$;
{
    item.isLiked ? 'fill-current' : '';
}
`} />
                        </Button>
                        <Button
                          variant=\"ghost\"
                          size=\"sm\"
                          onClick={(e) => {
                            e.stopPropagation();
                            onBookmark(item.id);
                          }}
                          className={`;
h - 6;
w - 6;
p - 0;
$;
{
    item.isBookmarked ? 'text-hive-gold' : '';
}
`}
                        >
                          <Plus className={`;
h - 3;
w - 3;
$;
{
    item.isBookmarked ? 'fill-current' : '';
}
`} />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    {item.tags.length > 0 && (
                      <div className=\"mt-2 flex flex-wrap gap-1\">
                        {item.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant=\"outline\" className=\"text-xs\">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default RecommendationEngine;;
//# sourceMappingURL=recommendation-engine.js.map