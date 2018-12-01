from functools import reduce
from operator import add

def get_device_input(filename):
    with open(filename) as file:
        values = [int(line.strip()) for line in file]

    return values

if __name__ == '__main__':
    values = get_device_input('input.txt')
    total = reduce(add, values)

    print(total)
