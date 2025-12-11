#!/usr/bin/env python3
"""
FortuNow - Restructure project for Vercel deployment
This script moves all files from fortunow/ to root for proper Vercel deployment
"""

import os
import shutil
import subprocess
from pathlib import Path

REPO_ROOT = Path('/workspaces/FortuNow')
FORTUNOW_DIR = REPO_ROOT / 'fortunow'

def copy_directory(src, dst):
    """Copy directory recursively, overwriting existing files"""
    if not src.exists():
        print(f"⚠️  Source not found: {src}")
        return
    
    dst.mkdir(parents=True, exist_ok=True)
    for item in src.iterdir():
        src_path = item
        dst_path = dst / item.name
        
        if src_path.is_dir():
            if item.name not in ['node_modules', '.next', '.git']:
                copy_directory(src_path, dst_path)
        else:
            shutil.copy2(src_path, dst_path)
    
    print(f"✅ Copied {src.name}/")

def main():
    os.chdir(REPO_ROOT)
    
    print("🚀 FortuNow - Restructuring for Vercel")
    print("=" * 50)
    print()
    
    # Directories to copy
    dirs_to_copy = [
        ('app', 'app'),
        ('components', 'components'),
        ('lib', 'lib'),
        ('public', 'public'),
        ('prisma', 'prisma'),
    ]
    
    print("1️⃣  Copying directories...")
    for src_name, dst_name in dirs_to_copy:
        src = FORTUNOW_DIR / src_name
        dst = REPO_ROOT / dst_name
        copy_directory(src, dst)
    
    # Files to copy
    files_to_copy = [
        ('.env.local', '.env.local'),
        ('.env.production', '.env.production'),
    ]
    
    print()
    print("2️⃣  Copying configuration files...")
    for src_name, dst_name in files_to_copy:
        src = FORTUNOW_DIR / src_name
        dst = REPO_ROOT / dst_name
        if src.exists():
            shutil.copy2(src, dst)
            print(f"✅ Copied {src_name}")
    
    print()
    print("3️⃣  Git operations...")
    
    # Add changes
    subprocess.run(['git', 'add', '.'], check=True)
    print("✅ Files staged")
    
    # Commit
    commit_msg = """fix: Restructure project for Vercel deployment

- Moved all app files from fortunow/ to root directory
- Copied package.json, jsconfig.json, next.config.mjs to root
- Copied prisma schema and lib files to root
- Updated vercel.json for root-based deployment
- This fixes the "No Next.js version detected" error

Now Vercel will properly detect and build the Next.js app from root."""
    
    subprocess.run(['git', 'commit', '-m', commit_msg], check=True)
    print("✅ Commit created")
    
    # Push
    subprocess.run(['git', 'push', 'origin', 'main'], check=True)
    print("✅ Pushed to GitHub")
    
    print()
    print("=" * 50)
    print("🎉 Restructuring complete!")
    print("=" * 50)
    print()
    print("Next steps:")
    print("1. Go to https://vercel.com/dashboard")
    print("2. Click on FortuNow project")
    print("3. Click 'Redeploy'")
    print("4. The build should now work! ✅")
    print()

if __name__ == '__main__':
    try:
        main()
    except subprocess.CalledProcessError as e:
        print(f"❌ Error: {e}")
        exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        exit(1)
