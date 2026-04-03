import os
import re

directory = 'app'
fixes = [
    # Remove all translateY transforms that push content off screen
    ('style="transform:translateY(30px)"', 'style=""'),
    ('style="transform:translateY(20px)"', 'style=""'),
    ('style="transform:translateX(-50px)"', 'style=""'),
    ('style="transform:translateX(-30px)"', 'style=""'),
    ('style="transform:scale(0.95)"', 'style=""'),
    ('style="transform:scale(0.8)"', 'style=""'),
    ('style="transform:translateX(20px)"', 'style=""'),
    # Remove opacity:0
    ('opacity:0', 'opacity:1'),
]

total_fixes = 0
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.js'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for old, new in fixes:
                count = new_content.count(old)
                if count > 0:
                    new_content = new_content.replace(old, new)
                    total_fixes += count
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed: {filepath}")

print(f"\nTotal replacements made: {total_fixes}")
print("Done! Now run: git add . && git commit -m 'fix: remove all transform shifts' && git push")
