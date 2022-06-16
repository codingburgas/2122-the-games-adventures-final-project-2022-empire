from pycparser import parse_file, c_ast
import sys

if __name__ == '__main__':
    f = open(sys.argv[1])
    txt = f.readlines();
    f.close()

    out_text = ""
    for line in txt:
        args = [l.strip() for l in line.split(',')]

        for arg in args:
            out_text += arg.split(' ')[1] + ': ' + arg.split(' ')[0] + ', '

        out_text += '\n'

    print(out_text)
    