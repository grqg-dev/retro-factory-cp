#!/bin/bash

# ANSI colors for cyberpunk styling
CYAN='\033[0;36m'
GREEN='\033[0;32m'
MAGENTA='\033[0;35m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Cyberpunk ASCII art
echo -e "${CYAN}"
echo -e "███╗   ██╗███████╗██╗  ██╗██╗   ██╗███████╗    ██████╗  ██████╗  ██████╗  ██████╗ "
echo -e "████╗  ██║██╔════╝╚██╗██╔╝██║   ██║██╔════╝    ╚════██╗██╔═████╗██╔═████╗██╔═████╗"
echo -e "██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║███████╗     █████╔╝██║██╔██║██║██╔██║██║██╔██║"
echo -e "██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║╚════██║    ██╔═══╝ ████╔╝██║████╔╝██║████╔╝██║"
echo -e "██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝███████║    ███████╗╚██████╔╝╚██████╔╝╚██████╔╝"
echo -e "╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝    ╚══════╝ ╚═════╝  ╚═════╝  ╚═════╝ "
echo -e "${NC}"
echo -e "${YELLOW}FACTORY MONITORING SYSTEM SETUP${NC}\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}[ERROR] Node.js is not installed!${NC}"
    echo -e "${YELLOW}Please install Node.js and try again.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo -e "${YELLOW}[WARNING] Node.js version $NODE_VERSION detected.${NC}"
    echo -e "${YELLOW}This application works best with Node.js 14 or newer.${NC}"
    echo -e "${YELLOW}Continue anyway? (y/n)${NC}"
    read -r answer
    if [[ "$answer" != "y" ]]; then
        echo -e "${MAGENTA}Exiting setup...${NC}"
        exit 0
    fi
fi

# Install dependencies
echo -e "${CYAN}[SYSTEM] Installing neural dependencies...${NC}"
npm install

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo -e "${RED}[ERROR] Failed to install dependencies!${NC}"
    exit 1
fi

echo -e "\n${GREEN}[SUCCESS] Dependencies installed successfully.${NC}"
echo -e "${CYAN}[SYSTEM] Neural links established with core libraries.${NC}\n"

# Ask to run the application
echo -e "${YELLOW}Do you want to run the application now? (y/n)${NC}"
read -r run_app

if [[ "$run_app" == "y" ]]; then
    echo -e "${CYAN}[SYSTEM] Initializing factory monitoring systems...${NC}\n"
    echo -e "${MAGENTA}Press Ctrl+C or 'q' to exit the application.${NC}\n"
    sleep 2
    node index.js
else
    echo -e "${CYAN}[SYSTEM] Setup complete.${NC}"
    echo -e "${YELLOW}Run the application later with:${NC} npm start ${YELLOW}or${NC} node index.js"
fi 