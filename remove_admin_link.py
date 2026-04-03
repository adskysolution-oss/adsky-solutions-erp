import os
import re

directory = 'app'
# The exact Admin Panel link string in all page.js files
old_link = '<a class=\\"relative text-xs font-bold uppercase tracking-[0.2em] transition-colors py-2 text-yellow-400 hover:text-white\\" href=\\"/admin\\" style=\\"margin-left:20px;\\">Admin Panel</a>'

total_fixes = 0
fixed_files = []

for root, dirs, files in os.walk(directory):
    for file in files:
        if file == 'page.js':
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if old_link in content:
                new_content = content.replace(old_link, '')
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                total_fixes += 1
                fixed_files.append(filepath)
                print(f"Fixed: {filepath}")

print(f"\nTotal files fixed: {total_fixes}")
if fixed_files:
    print("\nFiles modified:")
    for f in fixed_files:
        print(f"  - {f}")
