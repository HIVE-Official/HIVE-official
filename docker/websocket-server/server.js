const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const redis = require('redis');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

// Configuration
const PORT = process.env.PORT || 3001;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Create Express app for health checks
const app = express();
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    connections: wss.clients.size
  });
});

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ 
  server,
  verifyClient: (info) => {
    // Extract token from query string or headers
    const token = info.req.url?.split('token=')[1] || info.req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      console.log('WebSocket connection rejected: No token provided');
      return false;
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      info.req.user = decoded;
      return true;
    } catch (error) {
      console.log('WebSocket connection rejected: Invalid token', error.message);
      return false;
    }
  }
});

// Redis client for pub/sub
const redisClient = redis.createClient({ url: REDIS_URL });
const redisSubscriber = redis.createClient({ url: REDIS_URL });

// Connection tracking
const connections = new Map(); // userId -> Set of WebSocket connections
const channels = new Map(); // channelId -> Set of user IDs

// Connect to Redis
async function connectRedis() {
  try {
    await redisClient.connect();
    await redisSubscriber.connect();
    console.log('Connected to Redis');
    
    // Subscribe to all channels
    await redisSubscriber.pSubscribe('hive:*', (message, channel) => {
      handleRedisMessage(channel, message);
    });
    
  } catch (error) {
    console.error('Redis connection error:', error);
    process.exit(1);
  }
}

// Handle Redis pub/sub messages
function handleRedisMessage(channel, message) {
  try {
    const data = JSON.parse(message);
    const channelType = channel.split(':')[1]; // e.g., 'space', 'user', 'global'
    const targetId = channel.split(':')[2]; // e.g., spaceId, userId
    
    // Broadcast to relevant connections
    broadcastToChannel(channel, data);
    
  } catch (error) {
    console.error('Error handling Redis message:', error);
  }
}

// Broadcast message to all connections in a channel
function broadcastToChannel(channel, data) {
  const message = JSON.stringify({
    type: 'broadcast',
    channel,
    data,
    timestamp: new Date().toISOString()
  });

  // Find users subscribed to this channel
  const subscribedUsers = channels.get(channel) || new Set();
  
  subscribedUsers.forEach(userId => {
    const userConnections = connections.get(userId) || new Set();
    userConnections.forEach(ws => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    });
  });
}

// WebSocket connection handler
wss.on('connection', (ws, req) => {
  const user = req.user;
  const userId = user.uid || user.id;
  
  console.log(`WebSocket connected: ${userId}`);

  // Track connection
  if (!connections.has(userId)) {
    connections.set(userId, new Set());
  }
  connections.get(userId).add(ws);

  // Send connection acknowledgment
  ws.send(JSON.stringify({
    type: 'connected',
    userId,
    timestamp: new Date().toISOString()
  }));

  // Message handler
  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data.toString());
      await handleWebSocketMessage(ws, userId, message);
    } catch (error) {
      console.error('Error handling WebSocket message:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid message format',
        timestamp: new Date().toISOString()
      }));
    }
  });

  // Connection close handler
  ws.on('close', () => {
    console.log(`WebSocket disconnected: ${userId}`);
    
    // Remove connection
    const userConnections = connections.get(userId);
    if (userConnections) {
      userConnections.delete(ws);
      if (userConnections.size === 0) {
        connections.delete(userId);
      }
    }

    // Remove from channels
    channels.forEach((users, channel) => {
      users.delete(userId);
      if (users.size === 0) {
        channels.delete(channel);
      }
    });
  });

  // Error handler
  ws.on('error', (error) => {
    console.error(`WebSocket error for ${userId}:`, error);
  });

  // Ping/pong for connection health
  ws.isAlive = true;
  ws.on('pong', () => {
    ws.isAlive = true;
  });
});

// Handle WebSocket messages
async function handleWebSocketMessage(ws, userId, message) {
  const { type, data } = message;

  switch (type) {
    case 'subscribe':
      await handleSubscribe(ws, userId, data);
      break;
      
    case 'unsubscribe':
      await handleUnsubscribe(ws, userId, data);
      break;
      
    case 'ping':
      ws.send(JSON.stringify({ type: 'pong', timestamp: new Date().toISOString() }));
      break;
      
    case 'broadcast':
      await handleBroadcast(userId, data);
      break;
      
    default:
      ws.send(JSON.stringify({
        type: 'error',
        message: `Unknown message type: ${type}`,
        timestamp: new Date().toISOString()
      }));
  }
}

// Handle channel subscription
async function handleSubscribe(ws, userId, data) {
  const { channels: channelIds } = data;
  
  if (!Array.isArray(channelIds)) {
    ws.send(JSON.stringify({
      type: 'error',
      message: 'Channels must be an array',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  for (const channelId of channelIds) {
    // Validate channel access (implement your authorization logic here)
    if (await canAccessChannel(userId, channelId)) {
      if (!channels.has(channelId)) {
        channels.set(channelId, new Set());
      }
      channels.get(channelId).add(userId);
    }
  }

  ws.send(JSON.stringify({
    type: 'subscribed',
    channels: channelIds,
    timestamp: new Date().toISOString()
  }));
}

// Handle channel unsubscription
async function handleUnsubscribe(ws, userId, data) {
  const { channels: channelIds } = data;
  
  if (!Array.isArray(channelIds)) {
    ws.send(JSON.stringify({
      type: 'error',
      message: 'Channels must be an array',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  for (const channelId of channelIds) {
    const channelUsers = channels.get(channelId);
    if (channelUsers) {
      channelUsers.delete(userId);
      if (channelUsers.size === 0) {
        channels.delete(channelId);
      }
    }
  }

  ws.send(JSON.stringify({
    type: 'unsubscribed',
    channels: channelIds,
    timestamp: new Date().toISOString()
  }));
}

// Handle broadcast message
async function handleBroadcast(userId, data) {
  const { channel, message } = data;
  
  // Validate that user can broadcast to this channel
  if (await canBroadcastToChannel(userId, channel)) {
    const broadcastData = {
      senderId: userId,
      message,
      timestamp: new Date().toISOString()
    };
    
    // Publish to Redis for distribution
    await redisClient.publish(channel, JSON.stringify(broadcastData));
  }
}

// Authorization functions (implement based on your business logic)
async function canAccessChannel(userId, channelId) {
  // For now, allow access to user's own channel and space channels they're members of
  const [type, id] = channelId.split(':');
  
  if (type === 'user' && id === userId) {
    return true;
  }
  
  if (type === 'space') {
    // In a real implementation, check if user is a member of the space
    // For now, allow all space access
    return true;
  }
  
  if (type === 'global') {
    // Allow global channel access for all authenticated users
    return true;
  }
  
  return false;
}

async function canBroadcastToChannel(userId, channelId) {
  // Similar to canAccessChannel but with stricter rules for broadcasting
  return await canAccessChannel(userId, channelId);
}

// Heartbeat to detect broken connections
const heartbeat = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      return ws.terminate();
    }
    
    ws.isAlive = false;
    ws.ping();
  });
}, 30000); // 30 seconds

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully');
  clearInterval(heartbeat);
  
  // Close all WebSocket connections
  wss.clients.forEach((ws) => {
    ws.close(1000, 'Server shutting down');
  });
  
  // Close Redis connections
  await redisClient.quit();
  await redisSubscriber.quit();
  
  // Close HTTP server
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Start server
connectRedis().then(() => {
  server.listen(PORT, () => {
    console.log(`WebSocket server running on port ${PORT}`);
    console.log(`Health check available at http://localhost:${PORT}/health`);
  });
}).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

// Export for testing
module.exports = { server, wss };