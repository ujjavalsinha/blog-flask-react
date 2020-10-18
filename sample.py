import random,string
def generate_user_id():
    alpha_numbers = string.ascii_letters + string.digits
    random_id = ''.join(random.choice(alpha_numbers) for i in range(70))
    return random_id

print(generate_user_id())