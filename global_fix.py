import os
import re

directory = 'app'
pattern_opacity = re.compile(r'style="[^"]*opacity:0[^"]*"')
pattern_transform = re.compile(r'style="[^"]*transform:[^"]*"')
pattern_hidden = re.compile(r'hidden=""')

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.js'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if 'dangerouslySetInnerHTML' in content:
                # Add suppressHydrationWarning to <main> or <div> that has dangerouslySetInnerHTML
                # Actually, let's just find the tags and add it.
                new_content = content
                if '<main' in new_content and 'suppressHydrationWarning' not in new_content:
                    new_content = new_content.replace('<main', '<main suppressHydrationWarning')
                
                # Remove common visibility blockers from the HTML strings
                new_content = new_content.replace('opacity:0', '')
                new_content = new_content.replace('transform:translateY(20px)', '')
                new_content = new_content.replace('transform:translateX(-30px)', '')
                new_content = new_content.replace('transform:translateY(10px)', '')
                new_content = new_content.replace('transform:scale(0.9)', '')
                new_content = new_content.replace('hidden=""', '')
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed {filepath}")
