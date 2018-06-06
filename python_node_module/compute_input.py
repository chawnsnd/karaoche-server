import sys, json
def read_in():
    lines = sys.stdin.readlines()
    print(lines)    
    return json.loads(lines[0])

def main():
    #get array of data
    lines=read_in()
    a = lines[0]
    #create a numpy array

    print (lines*2)
    print(a)

if __name__ == '__main__':
    main()


