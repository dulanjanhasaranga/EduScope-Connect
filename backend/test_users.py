import urllib.request
import json

login_data = json.dumps({"email": "dulanjan.connect@gmail.com", "password": "Password123!"}).encode('utf-8')
req = urllib.request.Request("http://localhost:8080/api/auth/login", data=login_data, headers={'Content-Type': 'application/json'})
try:
    response = urllib.request.urlopen(req)
    data = json.loads(response.read().decode('utf-8'))
    token = data.get('token')
except urllib.error.HTTPError as e:
    exit(1)

req2 = urllib.request.Request("http://localhost:8080/api/admin/users", headers={'Authorization': f'Bearer {token}'})
try:
    response2 = urllib.request.urlopen(req2)
    users = json.loads(response2.read().decode('utf-8'))
    for u in users:
        print(f"{u.get('username')}: {u.get('role')}")
except urllib.error.HTTPError as e:
    pass
