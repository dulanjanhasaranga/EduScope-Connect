import re
import random

path = r'c:\Users\User\Downloads\educonnect\backend\src\main\java\com\educonnect\config\DataSeeder.java'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

def replacer(match):
    # Match: minusDays(xx)
    return f"minusDays({random.randint(0, 6)})"

content = re.sub(r'minusDays\(\d+\)', replacer, content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated DataSeeder.java dates")
