import urllib.request
import json

# 1. Login
login_data = json.dumps({"email": "dulanjan.connect@gmail.com", "password": "Password123!"}).encode('utf-8')
req = urllib.request.Request("http://localhost:8080/api/auth/login", data=login_data, headers={'Content-Type': 'application/json'})
try:
    response = urllib.request.urlopen(req)
    data = json.loads(response.read().decode('utf-8'))
    token = data.get('token')
    print("Token fetched successfully")
except urllib.error.HTTPError as e:
    print(f"Login failed: {e.code} {e.read().decode('utf-8')}")
    exit(1)

# 2. Fetch Analytics
req2 = urllib.request.Request("http://localhost:8080/api/admin/analytics", headers={'Authorization': f'Bearer {token}'})
try:
    response2 = urllib.request.urlopen(req2)
    print("Analytics Status:", response2.status)
    print("Analytics Data:", response2.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print(f"Analytics failed: {e.code} {e.read().decode('utf-8')}")
