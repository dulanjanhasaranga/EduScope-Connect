import mysql.connector

try:
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234", 
        database="educonnect"
    )
    cursor = conn.cursor()
    cursor.execute("ALTER TABLE users MODIFY COLUMN role ENUM('STUDENT', 'ADMIN', 'LEADER') NOT NULL DEFAULT 'STUDENT'")
    conn.commit()
    print("Altered table successfully.")
except Exception as e:
    print(f"Error: {e}")
