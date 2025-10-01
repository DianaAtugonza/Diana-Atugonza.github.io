
# # # for loop
# # for x in range(1,51):
# #     if x %2:
# #         print(x)
    
# #for i in range (1,100,2):
# #    print(i)

# #for x in range(0,10,2):
#    # print(x)

# '''count = 0
# for n in range(0,6):
#     count +=1
#     print(n)'''


# names= ['Diana', 'Joy', 'Brenda']
# print(names)
# print(names[2])
# names.append ('Whitney')
# print(names)

# names[1] ="joystine"

# print(names)

# names.insert(0,'Eliza')
# print(names)

# names.pop()
# print(names)

# names.remove('Diana')
# print(names)

'''girls =[]
number= int(input('enter the number of girls'))

i = 1
while i<=number:
    girl=input('enter a name\n')
    girls.append(girl)
    i+=1
    print(girls)'''

n = int(input('enter number:'))
sum_even=0
for num in range (1, n+1):
    if n%2 ==0:
        sum_even+=num
        print(f'sum of even numbers{sum_even}')

