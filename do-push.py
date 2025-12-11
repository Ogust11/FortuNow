#!/usr/bin/env python3
import subprocess
import os

os.chdir('/workspaces/FortuNow')

print("🚀 FortuNow - Push automatique sur GitHub")
print("=" * 50)
print()

try:
    # Stage all changes
    print("1️⃣  Staging all files...")
    subprocess.run(['git', 'add', '.'], check=True)
    print("✅ Files staged")
    print()
    
    # Create commit
    print("2️⃣  Creating commit...")
    commit_msg = """fix: Configure Vercel to use fortunow subdirectory with correct build settings

- Added rootDirectory configuration in vercel.json
- Set buildCommand to properly install and build from fortunow/
- Set outputDirectory to fortunow/.next
- Set installCommand to run npm install in fortunow/
- This fixes the Next.js version detection error during Vercel build"""
    
    subprocess.run(['git', 'commit', '-m', commit_msg], check=True)
    print("✅ Commit created")
    print()
    
    # Push to GitHub
    print("3️⃣  Pushing to GitHub...")
    subprocess.run(['git', 'push', 'origin', 'main'], check=True)
    print("✅ Push successful!")
    print()
    
    print("=" * 50)
    print("🎉 Ready for Vercel!")
    print("=" * 50)
    print()
    print("Next steps:")
    print("1. Go to https://vercel.com/dashboard")
    print("2. Click on FortuNow project")
    print("3. Click 'Redeploy'")
    print("4. The build should now work! ✅")
    print()
    
except subprocess.CalledProcessError as e:
    print(f"❌ Error: {e}")
    exit(1)
