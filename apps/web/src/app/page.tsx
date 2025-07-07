export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0A0A0A',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: 'bold', 
          marginBottom: '2rem',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          HIVE
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#9CA3AF', 
          marginBottom: '2rem' 
        }}>
          Campus Tools · Launching July 31st, 2025
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          <button 
            style={{
              padding: '12px 24px',
              backgroundColor: '#374151',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'not-allowed',
              opacity: 0.5
            }}
            disabled
          >
            🔒 Locked
          </button>
          <button 
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            See What's Coming
          </button>
        </div>
        <div style={{ 
          fontSize: '0.875rem', 
          color: '#6B7280' 
        }}>
          🛠️ Early access begins throughout July
        </div>
      </div>
    </div>
  );
}