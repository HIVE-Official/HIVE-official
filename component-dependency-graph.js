#!/usr/bin/env node

/**
 * HIVE Component Dependency Graph Generator
 *
 * Creates visual dependency graphs showing:
 * 1. Component import relationships
 * 2. Usage patterns across apps
 * 3. Migration impact analysis
 */

const fs = require('fs');
const path = require('path');

class ComponentDependencyGraph {
  constructor(reportData) {
    this.components = new Map();
    this.dependencies = new Map();
    this.report = reportData;

    this.buildGraph();
  }

  buildGraph() {
    // Build component nodes
    Object.values(this.report.componentsByDirectory).flat().forEach(comp => {
      this.components.set(comp.name, {
        ...comp,
        dependents: new Set(),
        dependencies: new Set(),
        usageCount: this.getComponentUsage(comp.name)
      });
    });

    // Build dependency edges from usage data
    this.report.usageStatistics.forEach(usage => {
      usage.files.forEach(file => {
        // Extract component dependencies from file path patterns
        this.addDependencyEdge(usage.component, file);
      });
    });
  }

  getComponentUsage(componentName) {
    const usage = this.report.usageStatistics.find(u => u.component === componentName);
    return usage ? usage.usageCount : 0;
  }

  addDependencyEdge(component, filePath) {
    // Determine the consuming context (app, feature, etc.)
    let consumer = 'unknown';

    if (filePath.includes('apps/web')) consumer = 'web-app';
    else if (filePath.includes('apps/admin')) consumer = 'admin-app';
    else if (filePath.includes('packages/ui')) consumer = 'ui-package';

    if (!this.dependencies.has(component)) {
      this.dependencies.set(component, new Set());
    }

    this.dependencies.get(component).add(consumer);
  }

  generateMermaidGraph() {
    const lines = ['graph TD'];

    // Add component nodes with styling based on usage
    this.components.forEach((comp, name) => {
      const style = this.getNodeStyle(comp);
      const label = `${name}\\n(${comp.usageCount} uses)`;
      lines.push(`    ${this.sanitizeId(name)}["${label}"]:::${style}`);
    });

    // Add dependency edges
    this.dependencies.forEach((consumers, component) => {
      consumers.forEach(consumer => {
        const componentId = this.sanitizeId(component);
        const consumerId = this.sanitizeId(consumer);
        lines.push(`    ${consumerId} --> ${componentId}`);
      });
    });

    // Add styling classes
    lines.push('');
    lines.push('    classDef criticalComponent fill:#ff6b6b,stroke:#d63031,stroke-width:3px,color:#fff');
    lines.push('    classDef highUsage fill:#00b894,stroke:#00a085,stroke-width:2px,color:#fff');
    lines.push('    classDef mediumUsage fill:#fdcb6e,stroke:#e17055,stroke-width:2px');
    lines.push('    classDef lowUsage fill:#74b9ff,stroke:#0984e3,stroke-width:1px');
    lines.push('    classDef unused fill:#ddd,stroke:#999,stroke-width:1px');

    return lines.join('\\n');
  }

  getNodeStyle(comp) {
    if (comp.usageCount >= 50) return 'criticalComponent';
    if (comp.usageCount >= 20) return 'highUsage';
    if (comp.usageCount >= 5) return 'mediumUsage';
    if (comp.usageCount >= 1) return 'lowUsage';
    return 'unused';
  }

  sanitizeId(str) {
    return str.replace(/[^a-zA-Z0-9]/g, '_');
  }

  generateDotGraph() {
    const lines = ['digraph ComponentDependencies {'];
    lines.push('  rankdir=TD;');
    lines.push('  node [shape=box, style=rounded];');

    // Define node styles
    lines.push('  node [style="rounded,filled", fontname="Arial"];');

    // Add component nodes
    this.components.forEach((comp, name) => {
      const color = this.getDotColor(comp);
      const label = `${name}\\n${comp.usageCount} uses`;
      lines.push(`  "${name}" [label="${label}", fillcolor="${color}"];`);
    });

    // Add dependency edges
    this.dependencies.forEach((consumers, component) => {
      consumers.forEach(consumer => {
        lines.push(`  "${consumer}" -> "${component}";`);
      });
    });

    lines.push('}');
    return lines.join('\\n');
  }

  getDotColor(comp) {
    if (comp.usageCount >= 50) return '#ff6b6b';
    if (comp.usageCount >= 20) return '#00b894';
    if (comp.usageCount >= 5) return '#fdcb6e';
    if (comp.usageCount >= 1) return '#74b9ff';
    return '#ddd';
  }

  generateNetworkData() {
    const nodes = [];
    const edges = [];

    // Generate nodes
    this.components.forEach((comp, name) => {
      nodes.push({
        id: name,
        label: name,
        size: Math.max(10, Math.min(50, comp.usageCount * 2)),
        color: this.getNetworkColor(comp),
        title: `${name}\\nUsage: ${comp.usageCount}\\nDirectory: ${comp.directory}\\nSize: ${comp.size} bytes`,
        group: comp.directory
      });
    });

    // Generate edges
    this.dependencies.forEach((consumers, component) => {
      consumers.forEach(consumer => {
        edges.push({
          from: consumer,
          to: component,
          width: 2,
          arrows: 'to'
        });
      });
    });

    return { nodes, edges };
  }

  getNetworkColor(comp) {
    if (comp.usageCount >= 50) return '#ff6b6b';
    if (comp.usageCount >= 20) return '#00b894';
    if (comp.usageCount >= 5) return '#fdcb6e';
    if (comp.usageCount >= 1) return '#74b9ff';
    return '#ddd';
  }

  generateHTML() {
    const networkData = this.generateNetworkData();

    return `
<!DOCTYPE html>
<html>
<head>
    <title>HIVE Component Dependency Graph</title>
    <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        #graph { width: 100%; height: 600px; border: 1px solid #ccc; }
        .controls { margin-bottom: 20px; }
        .legend { margin-top: 20px; display: flex; gap: 20px; flex-wrap: wrap; }
        .legend-item { display: flex; align-items: center; gap: 5px; }
        .legend-color { width: 20px; height: 20px; border-radius: 50%; }
        .stats { margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .stat-card { padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
    </style>
</head>
<body>
    <h1>HIVE Component Dependency Graph</h1>
    <p>Interactive visualization of component relationships and usage patterns</p>

    <div class="controls">
        <button onclick="fitNetwork()">Fit to Screen</button>
        <button onclick="togglePhysics()">Toggle Physics</button>
        <select onchange="filterByUsage(this.value)">
            <option value="all">All Components</option>
            <option value="high">High Usage (20+)</option>
            <option value="medium">Medium Usage (5-19)</option>
            <option value="low">Low Usage (1-4)</option>
            <option value="unused">Unused (0)</option>
        </select>
    </div>

    <div id="graph"></div>

    <div class="legend">
        <div class="legend-item">
            <div class="legend-color" style="background-color: #ff6b6b;"></div>
            <span>Critical (50+ uses)</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: #00b894;"></div>
            <span>High Usage (20+ uses)</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: #fdcb6e;"></div>
            <span>Medium Usage (5+ uses)</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: #74b9ff;"></div>
            <span>Low Usage (1+ uses)</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: #ddd;"></div>
            <span>Unused (0 uses)</span>
        </div>
    </div>

    <div class="stats">
        <div class="stat-card">
            <h3>Total Components</h3>
            <p>${networkData.nodes.length}</p>
        </div>
        <div class="stat-card">
            <h3>Used Components</h3>
            <p>${networkData.nodes.filter(n => n.title.includes('Usage: ') && !n.title.includes('Usage: 0')).length}</p>
        </div>
        <div class="stat-card">
            <h3>Unused Components</h3>
            <p>${networkData.nodes.filter(n => n.title.includes('Usage: 0')).length}</p>
        </div>
        <div class="stat-card">
            <h3>Critical Components</h3>
            <p>${networkData.nodes.filter(n => n.color === '#ff6b6b').length}</p>
        </div>
    </div>

    <script>
        const nodes = new vis.DataSet(${JSON.stringify(networkData.nodes)});
        const edges = new vis.DataSet(${JSON.stringify(networkData.edges)});
        const data = { nodes, edges };

        const options = {
            physics: {
                enabled: true,
                stabilization: { iterations: 100 }
            },
            layout: {
                improvedLayout: true
            },
            interaction: {
                hover: true,
                tooltipDelay: 200
            },
            nodes: {
                font: { size: 12 },
                borderWidth: 2
            },
            edges: {
                color: { color: '#848484' },
                smooth: { type: 'continuous' }
            }
        };

        const container = document.getElementById('graph');
        const network = new vis.Network(container, data, options);

        let physicsEnabled = true;

        function fitNetwork() {
            network.fit();
        }

        function togglePhysics() {
            physicsEnabled = !physicsEnabled;
            network.setOptions({ physics: { enabled: physicsEnabled } });
        }

        function filterByUsage(filter) {
            let filteredNodes;

            switch(filter) {
                case 'high':
                    filteredNodes = ${JSON.stringify(networkData.nodes)}.filter(n => n.color === '#ff6b6b' || n.color === '#00b894');
                    break;
                case 'medium':
                    filteredNodes = ${JSON.stringify(networkData.nodes)}.filter(n => n.color === '#fdcb6e');
                    break;
                case 'low':
                    filteredNodes = ${JSON.stringify(networkData.nodes)}.filter(n => n.color === '#74b9ff');
                    break;
                case 'unused':
                    filteredNodes = ${JSON.stringify(networkData.nodes)}.filter(n => n.color === '#ddd');
                    break;
                default:
                    filteredNodes = ${JSON.stringify(networkData.nodes)};
            }

            nodes.clear();
            nodes.add(filteredNodes);
        }

        // Node click handler
        network.on('click', function(params) {
            if (params.nodes.length > 0) {
                const nodeId = params.nodes[0];
                const node = nodes.get(nodeId);
                alert('Component: ' + node.label + '\\n' + node.title.replace(/\\\\n/g, '\\n'));
            }
        });
    </script>
</body>
</html>`;
  }

  saveGraphs(outputDir) {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save Mermaid graph
    fs.writeFileSync(
      path.join(outputDir, 'component-dependencies.mermaid'),
      this.generateMermaidGraph()
    );

    // Save DOT graph
    fs.writeFileSync(
      path.join(outputDir, 'component-dependencies.dot'),
      this.generateDotGraph()
    );

    // Save HTML visualization
    fs.writeFileSync(
      path.join(outputDir, 'component-dependencies.html'),
      this.generateHTML()
    );

    // Save network data as JSON
    fs.writeFileSync(
      path.join(outputDir, 'component-network-data.json'),
      JSON.stringify(this.generateNetworkData(), null, 2)
    );
  }
}

// Run if called directly
if (require.main === module) {
  try {
    const reportPath = path.join(process.cwd(), 'component-analysis-report.json');
    const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

    const graph = new ComponentDependencyGraph(reportData);

    const outputDir = path.join(process.cwd(), 'component-graphs');
    graph.saveGraphs(outputDir);

    console.log('✅ Component dependency graphs generated!');
    console.log(`📁 Output directory: ${outputDir}`);
    console.log('📊 Generated files:');
    console.log('  - component-dependencies.mermaid (Mermaid diagram)');
    console.log('  - component-dependencies.dot (Graphviz DOT format)');
    console.log('  - component-dependencies.html (Interactive visualization)');
    console.log('  - component-network-data.json (Raw network data)');
    console.log('');
    console.log('🌐 Open component-dependencies.html in your browser for interactive exploration!');

  } catch (error) {
    console.error('❌ Failed to generate dependency graphs:', error.message);
    process.exit(1);
  }
}

module.exports = ComponentDependencyGraph;