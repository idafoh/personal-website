#!/bin/bash

BRANCH="$(git rev-parse --abbrev-ref HEAD)"

if [[ "$BRANCH" == "main" || "$VERCEL_ENV" == "production" ]]; then
  # Proceed with the build
  # echo "✅ - Build can proceed"
  exit 1

else
  # Don't build
  # echo "🛑 - Build cancelled"
  exit 0
fi
