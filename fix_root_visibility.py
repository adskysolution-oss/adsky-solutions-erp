import re
import json

path = r'c:\Users\abhi\OneDrive\Desktop\Webside Ad Sky\adsky-solution\app\page.js'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the __html: "..." or __html: '...'
match = re.search(r'__html:\s*("(?:\\.|[^"\\])*")', content)
if not match:
    match = re.search(r"__html:\s*('(?:\\.|[^'\\])*')", content)

if match:
    quoted_html = match.group(1)
    try:
        html_content = json.loads(quoted_html)
    except:
        # Fallback if it's not JSON (e.g. single quotes)
        html_content = quoted_html[1:-1].replace('\\"', '"').replace("\\'", "'")

    # Remove opacity and transform
    html_content = re.sub(r'style="opacity:0;transform:translateY\(20px\)"', '', html_content)
    html_content = re.sub(r'style="opacity:0;transform:translateX\(-30px\)"', '', html_content)
    html_content = re.sub(r'style="transform:translateY\(20px\)"', '', html_content)
    html_content = re.sub(r'style="transform:translateY\(10px\)"', '', html_content)
    html_content = re.sub(r'style="transform:scale\(0.9\)"', '', html_content)
    html_content = re.sub(r'style="opacity:0"', '', html_content)
    html_content = re.sub(r'opacity:0', '', html_content)
    
    # Also remove hidden="" from the start if it exists
    html_content = html_content.replace('<div hidden="">', '<div>')

    fixed_quoted_html = json.dumps(html_content)
    new_content = content.replace(quoted_html, fixed_quoted_html)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Fixed visibility in app/page.js")
else:
    print("Could not find __html in app/page.js")
