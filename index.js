#!/usr/bin/env node

const blessed = require('blessed');
const contrib = require('blessed-contrib');
const chalk = require('chalk');
const figlet = require('figlet');
const gradient = require('gradient-string');
const Table = require('cli-table3');
const ora = require('ora');
const fetch = require('node-fetch');
const bootSequence = require('./boot');

// Start with boot sequence, then launch the main app
async function startApp() {
  await bootSequence();
  launchMonitoringSystem();
}

function launchMonitoringSystem() {
  // Create a screen object
  const screen = blessed.screen({
    smartCSR: true,
    title: 'NEXUS-9000 FACTORY MONITORING SYSTEM',
    cursor: {
      artificial: true,
      shape: 'line',
      blink: true,
      color: 'red'
    }
  });

  // ASCII Art title
  const title = figlet.textSync('NEXUS-9000', {
    font: 'Cybermedium',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  });

  // Create layout grid
  const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

  // Header with ASCII art
  const header = grid.set(0, 0, 2, 12, blessed.box, {
    content: gradient.vice(title) + '\n' + chalk.cyan('⚡ FACTORY MONITORING SYSTEM v1.0 ⚡'),
    tags: true,
    style: {
      fg: 'cyan',
      border: {
        fg: 'red'
      }
    }
  });

  // Main status display
  const statusBox = grid.set(2, 0, 4, 6, contrib.lcd, {
    label: 'SYSTEM STATUS',
    segmentWidth: 0.06,
    segmentInterval: 0.11,
    strokeWidth: 0.11,
    elements: 5,
    display: 'OPERATIONAL',
    elementSpacing: 4,
    elementPadding: 2,
    color: 'green'
  });

  // Line chart for temperature
  const tempLineChart = grid.set(2, 6, 4, 6, contrib.line, {
    style: {
      line: 'yellow',
      text: 'green',
      baseline: 'cyan'
    },
    xLabelPadding: 3,
    xPadding: 5,
    label: 'TEMPERATURE FLUCTUATION',
    showLegend: true,
    legend: { width: 12 }
  });

  // Bar chart for production metrics
  const productionChart = grid.set(6, 0, 4, 6, contrib.bar, {
    label: 'PRODUCTION METRICS',
    barWidth: 4,
    barSpacing: 6,
    xOffset: 0,
    maxHeight: 9,
    barBgColor: 'red',
    barFgColor: 'blue',
    labelColor: 'white',
    style: {
      fg: 'cyan'
    }
  });

  // Log panel
  const logBox = grid.set(6, 6, 4, 6, blessed.log, {
    label: 'SYSTEM LOGS',
    tags: true,
    scrollable: true,
    alwaysScroll: true,
    scrollbar: {
      ch: '█',
      style: {
        bg: 'blue'
      }
    },
    style: {
      fg: 'green',
      border: {
        fg: 'cyan'
      }
    }
  });

  // Table for resource monitoring
  const resourceTable = grid.set(10, 0, 2, 12, contrib.table, {
    keys: true,
    fg: 'white',
    selectedFg: 'white',
    selectedBg: 'blue',
    interactive: true,
    label: 'RESOURCE ALLOCATION',
    width: '100%',
    height: '30%',
    border: { type: "line", fg: "cyan" },
    columnSpacing: 10,
    columnWidth: [16, 12, 12, 12, 20]
  });

  // Sample data
  const tempData = {
    title: 'TEMP (°C)',
    x: Array(24).fill(0).map((_, i) => i.toString()),
    y: Array(24).fill(0).map(() => Math.floor(Math.random() * 15) + 70)
  };

  const resourceData = {
    headers: ['SECTOR', 'CPU LOAD', 'MEMORY', 'NETWORK', 'STATUS'],
    data: [
      ['Manufacturing', '78%', '2.1 TB', '86 Mbps', chalk.green('OPTIMAL')],
      ['Assembly Line', '92%', '1.7 TB', '124 Mbps', chalk.yellow('WARNING')],
      ['Robotics', '45%', '3.2 TB', '67 Mbps', chalk.green('OPTIMAL')],
      ['Quality Control', '63%', '0.9 TB', '32 Mbps', chalk.green('OPTIMAL')],
      ['Energy Core', '87%', '4.5 TB', '93 Mbps', chalk.red('CRITICAL')]
    ]
  };

  const productionData = {
    titles: ['Sector A', 'Sector B', 'Sector C', 'Sector D'],
    data: [85, 76, 93, 64]
  };

  // Update data
  tempLineChart.setData(tempData);
  resourceTable.setData({
    headers: resourceData.headers,
    data: resourceData.data
  });
  productionChart.setData({
    titles: productionData.titles,
    data: productionData.data
  });

  // Log messages with cyberpunk flair
  const logMessages = [
    '{cyan-fg}[SYS] Boot sequence initialized... Connecting to mainframe{/}',
    '{yellow-fg}[ALERT] Security protocols at 87% efficiency{/}',
    '{green-fg}[INFO] Neural network synchronization complete{/}',
    '{red-fg}[ERROR] Sector E-7 nanobots offline - deploying maintenance drones{/}',
    '{blue-fg}[DATA] Resource optimization algorithms running at optimal capacity{/}',
    '{magenta-fg}[COMM] Receiving encrypted transmission from headquarters{/}',
    '{cyan-fg}[SYS] Quantum encryption protocols activated{/}',
    '{yellow-fg}[ALERT] Unusual energy signature detected in Sector C{/}',
    '{green-fg}[INFO] Production efficiency increased by 12.7%{/}',
    '{cyan-fg}[SYS] Biometric security scans running...{/}'
  ];

  // Add rare cyberpunk glitch events
  const glitchEvents = [
    () => {
      logBox.log('{red-fg}[CRITICAL] ▓▒░SYSTEM BREACH DETECTED░▒▓{/}');
      screen.render();
      setTimeout(() => {
        statusBox.setDisplay('COMPROMISED');
        statusBox.setOptions({ color: 'red' });
        screen.render();
        
        setTimeout(() => {
          statusBox.setDisplay('RESTORED');
          statusBox.setOptions({ color: 'green' });
          logBox.log('{green-fg}[SYS] Security protocol activated - breach contained{/}');
          screen.render();
        }, 3000);
      }, 500);
    },
    
    () => {
      // Screen glitch effect
      const originalContent = header.getContent();
      
      // Corrupt display
      header.setContent(chalk.red('▓▒░ERROR░▒▓ DISPLAY CORRUPTION ▓▒░ERROR░▒▓'));
      screen.render();
      
      // Restore after delay
      setTimeout(() => {
        header.setContent(originalContent);
        logBox.log('{yellow-fg}[ALERT] Display corruption detected and fixed{/}');
        screen.render();
      }, 1500);
    }
  ];

  // Function to simulate real-time updates
  function updateData() {
    // Update temperature data
    tempData.y.shift();
    tempData.y.push(Math.floor(Math.random() * 15) + 70);
    tempLineChart.setData(tempData);

    // Random fluctuations in production
    productionData.data = productionData.data.map(val => {
      const change = Math.floor(Math.random() * 10) - 5;
      return Math.max(50, Math.min(100, val + change));
    });
    productionChart.setData({
      titles: productionData.titles,
      data: productionData.data
    });

    // Update status randomly
    const statuses = ['OPERATIONAL', 'OPTIMAL', 'SCANNING', 'UPDATING', 'SYNCING'];
    statusBox.setDisplay(statuses[Math.floor(Math.random() * statuses.length)]);
    statusBox.setOptions({
      color: Math.random() > 0.8 ? 'red' : 'green'
    });

    // Update resource table randomly
    resourceData.data = resourceData.data.map(row => {
      const cpuLoad = Math.floor(Math.random() * 30) + 70;
      const memory = (Math.random() * 5).toFixed(1) + ' TB';
      const network = Math.floor(Math.random() * 100) + 30 + ' Mbps';
      const status = cpuLoad > 90 ? chalk.red('CRITICAL') : 
                    cpuLoad > 80 ? chalk.yellow('WARNING') : 
                    chalk.green('OPTIMAL');
      return [row[0], cpuLoad + '%', memory, network, status];
    });
    
    resourceTable.setData({
      headers: resourceData.headers,
      data: resourceData.data
    });

    // Add random log message
    if (Math.random() > 0.5) {
      const randomMessage = logMessages[Math.floor(Math.random() * logMessages.length)];
      logBox.log(randomMessage);
    }

    // Trigger rare glitch events (1% chance)
    if (Math.random() < 0.01) {
      const randomGlitch = glitchEvents[Math.floor(Math.random() * glitchEvents.length)];
      randomGlitch();
    }

    // Render screen
    screen.render();
  }

  // Start the data update interval
  const updateInterval = setInterval(updateData, 1000);

  // Initial logs
  logBox.log('{cyan-fg}[SYS] Initializing NEXUS-9000 FACTORY MONITORING SYSTEM...{/}');
  logBox.log('{green-fg}[INFO] All systems online. Beginning data collection...{/}');

  // Quit on Escape, q, or Ctrl+C
  screen.key(['escape', 'q', 'C-c'], function() {
    clearInterval(updateInterval);
    return process.exit(0);
  });

  // Render the screen
  screen.render();
}

// Start the application
startApp(); 