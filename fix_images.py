import os
import shutil

# First copy logo.jpeg as "logo(2).jpeg" so the existing code works
src = os.path.join('public', 'logo.jpeg')
dst = os.path.join('public', 'logo(2).jpeg')
if os.path.exists(src) and not os.path.exists(dst):
    shutil.copy2(src, dst)
    print(f"Copied logo.jpeg -> logo(2).jpeg")

# List what we have now
print("\nFiles in public folder:")
for f in os.listdir('public'):
    size = os.path.getsize(os.path.join('public', f))
    print(f"  {f} ({size} bytes)")
