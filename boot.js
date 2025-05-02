const chalk = require('chalk');
const figlet = require('figlet');
const gradient = require('gradient-string');
const ora = require('ora');

// Cyberpunk color gradients
const cyberpunkGradient = gradient(['#ff4b4b', '#ff9f1c', '#2de2e6', '#6b1fff']);
const matrixGradient = gradient(['#00ff00', '#00cc00', '#009900', '#006600']);

// Boot sequence ASCII art
const bootText = `
┌─────────────────────────────────────────────────────┐
│                                                     │
│   NEXUS-9000 INDUSTRIAL CONTROL SYSTEM              │
│   SECURE BOOT SEQUENCE INITIALIZED                  │
│                                                     │
│   > Loading Kernel..................COMPLETE        │
│   > Initializing Neural Network......COMPLETE       │
│   > Enabling Quantum Encryption......COMPLETE       │
│   > Syncing Mainframe................COMPLETE       │
│   > Launching Interface..............IN PROGRESS    │
│                                                     │
└─────────────────────────────────────────────────────┘
`;

// Cyberpunk ASCII headers
const securityText = figlet.textSync('SECURITY', { font: 'Standard' });
const accessText = figlet.textSync('ACCESS GRANTED', { font: 'Standard' });

// Boot sequence function
function bootSequence() {
  return new Promise((resolve) => {
    console.clear();
    
    // Matrix-style rain effect
    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const matrixLines = 10;
    
    console.log('\n');
    
    // Display random matrix characters
    for (let i = 0; i < matrixLines; i++) {
      let line = '';
      for (let j = 0; j < 70; j++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        line += matrixGradient(char);
      }
      console.log(line);
      
      // Add a short delay for effect
      for (let k = 0; k < 1000000; k++) {}
    }
    
    console.log('\n');
    console.log(cyberpunkGradient(securityText));
    console.log('\n');
    
    // Simulate scanning
    const scanner = ora({
      text: 'Scanning for security vulnerabilities...',
      color: 'yellow'
    }).start();
    
    setTimeout(() => {
      scanner.succeed('Security scan complete. System integrity verified.');
      
      console.log('\n');
      console.log(chalk.cyan(bootText));
      console.log('\n');
      
      const bootSpinner = ora({
        text: 'Establishing neural link with factory systems...',
        color: 'cyan'
      }).start();
      
      setTimeout(() => {
        bootSpinner.succeed('Neural link established. Factory systems online.');
        console.log('\n');
        console.log(cyberpunkGradient(accessText));
        console.log('\n');
        
        setTimeout(() => {
          resolve();
        }, 1000);
      }, 2000);
    }, 2000);
  });
}

module.exports = bootSequence; 