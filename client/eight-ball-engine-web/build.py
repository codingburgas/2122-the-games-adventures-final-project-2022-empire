import os
import subprocess
import re

def call_shell(*args):
    try:
        return subprocess.check_output(" ".join(args), shell=True).strip().decode('utf-8')
    except:
        print(f'ERROR: invalid command "{" ".join(args)}"')
        exit(1)

source_dir = "src"
object_dir = "obj"
compiler = "emcc"
compile_pattern = ".*\.cpp$"

cflags = f"-I{source_dir} -Iinclude -Llib -sFORCE_FILESYSTEM -sFETCH -sUSE_GLFW=3 -sASYNCIFY -DPLATFORM_WEB -DGRAPHICS_API_OPENGL_ES2"
err_flags = "-Wall -Wunused-variable -Wextra -Wno-enum-compare"
ext_libs = "./lib/libraylib.a"
out = "dist/engine.js"

source_files = []
thread_pool = []

for [dir, subDirs, files] in os.walk(source_dir):
    for file in files:
        if not re.search(compile_pattern, file) == None:
            source_files.append(os.path.join(dir, file))

if not os.path.exists("dist"):
    os.mkdir("dist")

print("INFO: Linking...")
call_shell(f'{compiler} -lembind {" ".join(source_files)} --embed-file res -o {out} {ext_libs} {cflags} {err_flags}')