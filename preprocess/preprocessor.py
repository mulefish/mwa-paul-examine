
"""
A: What is this? This script is a mini-state machine that uses templates to put together files. 

B: Why is this? Stackblizts does not appear to like static files to be split.
But I like to TDD my javascript. This preprocessor will allow me to give StackBlizt its 
preferred one-giant-file while also allowing me to properly test my javascript logic. 

C: How is the javascript organized? Untested javascript deals with html dom stuff. The tested javascript 
is just logic. The TDD will need 'logic.js', 'tdd.js' and 'everything.json' 

D: How does this preprocessor work? index.html is impregnated with 2 template blocks. 
This script will loop over each line until it hits 'CSS_BEGIN' and stop collecting the lines. 
At this point is will drop in the 'css' and begin collecting each line. 
Until it hits MAIN_LOGIC_BEGIN. Then it will stop collecting the lines and drop in 'logic' and being collecting
end line. 

E: Once step 'C' is complete it will then overwrite index.html with the results. 

F: The end. Now 'index.html' is has everything it needs - it is now one big happy ugly file.  
"""

import os # For changing directories

# Read in the css logic!
css = "" 
with open('style.css', 'r') as file:
    for line in file:
        css += line 

# Read in the javascript logic!
logic = ""
with open('logic.js', 'r') as file:
    for line in file:
        logic += line 

payloads = [css, logic]

os.chdir('..') # Move up one directory
state = 0 
pointer = 0 
semaphores = {
    "CSS_BEGIN":1,
    "CSS_END":2,
    "MAIN_LOGIC_BEGIN":1,
    "MAIN_LOGIC_END":2
}   

page = ""
stackblizt = "index.html"
with open(stackblizt, 'r') as file:
    for line in file:
        # line = line.rstrip()
        for k in semaphores:
            if k in line: 
                state = semaphores[k]
        if state == 0:
            page += line
        elif state == 2:
            # print(payloads[pointer])
            page += payloads[pointer]
            pointer += 1
            state = 0 

with open(stackblizt, 'w') as file:
    file.write(page)
which_dir = os.getcwd()
print(f"Overwrote {stackblizt} in directory {which_dir}")