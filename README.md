# mwa-paul-examine
[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/mwa-paul-examine4?file=README.md)


# ON STACKBLITZ
Only index.html is needed 

# ON LOCALHOST
I am using python's buildin http.server. CD to whatever directory you placed this repo and, at the CLI:   
python -m http.server 4040  
And in the browser: 
http://localhost:4040/

# Pieces? Procoessor? 
- A: What is this? This script is a mini-state machine that uses templates to put together files. 

- B: Why is this? Stackblizts does not appear to like static files to be split.
But I like to TDD my javascript. This preprocessor will allow me to give StackBlizt its 
preferred one-giant-file while also allowing me to properly test my javascript logic. 

- C: How is the javascript organized? Untested javascript deals with html dom stuff. The tested javascript 
is just logic. The TDD will need 'logic.js', 'tdd.js' and 'everything.json' 

- D: How does this preprocessor work? index.html is impregnated with 2 template blocks. 
This script will loop over each line until it hits 'CSS_BEGIN' and stop collecting the lines. 
At this point is will drop in the 'css' and begin collecting each line. 
Until it hits MAIN_LOGIC_BEGIN. Then it will stop collecting the lines and drop in 'logic' and being collecting
end line. 

- E: Once step 'C' is complete it will then overwrite index.html with the results. 

- F: The end. Now 'index.html' is has everything it needs - it is now one big happy ugly file.  

# One weird thing: 
index.html will have 

# TDD : run 
node tdd.js

# TDD : results
PASS  1 of 8 simple_happypath  
PASS  2 of 8 happypath_deeperLook  
PASS  3 of 8 complex_happypath  
PASS  4 of 8 flatten_test n=456  
PASS  5 of 8 inflateFlatMap_complex_test  
PASS  6 of 8 inflateFlatMap_test  
PASS  7 of 8 getColorizableHOH_test  
PASS  8 of 8 colorize_test


