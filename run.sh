#!/usr/bin/env bash
# Starts the Happy Friendship Day dev server.
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Starting dev server — open the URL it prints below."
exec npm run dev
