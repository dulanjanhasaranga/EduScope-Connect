import urllib.request
import json

# Login as admin
login_data = json.dumps({"email": "dulanjan.connect@gmail.com", "password": "Password123!"}).encode('utf-8')
req = urllib.request.Request("http://localhost:8080/api/auth/login", data=login_data, headers={'Content-Type': 'application/json'})
try:
    response = urllib.request.urlopen(req)
    data = json.loads(response.read().decode('utf-8'))
    token = data.get('token')
except urllib.error.HTTPError as e:
    exit(1)

# Patch ID 5 and 6
for user_id in [5, 6]:
    url = f"http://localhost:8080/api/admin/users/{user_id}/role?role=LEADER"
    req_patch = urllib.request.Request(url, method='PATCH', headers={'Authorization': f'Bearer {token}'})
    try:
        res = urllib.request.urlopen(req_patch)
        print(f"Patched user {user_id}: {res.status}")
    except urllib.error.HTTPError as e:
        print(f"Failed to patch {user_id}: {e.code} {e.read().decode('utf-8')}")
