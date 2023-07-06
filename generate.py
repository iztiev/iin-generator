from random import randint
from functools import reduce
from operator import add

def generate_date():
    year = randint(50, 99)
    month = randint(1, 12)
    day = randint(1, 28)
    return "{:02d}".format(year) + "{:02d}".format(month) + "{:02d}".format(day)

def generate_sex():
    return str(randint(3, 4))

def generate_random_portion():
    data = randint(0, 9999)
    return "{:05d}".format(data)

def control_number_v1(iin):
    weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    sum = reduce(add, [int(iin[i]) * weights[i] for i in range(11)])
    return sum % 11

def control_number_v2(iin):
    weights = [3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2]
    sum = reduce(add, [int(iin[i]) * weights[i] for i in range(11)])
    return sum % 11

def generate_control_number(iin):
    ctrl = control_number_v1(iin)
    if ctrl >= 10:
        ctrl = control_number_v2(iin)
    if ctrl >= 10:
        return -1
    return ctrl

def generate_iin():
    iin = generate_date() + generate_sex() + generate_random_portion()
    ctrl = generate_control_number(iin)
    if ctrl < 0:
        return generate_iin()
    return iin + str(ctrl)

if __name__ == "__main__":
    print(generate_iin())
