import sys
import os

if __name__ == '__main__':
    fileName = sys.argv[1]

    if not os.path.exists(fileName):
        print(f"ERROR: Path \"{fileName}\" doesn't exist");
        exit();

    file = open(fileName, 'r')
    out = open('out.hpp', 'w+')

    out.write("EMSCRIPTEN_BINDINGS(module) {\n")

    for line in file.readlines():
        if not "(" in line: continue
        fnName = line.split('(')[0].strip()

        out.write(f"    function(\"{fnName}\", &{fnName});\n")
    
    file.close()
    out.write("}")
    out.close()