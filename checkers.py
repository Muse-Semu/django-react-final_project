import random
import string

# def get_random_string(length):
#     # choose from all lowercase letter
#     letters = string.ascii_lowercase
#     result_str = ''.join(random.choice(letters) for i in range(length))
#     print("Random string of length", length, "is:", result_str)

# get_random_string(8)
# get_random_string(6)
# get_random_string(4)



# Generate random integer with 6 digits
random_number = random.randint(100000, 999999)

# Print the generated number
print(random_number)